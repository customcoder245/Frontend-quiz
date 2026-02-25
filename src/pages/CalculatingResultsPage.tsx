import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, CheckCircle2, Star, Menu, X } from 'lucide-react';

export default function CalculatingResultsPage() {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    clearInterval(timer);
                    return 100;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 200);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-white font-sans flex flex-col">
            {/* Header */}
            <header className="px-6 py-6 flex items-center justify-between border-b border-[#1a1a1b]/5">
                <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                    <img src="/logo.png" alt="The Mediterranean Diet" className="h-8 md:h-10 w-auto object-contain" />
                </div>

                <div className="hidden sm:flex items-center space-x-6">
                    <div className="flex items-center space-x-2 text-[12px] font-black text-[#1a1a1b]/60">
                        <CheckCircle2 className="w-5 h-5 text-[#34a853]" />
                        <span>95% Success rate</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[12px] font-black text-[#1a1a1b]/60">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                        <span>Trusted by 127K+</span>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="rounded-full p-2 text-[#1a1a1b] transition-colors hover:bg-black/5 sm:hidden"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </header>

            {/* Mobile Sidebar */}
            <div
                className={`fixed inset-0 z-50 flex justify-end transition-all duration-300 md:hidden ${isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Sidebar Panel */}
                <div
                    className={`relative flex h-full w-[280px] flex-col bg-white p-6 shadow-2xl transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <div className="mb-8 flex items-center justify-between">
                        <span className="text-xl font-black text-[#1a1a1b]">Menu</span>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="rounded-full p-2 text-[#1a1a1b] transition-colors hover:bg-black/5"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <nav className="flex flex-col space-y-6">
                        <ul>
                            <li className='py-2'>
                                <a href="#" className="text-base font-normal text-[#10181F]">
                                    Home
                                </a>
                            </li>
                            <li className='py-2'>
                                <a href="#" className="text-base font-normal text-[#10181F]">
                                    About us
                                </a>
                            </li>
                            <li className='py-2'>
                                <a href="#" className="text-base font-normal text-[#10181F]">
                                    FAQ
                                </a>
                            </li>
                            <li className='py-2'>
                                <a href="#" className="text-base font-normal text-[#10181F]">
                                    Contact us
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <div className="mt-auto border-t border-black/5">
                        <button
                            className="shadow-primary/20 w-full py-2 rounded-full bg-gradient-to-r from-[#D90655] to-[#FC3F39] text-[16px] font-bold text-white shadow-xl transition-all hover:opacity-90 active:scale-[0.98]"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>

            <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-12 flex flex-col items-center">
                <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1b] tracking-tight mb-12">
                    Calculating results
                </h2>

                {/* Circular Progress Placeholder */}
                <div className="relative w-64 h-64 mb-16 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="128"
                            cy="128"
                            r="110"
                            stroke="#f4f4f5"
                            strokeWidth="24"
                            fill="transparent"
                        />
                        <circle
                            cx="128"
                            cy="128"
                            r="110"
                            stroke="url(#gradient)"
                            strokeWidth="24"
                            fill="transparent"
                            strokeDasharray={2 * Math.PI * 110}
                            strokeDashoffset={2 * Math.PI * 110 * (1 - progress / 100)}
                            strokeLinecap="round"
                            className="transition-all duration-300"
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#D90655" />
                                <stop offset="100%" stopColor="#FC3F39" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-6xl font-black text-[#1a1a1b]">{Math.round(progress)}%</span>
                    </div>
                </div>

                {/* Info Box */}
                <div className="w-full bg-[#34a853]/5 border-2 border-[#34a853]/10 rounded-[24px] p-6 flex items-start space-x-4 mb-8">
                    <div className="w-8 h-8 bg-[#34a853] rounded-full flex items-center justify-center text-white flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-lg font-black text-[#1a1a1b]">Join over 1.1 million people</p>
                        <p className="text-[#1a1a1b]/60 font-medium">Who&apos;ve already created their Mediterranean plan</p>
                    </div>
                </div>

                {/* Testimonial Card */}
                <div className="w-full bg-white rounded-[32px] p-8 border-2 border-[#1a1a1b]/5 shadow-xl shadow-[#1a1a1b]/5 mb-10">
                    <div className="space-y-6">
                        <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} className="w-5 h-5 fill-[#1a1a1b] text-[#1a1a1b]" />
                            ))}
                        </div>
                        <p className="text-lg font-bold text-[#1a1a1b]/60 italic leading-relaxed">
                            &ldquo;This quiz helped me understand what kind of Mediterranean diet actually works for me. The meal plan is simple, delicious, and fits perfectly into my routine. I finally feel consistent without stress.&rdquo;
                        </p>
                        <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 bg-[#f4f4f5] rounded-full border-2 border-[#1a1a1b]/5 flex items-center justify-center overflow-hidden">
                                <span className="font-black text-[#1a1a1b]/20">MR</span>
                            </div>
                            <div>
                                <p className="font-black text-[#1a1a1b]">Michael R.</p>
                                <p className="text-xs font-bold text-[#1a1a1b]/30 uppercase tracking-widest">Managing Partner, DP Group</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Button
                    className={`w-full h-16 text-xl font-black rounded-full transition-all shadow-lg shadow-primary/20
                        ${progress < 100 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                    disabled={progress < 100}
                    onClick={() => navigate('/predicted')}
                >
                    Continue
                </Button>

                <div className="mt-12 py-6 flex items-center space-x-2 text-xs font-bold text-[#1a1a1b]/60">
                    <div className="w-2 h-2 bg-[#34a853] rounded-full animate-pulse" />
                    <span>856 people are taking this quiz right now</span>
                </div>
            </main>
        </div>
    );
}
