import React from 'react';
import { useAuth } from '@/lib/auth-context';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import DoctorDashboard from '@/components/dashboard/DoctorDashboard';
import ReceptionistDashboard from '@/components/dashboard/ReceptionistDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'doctor':
      return <DoctorDashboard />;
    case 'receptionist':
      return <ReceptionistDashboard />;
    default:
      return <div>Unknown role</div>;
  }
};

export default Dashboard;
