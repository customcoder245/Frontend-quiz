import { useNavigate } from 'react-router-dom';
import { Star, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function HomePage() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        /* Entire page locked to viewport height with no scroll */
        <div className="selection:bg-primary/20 flex h-screen flex-col overflow-hidden bg-white font-sans selection:text-primary-foreground">

            {/* Header / Nav - UI preserved exactly as original */}
            <div className="w-full px-4 md:px-8 py-4 shrink-0 transition-all duration-300">
                <header className="z-30 flex w-full items-center justify-between bg-white bg-opacity-30 backdrop-blur-lg px-4 md:px-8 py-3 md:py-4 rounded-full shadow-[4px_4px_10px_0px_rgba(0,0,0,0.05)] transition-all duration-300">
                    <div className="flex items-center">
                        <img
                            src="/logo.png"
                            alt="The Mediterranean Diet"
                            className="h-8 w-auto object-contain md:h-11 transition-all duration-300"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <nav className="hidden items-center space-x-10 md:flex">
                            <a href="#" className="text-sm font-bold text-[#1a1a1b] transition-opacity hover:opacity-70">Home</a>
                            <a href="#" className="text-sm font-bold text-[#1a1a1b] transition-opacity hover:opacity-70">About us</a>
                            <a href="#" className="text-sm font-bold text-[#1a1a1b] transition-opacity hover:opacity-70">FAQ</a>
                            <a href="#" className="text-sm font-bold text-[#1a1a1b] transition-opacity hover:opacity-70">Contact us</a>
                        </nav>
                        <button className="hidden md:block bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 h-[35px] min-w-[25px] rounded-full px-8 md:px-16 text-[14px] font-bold text-white transition-all active:scale-[0.98]" onClick={() => navigate('/login')}>Login</button>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-[#1a1a1b] hover:bg-black/5 rounded-full transition-colors"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </header>
            </div>

            {/* Mobile Sidebar / Slider */}
            <div className={`fixed inset-0 z-50 flex justify-end md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />

                {/* Sidebar Panel */}
                <div className={`relative w-[280px] h-full bg-white shadow-2xl flex flex-col p-6 transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex items-center justify-between mb-8">
                        <span className="text-xl font-black text-[#1a1a1b]">Menu</span>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 rounded-full hover:bg-black/5 transition-colors text-[#1a1a1b]"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <nav className="flex flex-col space-y-6">
                        <a href="#" className="text-lg font-bold text-[#1a1a1b] hover:text-primary transition-colors">Home</a>
                        <a href="#" className="text-lg font-bold text-[#1a1a1b] hover:text-primary transition-colors">About us</a>
                        <a href="#" className="text-lg font-bold text-[#1a1a1b] hover:text-primary transition-colors">FAQ</a>
                        <a href="#" className="text-lg font-bold text-[#1a1a1b] hover:text-primary transition-colors">Contact us</a>
                    </nav>

                    <div className="mt-auto pt-8 border-t border-black/5">
                        <button
                            className="w-full bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 h-[50px] rounded-full text-[16px] font-bold text-white transition-all active:scale-[0.98]"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Hero Section */}
            <main className="relative flex flex-1 items-center overflow-hidden">
                {/* Background Hero Image - Responsive: hidden on mobile, scaled on tablet, full on desktop */}
                <div className="absolute pointer-events-none hidden md:block -z-0 md:w-[800px] md:h-[800px] md:-top-[150px] md:-right-[200px] lg:w-[2417px] lg:h-[2478px] lg:-top-[849px] lg:-right-[450px] transition-all duration-500 ease-in-out">
                    <img
                        src="/hero-meals.png"
                        alt=""
                        className="w-full h-full object-contain drop-shadow-[-40px_60px_100px_rgba(0,0,0,0.05)]"
                    />
                </div>

                <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center justify-between max-w-[1920px] mx-auto">
                    {/* Left Side: Text Content */}
                    <div className="w-full lg:w-[60%] space-y-10">
                        <div className="space-y-6">
                            <h1 className="font-AmsiPro-Black text-[44px] md:text-[64px] lg:text-[76px] font-black leading-[1.05] tracking-tight text-[#1a1a1b]">
                                Create your ideal 30-day <br className="hidden xl:block" />
                                Mediterranean meal plan
                            </h1>
                            <p className="font-AmsiPro-Regular text-20px md:text-2xl font-bold text-[#1a1a1b]/30">
                                Take 1-minute FREE test
                            </p>
                        </div>

                        <div className="space-y-6">
                            <p className="font-AmsiPro-Regular text-[13px] font-bold text-[#1a1a1b]/40">
                                Start by selecting your gender:
                            </p>

                            <div className="flex flex-col sm:flex-row gap-5">
                                <button
                                    className="h-[56px] sm:w-[196px] rounded-[50px] bg-gradient-to-r from-[#e91e63] to-[#f06292] text-[24px] font-bold text-white transition-all active:scale-[0.98] shadow-xl shadow-pink-100"
                                    onClick={() => navigate('/quiz')}
                                >
                                    Female
                                </button>
                                <button
                                    className="h-[56px] sm:w-[195px] rounded-[50px] bg-[#1a1a1b] text-[24px] font-bold text-white transition-all hover:bg-[#2a2a2b] active:scale-[0.98] shadow-xl shadow-black/5"
                                    onClick={() => navigate('/quiz')}
                                >
                                    Male
                                </button>
                            </div>
                        </div>

                        {/* Social Proof */}
                        <div className="flex flex-wrap items-center gap-x-10 gap-y-4 pt-4">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Star key={i} className="h-4 w-4 fill-[#ff9500] text-[#ff9500]" />
                                    ))}
                                </div>
                                <p className="text-[13px] font-bold text-[#1a1a1b]">
                                    2475 customer reviews
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-lg">🛡️</span>
                                <span className="text-[13px] font-bold text-[#1a1a1b]">
                                    Trusted by 127K+
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Sticky Footer */}
            <footer className="w-full px-6 md:px-12 py-6 mt-auto shrink-0">
                <div className="mx-auto flex max-w-[1800px] flex-col md:flex-row items-start justify-between gap-6 border-t border-slate-50 pt-2">
                    <p className="text-[12px] font-AmsiPro-Regular font-bold text-[#1a1a1b]/20">
                        © 2026 Mediterranean Plan. <br /> All rights reserved.
                    </p>

                    <div className="max-w-[700px] md:text-right">
                        <p className="text-[12px] font-AmsiPro-Regular leading-relaxed font-bold text-[#1a1a1b]/10">
                            Disclaimer: Results may vary depending on the individual. By <br />
                            proceeding, you agree to our <span className="underline cursor-pointer">Terms of Service</span>, <span className="underline cursor-pointer">Privacy Policy</span>.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}