import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Calendar, Clock, User, CheckCircle, XCircle, AlertCircle, Eye, Loader2 } from 'lucide-react';
import { useAppointments } from '@/hooks/appointments';
import { useTodayAppointments } from '@/hooks/useDashboardData';
import { Appointment } from '@/types/api';

const AllAppointments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: allAppointments, isLoading: isLoadingAll } = useAppointments();
  const { data: todayAppointmentsData, isLoading: isLoadingToday } = useTodayAppointments();

  // Flatten today's appointments if they are grouped, or use as is if array
  // The hook returns { initial: [], follow_up: [] } based on service
  // We need to flatten it
  const todayAppointments = React.useMemo(() => {
    if (!todayAppointmentsData) return [];
    // Check if it's grouped (has initial/follow_up) or array
    // Based on service it returns { initial: [], follow_up: [] }
    if ('initial' in todayAppointmentsData && 'follow_up' in todayAppointmentsData) {
      return [...todayAppointmentsData.initial, ...todayAppointmentsData.follow_up];
    }
    return [];
  }, [todayAppointmentsData]);

  const appointments = statusFilter === 'today' ? todayAppointments : allAppointments;
  const isLoading = statusFilter === 'today' ? isLoadingToday : isLoadingAll;

  const filteredAppointments = (appointments || []).filter(appointment => {
    const matchesSearch =
      `${appointment.patient.first_name} ${appointment.patient.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${appointment.doctor.first_name} ${appointment.doctor.last_name}`.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || statusFilter === 'today' || appointment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20"><AlertCircle className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20"><XCircle className="h-3 w-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: Appointment['appointment_type']) => {
    return type === 'initial'
      ? <Badge variant="outline" className="bg-primary/5">Initial</Badge>
      : <Badge variant="outline" className="bg-secondary/50">Follow-up</Badge>;
  };

  const stats = {
    total: appointments?.length || 0,
    pending: appointments?.filter(a => a.status === 'pending').length || 0,
    completed: appointments?.filter(a => a.status === 'completed').length || 0,
    cancelled: appointments?.filter(a => a.status === 'cancelled').length || 0,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Appointments</h1>
          <p className="text-muted-foreground">View all appointments</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-500/5 border-yellow-500/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        <Card className="bg-green-500/5 border-green-500/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card className="bg-red-500/5 border-red-500/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
            <div className="text-sm text-muted-foreground">Cancelled</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by patient or doctor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-fit">
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Appointments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Appointments List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Patient</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Doctor</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Date & Time</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold">
                          {(appointment.patient.first_name?.[0] || 'P').toUpperCase()}{(appointment.patient.last_name?.[0] || '').toUpperCase()}
                        </div>
                        <span className="font-medium text-foreground">
                          {appointment.patient.first_name} {appointment.patient.last_name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">
                          Dr. {appointment.doctor.first_name} {appointment.doctor.last_name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {new Date(appointment.appointment_date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {new Date(appointment.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      {getTypeBadge(appointment.appointment_type)}
                    </td>
                    <td className="py-3 px-2">
                      {getStatusBadge(appointment.status)}
                    </td>
                    <td className="py-3 px-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredAppointments.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No appointments found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllAppointments;
