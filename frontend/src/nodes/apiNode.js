// apiNode.js
// A node that makes API calls

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const ApiNode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');

  return (
    <BaseNode 
      id={id}
      title="API Call"
      inputs={[`${id}-request`]}
      outputs={[`${id}-response`]}
      width={200}
      height={110}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '11px' }}>
          Method:
          <select 
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            style={{ marginLeft: '6px', padding: '4px 6px', width: '90px' }}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
