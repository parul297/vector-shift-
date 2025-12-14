import { useState } from 'react';
import { useStore } from './store';
import { parsePipeline } from './api';
import AlertModal from './Components/AlertModal';
import './index.css';

export const SubmitButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [alertData, setAlertData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    if (nodes.length === 0) {
      setAlertData({
        title: 'Empty Pipeline',
        message: 'Please add at least one node to the pipeline before submitting.',
        data: null
      });
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const pipelineData = {
        nodes: nodes.map(node => ({
          id: node.id,
          type: node.type,
          position: node.position,
          data: node.data
        })),
        edges: edges.map(edge => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          sourceHandle: edge.sourceHandle,
          targetHandle: edge.targetHandle
        }))
      };

      const result = await parsePipeline(pipelineData);
      
      setAlertData({
        title: 'Pipeline Analysis',
        message: 'Your pipeline has been analyzed. Here are the results:',
        data: result
      });
      setIsModalOpen(true);
      
    } catch (err) {
      console.error('Submit error:', err);
      setError(err.message);
      
      setAlertData({
        title: 'Error',
        message: `Failed to analyze pipeline: ${err.message}. Make sure the backend is running on http://localhost:8000`,
        data: null
      });
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="submit-container">
        <button 
          className={`submit-button ${isLoading ? 'loading' : ''}`}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Analyzing...
            </>
          ) : (
            'Submit Pipeline'
          )}
        </button>
        
        {error && (
          <div className="error-message">
            Error: {error}
          </div>
        )}
        
        <div className="pipeline-stats">
          <span>Nodes: {nodes.length}</span>
          <span>Edges: {edges.length}</span>
        </div>
      </div>
      
      <AlertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={alertData?.title || 'Pipeline Analysis'}
        message={alertData?.message || ''}
        data={alertData?.data}
      />
    </>
  );
};