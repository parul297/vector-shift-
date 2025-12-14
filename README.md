markdown
# Pipeline Builder

A visual tool for creating and analyzing computational pipelines, built with React and Python/FastAPI.

## ✨ Features
- **9+ Node Types**: Drag-and-drop Input, LLM, Text, Math, API, and more.
- **Smart Text Nodes**: Auto-resize and detect `{{variables}}` to create dynamic inputs.
- **Pipeline Analysis**: Backend validates structure and checks for cycles (DAG).
- **Clean UI**: Consistent, professional styling with smooth interactions.

## 🚀 Quick Start

### 1. Start the Backend
```bash
cd backend
pip install -r requirements.txt  # Installs FastAPI, NetworkX
python -m uvicorn main:app --reload
Backend runs at http://localhost:8000

2. Start the Frontend
bash
cd frontend
npm install
npm start
Frontend runs at http://localhost:3000

🏗️ Project Structure
text
frontend/src/nodes/
├── BaseNode.js      # Core abstraction (all nodes extend this)
├── textNode.js      # Auto-resizing + variable detection
├── inputNode.js     # Input node
├── llmNode.js       # LLM node
├── outputNode.js    # Output node
└── ...5 more nodes # Math, Conditional, API, Transform, Display

backend/
├── main.py          # FastAPI server with DAG validation
└── requirements.txt # Python dependencies
🔧 Key Implementation
Node Abstraction
The BaseNode component centralizes:

Container structure and styling

Input/output handle management

Consistent props interface

Backend Integration
Endpoint: POST /pipelines/parse

Analysis: Counts nodes/edges, detects cycles using NetworkX

Response: {num_nodes, num_edges, is_dag}

Enhanced Text Node
Expands/shrinks as you type

{{user_input}} creates labeled input ports

Real-time parsing and validation

📋 Assessment Requirements
✅ Part 1: Created BaseNode abstraction + 5 new node types
✅ Part 2: Unified, professional styling system
✅ Part 3: Text node auto-resizing and variable handles
✅ Part 4: Full-stack integration with DAG validation

🎯 Usage Example
Drag nodes from the toolbar onto the canvas

Connect them by dragging between handles

In a Text node, type {{prompt}} to create an input port

Click Submit Pipeline to analyze structure

View results: node/edge counts and DAG status

🤝 Notes
State managed with existing Zustand setup

Backend built with FastAPI 

Focus on maintainable architecture and clean code

