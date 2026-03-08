import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode 
      id={id}
      title="Output"
      inputs={[`${id}-value`]}
      width={200}
      height={110}
    >
      <div className="flex flex-col gap-2">
        <label className="text-xs">
          Name:
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange}
            className="ml-1.5 px-1.5 py-1 w-[90px] bg-dark-card text-text-secondary border border-dark-border rounded focus:outline-none focus:border-accent-blue"
          />
        </label>
        <label className="text-xs">
          Type:
          <select value={outputType} onChange={handleTypeChange} className="ml-1.5 px-1.5 py-1 w-[95px] bg-dark-card text-text-secondary border border-dark-border rounded focus:outline-none focus:border-accent-blue cursor-pointer">
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
