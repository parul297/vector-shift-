import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  const nodeTypes = [
    { type: 'customInput', label: 'Input', color: '#4299E1' },
    { type: 'llm', label: 'LLM', color: '#9F7AEA' },
    { type: 'customOutput', label: 'Output', color: '#ED8936' },
    { type: 'text', label: 'Text', color: '#38A169' },
    { type: 'math', label: 'Math', color: '#F56565' },
    { type: 'conditional', label: 'Conditional', color: '#4299E1' },
    { type: 'api', label: 'API', color: '#ED8936' },
    { type: 'transform', label: 'Transform', color: '#9F7AEA' },
    { type: 'display', label: 'Display', color: '#38B2AC' },
  ];

  return (
    <div className="toolbar-container">
      <h3 className="toolbar-title">Nodes</h3>
      <p className="toolbar-subtitle">Drag and drop onto canvas</p>
      <div className="toolbar-grid">
        {nodeTypes.map((node) => (
          <DraggableNode 
            key={node.type}
            type={node.type} 
            label={node.label}
            color={node.color}
          />
        ))}
      </div>
    </div>
  );
};