import React from 'react';
import './Toolbar.css'; 
import { Link } from 'react-router-dom';


function Toolbar({ isErasing, setIsErasing }) {
  return (
    <div className="toolbar">
      <button onClick={() => setIsErasing(false)}>Pen</button>
      <button onClick={() => setIsErasing(true)}>Eraser</button>
      <Link to="/login" className="toolbar-login">Login</Link>
    </div>
  );
}

export default Toolbar;
