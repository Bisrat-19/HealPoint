// Mock data for HealPoint - Healthcare Management System

export type UserRole = 'admin' | 'doctor' | 'receptionist';

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
}

export interface Doctor extends User {
  role: 'doctor';
  specialty?: string;
  patients_count?: number;
}

export interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string | null;
  gender: 'M' | 'F';
  contact_number: string;
  address: string;
  assigned_doctor: Doctor | null;
  queue_number: number;
  is_seen: boolean;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: number;
  patient: Patient;
  doctor: Doctor;
  appointment_date: string;
  appointment_type: 'initial' | 'follow_up';
  initial_appointment: number | null;
  treatment: Treatment | null;
  type_seq: number;
  case_followup_seq: number | null;
  notes: string;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Treatment {
  id: number;
  patient: Patient;
  doctor: Doctor;
  appointment: number;
  notes: string;
  prescription: string | null;
  follow_up_required: boolean;
  created_at: string;
}

export interface Payment {
  id: number;
  patient: number;
  amount: number;
  payment_method: 'cash' | 'chapa';
  reference: string;
  status: 'pending' | 'paid' | 'failed';
  created_at: string;
}

// Mock Users
export const mockUsers: User[] = [
  { id: 1, username: 'admin', first_name: 'System', last_name: 'Admin', email: 'admin@hospital.com', role: 'admin' },
  { id: 2, username: 'dr_abraham', first_name: 'Abraham', last_name: 'Bekele', email: 'abraham@hospital.com', role: 'doctor' },
  { id: 3, username: 'dr_sara', first_name: 'Sara', last_name: 'Hailu', email: 'sara@hospital.com', role: 'doctor' },
  { id: 4, username: 'dr_michael', first_name: 'Michael', last_name: 'Tadesse', email: 'michael@hospital.com', role: 'doctor' },
  { id: 5, username: 'rec_fatima', first_name: 'Fatima', last_name: 'Mohammed', email: 'fatima@hospital.com', role: 'receptionist' },
  { id: 6, username: 'rec_david', first_name: 'David', last_name: 'Alemu', email: 'david@hospital.com', role: 'receptionist' },
];

export const mockDoctors: Doctor[] = mockUsers.filter(u => u.role === 'doctor') as Doctor[];

// Mock Patients
export const mockPatients: Patient[] = [
  {
    id: 1,
    first_name: 'Meron',
    last_name: 'Girma',
    date_of_birth: '1985-03-15',
    gender: 'F',
    contact_number: '+251911234567',
    address: 'Addis Ababa, Bole',
    assigned_doctor: mockDoctors[0],
    queue_number: 1,
    is_seen: true,
    created_at: '2024-12-09T08:00:00Z',
    updated_at: '2024-12-09T08:00:00Z',
  },
  {
    id: 2,
    first_name: 'Yonas',
    last_name: 'Tesfaye',
    date_of_birth: '1990-07-22',
    gender: 'M',
    contact_number: '+251922345678',
    address: 'Addis Ababa, Kirkos',
    assigned_doctor: mockDoctors[1],
    queue_number: 2,
    is_seen: false,
    created_at: '2024-12-09T08:30:00Z',
    updated_at: '2024-12-09T08:30:00Z',
  },
  {
    id: 3,
    first_name: 'Tigist',
    last_name: 'Worku',
    date_of_birth: '1978-11-08',
    gender: 'F',
    contact_number: '+251933456789',
    address: 'Addis Ababa, Yeka',
    assigned_doctor: mockDoctors[0],
    queue_number: 3,
    is_seen: false,
    created_at: '2024-12-09T09:00:00Z',
    updated_at: '2024-12-09T09:00:00Z',
  },
  {
    id: 4,
    first_name: 'Dawit',
    last_name: 'Mengistu',
    date_of_birth: '1995-02-28',
    gender: 'M',
    contact_number: '+251944567890',
    address: 'Addis Ababa, Nifas Silk',
    assigned_doctor: mockDoctors[2],
    queue_number: 4,
    is_seen: false,
    created_at: '2024-12-09T09:30:00Z',
    updated_at: '2024-12-09T09:30:00Z',
  },
  {
    id: 5,
    first_name: 'Helen',
    last_name: 'Kebede',
    date_of_birth: '1982-09-12',
    gender: 'F',
    contact_number: '+251955678901',
    address: 'Addis Ababa, Lideta',
    assigned_doctor: mockDoctors[1],
    queue_number: 5,
    is_seen: false,
    created_at: '2024-12-09T10:00:00Z',
    updated_at: '2024-12-09T10:00:00Z',
  },
];

// Mock Appointments
export const mockAppointments: Appointment[] = [
  {
    id: 1,
    patient: mockPatients[0],
    doctor: mockDoctors[0],
    appointment_date: '2024-12-09T09:00:00Z',
    appointment_type: 'initial',
    initial_appointment: null,
    treatment: null,
    type_seq: 1,
    case_followup_seq: null,
    notes: 'Initial consultation - headache and fever',
    status: 'completed',
    created_at: '2024-12-09T08:00:00Z',
    updated_at: '2024-12-09T09:30:00Z',
  },
  {
    id: 2,
    patient: mockPatients[1],
    doctor: mockDoctors[1],
    appointment_date: '2024-12-09T10:00:00Z',
    appointment_type: 'initial',
    initial_appointment: null,
    treatment: null,
    type_seq: 2,
    case_followup_seq: null,
    notes: 'Initial consultation - back pain',
    status: 'pending',
    created_at: '2024-12-09T08:30:00Z',
    updated_at: '2024-12-09T08:30:00Z',
  },
  {
    id: 3,
    patient: mockPatients[2],
    doctor: mockDoctors[0],
    appointment_date: '2024-12-09T11:00:00Z',
    appointment_type: 'initial',
    initial_appointment: null,
    treatment: null,
    type_seq: 3,
    case_followup_seq: null,
    notes: 'Initial consultation - routine checkup',
    status: 'pending',
    created_at: '2024-12-09T09:00:00Z',
    updated_at: '2024-12-09T09:00:00Z',
  },
  {
    id: 4,
    patient: mockPatients[3],
    doctor: mockDoctors[2],
    appointment_date: '2024-12-09T14:00:00Z',
    appointment_type: 'initial',
    initial_appointment: null,
    treatment: null,
    type_seq: 4,
    case_followup_seq: null,
    notes: 'Initial consultation - chest pain',
    status: 'pending',
    created_at: '2024-12-09T09:30:00Z',
    updated_at: '2024-12-09T09:30:00Z',
  },
  {
    id: 5,
    patient: mockPatients[0],
    doctor: mockDoctors[0],
    appointment_date: '2024-12-16T09:00:00Z',
    appointment_type: 'follow_up',
    initial_appointment: 1,
    treatment: null,
    type_seq: 1,
    case_followup_seq: 1,
    notes: 'Follow-up for fever treatment',
    status: 'pending',
    created_at: '2024-12-09T09:30:00Z',
    updated_at: '2024-12-09T09:30:00Z',
  },
];

// Mock Treatments
export const mockTreatments: Treatment[] = [
  {
    id: 1,
    patient: mockPatients[0],
    doctor: mockDoctors[0],
    appointment: 1,
    notes: 'Patient presented with fever (38.5°C) and persistent headache for 3 days. Physical examination normal. Likely viral infection.',
    prescription: 'Paracetamol 500mg - 1 tablet every 6 hours for pain and fever\nRest and hydration\nReturn if symptoms persist after 5 days',
    follow_up_required: true,
    created_at: '2024-12-09T09:30:00Z',
  },
];

// Mock Payments
export const mockPayments: Payment[] = [
  { id: 1, patient: 1, amount: 500, payment_method: 'cash', reference: 'CASH-001', status: 'paid', created_at: '2024-12-09T08:00:00Z' },
  { id: 2, patient: 2, amount: 500, payment_method: 'chapa', reference: 'CHP-002', status: 'paid', created_at: '2024-12-09T08:30:00Z' },
  { id: 3, patient: 3, amount: 500, payment_method: 'cash', reference: 'CASH-003', status: 'paid', created_at: '2024-12-09T09:00:00Z' },
  { id: 4, patient: 4, amount: 500, payment_method: 'cash', reference: 'CASH-004', status: 'paid', created_at: '2024-12-09T09:30:00Z' },
  { id: 5, patient: 5, amount: 500, payment_method: 'chapa', reference: 'CHP-005', status: 'pending', created_at: '2024-12-09T10:00:00Z' },
];

// Stats helpers
export const getDashboardStats = (role: UserRole, userId?: number) => {
  const today = new Date().toISOString().split('T')[0];

  if (role === 'admin') {
    return {
      totalUsers: mockUsers.length,
      totalDoctors: mockDoctors.length,
      totalReceptionists: mockUsers.filter(u => u.role === 'receptionist').length,
      totalPatients: mockPatients.length,
      todayAppointments: mockAppointments.filter(a => a.appointment_date.startsWith(today)).length,
      pendingAppointments: mockAppointments.filter(a => a.status === 'pending').length,
    };
  }

  if (role === 'doctor') {
    const doctorAppointments = mockAppointments.filter(a => a.doctor.id === userId);
    return {
      todayAppointments: doctorAppointments.filter(a => a.appointment_date.startsWith('2024-12-09')).length,
      pendingAppointments: doctorAppointments.filter(a => a.status === 'pending').length,
      completedToday: doctorAppointments.filter(a => a.status === 'completed' && a.appointment_date.startsWith('2024-12-09')).length,
      totalPatients: new Set(doctorAppointments.map(a => a.patient.id)).size,
    };
  }

  if (role === 'receptionist') {
    return {
      todayRegistrations: mockPatients.filter(p => p.created_at.startsWith('2024-12-09')).length,
      pendingPayments: mockPayments.filter(p => p.status === 'pending').length,
      queueLength: mockPatients.filter(p => !p.is_seen && p.created_at.startsWith('2024-12-09')).length,
      totalCollected: mockPayments.filter(p => p.status === 'paid' && p.created_at.startsWith('2024-12-09')).reduce((sum, p) => sum + p.amount, 0),
    };
  }

  return {};
};

// Login credentials for demo
export const demoCredentials = {
  admin: { username: 'admin', password: 'admin123' },
  doctor: { username: 'dr_abraham', password: 'doctor123' },
  receptionist: { username: 'rec_fatima', password: 'reception123' },
};
