import api from '@/lib/api';
import { User } from '@/types/api';

export interface CreateUserData {
    username: string;
    email: string;
    password?: string;
    first_name: string;
    last_name: string;
    role: 'doctor' | 'receptionist' | 'admin';
}

export const userService = {
    getUsers: async (): Promise<User[]> => {
        const response = await api.get<User[]>('/accounts/users/');
        return response.data;
    },

    createUser: async (data: CreateUserData): Promise<User> => {
        const response = await api.post<User>('/accounts/auth/register/', data);
        return response.data;
    },

    updateUser: async (id: number, data: Partial<CreateUserData>): Promise<User> => {
        const response = await api.patch<User>(`/accounts/users/${id}/`, data);
        return response.data;
    },

    deleteUser: async (id: number): Promise<void> => {
        await api.delete(`/accounts/users/${id}/`);
    },

    getDoctors: async (): Promise<User[]> => {
        const response = await api.get<User[]>('/accounts/users/');
        return response.data.filter(user => user.role === 'doctor');
    }
};
