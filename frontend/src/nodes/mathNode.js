// mathNode.js
// A node that performs mathematical operations

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  return (
    <BaseNode 
      id={id}
      title="Math"
      inputs={[`${id}-a`, `${id}-b`]}
      outputs={[`${id}-result`]}
      width={200}
      height={110}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '11px' }}>
          Operation:
          <select 
            value={operation} 
            onChange={(e) => setOperation(e.target.value)}
            style={{ marginLeft: '6px', padding: '4px 6px', width: '90px' }}
          >
            <option value="add">Add</option>
            <option value="subtract">Subtract</option>
            <option value="multiply">Multiply</option>
            <option value="divide">Divide</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
