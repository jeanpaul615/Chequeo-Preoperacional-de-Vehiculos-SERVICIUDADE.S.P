import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Login from './components/LogIn/Login';
import MainDashboard from './components/Dashboard/MainDashboard';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/dashboard' element={<MainDashboard />} />
      </Routes>
    </Router>
  );
}
