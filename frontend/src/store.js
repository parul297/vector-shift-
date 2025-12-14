// store.js 

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
} from 'reactflow';

// Helper function to detect cycles using DFS
const wouldCreateCycle = (edges, newEdge) => {
    // Create adjacency list from existing edges plus the new edge
    const adjacencyList = {};
    const allEdges = [...edges, newEdge];
    
    allEdges.forEach(edge => {
        if (!adjacencyList[edge.source]) {
            adjacencyList[edge.source] = [];
        }
        adjacencyList[edge.source].push(edge.target);
    });
    
    // DFS to detect cycle
    const visited = new Set();
    const recursionStack = new Set();
    
    const hasCycle = (node) => {
        visited.add(node);
        recursionStack.add(node);
        
        const neighbors = adjacencyList[node] || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                if (hasCycle(neighbor)) {
                    return true;
                }
            } else if (recursionStack.has(neighbor)) {
                // Found a back edge - cycle detected
                return true;
            }
        }
        
        recursionStack.delete(node);
        return false;
    };
    
    // Check all nodes
    const allNodes = new Set([...Object.keys(adjacencyList)]);
    for (const node of allNodes) {
        if (!visited.has(node)) {
            if (hasCycle(node)) {
                return true;
            }
        }
    }
    
    return false;
};

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    
    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    
    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    
    onConnect: (connection) => {
        const currentEdges = get().edges;
        
        // Create the new edge object
        const newEdge = {
            ...connection,
            type: 'smoothstep',
            animated: true,
            markerEnd: {
                type: MarkerType.Arrow,
                height: '20px',
                width: '20px'
            }
        };
        
        // Check if this connection would create a cycle
        if (wouldCreateCycle(currentEdges, newEdge)) {
            console.warn('Connection rejected: Would create a cycle');
            alert('Cannot create this connection: It would create a cycle in the pipeline. Pipelines must be Directed Acyclic Graphs (DAGs).');
            return;
        }
        
        // Check for duplicate edges
        const isDuplicate = currentEdges.some(edge => 
            edge.source === connection.source && 
            edge.target === connection.target &&
            edge.sourceHandle === connection.sourceHandle &&
            edge.targetHandle === connection.targetHandle
        );
        
        if (isDuplicate) {
            console.warn('Connection rejected: Duplicate edge');
            return;
        }
        
        // If no cycle would be created, add the edge
        set({
            edges: addEdge(newEdge, currentEdges),
        });
    },
    
    updateNodeField: (nodeId, fieldName, fieldValue) => {
        set({
            nodes: get().nodes.map((node) => {
                if (node.id === nodeId) {
                    node.data = { ...node.data, [fieldName]: fieldValue };
                }
                return node;
            }),
        });
    },
    
    // Helper method to validate the entire pipeline
    validatePipeline: () => {
        const edges = get().edges;
        const nodes = get().nodes;
        
        if (nodes.length === 0) {
            return { isValid: false, error: 'Pipeline is empty' };
        }
        
        const adjacencyList = {};
        edges.forEach(edge => {
            if (!adjacencyList[edge.source]) {
                adjacencyList[edge.source] = [];
            }
            adjacencyList[edge.source].push(edge.target);
        });
        
        const visited = new Set();
        const recursionStack = new Set();
        
        const hasCycle = (node) => {
            visited.add(node);
            recursionStack.add(node);
            
            const neighbors = adjacencyList[node] || [];
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    if (hasCycle(neighbor)) {
                        return true;
                    }
                } else if (recursionStack.has(neighbor)) {
                    return true;
                }
            }
            
            recursionStack.delete(node);
            return false;
        };
        
        for (const node of nodes) {
            if (!visited.has(node.id)) {
                if (hasCycle(node.id)) {
                    return { isValid: false, error: 'Pipeline contains cycles' };
                }
            }
        }
        
        return { isValid: true };
    },
}));