import React, { Suspense, lazy } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Loader2 } from 'lucide-react';

import { AdminDashboard, DoctorDashboard, ReceptionistDashboard } from '@/lib/lazy-components';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Suspense fallback={null}>
      {(() => {
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
      })()}
    </Suspense>
  );
};

export default Dashboard;
