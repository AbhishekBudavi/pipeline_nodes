// filterNode.js
// A node that filters data based on conditions

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');

  return (
    <BaseNode 
      id={id}
      title="Filter"
      inputs={[`${id}-input`]}
      outputs={[`${id}-output`]}
      width={220}
      height={110}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '11px' }}>
          Condition:
          <input 
            type="text" 
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            style={{ marginLeft: '6px', padding: '4px 6px', width: '120px' }}
            placeholder="e.g., x > 10"
          />
        </label>
      </div>
    </BaseNode>
  );
};
