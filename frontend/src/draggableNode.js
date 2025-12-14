export const DraggableNode = ({ type, label, color = '#1C2536' }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragEnd = (event) => {
    event.target.style.cursor = 'grab';
  };

  return (
    <div
      className="draggable-node"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={onDragEnd}
      draggable
      style={{ 
        background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
        borderColor: color,
      }}
    >
      <div style={{
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '6px'
      }}>
        <span style={{ color: 'white', fontSize: '12px', fontWeight: '600' }}>
          {label.charAt(0)}
        </span>
      </div>
      <span className="draggable-node-label">{label}</span>
    </div>
  );
};