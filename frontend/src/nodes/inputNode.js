import { useState } from 'react';
import BaseNode from './BaseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const [name, setName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [type, setType] = useState(data?.inputType || 'Text');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    updateNodeField(id, 'inputName', newName);
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setType(newType);
    updateNodeField(id, 'inputType', newType);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      subtitle="Data Entry"
      outputs={[{ id: `${id}-value` }]}
      headerColor="#4299E1"
    >
      <div className="node-field">
        <label>Name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={handleNameChange}
          placeholder="input_name"
        />
      </div>
      <div className="node-field">
        <label>Type:</label>
        <select value={type} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
          <option value="Number">Number</option>
          <option value="Boolean">Boolean</option>
        </select>
      </div>
    </BaseNode>
  );
};