import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { appointmentService } from '@/services/appointments';
import { CreateAppointmentData } from '@/types/api';
import { toast } from 'sonner';

export const useAppointments = () => {
    return useQuery({
        queryKey: ['appointments'],
        queryFn: appointmentService.getAppointments,
    });
};

export const useCreateAppointment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateAppointmentData) => appointmentService.createAppointment(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
            toast.success('Appointment scheduled successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.detail || 'Failed to schedule appointment');
        },
    });
};

export const useDeleteAppointment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => appointmentService.deleteAppointment(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
            queryClient.invalidateQueries({ queryKey: ['appointments', 'today'] });
            toast.success('Appointment deleted successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.detail || 'Failed to delete appointment');
        },
    });
};
