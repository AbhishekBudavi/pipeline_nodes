// textNode.js
// Enhanced Text Node with dynamic resizing and variable detection

import { useState, useMemo } from 'react';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  // Extract variables from text using regex
  const extractVariables = (text) => {
    const regex = /\{\{(\w+)\}\}/g;
    const variables = [];
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      // Only add unique variables
      if (!variables.includes(match[1])) {
        variables.push(match[1]);
      }
    }
    
    return variables;
  };

  // Detect variables from current text
  const detectedVariables = useMemo(() => extractVariables(currText), [currText]);

  // Create input handles for each detected variable
  const inputHandles = detectedVariables.map(variable => `${id}-${variable}`);

  // Calculate height based on text length
  const calculateHeight = () => {
    const lineCount = currText.split('\n').length;
    // Base height (header + padding) + content height
    const minHeight = 110;
    const contentHeight = Math.max(40, lineCount * 18 + 20);
    return Math.max(minHeight, contentHeight + 50);
  };

  // Calculate width based on text length
  const calculateWidth = () => {
    const lines = currText.split('\n');
    const maxLineLength = Math.max(...lines.map(line => line.length));
    // Approximate character width at 12px font
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', height: '100%' }}>
        <textarea 
          value={currText} 
          onChange={handleTextChange}
          style={{
            width: '100%',
            flex: 1,
            padding: '6px',
            fontSize: '11px',
            border: '1px solid #2a3142',
            borderRadius: '3px',
            fontFamily: 'monospace',
            resize: 'none',
            backgroundColor: '#1f2530',
            color: '#d0d8e0',
            lineHeight: '1.4'
          }}
          placeholder="Enter text or variables"
        />
        
        {/* Display detected variables */}
        {detectedVariables.length > 0 && (
          <div style={{ 
            fontSize: '10px', 
            color: '#a0a8b4', 
            padding: '4px 6px',
            backgroundColor: '#252d3a',
            borderRadius: '3px',
            maxHeight: '40px',
            overflow: 'auto'
          }}>
            <strong style={{ color: '#b0b8c4' }}>Vars:</strong> {detectedVariables.join(', ')}
          </div>
        )}
      </div>
    </BaseNode>
  );
}
