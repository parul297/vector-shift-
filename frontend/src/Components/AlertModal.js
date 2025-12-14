// AlertModal.js - 

import React from 'react';
import './AlertModal.css';

const AlertModal = ({ isOpen, onClose, title, message, data }) => {
  if (!isOpen) return null;

  // Check if this is an error response
  const isError = data && (data.error || !data.is_dag);
  const isSuccess = data && data.is_dag;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <p className="modal-message">{message}</p>
          
          {data && (
            <div className="analysis-results">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-label">NODES</div>
                  <div className="stat-value">{data.num_nodes || 0}</div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-label">EDGES</div>
                  <div className="stat-value">{data.num_edges || 0}</div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-label">IS DAG</div>
                  <div className={`stat-value ${isSuccess ? 'success' : 'error'}`}>
                    {data.is_dag ? '✓ Yes' : '✗ No'}
                  </div>
                </div>
              </div>
              
              {isError && (
                <div className="error-box">
                  <div className="error-icon">✗</div>
                  <div className="error-content">
                    <h3>Pipeline Contains Cycles</h3>
                    <p>{data.error || data.message || 'Your pipeline is not a DAG. Cycles detected. Please check connections between nodes.'}</p>
                  </div>
                </div>
              )}
              
              {isSuccess && (
                <div className="success-box">
                  <div className="success-icon">✓</div>
                  <div className="success-content">
                    <h3>Valid Pipeline</h3>
                    <p>Your pipeline is a valid DAG with no cycles detected!</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <button className="modal-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;