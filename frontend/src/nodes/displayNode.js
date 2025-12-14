import BaseNode from './BaseNode';
import { useState } from 'react';

export const DisplayNode = ({ id, data }) => {
  const [displayType, setDisplayType] = useState(data?.displayType || 'text');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Display"
      subtitle="Visual Output"
      inputs={[{ id: `${id}-input`, label: 'Input' }]}
      headerColor="#38B2AC"
      width={200}
    >
      <div className="node-field">
        <label>Display As:</label>
        <select value={displayType} onChange={(e) => setDisplayType(e.target.value)}>
          <option value="text">Text</option>
          <option value="json">JSON Viewer</option>
          <option value="table">Table</option>
          <option value="chart">Chart</option>
          <option value="markdown">Markdown</option>
        </select>
      </div>
      <div className="node-field">
        <label>Preview:</label>
        <div style={{
          backgroundColor: '#F7FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: '4px',
          padding: '8px',
          fontSize: '12px',
          minHeight: '40px',
          color: '#4A5568',
        }}>
          {data?.preview || 'No data yet'}
        </div>
      </div>
    </BaseNode>
  );
};