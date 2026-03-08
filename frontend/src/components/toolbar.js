// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="pipeline-toolbar">
            <h3>✨ Pipeline Nodes</h3>
            <div className="node-buttons">
                {/* Core nodes */}
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='customOutput' label='Output' />
                
                {/* Processing nodes */}
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='filter' label='Filter' />
                
                {/* Utility nodes */}
                <DraggableNode type='delay' label='Delay' />
                <DraggableNode type='logger' label='Logger' />
                <DraggableNode type='api' label='API Call' />
            </div>
        </div>
    );
};
