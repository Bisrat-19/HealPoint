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

    getTotalAmount: async (): Promise<{ total_amount: number }> => {
        const response = await api.get<{ total_amount: number }>('/payments/total_amount/');
        return response.data;
    },

    getTodayTotalAmount: async (): Promise<{ today_total: number }> => {
        const response = await api.get<{ today_total: number }>('/payments/today_total/');
        return response.data;
    },
};
