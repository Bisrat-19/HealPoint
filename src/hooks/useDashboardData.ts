import { useQuery } from '@tanstack/react-query';
import { appointmentService } from '@/services/appointments';
import { patientService } from '@/services/patients';
import { paymentService } from '@/services/payments';

export const useTodayAppointments = () => {
    return useQuery({
        queryKey: ['appointments', 'today'],
        queryFn: appointmentService.getTodayAppointments,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useTodayPatients = () => {
    return useQuery({
        queryKey: ['patients', 'today'],
        queryFn: patientService.getTodayPatients,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useTodayPayments = () => {
    return useQuery({
        queryKey: ['payments', 'today'],
        queryFn: paymentService.getTodayPayments,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const usePayments = () => {
    return useQuery({
        queryKey: ['payments', 'all'],
        queryFn: paymentService.getPayments,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
