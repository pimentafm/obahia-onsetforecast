import React, { useState, useEffect, useCallback } from 'react';

import { Modal, Tooltip, Button } from 'antd';

import OlMap from 'ol/Map';

import 'antd/dist/antd.css';
import { FiMenu } from 'react-icons/fi';
import { FaInfoCircle } from 'react-icons/fa';
import { GoAlert } from 'react-icons/go';

import ZoomControl from './ZoomControl';
import Scalebar from './ScaleBar';

import StaticLayerSwitcher from '../StaticLayerSwitcher';
import LayerSwitcher from '../LayerSwitcher';

import { Container, Header, Footer, Content } from './styles';

interface MenuProps {
  ishidden: number;
  map: OlMap;
}

const Menu: React.FC<MenuProps> = ({ ishidden, map, ...rest }) => {
  const [hidden, setHidden] = useState(ishidden);
  const [modal, setModal] = useState<boolean>(false);

  const [downloadURL, setDownloadURL] = useState('');

  const showModal = () => {
    setModal(true);
  };

  const handleOk = () => {
    setModal(false);
  };

  const handleCancel = () => {
    setModal(false);
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

  useEffect(() => {
    setDownloadURL(`ftp://obahia.dea.ufv.br/landuse/`);
  }, []);

  return (
    <Container id="menu" ishidden={hidden}>
      <ZoomControl ishidden={hidden} map={map} />
      <Scalebar id="scalebar" map={map} />

      <Header ishidden={hidden}>
        <a href="http://obahia.dea.ufv.br">
          <img
            src="http://obahia.dea.ufv.br/static/geonode/img/logo.png"
            alt="Obahia"
          />
        </a>

        <Tooltip placement="right" title="Esconde/Mostra menu">
          <FiMenu
            id="handleMenu"
            type="menu"
            className="nav_icon"
            style={{ fontSize: '20px', color: '#000' }}
            onClick={handleMenu}
          />
        </Tooltip>
      </Header>

      <Content>
        <div className="card-menu">
          <span>Previsão do início do período chuvoso</span>
        </div>

        <div className="static-layers">
          <StaticLayerSwitcher
            name="hidrography"
            label="Hidrografia"
            handleLayerVisibility={handleLayerVisibility}
            layerIsVisible={false}
            legendIsVisible={false}
            layerInfoIsVisible={false}
            switchColor="#0000ff"
          />
          <StaticLayerSwitcher
            name="highways"
            label="Rodovias"
            handleLayerVisibility={handleLayerVisibility}
            layerIsVisible={false}
            legendIsVisible={false}
            layerInfoIsVisible={false}
            switchColor="#FABE57"
          />
        </div>

        <div className="static-layers">
          <label>
            Data da simulação: <span>01/07/2020</span>
          </label>

          <label>
            Próxima simulação: <span>01/09/2020</span>
          </label>

          <label>
            Fonte:{' '}
            <Tooltip
              placement="right"
              title="National Centers for Environmental Prediction - Coupled Forecast System Model version 2"
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://cfs.ncep.noaa.gov/"
              >
                {' '}
                CSFv2
              </a>
            </Tooltip>
          </label>

          <span className="span-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            dolore distinctio hic maiores mollitia labore accusantium eos sequi
            sit facilis. Explicabo asperiores harum est optio officia nesciunt
            dolores sequi facere
          </span>
        </div>

        <LayerSwitcher
          name="onset"
          label="Início do período chuvoso"
          handleLayerVisibility={handleLayerVisibility}
          layerIsVisible={true}
          legendIsVisible={true}
          layerInfoIsVisible={true}
          switchColor="#1f5582"
          downloadURL={downloadURL}
        />
      </Content>

      <Footer ishidden={hidden}>
        <Tooltip placement="right" title="Sobre">
          <GoAlert
            id="about"
            className="nav_icon"
            style={{ fontSize: '20px', color: '#fff', cursor: 'pointer' }}
            onClick={showModal}
          />
        </Tooltip>
        <Tooltip placement="right" title="Sobre">
          <FaInfoCircle
            id="about"
            className="nav_icon"
            style={{ fontSize: '20px', color: '#fff', cursor: 'pointer' }}
            onClick={() =>
              window.open(`http://obahia.dea.ufv.br/about/`, '_blank')
            }
          />
        </Tooltip>
      </Footer>

      <Modal
        title="Obahia - Termos de uso"
        visible={modal}
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
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </Container>
  );
};

export default Menu;
