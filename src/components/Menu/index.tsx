import React, { useState, useEffect, useCallback } from 'react';

import HtmlParser from 'react-html-parser';

import { Modal, Popover, Button } from 'antd';

import { format, getYear, getMonth, sub } from 'date-fns';

import OlMap from 'ol/Map';

import 'antd/dist/antd.css';
import { FiMenu } from 'react-icons/fi';
import { FaInfoCircle } from 'react-icons/fa';
import { GoAlert } from 'react-icons/go';

import ToolsMenu from './ToolsMenu';
import ZoomControl from './ZoomControl';
import Scalebar from './ScaleBar';

import StaticLayerSwitcher from '../StaticLayerSwitcher';
import LayerSwitcher from '../LayerSwitcher';

import { Container, Header, Footer, Content } from './styles';

import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

interface MenuProps {
  ishidden: number;
  map: OlMap;
}

const Menu: React.FC<MenuProps> = ({ ishidden, map, ...rest }) => {
  const { t } = useTranslation();
  document.title = t('appname');

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

  const changeLanguage = useCallback(locale => {
    i18n.changeLanguage(locale);
  }, []);

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

        <div>
          <button
            className="locale-button"
            onClick={() => changeLanguage('pt')}
          >
            PT-BR
          </button>{' '}
          |{' '}
          <button
            className="locale-button"
            onClick={() => changeLanguage('en')}
          >
            EN
          </button>
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
            />{' '}
            {t('description_terms')}{' '}
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
        <p style={{ textAlign: 'justify' }}>
          A versão 2 do Climate Forecast System foi desenvolvida no
          Environmental Modeling Center do National Centers for Environmental
          Prediction (NCEP). É um modelo totalmente acoplado que representa a
          interação entre a atmosfera, oceanos, continentes e gelo marinho.
          Tornou-se operacional no NCEP em abril de 2011. As previsões são
          inicializadas diariamente, e produzem, para cada conjunto de
          inicializações, previsões climáticas para um período de nove meses. As
          previsões são geradas numa grade horizontal de 100 x 100 km, mas neste
          trabalho interpolamos para uma grade horizontal de 28 x 28 km. As
          previsões usadas são de domínio público, e esta plataforma visa apenas
          facilitar a sua visualização.
        </p>
        <p style={{ textAlign: 'justify' }}>
          As previsões para o Oeste da Bahia foram avaliadas por Luiz Felipe
          Sant´Anna Commar, em sua dissertação de MS em Meteorologia Aplicada na
          Universidade Federal de Viçosa, defendida em julho de 2020. A partir
          dos resultados desta dissertação, esta ferramenta web foi customizada
          para apresentar os resultados de previsão do início da estação
          chuvosa. Os resultados desta dissertação mostraram que a acurácia das
          estimativas de previsão do início das chuvas pelo CFSv2 para esta
          região dependem fortemente da data de inicialização das previsões,
          sendo que com dois meses de antecedência a previsão apresenta um erro
          médio absoluto (MAE) com 15 a 20 dias de diferença para os dados
          observados. Por esta razão, na customização desta plataforma, foi
          decidido apresentar resultados de previsões inicializadas em 01/08 e
          01/09.
        </p>
        <p style={{ textAlign: 'justify' }}>
          Ao se clicar no mapa, será obtido o valor da previsão em questão para
          aquele pixel, e o erro médio (MAE) calculado no período 2011-2019 para
          as previsões inicializadas na mesma data. Embora na maior parte dos
          anos testados, o início das chuvas tenha efetivamente ocorrido dentro
          do intervalo de MAE especificado, é possível que em alguns anos as
          chuvas se iniciem foram do intervalo previsto. Em qualquer caso, as
          previsões inicializadas em 1° de setembro devem ser mais precisas do
          que as previsões inicializadas em 1° de agosto.
        </p>
        <p style={{ textAlign: 'justify' }}>
          Os erros tendem a ser menores do lado oeste (fronteira com Tocantins e
          Goiás) do que do lado leste da região (próximo ao rio São Francisco).
          Além disso, nos anos de El Niño, o MAE é entre 2 e 8 dias maior do que
          a média dos demais anos analisada.
        </p>
        <p style={{ textAlign: 'justify' }}>
          Maiores detalhes sobre o sistema de previsão e a sua avaliação para a
          região estão disponíveis em:
        </p>
        <p style={{ textAlign: 'justify' }}>
          Saha, S. et al., 2014: The NCEP Climate Forecast System Version 2,
          Journal of Climate, 27, 2185–2208. doi:
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://dx.doi.org/10.1175/JCLI-D-12-00823.1"
          >
            http://dx.doi.org/10.1175/JCLI-D-12-00823.1
          </a>
        </p>
        <p style={{ textAlign: 'justify' }}>
          Commar, L. F. S., 2020: Avaliação da previsão climática do início da
          estação chuvosa no Oeste da Bahia. Dissertação de MS, Universidade
          Federal de Viçosa, julho de 2020. Orientador: Marcos Heil Costa.
        </p>
      </Modal>
    </Container>
  );
};

export default Menu;
