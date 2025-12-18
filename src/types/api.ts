export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    role: 'admin' | 'doctor' | 'receptionist';
}

export interface Doctor {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

export interface PaymentResponse {
    id: number;
    amount: string;
    payment_method: 'cash' | 'chapa';
    status: 'pending' | 'paid' | 'failed';
    reference: string;
    payment_url?: string; // Only present for Chapa payments
}

export interface Patient {
    id: number;
    first_name: string;
    last_name: string;
    date_of_birth: string | null;
    gender: 'M' | 'F';
    contact_number: string;
    address: string;
    assigned_doctor: Doctor;
    queue_number: number;
    is_seen: boolean;
    created_at: string;
    updated_at: string;
    payment?: PaymentResponse; // Only present on patient creation
}

export interface Appointment {
    id: number;
    display_id: string;
    patient: Patient;
    doctor: Doctor;
    appointment_date: string;
    appointment_type: 'initial' | 'follow_up';
    status: 'pending' | 'completed' | 'cancelled';
    notes?: string;
    initial_appointment?: number | null;
    treatment?: number | null;
    created_at: string;
    updated_at: string;
}

export interface CreatePatientData {
    first_name: string;
    last_name: string;
    date_of_birth?: string;
    gender: 'M' | 'F';
    contact_number: string;
    address?: string;
    assigned_doctor_id?: number | string; // Can be 'auto' or ID
    payment_method: 'cash' | 'chapa';
    amount: number;
}

export interface CreateAppointmentData {
    patient_id: number;
    doctor_id: number;
    appointment_date: string;
    appointment_type: 'initial' | 'follow_up';
    notes?: string;
    initial_appointment_id?: number;
    treatment?: number;
}

export interface Payment {
    id: number;
    patient: number; // ID of the patient
    amount: string; // Decimal string from backend usually
    payment_method: 'cash' | 'chapa';
    status: 'pending' | 'paid' | 'failed';
    created_at: string;
    updated_at: string;
}

export interface Treatment {
    id: number;
    patient: Patient;
    doctor: Doctor;
    appointment: number; // Appointment ID
    notes: string;
    prescription: string | null;
    follow_up_required: boolean;
    created_at: string;
    updated_at: string;
}

export interface CreateTreatmentData {
    patient_id: number;
    appointment: number; // Changed from appointment_id to match backend serializer
    notes: string;
    prescription?: string;
    follow_up_required: boolean;
}
