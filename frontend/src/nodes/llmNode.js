// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode 
      id={id}
      title="LLM"
      inputs={[`${id}-system`, `${id}-prompt`]}
      outputs={[`${id}-response`]}
      width={200}
      height={100}
    >
      <div style={{ fontSize: '11px', color: '#a0a8b4' }}>
        🤖 System & Prompt inputs
      </div>
    </BaseNode>
  );
}
