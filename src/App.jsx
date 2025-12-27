import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MapView from './pages/MapView'
import RequestList from './pages/RequestList'
import RequestDetail from './pages/RequestDetail'
import SOSForm from './pages/SOSForm'
import Login from './pages/Login'
import Verify from './pages/Verify'
import CreateOffer from './pages/CreateOffer'
import Traceability from './pages/Traceability'
import Inbound from './pages/Inbound'
import Schedule from './pages/Schedule'
import CreateShipment from './pages/CreateShipment'
import POD from './pages/POD'
import QRCheckIn from './pages/QRCheckIn'
import UserManagement from './pages/UserManagement'
import SystemConfig from './pages/SystemConfig'
import OfflineSync from './pages/OfflineSync'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import OffersList from './pages/OffersList'
import Notifications from './pages/Notifications'
import Reports from './pages/Reports'
import ShipmentDetail from './pages/ShipmentDetail'

// DRMS New Pages
import DRMSLanding from './pages/DRMSLanding'
import Register from './pages/Register'
import DonorMapView from './pages/DonorMapView'
import AdminDashboard from './pages/AdminDashboard'
import WarehouseManager from './pages/WarehouseManager'
import CreateWarehouse from './pages/CreateWarehouse'
import EditWarehouse from './pages/EditWarehouse'
import EditProfile from './pages/EditProfile'
import DonationForm from './pages/DonationForm'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastProvider } from './components/ui/toast'
import { ChatBot } from './components/ChatBot'

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
      <ChatBot />
      <Routes>
        {/* DRMS Routes - New System */}
        <Route path="/" element={<DRMSLanding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route 
          path="/drms/donor" 
          element={
            <ProtectedRoute allowedRoles={['DONOR']}>
              <DonorMapView />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/drms/admin" 
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/drms/warehouse" 
          element={
            <ProtectedRoute allowedRoles={['WAREHOUSE_MANAGER']}>
              <WarehouseManager />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/drms/warehouse/create" 
          element={
            <ProtectedRoute allowedRoles={['DONOR', 'WAREHOUSE_MANAGER', 'ADMIN']}>
              <CreateWarehouse />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/drms/warehouse/edit/:id" 
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <EditWarehouse />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/drms/profile/edit" 
          element={
            <ProtectedRoute allowedRoles={['DONOR', 'WAREHOUSE_MANAGER', 'ADMIN']}>
              <EditProfile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/drms/donation/create" 
          element={
            <ProtectedRoute allowedRoles={['DONOR']}>
              <DonationForm />
            </ProtectedRoute>
          } 
        />
        
        {/* Old Routes - Keep for reference */}
        <Route path="/old/dashboard" element={<Dashboard />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/requests" element={<RequestList />} />
        <Route path="/requests/:id" element={<RequestDetail />} />
        <Route path="/sos" element={<SOSForm />} />
        <Route path="/offers" element={<OffersList />} />
        <Route path="/offers/create" element={<CreateOffer />} />
        <Route path="/traceability" element={<Traceability />} />
        <Route path="/inbound" element={<Inbound />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/shipment/create" element={<CreateShipment />} />
        <Route path="/shipment/:id" element={<ShipmentDetail />} />
        <Route path="/pod" element={<POD />} />
        <Route path="/qr-checkin" element={<QRCheckIn />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/config" element={<SystemConfig />} />
        <Route path="/sync" element={<OfflineSync />} />
      </Routes>
    </BrowserRouter>
    </ToastProvider>
  )
}

export default App
