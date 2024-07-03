import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Login from './components/LogIn/Login';
import MainDashboard from './components/Dashboard/MainDashboard';
import InspectionForm from './components/Inspection/Main/InspectionForm';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/dashboard' element={<MainDashboard />} />
        <Route exact path='/inspection' element={<InspectionForm />} />
      </Routes>
    </Router>
  );
}
