import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Loader2, Home, UserPlus } from 'lucide-react';
import { useVerifyPayment } from '@/hooks/payments';

const PaymentCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'failed'>('loading');
    const verifyPaymentMutation = useVerifyPayment();

    useEffect(() => {
        const tx_ref = searchParams.get('tx_ref');

        if (!tx_ref) {
            setVerificationStatus('failed');
            return;
        }

        // Verify payment with backend
        verifyPaymentMutation.mutate(tx_ref, {
            onSuccess: (data) => {
                if (data.status === 'paid') {
                    setVerificationStatus('success');
                } else {
                    setVerificationStatus('failed');
                }
            },
            onError: () => {
                setVerificationStatus('failed');
            },
        });
    }, [searchParams]);

    return (
        <div className="max-w-2xl mx-auto mt-12 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-center">Payment Verification</CardTitle>
                </CardHeader>
                <CardContent>
                    {verificationStatus === 'loading' && (
                        <div className="text-center space-y-4 py-8">
                            <Loader2 className="w-16 h-16 mx-auto animate-spin text-primary" />
                            <div>
                                <h3 className="text-xl font-bold text-foreground">Verifying Payment...</h3>
                                <p className="text-muted-foreground">Please wait while we confirm your payment</p>
                            </div>
                        </div>
                    )}

                    {verificationStatus === 'success' && (
                        <div className="text-center space-y-4 py-8">
                            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-10 h-10 text-success" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-foreground">Payment Successful!</h3>
                                <p className="text-muted-foreground">
                                    Your payment has been verified and the patient has been registered successfully.
                                </p>
                            </div>
                            <div className="flex gap-3 justify-center pt-4">
                                <Button onClick={() => navigate('/')} variant="outline">
                                    <Home className="w-4 h-4 mr-2" />
                                    Go to Dashboard
                                </Button>
                                <Button onClick={() => navigate('/register-patient')}>
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Register Another Patient
                                </Button>
                            </div>
                        </div>
                    )}

                    {verificationStatus === 'failed' && (
                        <div className="text-center space-y-4 py-8">
                            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                                <XCircle className="w-10 h-10 text-destructive" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-foreground">Payment Failed</h3>
                                <p className="text-muted-foreground">
                                    We couldn't verify your payment. The transaction may have been cancelled or failed.
                                </p>
                            </div>
                            <div className="flex gap-3 justify-center pt-4">
                                <Button onClick={() => navigate('/')} variant="outline">
                                    <Home className="w-4 h-4 mr-2" />
                                    Go to Dashboard
                                </Button>
                                <Button onClick={() => navigate('/register-patient')}>
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Try Again
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default PaymentCallback;
