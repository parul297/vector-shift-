import { useEffect } from 'react';
import './AlertModal.css';

const AlertModal = ({ isOpen, onClose, title, message, data }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="modal-content">
          <p className="modal-message">{message}</p>
          
          {data && (
            <div className="modal-data">
              <div className="data-grid">
                <div className="data-item">
                  <span className="data-label">Nodes</span>
                  <span className="data-value">{data.num_nodes}</span>
                </div>
                <div className="data-item">
                  <span className="data-label">Edges</span>
                  <span className="data-value">{data.num_edges}</span>
                </div>
                <div className="data-item">
                  <span className="data-label">Is DAG</span>
                  <span className={`data-value ${data.is_dag ? 'dag-true' : 'dag-false'}`}>
                    {data.is_dag ? 'Yes ✓' : 'No ✗'}
                  </span>
                </div>
              </div>
              
              {data.is_dag ? (
                <div className="dag-status dag-valid">
                  <div className="dag-icon">✓</div>
                  <div>
                    <strong>Valid Pipeline</strong>
                    <p>Your pipeline is a valid Directed Acyclic Graph (DAG). It can be executed without cycles.</p>
                  </div>
                </div>
              ) : (
                <div className="dag-status dag-invalid">
                  <div className="dag-icon">✗</div>
                  <div>
                    <strong>Pipeline Contains Cycles</strong>
                    <p>Your pipeline is not a DAG. Cycles detected. Please check connections between nodes.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <button className="modal-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;