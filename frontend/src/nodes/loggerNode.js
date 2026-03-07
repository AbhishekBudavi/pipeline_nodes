// loggerNode.js
// A node that logs data for debugging

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const LoggerNode = ({ id, data }) => {
  const [logLevel, setLogLevel] = useState(data?.logLevel || 'info');

  return (
    <BaseNode 
      id={id}
      title="Logger"
      inputs={[`${id}-input`]}
      outputs={[`${id}-output`]}
      width={200}
      height={110}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '11px' }}>
          Level:
          <select 
            value={logLevel}
            onChange={(e) => setLogLevel(e.target.value)}
            style={{ marginLeft: '6px', padding: '4px 6px', width: '90px' }}
          >
            <option value="debug">Debug</option>
            <option value="info">Info</option>
            <option value="warn">Warn</option>
            <option value="error">Error</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
