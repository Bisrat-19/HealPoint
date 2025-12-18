# HealPoint - Hospital Management System

A modern, comprehensive hospital management system built with React and TypeScript, designed to streamline patient registration, appointment scheduling, treatment tracking, and payment processing.

## 🏥 Features

- **Patient Management**: Register and manage patient records with comprehensive information tracking
- **Appointment Scheduling**: Book and manage appointments with support for initial consultations and follow-ups
- **Treatment Tracking**: Record and monitor patient treatments and medical procedures
- **Payment Processing**: Handle payments with multiple payment methods including Chapa integration
- **User Management**: Role-based access control for doctors, receptionists, and administrators
- **Dashboard**: Real-time overview of appointments, patients, and treatments
- **Appointment Cancellation**: Receptionists can cancel appointments (with restrictions)
- **Patient Deletion**: Cascade deletion of patient records with associated appointments, treatments, and payments

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (Django)

### Installation

1. Clone the repository:
```sh
git clone <YOUR_GIT_URL>
cd HealPoint
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn-ui
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router
- **Form Handling**: React Hook Form
- **HTTP Client**: Axios
- **Icons**: Lucide React

## 📁 Project Structure

```
HealPoint/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── dashboard/    # Dashboard-specific components
│   │   └── ui/           # shadcn-ui components
│   ├── services/         # API service layer
│   │   ├── appointments.ts
│   │   ├── patients.ts
│   │   ├── treatments.ts
│   │   ├── payments.ts
│   │   └── users.ts
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and configurations
│   ├── pages/            # Page components
│   └── App.tsx           # Main application component
├── public/               # Static assets
└── index.html           # HTML entry point
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=http://localhost:8000/api
```

### Backend Integration

This frontend application requires the HealPoint Django backend to be running. Ensure the backend API is accessible at the URL specified in your environment variables.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Features in Detail

### Patient Registration
- Comprehensive patient information capture
- Support for multiple payment methods
- Automatic appointment creation
- Chapa payment gateway integration for online payments

### Appointment Management
- View all appointments
- Filter by appointment type (Initial/Follow-up)
- View today's appointments
- Cancel appointments (with role-based permissions)

### Treatment Management
- Record patient treatments
- Track treatment history
- Automatic patient status updates

### Dashboard
- Real-time statistics
- Quick access to today's appointments
- Patient and treatment overview

## 🔐 Authentication & Authorization

The system implements role-based access control with the following roles:
- **Doctor**: Full access to patient treatments and medical records
- **Receptionist**: Patient registration, appointment management
- **Admin**: Full system access

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For support and questions, please contact the development team.

## 🔄 Recent Updates

- Renamed system from HMS to HealPoint
- Added Chapa payment gateway integration
- Implemented appointment cancellation feature
- Enhanced patient deletion with cascade cache invalidation
- Improved frontend caching and data synchronization
