import { useState, useEffect, useRef } from 'react';
import BaseNode from './BaseNode';
import { useStore } from '../store';
import { extractVariables } from '../utils/variableParser';

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  const updateNodeField = useStore((state) => state.updateNodeField);
  
  // Calculate node dimensions based on text
  const calculateDimensions = () => {
    if (!textareaRef.current) return { width: 200, height: 80 };
    
    const lines = text.split('\n').length;
    const maxLineLength = Math.max(...text.split('\n').map(line => line.length), 20);
    
    // Calculate width (minimum 200px, maximum 400px)
    const width = Math.max(200, Math.min(400, maxLineLength * 8));
    
    // Calculate height (minimum 80px, based on lines)
    const height = Math.max(80, lines * 24 + 40);
    
    return { width, height };
  };
  
  // Update variables when text changes
  useEffect(() => {
    const newVariables = extractVariables(text);
    setVariables(newVariables);
    
    // Update store with current variables
    updateNodeField(id, 'variables', newVariables);
    updateNodeField(id, 'text', text);
    
    // Update node dimensions in store if needed
    const { width, height } = calculateDimensions();
    updateNodeField(id, 'width', width);
    updateNodeField(id, 'height', height);
  }, [text, id, updateNodeField]);
  
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
  };
  
  const handleTextareaResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };
  
  // Auto-resize textarea on mount and updates
  useEffect(() => {
    handleTextareaResize();
  }, [text]);
  
  // Create input handles based on variables
  const inputHandles = variables.map((variable, index) => ({
    id: `${id}-${variable}`,
    position: `${((index + 1) * 100) / (variables.length + 1)}%`,
    label: variable,
    style: { background: '#4299E1' }
  }));
  
  const { width, height } = calculateDimensions();
  
  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      subtitle={variables.length > 0 ? `${variables.length} variable(s)` : 'Plain Text'}
      inputs={inputHandles}
      outputs={[{ id: `${id}-output` }]}
      headerColor="#38A169"
      width={width}
      minHeight={height}
      onFieldChange={(field, value) => {
        if (field === 'text') {
          setText(value);
        }
      }}
    >
      <div className="node-field">
        <label>Text Content:</label>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          onInput={handleTextareaResize}
          placeholder="Enter text... Use {{variable_name}} for inputs"
          style={{
            width: '100%',
            minHeight: '60px',
            maxHeight: '200px',
            fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
            fontSize: '13px',
            lineHeight: '1.4',
            border: '1px solid #CBD5E0',
            borderRadius: '6px',
            padding: '8px',
            resize: 'vertical',
            transition: 'border-color 0.2s',
          }}
          className="text-node-input"
        />
        
        {/* Variable indicator */}
        {variables.length > 0 && (
          <div style={{
            marginTop: '8px',
            padding: '6px 10px',
            backgroundColor: '#EBF8FF',
            border: '1px solid #BEE3F8',
            borderRadius: '4px',
            fontSize: '12px',
            color: '#2C5282',
          }}>
            <strong>Variables detected:</strong>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginTop: '4px'
            }}>
              {variables.map((variable, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: '#4299E1',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '500',
                  }}
                >
                  {variable}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Text stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '8px',
          fontSize: '11px',
          color: '#718096',
        }}>
          <span>Characters: {text.length}</span>
          <span>Lines: {text.split('\n').length}</span>
          <span>Variables: {variables.length}</span>
        </div>
      </div>
    </BaseNode>
  );
};