from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict
    data: Dict

class Edge(BaseModel):
    id: str
    source: str
    target: str

class PipelineData(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

def detect_cycle(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Detect if the graph has a cycle using DFS.
    Returns True if a cycle exists (not a DAG), False if it's a DAG.
    """
    if not nodes or not edges:
        return False
    
    # Build adjacency list
    graph = {node.id: [] for node in nodes}
    for edge in edges:
        if edge.source in graph:
            graph[edge.source].append(edge.target)
    
    # States: 0 = unvisited, 1 = visiting, 2 = visited
    state = {node.id: 0 for node in nodes}
    
    def has_cycle_dfs(node_id: str) -> bool:
        state[node_id] = 1  # Mark as visiting
        
        # Check all neighbors
        for neighbor in graph.get(node_id, []):
            if state.get(neighbor, 0) == 1:
                # Back edge found - cycle detected
                return True
            if state.get(neighbor, 0) == 0:
                # Unvisited neighbor - explore it
                if has_cycle_dfs(neighbor):
                    return True
        
        state[node_id] = 2  # Mark as visited
        return False
    
    # Check for cycle starting from each unvisited node
    for node in nodes:
        if state[node.id] == 0:
            if has_cycle_dfs(node.id):
                return True  # Cycle found
    
    return False  # No cycle found - it's a DAG

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(data: PipelineData):
    """
    Parse the pipeline and return:
    - num_nodes: total number of nodes
    - num_edges: total number of edges
    - is_dag: whether the graph forms a Directed Acyclic Graph (no cycles)
    """
    nodes = data.nodes
    edges = data.edges
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # Detect if the graph is a DAG (has no cycles)
    has_cycle = detect_cycle(nodes, edges)
    is_dag = not has_cycle
    
    return PipelineResponse(
        num_nodes=num_nodes,
        num_edges=num_edges,
        is_dag=is_dag
    )
