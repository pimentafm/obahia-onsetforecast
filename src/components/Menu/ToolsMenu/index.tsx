import React from 'react';

import { useTranslation } from 'react-i18next';

import { GiMeshBall, GiStack, GiRaining } from 'react-icons/gi';
import { MdTrendingDown } from 'react-icons/md';

import { Popover } from 'antd';

import { Container } from './styles';

interface ToolsMenuProps {
  ishidden: number;
}

const ToolsMenu: React.FC<ToolsMenuProps> = ({ ishidden }) => {
  const { t } = useTranslation();

  return (
    <Container ishidden={ishidden}>
      <Popover
        placement="right"
        title={t('toolsmenu_maps')}
        content={
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <a href="http://corrente.dea.ufv.br/landuse">
              {t('toolsmenu_landuse')}
            </a>
            <a href="http://corrente.dea.ufv.br/biomass">
              {t('toolsmenu_biomass')}
            </a>
          </div>
        }
      >
        <GiStack
          className="text-icon"
          style={{ fontSize: 25, color: '#AAD3DF', cursor: 'pointer' }}
        />
      </Popover>

      <Popover placement="right" content={t('toolsmenu_onset')}>
        <GiRaining
          className="text-icon"
          style={{ fontSize: 25, color: '#1f5582', cursor: 'pointer' }}
        />
      </Popover>

      <Popover placement="right" content={t('toolsmenu_hidro')}>
        <MdTrendingDown
          className="text-icon"
          style={{ fontSize: 25, color: '#AAD3DF', cursor: 'pointer' }}
          onClick={() =>
            window.open('http://corrente.dea.ufv.br/hidro', '_self')
          }
        />
      </Popover>

      <Popover placement="right" content={t('toolsmenu_mfview')}>
        <GiMeshBall
          className="text-icon"
          style={{ fontSize: 25, color: '#AAD3DF', cursor: 'pointer' }}
          onClick={() =>
            window.open('http://corrente.dea.ufv.br/mfview', '_self')
          }
        />
      </Popover>
    </Container>
  );
};

export default ToolsMenu;
