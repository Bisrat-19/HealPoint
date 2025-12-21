import React from 'react';
import { useAuth } from '@/lib/auth-context';
import { useTodayAppointments } from '@/hooks/useDashboardData';
import { useTreatments } from '@/hooks/treatments';
import StatsCard from './StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Users,
  Stethoscope,
  FileText,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const { data: todayAppointmentsData, isLoading: isLoadingAppointments } = useTodayAppointments();
  const { data: treatments = [], isLoading: isLoadingTreatments } = useTreatments();

  const todayAppointments = React.useMemo(() => {
    if (!todayAppointmentsData) return [];
    let appointments: any[] = [];
    if ('initial' in todayAppointmentsData && 'follow_up' in todayAppointmentsData) {
      appointments = [...todayAppointmentsData.initial, ...todayAppointmentsData.follow_up];
    }

    if (user?.role === 'doctor') {
      return appointments.filter(a => a.doctor.id === user.id);
    }
    return appointments;
  }, [todayAppointmentsData, user]);

  const pendingAppointments = todayAppointments.filter(a => a.status === 'pending');
  const completedToday = todayAppointments.filter(a => a.status === 'completed').length;

  // Calculate unique patients treated by this doctor (from all treatments)
  const uniquePatients = new Set(treatments.filter(t => t.doctor.id === user?.id).map(t => t.patient.id)).size;

  if (isLoadingAppointments || isLoadingTreatments) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Doctor Dashboard</h1>
        <p className="text-muted-foreground">Your appointments and patients overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Today's Appointments"
          value={todayAppointments.length}
          icon={Calendar}
          description="Scheduled for today"
          iconClassName="bg-primary/10 text-primary"
        />
        <StatsCard
          title="Pending"
          value={pendingAppointments.length}
          icon={Clock}
          description="Waiting to be seen"
          iconClassName="bg-warning/10 text-warning"
        />
        <StatsCard
          title="Completed Today"
          value={completedToday}
          icon={CheckCircle2}
          description="Patients treated"
          iconClassName="bg-success/10 text-success"
        />
        <StatsCard
          title="Total Patients"
          value={uniquePatients}
          icon={Users}
          description="Under your care"
          iconClassName="bg-info/10 text-info"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Appointments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-warning" />
              Pending Appointments
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/appointments">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {pendingAppointments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-success" />
                <p>All caught up! No pending appointments.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {(apt.patient.first_name?.[0] || 'P').toUpperCase()}{(apt.patient.last_name?.[0] || '').toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {apt.patient.first_name} {apt.patient.last_name}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Queue #{apt.patient.queue_number}</span>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs capitalize">
                            {apt.appointment_type.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" asChild>
                      <Link to={`/dashboard/treatments?patient=${apt.patient.id}&appointment=${apt.id}`}>
                        Treat
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Treatments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Recent Treatments
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/treatments">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {treatments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Stethoscope className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No treatments recorded yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {treatments.slice(0, 4).map((treatment) => (
                  <div
                    key={treatment.id}
                    className="p-4 rounded-lg border bg-card hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-foreground">
                          {treatment.patient.first_name} {treatment.patient.last_name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(treatment.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      {treatment.follow_up_required && (
                        <Badge variant="secondary" className="text-xs">
                          Follow-up needed
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {treatment.notes}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div >
  );
};

export default DoctorDashboard;
