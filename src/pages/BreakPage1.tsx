import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, CheckCircle2, ArrowLeft, Activity, Menu, X } from 'lucide-react';

export default function BreakPage1() {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="rounded-full p-2 text-[#1a1a1b] transition-colors hover:bg-black/5 sm:hidden"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <Menu size={24} />
                </button>
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

            {/* Progress Area */}
            <div className="max-w-3xl mx-auto w-full px-6 pt-10 pb-6 space-y-8">
                <div className="flex items-center justify-between">
                    <button className="p-2 hover:bg-[#1a1a1b]/5 rounded-full transition-colors text-[#1a1a1b]/40" onClick={() => navigate(-1)}>
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <span className="text-xl font-black text-[#1a1a1b]/20 tracking-tighter">
                        2/24
                    </span>
                </div>
                <div className="w-full h-2 bg-[#f4f4f5] rounded-full overflow-hidden relative">
                    <div className="h-full bg-gradient-to-r from-[#D90655] to-[#FC3F39] rounded-full transition-all duration-500" style={{ width: '8.33%' }} />
                    <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#1a1a1b] border-2 border-white rounded-full shadow-md z-10 left-[calc(8.33%-8px)]" />
                </div>
            </div>

            {/* Snapshot Content */}
            <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-8 flex flex-col items-center">
                <div className="text-center space-y-3 mb-12">
                    <p className="text-sm font-bold text-[#1a1a1b]/40 uppercase tracking-widest">Your health snapshot</p>
                    <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1b] tracking-tight">
                        Here&apos;s what we&apos;ve learned so far
                    </h2>
                </div>

                {/* Info Card */}
                <div className="w-full bg-white rounded-[32px] p-1 border-2 border-[#1a1a1b]/5 shadow-xl shadow-[#1a1a1b]/5 mb-8">
                    <div className="p-8 space-y-8">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-[#34a853]/10 rounded-full flex items-center justify-center text-[#34a853]">
                                <Activity className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-black text-[#1a1a1b]">Daily activity level</span>
                        </div>

                        <div className="bg-[#f4f4f5] rounded-[24px] p-8 space-y-8 text-center sm:text-left">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-[#1a1a1b]">Somewhat active</h3>
                                <p className="text-[#1a1a1b]/40 font-bold">2-4 workouts per week or active job</p>
                            </div>

                            {/* Slider Placeholder */}
                            <div className="relative pt-6">
                                <div className="w-full h-2 bg-[#1a1a1b]/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-yellow-400 via-green-500 to-green-600 rounded-full w-1/2" />
                                </div>
                                <div className="absolute top-[21px] left-1/2 -translate-x-1/2 w-4 h-4 bg-[#1a1a1b] border-2 border-white rounded-full shadow-lg" />
                                <div className="flex justify-between mt-4 text-[10px] font-black uppercase tracking-widest text-[#1a1a1b]/20">
                                    <span>Low</span>
                                    <span className="text-[#34a853]">Moderate</span>
                                    <span>High</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Success Box */}
                <div className="w-full bg-[#34a853]/5 border-2 border-[#34a853]/10 rounded-[24px] p-6 flex items-start space-x-4 mb-10">
                    <div className="w-8 h-8 bg-[#34a853] rounded-full flex items-center justify-center text-white flex-shrink-0 mt-1">
                        <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-lg font-black text-[#1a1a1b]">You&apos;re off to a good start!</p>
                        <p className="text-[#1a1a1b]/60 font-medium">Let&apos;s keep going to tailor your plan even more</p>
                    </div>
                </div>

                <Button
                    className="w-full h-16 text-xl font-black rounded-full shadow-lg shadow-primary/20"
                    onClick={() => navigate('/break-2')}
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
