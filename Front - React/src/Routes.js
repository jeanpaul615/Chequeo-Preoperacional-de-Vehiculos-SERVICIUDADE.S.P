import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Login from './components/LogIn/Login';
import MainDashboard from './components/Dashboard/MainDashboard';
import InspectionForm from './components/Inspection/Main/InspectionForm';
import DatatableDrivers from './components/Drivers/Datatable';
import DataTableIndicators from './components/Indicators/Datatable';
import DataTableVariables from './components/Variables/Datatable';
import DatatableVehicles from './components/Vehicle/Datatable';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/dashboard' element={<MainDashboard />} />
        <Route exact path='/inspection' element={<InspectionForm />} />
        <Route exact path='/drivers' element={<DatatableDrivers />} />
        <Route exact path='/indicators' element={<DataTableIndicators />} />
        <Route exact path='/variables' element={<DataTableVariables />} />
        <Route exact path='/vehicules' element={<DatatableVehicles />} />

      </Routes>
    </Router>
  );
}
