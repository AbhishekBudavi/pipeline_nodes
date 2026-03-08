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
      <div className="flex flex-col gap-2">
        <label className="text-xs">
          Delay (ms):
          <input 
            type="number" 
            value={delayMs}
            onChange={(e) => setDelayMs(parseInt(e.target.value))}
            className="ml-1.5 px-1.5 py-1 w-20 bg-dark-card text-text-secondary border border-dark-border rounded focus:outline-none focus:border-accent-blue"
            min="0"
            step="100"
          />
        </label>
      </div>
    </BaseNode>
  );
};
