import { useState } from 'react';
import BaseNode from './BaseNode';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const [name, setName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [type, setType] = useState(data?.outputType || 'Text');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    updateNodeField(id, 'outputName', newName);
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setType(newType);
    updateNodeField(id, 'outputType', newType);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      subtitle="Result"
      inputs={[{ id: `${id}-value` }]}
      headerColor="#ED8936"
    >
      <div className="node-field">
        <label>Name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={handleNameChange}
          placeholder="output_name"
        />
      </div>
      <div className="node-field">
        <label>Type:</label>
        <select value={type} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
          <option value="Image">Image</option>
          <option value="JSON">JSON</option>
        </select>
      </div>
      <div style={{ fontSize: '12px', color: '#718096', marginTop: '8px' }}>
        Final output of the pipeline
      </div>
    </BaseNode>
  );
};