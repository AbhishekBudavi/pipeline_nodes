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
      <div className="flex flex-col gap-2">
        <label className="text-xs">
          Method:
          <select 
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="ml-1.5 px-1.5 py-1 w-[90px] bg-dark-card text-text-secondary border border-dark-border rounded focus:outline-none focus:border-accent-blue cursor-pointer"
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
