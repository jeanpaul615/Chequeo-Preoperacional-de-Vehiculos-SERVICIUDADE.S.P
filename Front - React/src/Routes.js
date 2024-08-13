import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Login from './components/LogIn/Login';
import MainDashboard from './components/Inspection/Dashboard/MainDashboard';
import InspectionForm from './components/Inspection/CheckInspection/Main/InspectionForm';
import DatatableDrivers from './components/Inspection/Drivers/Datatable';
import DataTableIndicators from './components/Indicators/IndicatorsComponent/Datatable';
import DataTableVariables from './components/Indicators/Variables/Datatable';
import DatatableVehicles from './components/Inspection/Vehicle/Datatable';
import Register from './components/LogIn/Register/Register';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
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
