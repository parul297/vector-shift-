import { useState } from 'react';
import BaseNode from './BaseNode';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');
  const [value, setValue] = useState(data?.value || 0);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Math"
      subtitle="Calculation"
      inputs={[
        { id: `${id}-a`, label: 'A' },
        { id: `${id}-b`, label: 'B' },
      ]}
      outputs={[{ id: `${id}-result` }]}
      headerColor="#F56565"
      width={220}
    >
      <div className="node-field">
        <label>Operation:</label>
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (-)</option>
          <option value="multiply">Multiply (×)</option>
          <option value="divide">Divide (÷)</option>
          <option value="power">Power (^)</option>
        </select>
      </div>
      <div className="node-field">
        <label>Constant Value:</label>
        <input 
          type="number" 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="0"
        />
      </div>
    </BaseNode>
  );
};