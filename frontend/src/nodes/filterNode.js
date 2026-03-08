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
      <div className="flex flex-col gap-2">
        <label className="text-xs">
          Condition:
          <input 
            type="text" 
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="ml-1.5 px-1.5 py-1 w-[120px] bg-dark-card text-text-secondary border border-dark-border rounded focus:outline-none focus:border-accent-blue"
            placeholder="e.g., x > 10"
          />
        </label>
      </div>
    </BaseNode>
  );
};
