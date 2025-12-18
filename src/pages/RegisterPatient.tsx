import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  UserPlus,
  CreditCard,
  Check,
  Loader2,
  User,
  Phone,
  MapPin,
  Calendar,
  Stethoscope,
  ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';
import { useDoctors } from '@/hooks/users';
import { useCreatePatient } from '@/hooks/patients';
import { Patient } from '@/types/api';

const RegisterPatient = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: 'M' as 'M' | 'F',
    contact_number: '',
    address: '',
    assigned_doctor_id: '',
    payment_method: 'cash' as 'cash' | 'chapa',
    amount: 500,
  });

  const [registeredPatient, setRegisteredPatient] = useState<Patient | null>(null);

  const { data: doctors, isLoading: isLoadingDoctors } = useDoctors();
  const createPatientMutation = useCreatePatient();

  const handlePatientInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.first_name.trim() || !formData.last_name.trim() || !formData.contact_number.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Move to payment step
    setStep(2);
    toast.success('Patient info saved. Please collect payment.');
  };

  const handlePayment = async () => {
    try {
      const patientData = {
        ...formData,
        assigned_doctor_id: (formData.assigned_doctor_id && formData.assigned_doctor_id !== 'auto')
          ? formData.assigned_doctor_id
          : undefined,
      };

      const newPatient = await createPatientMutation.mutateAsync(patientData);

      // Check if payment requires redirect (Chapa)
      if (newPatient.payment?.payment_url) {
        // Store reference for callback verification
        const reference = newPatient.payment.reference;

        // Redirect to Chapa payment page
        toast.info('Redirecting to payment gateway...');
        window.location.href = newPatient.payment.payment_url;
        return;
      }

      // Cash payment - show success immediately
      setRegisteredPatient(newPatient);
      setStep(3);
      toast.success('Patient registered successfully!');
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const resetForm = () => {
    setStep(1);
    setRegisteredPatient(null);
    setFormData({
      first_name: '',
      last_name: '',
      date_of_birth: '',
      gender: 'M',
      contact_number: '',
      address: '',
      assigned_doctor_id: '',
      payment_method: 'cash',
      amount: 500,
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Register New Patient</h1>
        <p className="text-muted-foreground">Complete the registration form and collect payment</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4">
        {[
          { num: 1, label: 'Patient Info' },
          { num: 2, label: 'Payment' },
          { num: 3, label: 'Complete' },
        ].map((s, index) => (
          <React.Fragment key={s.num}>
            <div className={`flex items-center gap-2 ${step >= s.num ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${step >= s.num ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                {step > s.num ? <Check className="w-4 h-4" /> : s.num}
              </div>
              <span className="text-sm font-medium hidden sm:inline">
                {s.label}
              </span>
            </div>
            {index < 2 && <div className={`w-12 h-0.5 ${step > s.num ? 'bg-primary' : 'bg-muted'}`} />}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Patient Information */}
      {step === 1 && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-primary" />
              Patient Information
            </CardTitle>
            <CardDescription>
              Enter patient details and assign a doctor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePatientInfoSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="first_name"
                      value={formData.first_name}
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      className="pl-10"
                      placeholder="First name"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name *</Label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date_of_birth">Date of Birth</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="date_of_birth"
                      type="date"
                      value={formData.date_of_birth}
                      onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value: 'M' | 'F') => setFormData({ ...formData, gender: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Male</SelectItem>
                      <SelectItem value="F">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_number">Contact Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="contact_number"
                    value={formData.contact_number}
                    onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })}
                    className="pl-10"
                    placeholder="+251..."
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="pl-10"
                    placeholder="City, subcity..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="doctor">Assign Doctor</Label>
                <div className="relative">
                  <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                  <Select
                    value={formData.assigned_doctor_id}
                    onValueChange={(value) => setFormData({ ...formData, assigned_doctor_id: value })}
                  >
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder={isLoadingDoctors ? "Loading doctors..." : "Auto-assign (optional)"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto-assign</SelectItem>
                      {doctors?.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id.toString()}>
                          Dr. {doctor.first_name} {doctor.last_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                <ArrowRight className="w-4 h-4 mr-2" />
                Continue to Payment
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Payment */}
      {step === 2 && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Collect Registration Fee
            </CardTitle>
            <CardDescription>
              Patient: <span className="font-medium text-foreground">{formData.first_name} {formData.last_name}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-lg bg-muted/50 space-y-2">
              <Label htmlFor="amount">Registration Fee (ETB)</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                className="text-lg font-bold"
              />
            </div>

            <div className="space-y-3">
              <Label>Payment Method</Label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, payment_method: 'cash' })}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${formData.payment_method === 'cash'
                    ? 'border-primary bg-primary/5'
                    : 'border-input hover:border-primary/50'
                    }`}
                >
                  <div className="font-semibold">Cash</div>
                  <div className="text-sm text-muted-foreground">Immediate confirmation</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, payment_method: 'chapa' })}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${formData.payment_method === 'chapa'
                    ? 'border-primary bg-primary/5'
                    : 'border-input hover:border-primary/50'
                    }`}
                >
                  <div className="font-semibold">Chapa</div>
                  <div className="text-sm text-muted-foreground">Online payment</div>
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button
                onClick={handlePayment}
                className="flex-1"
                size="lg"
                disabled={createPatientMutation.isPending}
              >
                {createPatientMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    {formData.payment_method === 'cash' ? 'Confirm Cash Payment' : 'Process Chapa Payment'}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Success */}
      {step === 3 && registeredPatient && (
        <Card className="animate-scale-in">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-success" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Registration Complete!</h3>
                <p className="text-muted-foreground">Patient has been added to the queue</p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-muted/50 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Queue Number</span>
                <Badge variant="secondary" className="text-lg font-bold">
                  #{registeredPatient.queue_number}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Patient Name</span>
                <span className="font-medium">{registeredPatient.first_name} {registeredPatient.last_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Assigned Doctor</span>
                <span className="font-medium">Dr. {registeredPatient.assigned_doctor?.first_name} {registeredPatient.assigned_doctor?.last_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Status</span>
                <Badge variant="default">Paid</Badge>
              </div>
            </div>

            <Button onClick={resetForm} className="w-full mt-6" size="lg">
              <UserPlus className="w-4 h-4 mr-2" />
              Register Another Patient
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RegisterPatient;
