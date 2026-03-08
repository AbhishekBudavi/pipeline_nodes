// submit.js
// Submits the pipeline to the backend for parsing and validation

import { useStore } from './store';
import { useState, useRef, useEffect } from 'react';
import { Send, Loader, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

export const SubmitButton = () => {
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges
    }));
   
    
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [response, setResponse] = useState(false);
    const responseRef = useRef(null);
    
    const handleResponseClose = () => {
        setResponse(false);
        setFeedback(null);
    };

    useEffect(() => {
        const handleClose = (e) => {
            if (responseRef.current && !responseRef.current.contains(e.target)) {
                handleResponseClose();
            }
        };
        
        if (response) {
            document.addEventListener('mousedown', handleClose);
        }
       
        return () => {
            document.removeEventListener('mousedown', handleClose);
        };
    }, [response]);
    const handleSubmit = async () => {
        // Validate that we have at least one node
        if (nodes.length === 0) {
            setFeedback({ type: 'error', message: 'Please add at least one node to the pipeline.' });
            setTimeout(() => setFeedback(null), 5000);
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
            setFeedback({
                type: result.is_dag ? 'success' : 'warning',
                title: 'Pipeline Analysis Complete',
                nodes: result.num_nodes,
                edges: result.num_edges,
                isDAG: result.is_dag
            });
            setResponse(true);
            setTimeout(() => setFeedback(null), 8000);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            setFeedback({ type: 'error', message: `Failed to submit pipeline: ${error.message}` });
            setTimeout(() => setFeedback(null), 5000);
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
                {isLoading ? (
                    <>
                        <Loader size={18} className="inline mr-2 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    <>
                        <Send size={18} className="inline mr-2" />
                        Submit Pipeline
                    </>
                )}
            </button>
            
            {feedback && response && (
                <div ref={responseRef} className={`feedback-message feedback-${feedback.type}`}>
                    <div className="feedback-content">
                        {feedback.type === 'success' && <CheckCircle size={20} className="feedback-icon" />}
                        {feedback.type === 'error' && <XCircle size={20} className="feedback-icon" />}
                        {feedback.type === 'warning' && <AlertCircle size={20} className="feedback-icon" />}
                        
                        <div className="feedback-text">
                            {feedback.title && <strong>{feedback.title}</strong>}
                            {feedback.message && <p>{feedback.message}</p>}
                            {feedback.nodes !== undefined && (
                                <div className="feedback-details">
                                    <p>Nodes: <span>{feedback.nodes}</span></p>
                                    <p>Connections: <span>{feedback.edges}</span></p>
                                    <p>Valid DAG: <span>{feedback.isDAG ? 'Yes' : 'No'}</span></p>
                                    {feedback.isDAG ? (
                                        <p className="success-msg">Pipeline is valid and ready to execute!</p>
                                    ) : (
                                        <p className="warning-msg">Warning: Pipeline contains cycles. Ensure data flows in one direction.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
