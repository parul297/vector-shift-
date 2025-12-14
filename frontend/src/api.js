const API_BASE_URL = 'http://localhost:8000';

/**
 * Send pipeline data to backend for parsing
 * @param {Object} pipelineData - The nodes and edges data
 * @returns {Promise<Object>} Response from backend
 */
const parsePipeline = async (pipelineData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/pipelines/parse`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pipelineData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error parsing pipeline:', error);
    throw error;
  }
};

/**
 * Test backend connection
 * @returns {Promise<boolean>} True if backend is reachable
 */
const testBackendConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    return false;
  }
};


export { parsePipeline, testBackendConnection };
