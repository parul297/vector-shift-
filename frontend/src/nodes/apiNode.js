import { useState } from 'react';
import BaseNode from './BaseNode';

export const APINode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || 'https://api.example.com');
  const [headers, setHeaders] = useState(data?.headers || '{}');

  return (
    <BaseNode
      id={id}
      data={data}
      title="API"
      subtitle="HTTP Request"
      inputs={[
        { id: `${id}-params`, label: 'Params' },
        { id: `${id}-body`, label: 'Body' },
      ]}
      outputs={[
        { id: `${id}-response`, label: 'Response' },
        { id: `${id}-error`, label: 'Error', color: '#F56565' },
      ]}
      headerColor="#ED8936"
      width={260}
    >
      <div className="node-field">
        <label>Method:</label>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <div className="node-field">
        <label>URL:</label>
        <input 
          type="text" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/endpoint"
        />
      </div>
      <div className="node-field">
        <label>Headers (JSON):</label>
        <textarea
          value={headers}
          onChange={(e) => setHeaders(e.target.value)}
          rows={2}
          placeholder='{"Content-Type": "application/json"}'
        />
      </div>
    </BaseNode>
  );
};