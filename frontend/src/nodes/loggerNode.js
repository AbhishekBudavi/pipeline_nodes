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
      <div className="flex flex-col gap-2">
        <label className="text-xs">
          Level:
          <select 
            value={logLevel}
            onChange={(e) => setLogLevel(e.target.value)}
            className="ml-1.5 px-1.5 py-1 w-[90px] bg-dark-card text-text-secondary border border-dark-border rounded focus:outline-none focus:border-accent-blue cursor-pointer"
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
