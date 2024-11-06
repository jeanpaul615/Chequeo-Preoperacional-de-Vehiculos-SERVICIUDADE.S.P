// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Login from './components/LogIn/Login';
import MainDashboard from './components/Inspection/Dashboard/MainDashboard';
import InspectionFormMoto from './components/Inspection/CheckInspectionMotos/Main/InspectionForm';
import InspectionForm from './components/Inspection/CheckInspection/Main/InspectionForm';
import ProtectedRoute from './ProtectedRoute';
import DatatableInspection from './components/Inspection/ListInspection/Datatable';
import DatatableInspectionByDriver from './components/Inspection/InspectionByDriver/Datatable';
import DatatableDrivers from './components/Inspection/Drivers/Datatable';
import DataTableIndicators from './components/Indicators/IndicatorsComponent/Datatable';
import DataTableVariables from './components/Indicators/Variables/Datatable';
import DatatableVehicles from './components/Inspection/Vehicle/Datatable';
import Register from './components/LogIn/Register/Register';
import ResetPassword from './components/LogIn/ResetPassword/ResetPassword';
import NewPassword from './components/LogIn/NewPassword/NewPassword';
import DatatableMaintenance from './components/Inspection/Maintenance/SheetMaintenance/Datatable';
import DatatableListMaintenance from './components/Inspection/Maintenance/ListMaintenance/Datatable';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />    
        <Route path="/register" element={<Register />} />
        <Route path="/request-reset-password" element={<ResetPassword />} />
        <Route path="/reset-password" element={<NewPassword />} />

        {/* Rutas protegidas */}
        <Route path="/dashboard" element={<ProtectedRoute element={MainDashboard} />} />
        <Route path="/inspection" element={<ProtectedRoute element={InspectionForm} />} />
        <Route path="/inspectionmoto" element={<ProtectedRoute element={InspectionFormMoto} />} />
        <Route path="/listinspection" element={<ProtectedRoute element={DatatableInspection} />} />
        <Route path="/inspectionbydriver" element={<ProtectedRoute element={DatatableInspectionByDriver} />} />
        <Route path="/drivers" element={<ProtectedRoute element={DatatableDrivers} />} />
        <Route path="/indicators" element={<ProtectedRoute element={DataTableIndicators} />} />
        <Route path="/variables" element={<ProtectedRoute element={DataTableVariables} />} />
        <Route path="/vehicles" element={<ProtectedRoute element={DatatableVehicles} />} />
        <Route path="/sheetmaintenance" element={<ProtectedRoute element={DatatableMaintenance} />} />
        <Route path="/listmaintenance" element={<ProtectedRoute element={DatatableListMaintenance} />} />
      </Routes>
    </Router>
  );
}
