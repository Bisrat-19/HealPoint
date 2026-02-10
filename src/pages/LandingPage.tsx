import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogin } from '@/hooks/auth';
import {
    Activity,
    Lock,
    User,
    AlertCircle,
    Eye,
    EyeOff,
    Plus,
    HeartPulse,
    Stethoscope,
    ClipboardList,
    Shield,
    Users
} from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();
    const { login: loginContext } = useAuth();
    const loginMutation = useLogin();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        loginMutation.mutate(
            { username, password },
            {
                onSuccess: async (data) => {
                    loginContext(data);
                    navigate('/dashboard');
                },
                onError: (err: any) => {
                    setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
                }
            }
        );
    };

    return (
        <div className="h-screen w-full bg-[#f0f7ff] flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden font-sans select-none">

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-white/40 rounded-full blur-[120px] mix-blend-soft-light" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/40 rounded-full blur-[100px] mix-blend-soft-light" />

                <Plus className="absolute top-[15%] left-[5%] w-16 h-16 text-blue-200/50 rotate-12 hidden md:block" />
                <Plus className="absolute bottom-[20%] left-[8%] w-12 h-12 text-blue-200/40 -rotate-12 hidden md:block" />
                <Stethoscope className="absolute top-[20%] right-[5%] w-24 h-24 text-blue-200/50 -rotate-12 hidden md:block" />
                <ClipboardList className="absolute bottom-[10%] right-[10%] w-24 h-24 text-blue-200/50 rotate-6 hidden md:block" />
                <HeartPulse className="absolute top-[45%] right-[2%] w-12 h-12 text-blue-300/40 hidden md:block" />
            </div>

            <div className="w-full max-w-6xl bg-white/70 backdrop-blur-xl rounded-[40px] shadow-[0_32px_120px_-20px_rgba(0,102,255,0.08)] border border-white/60 relative z-10 flex flex-col md:flex-row min-h-[650px] max-h-[850px] overflow-hidden">

                <div className="flex-[1.2] p-10 md:p-16 flex flex-col justify-between items-start">
                    <div className="w-full pt-2">
                        <div className="flex items-center gap-4 mb-10 group">
                            <div className="w-11 h-11 rounded-[16px] bg-[#0061f2] flex items-center justify-center shadow-lg shadow-blue-500/10 transition-transform duration-500 group-hover:rotate-[10deg]">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black text-[#012970] tracking-tighter leading-none">
                                    HealPoint <span className="text-[#0061f2] ml-0.5">HMS</span>
                                </span>
                                <div className="flex items-center gap-2 mt-1.5">
                                    <div className="h-[2px] w-4 bg-blue-600/40 rounded-full" />
                                    <span className="text-[9px] font-black text-blue-500/80 uppercase tracking-[0.4em]">Clinical intelligence</span>
                                </div>
                            </div>
                        </div>

                        <div className="max-w-[420px] space-y-4 animate-in fade-in slide-in-from-left-4 duration-700 delay-100">
                            <h1 className="text-3xl md:text-[40px] font-black text-[#012970] leading-[1.1] tracking-tight">
                                Unified Hospital <br className="hidden md:block" />
                                <span className="text-[#0061f2]">Intelligence System.</span>
                            </h1>
                            <p className="text-lg text-[#556987] font-medium leading-relaxed max-w-[380px]">
                                A centralized, real time workspace for efficient clinical management and hospital wide coordination.
                            </p>
                        </div>
                    </div>

                    <div className="relative w-full aspect-video max-w-[500px] hidden sm:flex items-center justify-center mb-10 pr-12 mt-4">
                        <div className="relative w-full h-full flex items-center justify-center">
                            <div className="absolute w-36 h-36 bg-blue-600/5 rounded-[40px] flex items-center justify-center animate-pulse">
                                <div className="w-20 h-20 bg-blue-600/10 rounded-[30px] flex items-center justify-center">
                                    <Activity className="w-10 h-10 text-blue-600" />
                                </div>
                            </div>

                            <div className="absolute top-2 -left-6 w-28 h-28 bg-white rounded-3xl shadow-xl shadow-blue-500/5 border border-blue-50 flex flex-col items-center justify-center p-4">
                                <Users className="w-7 h-7 text-blue-500 mb-2" />
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Staff Node</span>
                            </div>

                            <div className="absolute bottom-0 -right-4 w-36 h-36 bg-white rounded-[40px] shadow-xl shadow-blue-500/5 border border-blue-50 flex flex-col items-center justify-center p-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-3">
                                    <HeartPulse className="w-6 h-6 text-blue-600" />
                                </div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none text-center px-4">Patient Data</span>
                            </div>

                            <div className="absolute top-1/2 -left-12 -translate-y-1/2 w-24 h-24 bg-white rounded-[24px] shadow-lg shadow-blue-500/5 border border-blue-50 flex items-center justify-center p-4">
                                <Stethoscope className="w-8 h-8 text-[#00a1ff]" />
                            </div>

                            <div className="absolute inset-4 border-2 border-dashed border-blue-100/50 rounded-[48px] -z-10" />
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg-slate-50/20 p-8 md:p-12 border-l border-blue-50/30 flex flex-col justify-center">
                    <div className="bg-white rounded-[40px] p-10 shadow-[0_40px_100px_-20px_rgba(0,102,255,0.06)] border border-blue-50/50">
                        <div className="text-left mb-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3 border border-blue-100/50">
                                <Shield className="w-3 h-3" />
                                <span>Secure Node Login</span>
                            </div>
                            <h2 className="text-3xl font-black text-[#012970] tracking-tight">Staff Login</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 text-red-600 text-[11px] font-bold border border-red-100/50 animate-in fade-in zoom-in duration-300">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    {error}
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Username</Label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                                        <Input
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="pl-12 h-14 bg-slate-50/50 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-blue-100 focus-visible:bg-white transition-all text-sm font-semibold text-[#012970]"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center px-1">
                                        <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Password</Label>
                                        <button type="button" className="text-[9px] font-black text-blue-500 uppercase tracking-widest hover:text-blue-600 transition-colors">Recovery</button>
                                    </div>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="pl-12 pr-12 h-14 bg-slate-50/50 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-blue-100 focus-visible:bg-white transition-all text-sm font-semibold text-[#012970]"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-blue-500 transition-colors focus:outline-none"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-14 bg-[#0c7094] hover:bg-[#0a5a78] text-white text-sm font-bold rounded-2xl shadow-xl shadow-blue-100 transition-all active:scale-[0.98] mt-4 uppercase tracking-[0.1em]"
                                disabled={loginMutation.isPending}
                            >
                                {loginMutation.isPending ? 'Verifying...' : 'Login'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-2 w-full flex flex-col md:flex-row items-center justify-between px-16 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] z-0 pointer-events-none">
                <div className="flex items-center gap-3 opacity-60">
                    <Activity className="w-3.5 h-3.5 text-blue-500" />
                    <span>Secure Node: HP-ALPHA-01</span>
                </div>
                <div className="mt-4 md:mt-0 opacity-40">
                    HealPoint Framework © {new Date().getFullYear()}
                </div>
            </div>

        </div>
    );
};

export default LandingPage;
