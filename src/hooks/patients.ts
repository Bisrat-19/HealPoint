import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { patientService } from '@/services/patients';
import { CreatePatientData } from '@/types/api';
import { toast } from 'sonner';

export const usePatients = () => {
    return useQuery({
        queryKey: ['patients'],
        queryFn: patientService.getPatients,
    });
};

export const useCreatePatient = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreatePatientData) => patientService.createPatient(data),
        onSuccess: (patient) => {
            queryClient.invalidateQueries({ queryKey: ['patients'] });
            queryClient.invalidateQueries({ queryKey: ['patients', 'today'] });

            // Only show success toast for cash payments
            // For Chapa, success will be shown after payment verification
            if (patient.payment?.payment_method === 'cash') {
                toast.success('Patient registered successfully');
            }
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.detail || 'Failed to register patient');
        },
    });
};

export const useDeletePatient = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => patientService.deletePatient(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['patients'] });
            queryClient.invalidateQueries({ queryKey: ['patients', 'today'] });
            toast.success('Patient deleted successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.detail || 'Failed to delete patient');
        },
    });
};
