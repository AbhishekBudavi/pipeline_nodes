// BaseNode.js
// A reusable base component for all node types
// Handles layout, styling, and handles management

import { Handle, Position } from 'reactflow';

export const BaseNode = ({ 
  id, 
  title, 
  children,
  inputs = [],    // Array of input handle IDs
  outputs = [],   // Array of output handle IDs
  width = 200,
  height = 120,
  nodeType = 'default'  // For styling purposes
}) => {
  
  // Calculate spacing for multiple handles
  const inputSpacing = inputs.length > 1 ? 100 / (inputs.length + 1) : 50;
  const outputSpacing = outputs.length > 1 ? 100 / (outputs.length + 1) : 50;

  return (
    <div style={styles.container(width, height)}>
      {/* Render input handles on the left */}
      {inputs.map((inputId, index) => (
        <Handle
          key={`input-${inputId}`}
          type="target"
          position={Position.Left}
          id={inputId}
          style={{
            ...styles.handle,
            top: `${(index + 1) * inputSpacing}%`,
            left: '-6px',
            zIndex: 100
          }}
        />
      ))}

      {/* Render output handles on the right */}
      {outputs.map((outputId, index) => (
        <Handle
          key={`output-${outputId}`}
          type="source"
          position={Position.Right}
          id={outputId}
          style={{
            ...styles.handle,
            top: `${(index + 1) * outputSpacing}%`,
            right: '-6px',
            zIndex: 100
          }}
        />
      ))}

      {/* Header with title */}
      <div style={styles.header}>
        <span style={styles.title}>{title}</span>
      </div>

      {/* Body content - where custom node UI goes */}
      <div style={styles.body}>
        {children}
      </div>
    </div>
  );
};

// Dark theme node styling
const styles = {
  container: (width, height) => ({
    width,
    height,
    border: '1.5px solid #3a4a63',
    borderRadius: '8px',
    backgroundColor: '#1a1f2e',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
    position: 'relative',
    overflow: 'visible',
    pointerEvents: 'auto',
    zIndex: 50
  }),
  handle: {
    position: 'absolute',
    transform: 'translateY(-50%)',
    width: '14px',
    height: '14px',
    backgroundColor: 'transparent',
    border: 'none',
    pointerEvents: 'auto'
  },
  header: {
    padding: '10px 12px',
    borderBottom: '1.5px solid #2a3542',
    background: 'linear-gradient(to bottom, #252d3a, #1f2530)',
    fontWeight: '700',
    fontSize: '13px',
    color: '#b0b8c4',
    textTransform: 'capitalize',
    letterSpacing: '0.3px',
    pointerEvents: 'auto'
  },
  title: {
    fontSize: '13px',
    color: '#d0d8e0',
    fontWeight: '700'
  },
  body: {
    flex: 1,
    padding: '10px 12px',
    overflow: 'auto',
    fontSize: '12px',
    color: '#a0a8b4',
    pointerEvents: 'auto'
  }
};
