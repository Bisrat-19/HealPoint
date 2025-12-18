import api from '@/lib/api';
import { Treatment, CreateTreatmentData } from '@/types/api';

export const treatmentService = {
    getTreatments: async (): Promise<Treatment[]> => {
        const response = await api.get<Treatment[]>('/treatments/');
        return response.data;
    },

    getTreatment: async (id: number): Promise<Treatment> => {
        const response = await api.get<Treatment>(`/treatments/${id}/`);
        return response.data;
    },

    createTreatment: async (data: CreateTreatmentData): Promise<Treatment> => {
        const response = await api.post<Treatment>('/treatments/', data);
        return response.data;
    },

    getTodayTreatments: async (): Promise<Treatment[]> => {
        const response = await api.get<Treatment[]>('/treatments/today/');
        return response.data;
    }
};
