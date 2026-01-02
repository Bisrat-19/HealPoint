import { useQuery } from '@tanstack/react-query';
import { appointmentService } from '@/services/appointments';
import { patientService } from '@/services/patients';
import { paymentService } from '@/services/payments';

import { useAuth } from '@/lib/auth-context';

export const useTodayAppointments = () => {
    const { user } = useAuth();
    return useQuery({
        queryKey: ['appointments', 'today', user?.id],
        queryFn: appointmentService.getTodayAppointments,
        staleTime: 1000 * 60 * 1, // 1 minute
    });
};

export const useTodayPatients = () => {
    return useQuery({
        queryKey: ['patients', 'today'],
        queryFn: patientService.getTodayPatients,
        staleTime: 1000 * 60 * 1, // 1 minute
    });
};

export const useTodayPayments = () => {
    return useQuery({
        queryKey: ['payments', 'today'],
        queryFn: paymentService.getTodayPayments,
        staleTime: 1000 * 60 * 1, // 1 minute
    });
};

export const usePayments = (options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ['payments', 'all'],
        queryFn: paymentService.getPayments,
        staleTime: 1000 * 60 * 1, // 1 minute
        ...options,
    });
};

export const useTotalAmount = (options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ['payments', 'total'],
        queryFn: paymentService.getTotalAmount,
        staleTime: 1000 * 60 * 1, // 1 minute
        ...options,
    });
};

export const useTodayTotalAmount = () => {
    return useQuery({
        queryKey: ['payments', 'today-total'],
        queryFn: paymentService.getTodayTotalAmount,
        staleTime: 1000 * 60 * 1, // 1 minute
    });
};
