import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Table from './pages/table';
import './styles/home.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </Router>
  );
}

export default App;