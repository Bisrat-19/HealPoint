import React from 'react';
import { useTodayPatients } from '@/hooks/useDashboardData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Clock,
  CheckCircle2,
  Stethoscope,
  Loader2
} from 'lucide-react';

const QueueItem = React.memo(({ patient }: { patient: any }) => (
  <div
    className={`flex items-center justify-between p-4 rounded-lg border transition-all ${patient.is_seen ? 'bg-muted/30 opacity-60' : 'bg-card hover:shadow-md'
      }`}
  >
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${patient.is_seen
        ? 'bg-success/10 text-success'
        : 'bg-warning/10 text-warning'
        }`}>
        #{patient.queue_number}
      </div>
      <div>
        <p className="font-semibold text-foreground">
          {patient.first_name} {patient.last_name}
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Stethoscope className="w-3 h-3" />
          Dr. {patient.assigned_doctor?.first_name || 'Unassigned'}
        </div>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">
        {new Date(patient.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
      <Badge variant={patient.is_seen ? 'default' : 'secondary'}>
        {patient.is_seen ? (
          <>
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Seen
          </>
        ) : (
          <>
            <Clock className="w-3 h-3 mr-1" />
            Waiting
          </>
        )}
      </Badge>
    </div>
  </div>
));

const PatientQueue = () => {
  const { data: todayPatients = [], isLoading } = useTodayPatients();
  const waiting = todayPatients.filter(p => !p.is_seen);
  const seen = todayPatients.filter(p => p.is_seen);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Patient Queue</h1>
        <p className="text-muted-foreground">Today's patient queue and status</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Today</p>
                <p className="text-2xl font-bold">{todayPatients.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Waiting</p>
                <p className="text-2xl font-bold">{waiting.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Seen</p>
                <p className="text-2xl font-bold">{seen.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Queue List */}
      <Card>
        <CardHeader>
          <CardTitle>Queue List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todayPatients.map((patient) => (
              <QueueItem key={patient.id} patient={patient} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientQueue;
