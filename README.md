# Visual Pipeline Builder - Assessment Solution

A modern, dark-themed visual pipeline builder built with React (frontend) and FastAPI (backend).

## ✨ Features Implemented

### Part 1: Node Abstraction ✅
- **BaseNode Component**: Reusable foundation for all node types
  - Flexible input/output handle positioning
  - Dynamic header with title
  - Body area for custom content
  - Automatic handle spacing
  
- **9 Node Types** (4 existing + 5 new):
  - **InputNode**: Configure input data types
  - **OutputNode**: Configure output data types
  - **TextNode**: With dynamic resizing and variable detection
  - **LLMNode**: AI model with system/prompt inputs
  - **MathNode**: Arithmetic operations (Add, Subtract, Multiply, Divide)
  - **FilterNode**: Data filtering with conditions
  - **DelayNode**: Introduce timing delays
  - **LoggerNode**: Debug logging with level control
  - **ApiNode**: HTTP method selection

### Part 2: Dark Theme with LangFlow-Style UI ✅
- Professional dark theme (#0f1419 background)
- Clean node editor with consistent styling
- Smooth connection handles with visual feedback
- Polished controls and buttons
- Modern gradients and shadows
- Dark scrollbars and form elements

### Part 3: Text Node with Advanced Features ✅
- **Dynamic Resizing**: Height and width expand with content
- **Variable Detection**: Regex pattern `{{variableName}}`
- **Auto-Generated Handles**: One input per detected variable
- Example: `"Hello {{name}}, order {{orderId}}"` → Creates 2 input handles

### Part 4: Backend Integration ✅
- **DAG Detection Algorithm**: Uses DFS to detect cycles in the pipeline
- **CORS Enabled**: Frontend can communicate with backend
- **Pipeline Validation**: Returns node count, edge count, and DAG validity

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ (for React frontend)
- Python 3.9+ (for FastAPI backend)

### Installation & Setup

#### 1. Backend Setup
```bash
cd backend
pip install -r requirements.txt
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
```

### Running the Application

#### Terminal 1: Start Backend
```bash
cd backend
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Expected output:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

#### Terminal 2: Start Frontend
```bash
cd frontend
npm start
```

The app will open at `http://localhost:3000`

## 📝 How to Use

### Creating a Pipeline

1. **Drag Nodes**: Click and drag node types from the toolbar onto the canvas
2. **Connect Nodes**: Click on an output handle (orange dots on right) and drag to input handle (green dots on left)
3. **Configure Nodes**:
   - **Input/Output**: Set name and data type
   - **Text**: Type text with `{{variable}}` syntax to auto-create inputs
   - **Math**: Select operation (Add, Subtract, etc.)
   - **Filter**: Enter condition expression
   - **Logger**: Choose log level
   - **API**: Select HTTP method
   - **Delay**: Set delay in milliseconds

4. **Submit Pipeline**: Click "Submit Pipeline" button to:
   - Send to backend for analysis
   - Get node count, edge count, and DAG validation
   - See if pipeline contains cycles

### Example: Simple Text Processing Pipeline

```
Input → Text (with {{input}} variable) → Output
```

1. Drag an **Input** node onto canvas
2. Drag a **Text** node onto canvas
3. Type in text field: `Processing: {{input}}`
   - Automatically creates 1 input handle for "input"
4. Drag an **Output** node onto canvas
5. Connect:
   - Input output → Text input (the "input" handle)
   - Text output → Output input
6. Click "Submit Pipeline"
7. See result: "3 nodes, 2 edges, Valid DAG: ✓"

## 🔧 API Endpoints

### GET `/`
Health check endpoint
```
Response: {"Ping": "Pong"}
```

### POST `/pipelines/parse`
Submit pipeline for analysis

**Request Body:**
```json
{
  "nodes": [
    {"id": "...", "type": "...", "position": {...}, "data": {...}},
    ...
  ],
  "edges": [
    {"id": "...", "source": "...", "target": "..."},
    ...
  ]
}
```

**Response:**
```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

## 🧠 Architecture

### Frontend Structure
```
frontend/src/
├── App.js              # Main app component
├── index.css           # Dark theme styling
├── toolbar.js          # Node palette
├── ui.js              # ReactFlow canvas
├── submit.js          # Submit button & API call
├── store.js           # Zustand state management
└── nodes/
    ├── BaseNode.js    # Reusable base component
    ├── inputNode.js
    ├── outputNode.js
    ├── textNode.js    # With variable detection
    ├── llmNode.js
    ├── mathNode.js
    ├── filterNode.js
    ├── delayNode.js
    ├── loggerNode.js
    └── apiNode.js
```

### Backend Structure
```
backend/
├── main.py            # FastAPI app with DAG detection
└── requirements.txt   # Python dependencies
```

## 🔍 Testing the Connection

### Manual Backend Test
```bash
# Test health check
curl http://localhost:8000/

# Test pipeline parsing
curl -X POST http://localhost:8000/pipelines/parse \
  -H "Content-Type: application/json" \
  -d '{"nodes":[{"id":"1","type":"input","position":{},"data":{}}],"edges":[]}'
```

### Frontend Console
Open browser DevTools (F12) and check:
1. Under "Network" tab: POST requests to `/pipelines/parse` should show `200 OK`
2. Check for any CORS errors
3. Pipeline submission should show JavaScript alerts with validation results

## 🐛 Troubleshooting

### Issue: "Nodes disappearing when connecting"
- ✅ **Fixed**: Added `pointerEvents: 'auto'` to BaseNode container
- ✅ **Fixed**: Proper z-index and positioning for handles

### Issue: "Handles not connecting"
- ✅ **Fixed**: Input handles positioned correctly on LEFT
- ✅ **Fixed**: Output handles positioned correctly on RIGHT
- ✅ **Fixed**: Proper handle IDs matching node IDs

### Issue: "Backend connection fails"
- Check backend is running on `http://127.0.0.1:8000`
- Verify CORS is enabled (it is in the code)
- Check browser console for specific error messages
- Ensure firewall isn't blocking port 8000

### Issue: "Frontend shows blank"
- Clear browser cache: Ctrl+Shift+Del
- Check browser console for React errors
- Ensure npm dependencies are installed: `npm install`
- Try: `npm start` in frontend directory

### Issue: "Port 3000 already in use"
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

## 📚 Code Quality

- **Simple & Clean**: No over-engineering or complex abstractions
- **Well-Commented**: Key logic explained with short comments
- **Beginner-Friendly**: Easy to understand and extend
- **Type-Safe**: Python Pydantic models for API validation
- **Reusable**: BaseNode abstraction prevents code duplication

## 🎨 Dark Theme Colors

- Background: `#0f1419`
- Nodes: `#1a1f2e`
- Borders: `#2a3142`
- Handles (Input): `#50d890` (green)
- Handles (Output): `#ff9f53` (orange)
- Text: `#e0e0e0`
- Accent: `#6fa3ff` (blue)

## 📖 Key Technologies

### Frontend
- React 18.2
- ReactFlow 11.8
- Zustand (state management)
- CSS3 (dark theme)

### Backend
- FastAPI 0.135
- Uvicorn 0.41
- Pydantic 2.12.5
- Python 3.9+

## ✅ Assessment Checklist

- [x] Part 1: Node Abstraction with BaseNode component
- [x] Create 5 additional node types (Math, Filter, Delay, Logger, API)
- [x] Part 2: Dark theme UI with LangFlow-style design
- [x] Part 3: TextNode with dynamic resizing and variable detection
- [x] Part 4: Backend DAG detection algorithm
- [x] Part 4: Frontend API integration with submit button
- [x] Part 4: Pipeline validation response display
- [x] Fix node connection stability issues
- [x] Proper input/output handle positioning
- [x] Clean, simple, beginner-friendly code

## 🤝 Support

For issues or questions, check:
1. Browser console for JavaScript errors
2. Backend terminal for Python errors
3. Network tab in DevTools for API responses
4. A detailed error message will guide you to the solution

---

**Happy Pipeline Building! 🚀**
