import React from 'react';

import {
  GiMeshBall,
  GiStack,
  GiRaining,
  GiNetworkBars,
  GiPieChart,
} from 'react-icons/gi';
import { Tooltip } from 'antd';

import { Container } from './styles';

interface ToolsMenuProps {
  ishidden: number;
}

const ToolsMenu: React.FC<ToolsMenuProps> = ({ ishidden }) => {
  return (
    <Container ishidden={ishidden}>
      <Tooltip placement="bottomLeft" title="Análise de séries temporais">
        <GiStack
          className="text-icon"
          style={{ fontSize: 25, color: '#888888', cursor: 'pointer' }}
          //onClick={() => {}}
        />
      </Tooltip>

      <Tooltip
        placement="bottomLeft"
        title="Previsão do início da estação chuvosa"
      >
        <GiRaining
          className="text-icon"
          style={{ fontSize: 25, color: '#1f5582', cursor: 'pointer' }}
        />
      </Tooltip>

      <Tooltip placement="bottomLeft" title="Estações telemétricas">
        <GiNetworkBars
          className="text-icon"
          style={{ fontSize: 25, color: '#888888', cursor: 'pointer' }}
          //onClick={() => {}}
        />
      </Tooltip>

      <Tooltip
        placement="bottomLeft"
        title="Visualizador do modelo de águas subterrâneas"
      >
        <GiMeshBall
          className="text-icon"
          style={{ fontSize: 25, color: '#888888', cursor: 'pointer' }}
          //onClick={() => {}}
        />
      </Tooltip>

      <Tooltip placement="bottomLeft" title="outro">
        <GiPieChart
          className="text-icon"
          style={{ fontSize: 25, color: '#888888', cursor: 'pointer' }}
          //onClick={() => {}}
        />
      </Tooltip>
    </Container>
  );
};

export default ToolsMenu;
