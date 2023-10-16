// src/App.js
import React from 'react';
import './App.css';
import NavBar from './component/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Home />
      
    </div>
  );
}

export default App;
