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
      <div className="flex flex-col gap-2">
        <label className="text-xs">
          Operation:
          <select 
            value={operation} 
            onChange={(e) => setOperation(e.target.value)}
            className="ml-1.5 px-1.5 py-1 w-[90px] bg-dark-card text-text-secondary border border-dark-border rounded focus:outline-none focus:border-accent-blue cursor-pointer"
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
