import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './component/Navbar';
import Home from './pages/Home';
import Visualization from './pages/Visualization'; 
import Script from './pages/Script'
import Peoples from './pages/Peoples';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visualization" element={<Visualization />} />
          <Route path="/script" element={<Script />} />
          <Route path="/people" element={<Peoples />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

