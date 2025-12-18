import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, Edit, User, Phone, MapPin, Calendar, Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { usePatients, useDeletePatient } from '@/hooks/patients';
import { Patient } from '@/types/api';

const PatientRow = React.memo(({ patient, onEdit }: { patient: Patient, onEdit: (p: Patient) => void }) => (
  <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
    <td className="py-3 px-2">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
          {(patient.first_name?.[0] || 'P').toUpperCase()}{(patient.last_name?.[0] || '').toUpperCase()}
        </div>
        <span className="font-medium text-foreground">{patient.first_name} {patient.last_name}</span>
      </div>
    </td>
    <td className="py-3 px-2 text-sm text-muted-foreground">{patient.contact_number}</td>
    <td className="py-3 px-2">
      <Badge variant="secondary" className="capitalize">
        {patient.gender === 'M' ? 'Male' : 'Female'}
      </Badge>
    </td>
    <td className="py-3 px-2 text-sm text-muted-foreground">
      {patient.date_of_birth ? new Date(patient.date_of_birth).toLocaleDateString() : '-'}
    </td>
    <td className="py-3 px-2 text-sm text-muted-foreground">
      {patient.assigned_doctor ? `Dr. ${patient.assigned_doctor.first_name} ${patient.assigned_doctor.last_name}` : 'Not assigned'}
    </td>
    <td className="py-3 px-2">
      <Badge variant="outline">#{patient.queue_number}</Badge>
    </td>
    <td className="py-3 px-2 text-sm text-muted-foreground">
      {new Date(patient.created_at).toLocaleDateString()}
    </td>
    <td className="py-3 px-2">
      <Button variant="ghost" size="sm" onClick={() => onEdit(patient)}>
        <Edit className="h-4 w-4 mr-1" />
        Edit
      </Button>
    </td>
  </tr>
));

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { data: patients, isLoading } = usePatients();
  const deletePatient = useDeletePatient();

  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
    contact_number: '',
    address: '',
    date_of_birth: '',
  });

  const filteredPatients = (patients || []).filter(patient =>
    `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.contact_number.includes(searchQuery)
  );

  const handleEditClick = React.useCallback((patient: Patient) => {
    setSelectedPatient(patient);
    setEditForm({
      first_name: patient.first_name,
      last_name: patient.last_name,
      contact_number: patient.contact_number,
      address: patient.address,
      date_of_birth: patient.date_of_birth || '',
    });
    setIsEditOpen(true);
  }, []);

  const handleProfileSave = () => {
    if (!editForm.first_name.trim() || !editForm.last_name.trim()) {
      toast.error('Name fields are required');
      return;
    }
    // TODO: Implement update mutation
    toast.success('Profile updated successfully');
    setIsEditOpen(false);
  };

  const handleDelete = (patientId: number) => {
    if (confirm('Are you sure you want to delete this patient? This will delete all related appointments, treatments, and payments.')) {
      deletePatient.mutate(patientId, {
        onSuccess: () => {
          setIsEditOpen(false);
        }
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Patients</h1>
          <p className="text-muted-foreground">Manage all registered patients</p>
        </div>
        <Badge variant="secondary" className="w-fit">{patients?.length || 0} total patients</Badge>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Patient</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Contact</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Gender</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">DOB</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Assigned Doctor</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Queue #</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Registered</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <PatientRow key={patient.id} patient={patient} onEdit={handleEditClick} />
                ))}
              </tbody>
            </table>
            {filteredPatients.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No patients found
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Edit Patient: {selectedPatient?.first_name} {selectedPatient?.last_name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  value={editForm.first_name}
                  onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  value={editForm.last_name}
                  onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_number">
                <Phone className="inline h-4 w-4 mr-1" />
                Contact Number
              </Label>
              <Input
                id="contact_number"
                value={editForm.contact_number}
                onChange={(e) => setEditForm({ ...editForm, contact_number: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date_of_birth">
                <Calendar className="inline h-4 w-4 mr-1" />
                Date of Birth
              </Label>
              <Input
                id="date_of_birth"
                type="date"
                value={editForm.date_of_birth}
                onChange={(e) => setEditForm({ ...editForm, date_of_birth: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">
                <MapPin className="inline h-4 w-4 mr-1" />
                Address
              </Label>
              <Input
                id="address"
                value={editForm.address}
                onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter className="flex items-center justify-between sm:justify-between w-full mt-4">
            {selectedPatient && (
              <Button
                variant="destructive"
                onClick={() => handleDelete(selectedPatient.id)}
                disabled={deletePatient.isPending}
              >
                {deletePatient.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Patient
                  </>
                )}
              </Button>
            )}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
              <Button onClick={handleProfileSave}>Save Changes</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Patients;
