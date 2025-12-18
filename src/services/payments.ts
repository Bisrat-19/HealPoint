import api from '@/lib/api';
import { Payment } from '@/types/api';

export const paymentService = {
    getPayments: async (): Promise<Payment[]> => {
        const response = await api.get<Payment[]>('/payments/');
        return response.data;
    },

    getPayment: async (id: number): Promise<Payment> => {
        const response = await api.get<Payment>(`/payments/${id}/`);
        return response.data;
    },

    getTodayPayments: async (): Promise<Payment[]> => {
        const response = await api.get<Payment[]>('/payments/today/');
        return response.data;
    },

    verifyPayment: async (tx_ref: string): Promise<{ message: string; status: string }> => {
        const response = await api.post('/payments/webhook/', { tx_ref });
        return response.data;
    },
};
