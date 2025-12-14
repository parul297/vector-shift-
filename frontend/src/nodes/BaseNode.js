import { Handle, Position } from 'reactflow';
import './BaseNode.css';

const BaseNode = ({
  id,
  data,
  title,
  subtitle,
  inputs = [],
  outputs = [],
  children,
  contentClassName = '',
  headerColor = '#4A5568',
  width = 200,
  minHeight = 80,
  onFieldChange
}) => {
  const handleInputChange = (fieldName, value) => {
    if (onFieldChange) {
      onFieldChange(fieldName, value);
    }
  };

  return (
    <div 
      className="base-node"
      style={{
        width: `${width}px`,
        minHeight: `${minHeight}px`,
      }}
    >
      {/* Node Header */}
      <div 
        className="node-header"
        style={{ backgroundColor: headerColor }}
      >
        <span className="node-title">{title}</span>
        {subtitle && <span className="node-subtitle">{subtitle}</span>}
      </div>

      {/* Input Handles - Left Side */}
      {inputs.map((input, index) => (
        <Handle
          key={`input-${input.id || index}`}
          type="target"
          position={Position.Left}
          id={input.id || `input-${index}`}
          style={{
            top: input.position || `${((index + 1) * 100) / (inputs.length + 1)}%`,
            background: input.color || '#3182CE',
            width: '12px',
            height: '12px',
          }}
        />
      ))}

      {/* Node Content */}
      <div className={`node-content ${contentClassName}`}>
        {children}
      </div>

      {/* Output Handles - Right Side */}
      {outputs.map((output, index) => (
        <Handle
          key={`output-${output.id || index}`}
          type="source"
          position={Position.Right}
          id={output.id || `output-${index}`}
          style={{
            top: output.position || `${((index + 1) * 100) / (outputs.length + 1)}%`,
            background: output.color || '#38A169',
            width: '12px',
            height: '12px',
          }}
        />
      ))}
    </div>
  );
};

export default BaseNode;