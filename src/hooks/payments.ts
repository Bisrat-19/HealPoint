import { useMutation } from '@tanstack/react-query';
import { paymentService } from '@/services/payments';
import { toast } from 'sonner';

export const useVerifyPayment = () => {
    return useMutation({
        mutationFn: (tx_ref: string) => paymentService.verifyPayment(tx_ref),
        onSuccess: (data) => {
            if (data.status === 'paid') {
                toast.success('Payment verified successfully');
            } else {
                toast.error('Payment verification failed');
            }
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.detail || 'Failed to verify payment');
        },
    });
};
