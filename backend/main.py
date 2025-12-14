from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request models
class NodeData(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Optional[Dict[str, Any]] = None

class EdgeData(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None

class PipelineData(BaseModel):
    nodes: List[NodeData]
    edges: List[EdgeData]

def detect_cycles(nodes: List[NodeData], edges: List[EdgeData]) -> bool:
    """
    Detect cycles in the pipeline using DFS.
    Returns True if cycle exists, False otherwise.
    """
    # Build adjacency list
    adjacency_list = {node.id: [] for node in nodes}
    
    for edge in edges:
        if edge.source in adjacency_list:
            adjacency_list[edge.source].append(edge.target)
    
    # Track visited nodes and recursion stack
    visited = set()
    recursion_stack = set()
    
    def has_cycle_dfs(node_id: str) -> bool:
        """DFS helper to detect cycles"""
        visited.add(node_id)
        recursion_stack.add(node_id)
        
        # Check all neighbors
        for neighbor in adjacency_list.get(node_id, []):
            if neighbor not in visited:
                if has_cycle_dfs(neighbor):
                    return True
            elif neighbor in recursion_stack:
                # Back edge found - cycle detected!
                return True
        
        recursion_stack.remove(node_id)
        return False
    
    # Check all nodes (handles disconnected components)
    for node in nodes:
        if node.id not in visited:
            if has_cycle_dfs(node.id):
                return True
    
    return False

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.get('/health')
def health_check():
    return {'status': 'healthy'}

@app.post('/pipelines/parse')
async def parse_pipeline(pipeline_data: PipelineData):
    try:
        print("="*50)
        print("Received pipeline parse request")
        print(f"Nodes: {len(pipeline_data.nodes)}")
        print(f"Edges: {len(pipeline_data.edges)}")
        
        # Print node details
        for node in pipeline_data.nodes:
            print(f"  Node: {node.id} (type: {node.type})")
        
        # Print edge details
        for edge in pipeline_data.edges:
            print(f"  Edge: {edge.source} -> {edge.target}")
        
        node_count = len(pipeline_data.nodes)
        edge_count = len(pipeline_data.edges)
        
        # Check for cycles
        has_cycle = detect_cycles(pipeline_data.nodes, pipeline_data.edges)
        is_dag = not has_cycle
        
        print(f"Cycle detection result: {'CYCLE FOUND' if has_cycle else 'NO CYCLES (Valid DAG)'}")
        print("="*50)
        
        # Build response
        response = {
            'num_nodes': node_count,
            'num_edges': edge_count,
            'is_dag': is_dag
        }
        
        if has_cycle:
            response['message'] = 'Pipeline contains cycles'
            response['error'] = 'Your pipeline is not a DAG. Cycles detected. Please check connections between nodes.'
        else:
            response['message'] = 'Pipeline is valid'
        
        return response
        
    except Exception as e:
        print(f"Error parsing pipeline: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=400, detail=str(e))

@app.get('/pipelines/parse')
def parse_pipeline_get():
    return {
        'status': 'info',
        'message': 'Please use POST method to submit pipeline data',
        'note': 'This is GET endpoint for testing only'
    }