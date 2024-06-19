import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Login from './components/LogIn/Login';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}
