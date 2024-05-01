import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import './Board.css';

function Board({ isErasing }) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const socketRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Helper function to get mouse position relative to canvas
  function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  // Setup canvas and WebSocket connection
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // This ensures the drawing buffer matches the displayed size.
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      const context = canvas.getContext('2d');
      context.lineCap = 'round';
      context.strokeStyle = 'black';
      context.lineWidth = 2;
      contextRef.current = context;

      socketRef.current = io.connect('/');
      socketRef.current.on('drawing', (data) => {
        const { x, y, type, isErasing: isErase } = data;
        context.globalCompositeOperation = isErase ? 'destination-out' : 'source-over';
        context.lineWidth = isErase ? 30 : 6;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x, y);
        context.stroke();
      });

      return () => {
        socketRef.current.disconnect();
      };
    }
  }, []);

  
  const startDrawing = ({ nativeEvent }) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    const { x, y } = getMousePos(canvas, nativeEvent);

    context.beginPath();
    context.moveTo(x, y);

    // Set the correct operation mode for drawing or erasing
    context.globalCompositeOperation = isErasing ? 'destination-out' : 'source-over';
    context.lineWidth = isErasing ? 30 : 6; 

    setIsDrawing(true);
    socketRef.current.emit('drawing', {
      x, y, type: 'begin', isErasing
    });
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = contextRef.current;
    const { x, y } = getMousePos(canvas, nativeEvent);

    context.lineTo(x, y);
    context.stroke();
    socketRef.current.emit('drawing', {
      x, y, type: 'draw', isErasing
    });
  };

  const endDrawing = () => {
    const context = contextRef.current;
    context.closePath();
    setIsDrawing(false);
    socketRef.current.emit('drawing', {
      type: 'end', isErasing
    });
  };

  return (
    <canvas
      ref={canvasRef}
      className="whiteboard-canvas"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={endDrawing}
      onMouseLeave={endDrawing}
    />
  );
}

export default Board;

