import React, { useState, useEffect } from 'react';

import OlMap from 'ol/Map';

import View from 'ol/View';

import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import OSM from 'ol/source/OSM';

import { defaults } from 'ol/interaction';

import 'ol/ol.css';

import { wms } from '../../services';

import { Container } from './styles';

import Menu from '../Menu';
import Footer from '../Footer';

import Popup from '../../components/Popup';

interface MapProps {
  defaultYear: number;
  defaultCategory: string;
}

const Map: React.FC<MapProps> = ({ defaultYear, defaultCategory }) => {
  const [onset] = useState(new TileLayer({ visible: true }));
  const [highways] = useState(new TileLayer({ visible: false }));
  const [hidrography] = useState(new TileLayer({ visible: false }));

  const [center] = useState([-45.2471, -12.4818]);
  const [zoom] = useState<number>(7);

  const [view] = useState(
    new View({
      projection: 'EPSG:4326',
      center: center,
      extent: [-56.0, -20.0, -33.0, -6.0],
      zoom: zoom,
    }),
  );

  const osm = new TileLayer({ source: new OSM() });

  const [map] = useState(
    new OlMap({
      controls: [],
      target: undefined,
      layers: [osm, onset, highways, hidrography],
      view: view,
      interactions: defaults({
        keyboard: false,
      }),
    }),
  );

  const highways_source = new TileWMS({
    url: wms.defaults.baseURL + 'highwaysRegion.map',
    params: {
      LAYERS: 'Rodovias',
      TILED: true,
    },
    serverType: 'mapserver',
  });

  const hidrography_source = new TileWMS({
    url: wms.defaults.baseURL + 'hidrographyRegion.map',
    params: {
      LAYERS: 'hidrografia',
      TILED: true,
    },
    serverType: 'mapserver',
  });

  const onset_source = new TileWMS({
    url: wms.defaults.baseURL + 'onsetRegion.map',
    params: {
      LAYERS: 'onset',
      TILED: true,
    },
    serverType: 'mapserver',
  });

  highways.set('name', 'highways');
  highways.setSource(highways_source);
  highways.getSource().refresh();

  hidrography.set('name', 'hidrography');
  hidrography.setSource(hidrography_source);
  hidrography.getSource().refresh();

  onset.set('name', 'onset');
  onset.setSource(onset_source);
  onset.getSource().refresh();

  useEffect(() => {
    map.setTarget('map');
  });

  return (
    <Container id="map">
      <Menu ishidden={false ? 1 : 0} map={map} />

      <Popup map={map} source={onset_source} />

      <Footer id="footer" map={map} />
    </Container>
  );
};

export default Map;
