from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],  # Allows POST, GET, etc.
    allow_headers=["*"],
)

# Define request model matching your frontend data structure
class NodeData(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    # Add other fields as needed

class EdgeData(BaseModel):
    id: str
    source: str
    target: str
    # Add other fields as needed

class PipelineData(BaseModel):
    nodes: List[NodeData]
    edges: List[EdgeData]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.get('/health')
def health_check():
    return {'status': 'healthy'}

# CHANGE THIS: From GET to POST
@app.post('/pipelines/parse')  # CHANGED FROM @app.get
async def parse_pipeline(pipeline_data: PipelineData):
    try:
        # Log received data
        print(f"Received pipeline parse request")
        print(f"Nodes: {len(pipeline_data.nodes)}")
        print(f"Edges: {len(pipeline_data.edges)}")
        
        # Process the data
        node_count = len(pipeline_data.nodes)
        edge_count = len(pipeline_data.edges)
        
        # Return structured response
        return {
            'status': 'success',
            'message': f'Pipeline parsed with {node_count} nodes and {edge_count} edges',
            'data': {
                'nodes': [node.dict() for node in pipeline_data.nodes],
                'edges': [edge.dict() for edge in pipeline_data.edges]
            },
            'validation': {
                'has_input': any(node.type == 'input' for node in pipeline_data.nodes),
                'has_output': any(node.type == 'output' for node in pipeline_data.nodes),
                'is_connected': edge_count > 0
            }
        }
        
    except Exception as e:
        print(f"Error parsing pipeline: {e}")
        raise HTTPException(status_code=400, detail=str(e))

# Optional: Keep the GET version for testing
@app.get('/pipelines/parse')
def parse_pipeline_get(pipeline: str = "test"):
    return {
        'status': 'parsed',
        'pipeline': pipeline,
        'note': 'This is GET endpoint for testing'
    }