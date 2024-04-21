import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './Board.css';

function Board() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize the canvas and context refs
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 600;
    const context = canvas.getContext('2d');
    contextRef.current = context;
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    contextRef.current.lineJoin = 'round';
    contextRef.current.lineCap = 'round';

    // Initialize Socket.IO connection
    socketRef.current = io.connect('/'); // Connect to the server (adjust the URL as needed)

    // Event listener for drawing data from server
    socketRef.current.on('drawing', ({ x, y, type }) => {
      if (type === 'begin') {
        contextRef.current.beginPath();
        contextRef.current.moveTo(x, y);
      } else if (type === 'draw') {
        contextRef.current.lineTo(x, y);
        contextRef.current.stroke();
      }
    });

    // Cleanup on unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    // Emit drawing event to server
    socketRef.current.emit('drawing', { x: offsetX, y: offsetY, type: 'begin' });
  };

  const draw = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    // Emit drawing event to server
    socketRef.current.emit('drawing', { x: offsetX, y: offsetY, type: 'draw' });
  };

  const endDrawing = () => {
    contextRef.current.closePath();
  };

  return (
    <canvas
      ref={canvasRef}
      className="whiteboard-canvas"
      onMouseDown={startDrawing}
      onMouseUp={endDrawing}
      onMouseOut={endDrawing}
      onMouseMove={draw}
    />
  );
}

export default Board;
