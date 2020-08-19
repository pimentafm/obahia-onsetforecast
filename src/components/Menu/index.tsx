import React, { useState, useEffect, useCallback } from 'react';

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
    setDownloadURL(`ftp://obahia.dea.ufv.br/landuse/`);
    if (getMonth(Date.now()) <= 7) {
      setForecastDate(sub(new Date(getYear(Date.now()), 7, 1), { years: 1 }));
    } else {
      setForecastDate(sub(new Date(getYear(Date.now()), 8, 1), { years: 1 }));
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

      <MathJax.Context input='tex'>
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
          <p style={{ textAlign: 'justify' }}>
          O método do Anomalous Accumulation (AA) (Liebmann et al., 2007) foi utilizado para definir o início da estação chuvosa (Ic)
          </p>
          
          { metadataModal &&  <MathJax.Node>{tex}</MathJax.Node> }

          <p style={{ textAlign: 'justify' }}>em que R<sub>n</sub> é a chuva diária (mm dia<sup>-1</sup>) e R<sub>ref</sub> representa o valor de referência.</p>
          <p style={{ textAlign: 'justify' }}>
          Para o desenvolvimento deste estudo n se inicia em 1 de julho, metade da estação seca em boa parte do país, e se estende até o fim de junho do ano seguinte. O valor de referência foi estabelecido em 2,5 mm dia<sup>-1</sup> que é a necessidade hídrica de uma muda de soja (Abrahão e Costa 2018).
          </p>
          <p style={{ textAlign: 'justify' }}>
          O AA é obtido a partir do cálculo da diferença entre a chuva acumulada diária e o valor de referência, assim construindo uma curva de chuvas acumuladas. Nesta curva de acumulação o valor mínimo representa o início da estação chuvosa, e o valor máximo representa o fim da estação chuvosa (Arvor et al., 2014). O método foi demonstrado através da Figura X.
          </p>
          <p style={{ textAlign: 'justify' }}>
          É importante salientar que a curva de AA deve ser positiva por um certo tempo, assim caracterizando chuvas superiores ao valor de referência, o que garante o início da estação chuvosa (Liebmann et al., 2007, Arvor et al., 2014).
          </p>
          <p style={{ textAlign: 'justify' }}>
          A utilização do R<sub>ref</sub> pode causar falsos início da estação chuvosa em regiões em que a chuva média se apresente inferior ao R<sub>ref</sub>. Para sanar este problema foi utilizado o cálculo da derivada da curva de AA (Arvor et al., 2014). O máximo da deriva do AA é um estimador da metade da estação chuvosa. Deste modo, o valor mínimo anterior ao máximo da derivada indica o início da estação chuvosa, para os casos em que média de chuvas forem inferiores ao valor de referência.
          </p>
          {/* <p style={{ textAlign: 'justify' }}>{t('modal_info_paraghaph05')}</p> */}
          {/* <p style={{ textAlign: 'justify' }}>
            {t('modal_info_paraghaph06')}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://dx.doi.org/10.1175/JCLI-D-12-00823.1"
            >
              {' '}
              http://dx.doi.org/10.1175/JCLI-D-12-00823.1
            </a>
          </p>
          <p style={{ textAlign: 'justify' }}>{t('modal_info_paraghaph07')}</p> */}
        </Modal>
      </MathJax.Context>
    </Container>
  );
};

export default Menu;
