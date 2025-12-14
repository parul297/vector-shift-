import { useState } from 'react';
import BaseNode from './BaseNode';

export const ConditionalNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'equals');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Conditional"
      subtitle="If/Else Logic"
      inputs={[
        { id: `${id}-input`, label: 'Input' },
        { id: `${id}-condition`, label: 'Condition' },
      ]}
      outputs={[
        { id: `${id}-true`, label: 'True', color: '#48BB78' },
        { id: `${id}-false`, label: 'False', color: '#F56565' },
      ]}
      headerColor="#4299E1"
      width={240}
    >
      <div className="node-field">
        <label>Condition Type:</label>
        <select value={condition} onChange={(e) => setCondition(e.target.value)}>
          <option value="equals">Equals (==)</option>
          <option value="not-equals">Not Equals (!=)</option>
          <option value="greater">Greater than (&gt;)</option>
          <option value="less">Less than (&lt;)</option>
          <option value="contains">Contains</option>
          <option value="empty">Is Empty</option>
        </select>
      </div>
      <div style={{ fontSize: '12px', color: '#718096', marginTop: '8px' }}>
        Routes data based on condition
      </div>
    </BaseNode>
  );
};