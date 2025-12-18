import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService, LoginResponse } from '@/services/auth';
import { toast } from 'sonner';

export const useLogin = () => {
    return useMutation({
        mutationFn: ({ username, password }: any) => authService.login(username, password),
        onError: (error: any) => {
            // Error handling is done in the component or here
            console.error('Login mutation failed:', error);
        },
    });
};

export const useChangePassword = () => {
    return useMutation({
        mutationFn: (data: any) => authService.changePassword(data),
        onSuccess: () => {
            toast.success('Password changed successfully');
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.new_password?.[0] ||
                error.response?.data?.detail ||
                'Failed to change password';
            toast.error(errorMessage);
        },
    });
};

export const useProfile = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: authService.getProfile,
        enabled: enabled,
        retry: false,
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => authService.updateProfile(data),
        onSuccess: (data) => {
            toast.success('Profile updated successfully');
            queryClient.setQueryData(['profile'], data);
            // Update local storage if needed
            const storedUser = localStorage.getItem('hms_user');
            if (storedUser) {
                const user = JSON.parse(storedUser);
                const updatedUser = { ...user, ...data };
                localStorage.setItem('hms_user', JSON.stringify(updatedUser));
            }
        },
        onError: (error: any) => {
            toast.error('Failed to update profile');
            console.error('Profile update failed:', error);
        },
    });
};
