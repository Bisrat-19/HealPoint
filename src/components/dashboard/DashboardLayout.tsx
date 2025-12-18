import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { SidebarProvider } from '@/lib/sidebar-context';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import * as LazyPages from '@/lib/lazy-components';

const DashboardLayout = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (user) {
      // Preload critical routes based on role
      const routesToPreload = [];

      // Common routes
      routesToPreload.push(LazyPages.Dashboard, LazyPages.Profile);

      if (user.role === 'admin') {
        routesToPreload.push(LazyPages.AdminDashboard, LazyPages.UserManagement, LazyPages.Patients, LazyPages.AllAppointments, LazyPages.Payments);
      } else if (user.role === 'doctor') {
        routesToPreload.push(LazyPages.DoctorDashboard, LazyPages.Appointments, LazyPages.Treatments);
      } else if (user.role === 'receptionist') {
        routesToPreload.push(LazyPages.ReceptionistDashboard, LazyPages.RegisterPatient, LazyPages.PatientQueue, LazyPages.Appointments, LazyPages.Payments);
      }

      routesToPreload.forEach(comp => {
        if (comp.preload) comp.preload();
      });
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-h-screen min-w-0">
          <DashboardHeader />
          <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
