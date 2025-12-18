import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/lib/auth-context";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import RegisterPatient from "./pages/RegisterPatient";
import PatientQueue from "./pages/PatientQueue";
import Appointments from "./pages/Appointments";
import AllAppointments from "./pages/AllAppointments";
import Patients from "./pages/Patients";
import Treatments from "./pages/Treatments";
import Payments from "./pages/Payments";
import Profile from "./pages/Profile";
import PaymentCallback from "./pages/PaymentCallback";
import NotFound from "./pages/NotFound";

// Components
import DashboardLayout from "./components/dashboard/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />

            {/* Protected dashboard routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="patients" element={<Patients />} />
              <Route path="all-appointments" element={<AllAppointments />} />
              <Route path="register-patient" element={<RegisterPatient />} />
              <Route path="queue" element={<PatientQueue />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="treatments" element={<Treatments />} />
              <Route path="payments" element={<Payments />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* Payment callback route (outside dashboard layout) */}
            <Route path="/payment/callback" element={<PaymentCallback />} />

            {/* Redirects */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
