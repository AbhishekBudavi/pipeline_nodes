// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},  // Track node IDs by type
    getNodeID: (type) => {
        const currentIDs = get().nodeIDs || {};
        const newIDs = {...currentIDs};
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
      // Validate connection: source must be a source handle, target must be a target handle
      if (!connection.source || !connection.target || !connection.sourceHandle || !connection.targetHandle) {
        console.warn('Invalid connection: missing required fields', connection);
        return;
      }
      
      // Prevent self-connections
      if (connection.source === connection.target) {
        console.warn('Self-connections not allowed');
        return;
      }

      // Check for duplicate edges
      const edgeExists = get().edges.some(edge => 
        edge.source === connection.source && 
        edge.target === connection.target &&
        edge.sourceHandle === connection.sourceHandle &&
        edge.targetHandle === connection.targetHandle
      );

      if (edgeExists) {
        console.warn('Edge already exists');
        return;
      }

      set({
        edges: addEdge(
          {
            ...connection,
            type: 'smoothstep',
            animated: true,
            markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' }
          },
          get().edges
        ),
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
    deleteNode: (nodeId) => {
      // Delete the node
      const updatedNodes = get().nodes.filter(node => node.id !== nodeId);
      // Delete all edges connected to this node
      const updatedEdges = get().edges.filter(edge => 
        edge.source !== nodeId && edge.target !== nodeId
      );
      set({
        nodes: updatedNodes,
        edges: updatedEdges,
      });
    },
    deleteEdge: (edgeId) => {
      // Delete edge by ID
      set({
        edges: get().edges.filter(edge => edge.id !== edgeId),
      });
    },
  }));
