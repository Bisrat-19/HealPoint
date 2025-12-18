import React, { useState } from 'react';
import { usePayments, useTodayPayments } from '@/hooks/useDashboardData';
import { useTodayPatients } from '@/hooks/useDashboardData'; // To get patient names if needed, or assume payment has it
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  CreditCard,
  DollarSign,
  CheckCircle2,
  Clock,
  XCircle,
  Loader2
} from 'lucide-react';

const Payments = () => {
  const [filter, setFilter] = useState('today');
  const { data: allPayments, isLoading: isLoadingAll } = usePayments();
  const { data: todayPaymentsData, isLoading: isLoadingToday } = useTodayPayments();
  const { data: todayPatients = [] } = useTodayPatients(); // For patient lookup if needed

  const payments = filter === 'today' ? todayPaymentsData : allPayments;
  const isLoading = filter === 'today' ? isLoadingToday : isLoadingAll;

  // Calculate stats based on TODAY'S data usually, or filtered data?
  // Dashboard usually shows today's stats.
  // Let's use todayPaymentsData for stats to be consistent with "Today's Collection"
  const statsPayments = todayPaymentsData || [];
  const totalCollected = statsPayments.filter(p => p.status === 'paid').reduce((sum, p) => sum + Number(p.amount), 0).toFixed(2);
  const pendingAmount = statsPayments.filter(p => p.status === 'pending').reduce((sum, p) => sum + Number(p.amount), 0).toFixed(2);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <Badge className="bg-success/10 text-success border-success/20 gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Paid
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-warning/10 text-warning border-warning/20 gap-1">
            <Clock className="w-3 h-3" />
            Pending
          </Badge>
        );
      case 'failed':
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20 gap-1">
            <XCircle className="w-3 h-3" />
            Failed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payments</h1>
          <p className="text-muted-foreground">Payment records and collection summary</p>
        </div>
        <Tabs value={filter} onValueChange={setFilter} className="w-fit">
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today's Collection</p>
                <p className="text-2xl font-bold text-success">{totalCollected} ETB</p>
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
                <p className="text-sm text-muted-foreground">Pending (Today)</p>
                <p className="text-2xl font-bold text-warning">{pendingAmount} ETB</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Transactions (Today)</p>
                <p className="text-2xl font-bold">{statsPayments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(payments || []).map((payment) => {
                // Try to find patient in todayPatients if available, otherwise just show ID
                // Ideally we fetch patient details or payment has it.
                const patient = todayPatients.find(p => p.id === payment.patient);
                return (
                  <TableRow key={payment.id}>
                    <TableCell className="font-mono text-sm">#{payment.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">
                          {patient ? (patient.first_name?.[0] || 'P').toUpperCase() : '#'}
                        </div>
                        <span>{patient ? `${patient.first_name} ${patient.last_name}` : `Patient ${payment.patient}`}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">{payment.amount} ETB</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {payment.payment_method}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(payment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;
