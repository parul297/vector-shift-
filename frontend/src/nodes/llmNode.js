import BaseNode from './BaseNode';
import { useState } from 'react';

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'gpt-4');
  const [temperature, setTemperature] = useState(data?.temperature || 0.7);

  const inputHandles = [
    { id: `${id}-system`, label: 'System' },
    { id: `${id}-prompt`, label: 'Prompt' },
    { id: `${id}-context`, label: 'Context' },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      subtitle="Language Model"
      inputs={inputHandles}
      outputs={[{ id: `${id}-response` }]}
      headerColor="#9F7AEA"
      width={240}
    >
      <div className="node-field">
        <label>Model:</label>
        <select value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="gpt-3.5">GPT-3.5</option>
          <option value="gpt-4">GPT-4</option>
          <option value="claude-3">Claude 3</option>
          <option value="llama-3">Llama 3</option>
        </select>
      </div>
      <div className="node-field">
        <label>Temperature: {temperature}</label>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.1"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
        />
      </div>
      <div style={{ fontSize: '12px', color: '#718096', marginTop: '8px' }}>
        Process text with AI models
      </div>
    </BaseNode>
  );
};