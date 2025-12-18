import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { treatmentService } from '@/services/treatments';
import { CreateTreatmentData } from '@/types/api';
import { toast } from 'sonner';

export const useTreatments = () => {
    return useQuery({
        queryKey: ['treatments'],
        queryFn: treatmentService.getTreatments,
    });
};

export const useTodayTreatments = () => {
    return useQuery({
        queryKey: ['treatments', 'today'],
        queryFn: treatmentService.getTodayTreatments,
    });
};

export const useCreateTreatment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateTreatmentData) => treatmentService.createTreatment(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['treatments'] });
            queryClient.invalidateQueries({ queryKey: ['treatments', 'today'] });
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
            queryClient.invalidateQueries({ queryKey: ['appointments', 'today'] });
            toast.success('Treatment recorded successfully');
        },
        onError: (error: any) => {
            console.error("Create Treatment Error:", error);
            const detail = error.response?.data?.detail;
            const fieldErrors = error.response?.data;

            if (detail) {
                toast.error(detail);
            } else if (fieldErrors) {
                // Show first field error
                const firstError = Object.entries(fieldErrors).map(([key, val]) => `${key}: ${val}`).join(', ');
                toast.error(firstError || 'Failed to record treatment');
            } else {
                toast.error('Failed to record treatment');
            }
        },
    });
};
