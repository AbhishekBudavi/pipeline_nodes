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
      <div className="text-xs text-text-tertiary">
        System & Prompt inputs
      </div>
    </BaseNode>
  );
}
