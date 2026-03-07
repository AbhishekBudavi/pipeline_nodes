// delayNode.js
// A node that introduces a delay in the pipeline

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const DelayNode = ({ id, data }) => {
  const [delayMs, setDelayMs] = useState(data?.delayMs || 1000);

  return (
    <BaseNode 
      id={id}
      title="Delay"
      inputs={[`${id}-input`]}
      outputs={[`${id}-output`]}
      width={200}
      height={100}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '11px' }}>
          Delay (ms):
          <input 
            type="number" 
            value={delayMs}
            onChange={(e) => setDelayMs(parseInt(e.target.value))}
            style={{ marginLeft: '6px', padding: '4px 6px', width: '80px' }}
            min="0"
            step="100"
          />
        </label>
      </div>
    </BaseNode>
  );
};
