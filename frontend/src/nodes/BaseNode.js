import { Handle, Position } from 'reactflow';

export const BaseNode = ({ 
  id, 
  title, 
  children,
  inputs = [],    
  outputs = [],   
  width = 200,
  height = 120,
  nodeType = 'default' 
}) => {
  
  const inputSpacing = inputs.length > 1 ? 100 / (inputs.length + 1) : 50;
  const outputSpacing = outputs.length > 1 ? 100 / (outputs.length + 1) : 50;

  return (
    <div 
      style={{ width, height }}
      className="border-2 border-[#3a4a63] rounded-lg bg-dark-card flex flex-col shadow-lg relative overflow-visible pointer-events-auto z-50"
    >
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

      <div className="px-3 py-2.5 border-b-2 border-[#2a3542] bg-gradient-to-b from-[#252d3a] to-[#1f2530] font-bold text-sm text-text-secondary capitalize tracking-wide pointer-events-auto">
        <span className="text-[#d0d8e0] font-bold">{title}</span>
      </div>

      
      <div className="flex-1 px-3 py-2.5 overflow-auto text-sm text-text-tertiary pointer-events-auto">
        {children}
      </div>
    </div>
  );
};

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
