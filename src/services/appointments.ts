import api from '@/lib/api';
import { Appointment, CreateAppointmentData } from '@/types/api';

export const appointmentService = {
    getAppointments: async (): Promise<Appointment[]> => {
        // The backend returns { initial: [], follow_up: [] } for list action if grouped, 
        // OR it might return a flat list depending on implementation.
        // Looking at AppointmentViewSet.list, it returns _build_grouped_payload: {'initial': ..., 'follow_up': ...}
        // This is different from standard ModelViewSet list.
        // I should probably handle this.
        // For AllAppointments page, we want a flat list.
        // The backend implementation forces grouping. I might need to flatten it here.
        const response = await api.get<{ initial: Appointment[], follow_up: Appointment[] }>('/appointments/');
        return [...response.data.initial, ...response.data.follow_up];
    },

    getAppointment: async (id: number): Promise<Appointment> => {
        const response = await api.get<Appointment>(`/appointments/${id}/`);
        return response.data;
    },

    createAppointment: async (data: CreateAppointmentData): Promise<Appointment> => {
        const response = await api.post<Appointment>('/appointments/', data);
        return response.data;
    },

    updateAppointment: async (id: number, data: Partial<CreateAppointmentData>): Promise<Appointment> => {
        const response = await api.patch<Appointment>(`/appointments/${id}/`, data);
        return response.data;
    },

    deleteAppointment: async (id: number): Promise<void> => {
        await api.delete(`/appointments/${id}/`);
    },

    getTodayAppointments: async (): Promise<{ initial: Appointment[], follow_up: Appointment[] }> => {
        const response = await api.get<{ initial: Appointment[], follow_up: Appointment[] }>('/appointments/today/');
        return response.data;
    }
};
