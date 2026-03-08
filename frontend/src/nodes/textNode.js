import { useState, useMemo } from 'react';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const extractVariables = (text) => {
    const regex = /\{\{(\w+)\}\}/g;
    const variables = [];
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      if (!variables.includes(match[1])) {
        variables.push(match[1]);
      }
    }
    
    return variables;
  };

  
  const detectedVariables = useMemo(() => extractVariables(currText), [currText]);


  const inputHandles = detectedVariables.map(variable => `${id}-${variable}`);


  const calculateHeight = () => {
    const lineCount = currText.split('\n').length;
    
    const minHeight = 110;
    const contentHeight = Math.max(40, lineCount * 18 + 20);
    return Math.max(minHeight, contentHeight + 50);
  };

  
  const calculateWidth = () => {
    const lines = currText.split('\n');
    const maxLineLength = Math.max(...lines.map(line => line.length));
    
    const estimatedWidth = Math.max(220, Math.min(500, maxLineLength * 7 + 30));
    return estimatedWidth;
  };

  const height = calculateHeight();
  const width = calculateWidth();

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode 
      id={id}
      title={`Text ${detectedVariables.length > 0 ? `(${detectedVariables.length})` : ''}`}
      inputs={inputHandles}
      outputs={[`${id}-output`]}
      width={width}
      height={height}
    >
      <div className="flex flex-col items-start gap-1.5 h-full overflow-hidden">
        <textarea 
          value={currText} 
          onChange={handleTextChange}
          className="w-full px-2 pt-1 pb-1 text-left resize-none text-xs border border-dark-border rounded-sm font-mono bg-[#1f2530] text-[#d0d8e0] leading-relaxed focus:outline-none focus:border-accent-blue focus:bg-dark-hover"
          style={{ maxHeight: '80px', minHeight: '40px', overflowY: 'auto' }}
          placeholder="Enter text or variables"
        />
        
    
        {detectedVariables.length > 0 && (
          <div className="text-xs text-text-tertiary px-1.5 py-1 bg-dark-hover rounded-sm w-full overflow-auto break-words" style={{ maxHeight: '30px' }}>
            <strong className="text-text-secondary">Vars:</strong> {detectedVariables.join(', ')}
          </div>
        )}
      </div>
    </BaseNode>
  );
}
