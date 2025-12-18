import api from '@/lib/api';

export interface LoginResponse {
    access: string;
    refresh: string;
    user: any;
}

export const authService = {
    async login(username: string, password: string): Promise<LoginResponse> {
        const response = await api.post<LoginResponse>('/accounts/auth/login/', {
            username,
            password,
        });
        return response.data;
    },

    async getProfile() {
        const response = await api.get('/accounts/users/profile/');
        return response.data;
    },

    async changePassword(data: any) {
        const response = await api.patch('/accounts/users/change-password/', data);
        return response.data;
    },

    async updateProfile(data: any) {
        const response = await api.patch('/accounts/users/profile/', data);
        return response.data;
    },
};
