import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/lib/auth-context";
import { Loader2 } from "lucide-react";

import {
  LandingPage,
  Login,
  Dashboard,
  UserManagement,
  RegisterPatient,
  PatientQueue,
  Appointments,
  AllAppointments,
  Patients,
  Treatments,
  Payments,
  Profile,
  PaymentCallback,
  NotFound
} from "@/lib/lazy-components";

// Components
import DashboardLayout from "./components/dashboard/DashboardLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      gcTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={null}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
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
              {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
