import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { useTreatment } from '@/hooks/treatments';
import { Appointment } from '@/types/api';
import { Loader2, FileText, Stethoscope, Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface TreatmentDetailModalProps {
    appointment: Appointment | null;
    isOpen: boolean;
    onClose: () => void;
}

const TreatmentDetailModal = ({ appointment, isOpen, onClose }: TreatmentDetailModalProps) => {
    const { data: treatment, isLoading } = useTreatment(appointment?.treatment || null, {
        enabled: isOpen && !!appointment?.treatment,
    });

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Stethoscope className="w-5 h-5 text-primary" />
                        Treatment Details
                    </DialogTitle>
                    <DialogDescription>
                        Associated with appointment #{appointment?.display_id}
                    </DialogDescription>
                </DialogHeader>

                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : treatment ? (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground uppercase font-semibold">Patient</p>
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-muted-foreground" />
                                    <p className="text-sm font-medium">{treatment.patient.first_name} {treatment.patient.last_name}</p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground uppercase font-semibold">Doctor</p>
                                <div className="flex items-center gap-2">
                                    <Stethoscope className="w-4 h-4 text-muted-foreground" />
                                    <p className="text-sm font-medium">Dr. {treatment.doctor.first_name} {treatment.doctor.last_name}</p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground uppercase font-semibold">Date</p>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                    <p className="text-sm font-medium">{new Date(treatment.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground uppercase font-semibold">Follow-up</p>
                                <Badge variant={treatment.follow_up_required ? "secondary" : "outline"}>
                                    {treatment.follow_up_required ? "Required" : "Not Required"}
                                </Badge>
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-primary" />
                                <h4 className="text-sm font-semibold">Clinical Notes</h4>
                            </div>
                            <div className="p-3 rounded-md bg-muted/50 border">
                                <p className="text-sm text-foreground whitespace-pre-wrap">
                                    {treatment.notes || "No notes recorded."}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-success" />
                                <h4 className="text-sm font-semibold">Prescription</h4>
                            </div>
                            <div className="p-3 rounded-md bg-success/5 border border-success/20">
                                <p className="text-sm text-foreground whitespace-pre-wrap">
                                    {treatment.prescription || "No prescription recorded."}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        <p>No treatment details found for this appointment.</p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default TreatmentDetailModal;
