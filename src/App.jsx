
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Protected from './components/auth/Protected';
import Index from './pages/Index';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/admin/Dashboard';
import AdminVendors from './pages/admin/Vendors';
import AdminTreks from './pages/admin/Treks';
import AdminBookings from './pages/admin/Bookings';
import VendorDashboard from './pages/vendor/Dashboard';
import VendorTreks from './pages/vendor/Treks';
import CreateTrek from './pages/vendor/CreateTrek';
import EditTrek from './pages/vendor/EditTrek';
import VendorBookings from './pages/vendor/Bookings';
import Customers from './pages/vendor/Customers';
import ManageLocations from './pages/vendor/ManageLocations';
import Payments from './pages/vendor/Payments';
import Reviews from './pages/vendor/Reviews';
import Messages from './pages/vendor/Messages';
import Reports from './pages/vendor/Reports';
import VendorSettings from './pages/vendor/Settings';
import NotFound from './pages/NotFound';
import AdminLayout from './layouts/AdminLayout';
import VendorLayout from './layouts/VendorLayout';
import RegistrationFlow from './pages/auth/RegistrationFlow';
import RegistrationSuccess from './pages/auth/RegistrationSuccess';
import VendorWithdrawals from './pages/vendor/Withdrawals';
import { Toaster } from "@/components/ui/sonner"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Analytics from './pages/admin/Analytics';
import AdminWithdrawals from "@/pages/admin/Withdrawals";
import AdminCoupons from "@/pages/admin/Coupons";
import VendorCoupons from "@/pages/vendor/Coupons";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/registration-flow" element={<RegistrationFlow />} />
              <Route path="/registration-success" element={<RegistrationSuccess />} />

              {/* Admin routes */}
              <Route path="/admin" element={
                <Protected>
                  <AdminLayout />
                </Protected>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="vendors" element={<AdminVendors />} />
                <Route path="treks" element={<AdminTreks />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="withdrawals" element={<AdminWithdrawals />} />
                <Route path="coupons" element={<AdminCoupons />} />
                <Route path="analytics" element={<Analytics />} />
              </Route>

              {/* Vendor routes */}
              <Route path="/vendor" element={
                <Protected>
                  <VendorLayout />
                </Protected>
              }>
                <Route index element={<VendorDashboard />} />
                <Route path="treks" element={<VendorTreks />} />
                <Route path="treks/create" element={<CreateTrek />} />
                <Route path="treks/edit/:id" element={<EditTrek />} />
                <Route path="bookings" element={<VendorBookings />} />
                <Route path="customers" element={<Customers />} />
                <Route path="locations" element={<ManageLocations />} />
                <Route path="payments" element={<Payments />} />
                <Route path="withdrawals" element={<VendorWithdrawals />} />
                <Route path="coupons" element={<VendorCoupons />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="messages" element={<Messages />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<VendorSettings />} />
              </Route>

              {/* Catch all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
