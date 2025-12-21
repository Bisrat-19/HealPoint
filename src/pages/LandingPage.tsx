import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Activity, Shield, Heart, Clock, Star, CheckCircle } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <Activity className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                            HealPoint
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                            About
                        </Button>
                        <Button onClick={() => navigate('/login')}>
                            Login
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8 animate-in slide-in-from-left duration-700 fade-in">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                                <Star className="w-4 h-4 fill-primary" />
                                <span>For Healthcare Professionals</span>
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                                Streamlined <br />
                                <span className="text-primary">Hospital Management</span>
                            </h1>
                            <p className="text-lg text-muted-foreground max-w-xl">
                                The all-in-one platform for receptionists, doctors, and administrators. Efficiently manage patient records, appointments, and treatments.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="text-lg h-12 px-8" onClick={() => navigate('/login')}>
                                    Staff Login
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                                <Button size="lg" variant="outline" className="text-lg h-12 px-8">
                                    Learn More
                                </Button>
                            </div>
                            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50">
                                <div>
                                    <h3 className="text-3xl font-bold text-primary">Fast</h3>
                                    <p className="text-sm text-muted-foreground">Patient Registration</p>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-primary">Secure</h3>
                                    <p className="text-sm text-muted-foreground">Records Management</p>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-primary">Easy</h3>
                                    <p className="text-sm text-muted-foreground">Scheduling</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative lg:h-[600px] flex items-center justify-center animate-in slide-in-from-right duration-700 fade-in delay-200">
                            {/* Decorative elements */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl opacity-30 animate-pulse" />
                            <div className="relative w-full max-w-md lg:max-w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-border/50 group">
                                <img
                                    src="/hero-image-animated.png"
                                    alt="Doctor and Mother Animation"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                                    <p className="font-medium text-lg">"Caring for our community, one family at a time."</p>
                                    <p className="text-sm opacity-80 mt-2">- Dr. Sntayehu & Family</p>
                                </div>
                            </div>

                            {/* Floating cards */}
                            <div className="absolute -left-8 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur border border-border p-4 rounded-xl shadow-lg animate-in fade-in zoom-in duration-500 delay-500 hidden lg:block">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Certified Care</p>
                                        <p className="text-xs text-muted-foreground">ISO 9001:2015</p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -right-8 bottom-32 bg-background/90 backdrop-blur border border-border p-4 rounded-xl shadow-lg animate-in fade-in zoom-in duration-500 delay-700 hidden lg:block">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                        <Heart className="w-5 h-5 text-red-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Top Rated</p>
                                        <p className="text-xs text-muted-foreground">4.9/5 Stars</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="about" className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">Why Choose HealPoint?</h2>
                        <p className="text-muted-foreground">
                            Designed specifically for hospital workflows. Empower your staff with tools that simplify daily operations and improve patient care coordination.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Clock className="w-6 h-6 text-primary" />,
                                title: "Efficient Scheduling",
                                description: "Receptionists can quickly book, reschedule, and manage appointments for multiple doctors."
                            },
                            {
                                icon: <Shield className="w-6 h-6 text-primary" />,
                                title: "Secure Records",
                                description: "Keep patient data safe and easily accessible for authorized medical staff only."
                            },
                            {
                                icon: <Activity className="w-6 h-6 text-primary" />,
                                title: "Doctor Workflow",
                                description: "Doctors can view their daily schedule, access patient history, and record treatments seamlessly."
                            }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-background p-6 rounded-2xl border border-border hover:border-primary/50 transition-colors hover:shadow-lg group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="bg-primary rounded-3xl p-8 md:p-16 text-center text-primary-foreground relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay" />
                        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold">Ready to Optimize Your Workflow?</h2>
                            <p className="text-primary-foreground/80 text-lg">
                                Log in to access the hospital management dashboard.
                            </p>
                            <Button
                                size="lg"
                                variant="secondary"
                                className="text-lg h-12 px-8"
                                onClick={() => navigate('/login')}
                            >
                                Access Dashboard
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-border">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                                <Activity className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold">HealPoint</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} HealPoint Hospital. All rights reserved.
                        </div>
                        <div className="flex gap-6">
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy</a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms</a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
