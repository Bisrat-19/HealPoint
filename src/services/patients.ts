import api from '@/lib/api';
import { Patient, CreatePatientData } from '@/types/api';

export const patientService = {
    getPatients: async (): Promise<Patient[]> => {
        const response = await api.get<Patient[]>('/patients/');
        return response.data;
    },

    getPatient: async (id: number): Promise<Patient> => {
        const response = await api.get<Patient>(`/patients/${id}/`);
        return response.data;
    },

    createPatient: async (data: CreatePatientData): Promise<Patient> => {
        const response = await api.post<Patient>('/patients/', data);
        return response.data;
    },

    deletePatient: async (id: number): Promise<void> => {
        await api.delete(`/patients/${id}/`);
    },

    updatePatient: async (id: number, data: Partial<CreatePatientData>): Promise<Patient> => {
        const response = await api.patch<Patient>(`/patients/${id}/`, data);
        return response.data;
    },

    getTodayPatients: async (): Promise<Patient[]> => {
        const response = await api.get<Patient[]>('/patients/today/');
        return response.data;
    },
};
