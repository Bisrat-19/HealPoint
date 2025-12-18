import React from "react";

// Lazy load helper with preloading
export const lazyWithPreload = (factory: () => Promise<any>) => {
    const Component = React.lazy(factory);
    (Component as any).preload = factory;
    return Component as React.LazyExoticComponent<any> & { preload: () => Promise<any> };
};

// Lazy load pages
export const Login = lazyWithPreload(() => import("../pages/Login"));
export const Dashboard = lazyWithPreload(() => import("../pages/Dashboard"));
export const UserManagement = lazyWithPreload(() => import("../pages/UserManagement"));
export const RegisterPatient = lazyWithPreload(() => import("../pages/RegisterPatient"));
export const PatientQueue = lazyWithPreload(() => import("../pages/PatientQueue"));
export const Appointments = lazyWithPreload(() => import("../pages/Appointments"));
export const AllAppointments = lazyWithPreload(() => import("../pages/AllAppointments"));
export const Patients = lazyWithPreload(() => import("../pages/Patients"));
export const Treatments = lazyWithPreload(() => import("../pages/Treatments"));
export const Payments = lazyWithPreload(() => import("../pages/Payments"));
export const Profile = lazyWithPreload(() => import("../pages/Profile"));
export const PaymentCallback = lazyWithPreload(() => import("../pages/PaymentCallback"));
export const NotFound = lazyWithPreload(() => import("../pages/NotFound"));

// Sub-dashboards
export const AdminDashboard = lazyWithPreload(() => import("../components/dashboard/AdminDashboard"));
export const DoctorDashboard = lazyWithPreload(() => import("../components/dashboard/DoctorDashboard"));
export const ReceptionistDashboard = lazyWithPreload(() => import("../components/dashboard/ReceptionistDashboard"));
