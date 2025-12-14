import { useState } from 'react';
import BaseNode from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const [transform, setTransform] = useState(data?.transform || 'uppercase');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      subtitle="Data Processing"
      inputs={[{ id: `${id}-input`, label: 'Input' }]}
      outputs={[{ id: `${id}-output`, label: 'Output' }]}
      headerColor="#9F7AEA"
      width={220}
    >
      <div className="node-field">
        <label>Transformation:</label>
        <select value={transform} onChange={(e) => setTransform(e.target.value)}>
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="trim">Trim Whitespace</option>
          <option value="reverse">Reverse</option>
          <option value="parse-json">Parse JSON</option>
          <option value="stringify">Stringify JSON</option>
          <option value="extract-numbers">Extract Numbers</option>
        </select>
      </div>
      <div style={{ fontSize: '12px', color: '#718096', marginTop: '8px' }}>
        Process and transform input data
      </div>
    </BaseNode>
  );
};