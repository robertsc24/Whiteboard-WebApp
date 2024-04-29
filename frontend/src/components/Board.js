import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './Board.css';

function Board({ isErasing }) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 800; // or 'window.innerWidth' for full width
    canvas.height = 600; // or 'window.innerHeight' for full height
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    const context = canvas.getContext('2d');
    context.scale(1, 1);
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    contextRef.current = context;

    socketRef.current = io.connect('/');

    socketRef.current.on('drawing', (data) => {
      const { x, y, type, isErasing: isErase } = data;
      context.globalCompositeOperation = isErase ? 'destination-out' : 'source-over';
      context.lineWidth = isErase ? 10 : 2;
      if (type === 'begin') {
        context.beginPath();
        context.moveTo(x, y);
      } else if (type === 'draw') {
        context.lineTo(x, y);
        context.stroke();
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    socketRef.current.emit('begin', {
      x: offsetX,
      y: offsetY,
      type: 'draw',
      isErasing: isErasing,
    });
  };

  const draw = ({ nativeEvent }) => {
    if (!contextRef.current) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    socketRef.current.emit('drawing', {
      x: offsetX,
      y: offsetY,
      type: 'draw',
      isErasing: isErasing,
    });
  };

  const endDrawing = () => {
    contextRef.current.closePath();
    // Emit an event to end the drawing
    socketRef.current.emit('drawing', {
      type: 'end',
      isErasing,
    });
  };

  // Adjust the context when isErasing changes
  useEffect(() => {
    if (contextRef.current) {
      // In your draw and startDrawing functions
      contextRef.current.globalCompositeOperation = isErasing ? 'destination-out' : 'source-over';
      contextRef.current.strokeStyle = isErasing ? 'rgba(0,0,0,1)' : 'black'; 
    }
  }, [isErasing]);

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

