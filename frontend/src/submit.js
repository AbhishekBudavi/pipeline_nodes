// submit.js
// Submits the pipeline to the backend for parsing and validation

import { useStore } from './store';
import { useState } from 'react';

export const SubmitButton = () => {
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges
    }));
    
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        // Validate that we have at least one node
        if (nodes.length === 0) {
            alert('⚠️ Please add at least one node to the pipeline.');
            return;
        }

        setIsLoading(true);

        try {
            // Send pipeline data to backend
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nodes: nodes,
                    edges: edges
                })
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const result = await response.json();

            // Display user-friendly response
            const message = `
✓ Pipeline Analysis Complete

Nodes: ${result.num_nodes}
Connections: ${result.num_edges}
Valid DAG: ${result.is_dag ? '✓ Yes' : '✗ No'}

${result.is_dag 
    ? '✅ Your pipeline is valid and ready to execute!' 
    : '⚠️ Warning: Your pipeline contains cycles. Ensure data flows in one direction.'}
            `.trim();

            alert(message);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert(`❌ Error: Failed to submit pipeline.\n\n${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="submit-container">
            <button 
                className="submit-button" 
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
            >
                {isLoading ? 'Submitting...' : '🚀 Submit Pipeline'}
            </button>
        </div>
    );
}
