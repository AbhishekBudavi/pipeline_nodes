import { Lightbulb, Trash2 } from 'lucide-react';

export const HelpBar = () => {
  return (
    <div className="help-bar">
      <div className="help-content">
        <Lightbulb size={14} className="help-icon" />
        <span className="help-text">
          <strong>Tip:</strong> Select a node/edge and press 
          <span className="help-key"> <Trash2 size={14} className="inline" /> Delete</span> or 
          <span className="help-key">Backspace</span> to remove it
        </span>
      </div>
    </div>
  );
};
