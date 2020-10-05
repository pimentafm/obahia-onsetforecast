import React, { useState, useEffect, useCallback } from 'react';

import i18n from '../../i18n';

import MathJax from 'react-mathjax2';

import HtmlParser from 'react-html-parser';

import { Modal, Popover, Button } from 'antd';

import { format, getYear, getMonth, sub } from 'date-fns';

import OlMap from 'ol/Map';

import 'antd/dist/antd.css';
import { FiMenu } from 'react-icons/fi';
import { FaInfoCircle } from 'react-icons/fa';
import { GoAlert } from 'react-icons/go';

import ChangeLanguage from './ChangeLanguage';

import ToolsMenu from './ToolsMenu';
import ZoomControl from './ZoomControl';
import Scalebar from './ScaleBar';

import StaticLayerSwitcher from '../StaticLayerSwitcher';
import LayerSwitcher from '../LayerSwitcher';

import { Container, Header, Footer, Content } from './styles';

import { useTranslation } from 'react-i18next';

import AAImageEN from '../../assets/images/anomalous_acumulation_obahia_en.png';
import AAImagePT from '../../assets/images/anomalous_acumulation_obahia_pt.png';

interface MenuProps {
  ishidden: number;
  map: OlMap;
}

const Menu: React.FC<MenuProps> = ({ ishidden, map, ...rest }) => {
  const { t } = useTranslation();
  document.title = t('appname');

  const tex = `AA = \\sum_{n=1}^{day}\\left (R_{n} - R_{ref} \\right)`;

  const [hidden, setHidden] = useState(ishidden);
  const [termsOfUseModal, setTermsOfUseModal] = useState<boolean>(false);
  const [metadataModal, setMetadataModal] = useState<boolean>(false);

  const [forecastDate, setForecastDate] = useState(new Date(Date.now()));

  const [downloadURL, setDownloadURL] = useState('');

  const termsOfUse = HtmlParser(
    `<span style="color: #1f5582; font-weight: 600; font-size: 16px;">OBahia</span><span> ${t(
      'modal_terms_title',
    )}</span>`,
  );

  const additionalInformation = HtmlParser(
    `<span style="color: #1f5582; font-weight: 600; font-size: 16px;">OBahia</span><span> ${t(
      'modal_info_title',
    )}</span>`,
  );

  const showTermsOfUseModal = () => {
    setTermsOfUseModal(true);
  };

  const showMetadataModal = () => {
    setMetadataModal(true);
  };

  const handleOk = () => {
    setTermsOfUseModal(false);
    setMetadataModal(false);
  };

  const handleCancel = () => {
    setTermsOfUseModal(false);
    setMetadataModal(false);
  };

  const handleMenu = useCallback(() => {
    if (hidden === 0) {
      setHidden(1);
    } else {
      setHidden(0);
    }
  }, [hidden]);

  const handleLayerVisibility = useCallback(
    (e, id) => {
      const lyr_name = id; //obj.target.name;

      map.getLayers().forEach(lyr => {
        if (lyr.get('name') === lyr_name) {
          lyr.setVisible(e);
        }
      });
    },
    [map],
  );

  const handleLayerOpacity = useCallback(
    (opacity, lyr_name) => {
      map.getLayers().forEach(lyr => {
        if (lyr.get('name') === lyr_name) {
          lyr.setOpacity(opacity);
        }
      });
    },
    [map],
  );

  useEffect(() => {
    setDownloadURL(`ftp://obahia.dea.ufv.br/onset/onset_forecast.zip`);

    if (getMonth(Date.now()) < 7) {
      setForecastDate(sub(new Date(getYear(Date.now()), 8, 1), { years: 1 }));
    } else if (getMonth(Date.now()) >= 7 && getMonth(Date.now()) < 8) {
      setForecastDate(new Date(getYear(Date.now()), 6, 1));
    } else {
      setForecastDate(new Date(getYear(Date.now()), 8, 1));
    }
  }, []);

  return (
    <Container id="menu" ishidden={hidden}>
      <ChangeLanguage ishidden={hidden} />
      <ToolsMenu ishidden={hidden} />
      <ZoomControl ishidden={hidden} map={map} />
      <Scalebar id="scalebar" map={map} />

      <Header ishidden={hidden}>
        <a href="http://obahia.dea.ufv.br">
          <img
            src="http://obahia.dea.ufv.br/static/geonode/img/logo.png"
            alt="Obahia"
          />
        </a>

        <Popover placement="right" content={t('tooltip_menu')}>
          <FiMenu
            id="handleMenu"
            type="menu"
            className="nav_icon"
            style={{ fontSize: '20px', color: '#000' }}
            onClick={handleMenu}
          />
        </Popover>
      </Header>

      <Content>
        <div className="card-menu">
          <span>{t('appname')}</span>
        </div>

        <div className="static-layers">
          <span className="span-text">
            <label>{t('description_title')}:</label> {t('description_start')}{' '}
            <Popover
              placement="right"
              content="Coupled Forecast System Model version 2"
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://cfs.ncep.noaa.gov/"
              >
                CFSv2
              </a>
            </Popover>{' '}
            {t('description_end')}{' '}
            <FaInfoCircle
              className="text-icon"
              style={{ fontSize: '12px', color: '#1f5582', cursor: 'pointer' }}
              onClick={showMetadataModal}
            />
            . {t('description_terms')}{' '}
            <GoAlert
              className="text-icon"
              style={{ fontSize: '12px', color: '#1f5582', cursor: 'pointer' }}
              onClick={showTermsOfUseModal}
            />
            .
          </span>
        </div>

        <LayerSwitcher
          name="onset"
          label={`${t('label_forecast')}: ${format(
            forecastDate,
            'dd/MM/yyyy',
          )}`}
          handleLayerOpacity={handleLayerOpacity}
          handleLayerVisibility={handleLayerVisibility}
          layerIsVisible={true}
          legendIsVisible={true}
          layerInfoIsVisible={true}
          switchColor="#1f5582"
          downloadURL={downloadURL}
        />

        <div className="static-layers">
          <StaticLayerSwitcher
            name="hidrography"
            label={t('label_hidrography')}
            handleLayerVisibility={handleLayerVisibility}
            layerIsVisible={false}
            legendIsVisible={false}
            layerInfoIsVisible={false}
            switchColor="#0000ff"
          />
          <StaticLayerSwitcher
            name="highways"
            label={t('label_highways')}
            handleLayerVisibility={handleLayerVisibility}
            layerIsVisible={false}
            legendIsVisible={false}
            layerInfoIsVisible={false}
            switchColor="#800000"
          />

          <StaticLayerSwitcher
            name="watersheds"
            label={t('label_watersheds')}
            handleLayerVisibility={handleLayerVisibility}
            layerIsVisible={true}
            legendIsVisible={false}
            layerInfoIsVisible={false}
            switchColor="#000000"
          />

          <StaticLayerSwitcher
            name="counties"
            label={t('label_municipalities')}
            handleLayerVisibility={handleLayerVisibility}
            layerIsVisible={false}
            legendIsVisible={false}
            layerInfoIsVisible={false}
            switchColor="#696969"
          />
        </div>
        <div className="final-space"></div>
      </Content>

      <Footer ishidden={hidden}>
        <Popover placement="right" content={t('tooltip_terms')}>
          <GoAlert
            className="footer_icon"
            style={{ fontSize: '20px', color: '#fff', cursor: 'pointer' }}
            onClick={showTermsOfUseModal}
          />
        </Popover>
        <Popover placement="right" content={t('tooltip_info')}>
          <FaInfoCircle
            className="footer_icon"
            style={{ fontSize: '20px', color: '#fff', cursor: 'pointer' }}
            onClick={showMetadataModal}
          />
        </Popover>
      </Footer>

      <Modal
        title={termsOfUse}
        style={{ top: 20 }}
        visible={termsOfUseModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            style={{
              background: '#1f5582',
              color: '#fff',
              borderColor: '#fff',
            }}
            onClick={handleOk}
          >
            Continue
          </Button>,
        ]}
      >
        <p style={{ textAlign: 'justify' }}>{t('terms_of_use')}</p>
      </Modal>

      <MathJax.Context input="tex">
        <Modal
          title={additionalInformation}
          width={800}
          style={{ top: 20 }}
          visible={metadataModal}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button
              key="submit"
              style={{
                background: '#1f5582',
                color: '#fff',
                borderColor: '#fff',
              }}
              onClick={handleOk}
            >
              Continue
            </Button>,
          ]}
        >
          <p style={{ textAlign: 'justify' }}>{t('modal_info_paraghaph01')}</p>
          <p style={{ textAlign: 'justify' }}>{t('modal_info_paraghaph02')}</p>
          <p style={{ textAlign: 'justify' }}>{t('modal_info_paraghaph03')}</p>
          <p style={{ textAlign: 'justify' }}>{t('modal_info_paraghaph04')}</p>
          <p style={{ textAlign: 'justify' }}>{t('modal_info_paraghaph05')}</p>

          {<MathJax.Node>{tex}</MathJax.Node>}

          <p style={{ textAlign: 'justify' }}>
            {HtmlParser(t('modal_info_paraghaph06'))}
          </p>
          <p style={{ textAlign: 'justify' }}>
            {HtmlParser(t('modal_info_paraghaph07'))}
          </p>
          <p style={{ textAlign: 'justify' }}>{t('modal_info_paraghaph08')}</p>

          <img
            width="100%"
            style={{ marginBottom: '10px' }}
            src={i18n.language === 'en' ? AAImageEN : AAImagePT}
            alt="Anomalous accumulation"
          />
          <p style={{ textAlign: 'justify' }}>
            <b>{t('modal_info_figure')} </b>
            {t('modal_info_figure_legend')}
          </p>

          <p style={{ textAlign: 'justify' }}>{t('modal_info_paraghaph09')}</p>
          <p style={{ textAlign: 'justify' }}>
            {HtmlParser(t('modal_info_paraghaph10'))}
          </p>

          <p style={{ textAlign: 'justify' }}>{t('modal_info_paraghaph11')}</p>

          <p style={{ textAlign: 'justify' }}>
            {t('modal_info_ref03')}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.locus.ufv.br/"
            >
              {' '}
              ADD LINK HERE
            </a>
          </p>

          <p style={{ textAlign: 'justify' }}>
            <b>{t('modal_info_reference')}</b>
          </p>

          <p style={{ textAlign: 'justify' }}>
            {t('modal_info_ref01')}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://doi.org/10.1016/j.agrformet.2018.02.031"
            >
              {' '}
              https://doi.org/10.1016/j.agrformet.2018.02.031
            </a>
          </p>

          <p style={{ textAlign: 'justify' }}>
            {t('modal_info_ref02')}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://doi.org/10.1002/joc.3863"
            >
              {' '}
              https://doi.org/10.1002/joc.3863
            </a>
          </p>

          <p style={{ textAlign: 'justify' }}>
            {t('modal_info_ref04')}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://doi.org/10.1175/JCLI4122.1"
            >
              {' '}
              https://doi.org/10.1175/JCLI4122.1
            </a>
          </p>

          <p style={{ textAlign: 'justify' }}>
            {t('modal_info_ref05')}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://dx.doi.org/10.1175/JCLI-D-12-00823.1"
            >
              {' '}
              http://dx.doi.org/10.1175/JCLI-D-12-00823.1
            </a>
          </p>
        </Modal>
      </MathJax.Context>
    </Container>
  );
};

export default Menu;
