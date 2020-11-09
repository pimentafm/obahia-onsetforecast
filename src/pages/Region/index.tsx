import React, { useEffect } from 'react';

import Map from '../../components/MapRegion';

import ReactGA from 'react-ga';

const Region: React.FC = () => {
  useEffect(() => {
    ReactGA.initialize('UA-182410588-6');
    ReactGA.pageview('/');
  }, []);
  return <Map defaultYear={2018} defaultCategory="Regional" />;
};

export default Region;
