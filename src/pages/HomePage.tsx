import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Star, ShieldCheck } from 'lucide-react';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-primary/10 flex flex-col">
            {/* Header */}
            <header className="container mx-auto px-4 py-6 flex items-center justify-between">
                <div className="flex items-center">
                    <span className="block text-[10px] uppercase tracking-[0.3em] font-black text-[#1a1a1b] opacity-40 leading-none mr-2">The</span>
                    <div className="flex items-center">
                        <span className="text-xl font-black uppercase tracking-tighter text-[#1a1a1b]">Mediterranean</span>
                        <span className="text-xl font-black uppercase ml-1 tracking-tighter text-primary">Diet</span>
                    </div>
                </div>

                <nav className="hidden md:flex items-center space-x-8">
                    <a href="#" className="text-sm font-bold text-[#1a1a1b]/60 hover:text-[#1a1a1b] transition-colors">Home</a>
                    <a href="#" className="text-sm font-bold text-[#1a1a1b]/60 hover:text-[#1a1a1b] transition-colors">About us</a>
                    <a href="#" className="text-sm font-bold text-[#1a1a1b]/60 hover:text-[#1a1a1b] transition-colors">FAQ</a>
                    <a href="#" className="text-sm font-bold text-[#1a1a1b]/60 hover:text-[#1a1a1b] transition-colors">Contact us</a>
                    <Button
                        variant="outline"
                        className="rounded-full px-6 font-black text-[#1a1a1b] border-2 border-[#1a1a1b]/10 hover:bg-[#1a1a1b]/5"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </Button>
                </nav>

                <Button
                    className="md:hidden rounded-full font-black px-4 h-10"
                    onClick={() => navigate('/login')}
                >
                    Login
                </Button>
            </header>

            {/* Main Hero Section */}
            <main className="flex-1 container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between py-12 lg:py-24 gap-12">
                <div className="w-full lg:max-w-[600px] space-y-10 order-2 lg:order-1 text-center lg:text-left">
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-black text-[#1a1a1b] leading-[1.05] tracking-tight">
                            Create your ideal <br />
                            30-day <span className="text-primary italic">Mediterranean</span> <br />
                            meal plan
                        </h1>
                        <p className="text-xl md:text-2xl text-[#1a1a1b]/40 font-bold">
                            Take 1-minute FREE test
                        </p>
                    </div>

                    <div className="space-y-6">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#1a1a1b]/40">
                            Start by selecting your gender:
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button
                                className="h-16 px-12 text-xl font-black rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 active:scale-[0.98] transition-all min-w-[200px]"
                                onClick={() => navigate('/quiz')}
                            >
                                Female
                            </Button>
                            <Button
                                className="h-16 px-12 text-xl font-black rounded-full bg-[#1a1a1b] hover:bg-[#1a1a1b]/90 text-white active:scale-[0.98] transition-all min-w-[200px]"
                                onClick={() => navigate('/quiz')}
                            >
                                Male
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} className="w-4 h-4 fill-[#ff9500] text-[#ff9500]" />
                            ))}
                            <span className="text-sm font-bold text-[#1a1a1b] ml-2">2475 customer reviews</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold text-[#1a1a1b]/60">
                            <ShieldCheck className="w-5 h-5 text-primary" />
                            Trusted by 127K+
                        </div>
                    </div>
                </div>

                {/* Image Placeholder Area */}
                <div className="w-full lg:flex-1 relative order-1 lg:order-2 flex justify-center items-center">
                    <div className="w-full aspect-square max-w-[600px] bg-[#f4f4f5] rounded-3xl flex items-center justify-center border-4 border-dashed border-[#1a1a1b]/10 relative overflow-hidden group">
                        <p className="text-[#1a1a1b]/20 font-black uppercase tracking-widest text-center px-12">
                            [ Food Images Grid Component ]
                        </p>
                        {/* Decorative background circle */}
                        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="container mx-auto px-4 py-8 border-t border-[#1a1a1b]/5 flex flex-col md:flex-row justify-between items-center gap-6 mt-12">
                <p className="text-[10px] text-[#1a1a1b]/40 font-bold text-center md:text-left">
                    © 2026 Mediterranean Plan. All rights reserved.
                </p>
                <div className="flex flex-col items-center md:items-end gap-1">
                    <p className="text-[10px] text-[#1a1a1b]/30 font-medium text-center md:text-right max-w-[600px] leading-relaxed">
                        Disclaimer: Results may vary depending on the individual. By proceeding, you agree to our <span className="underline">Terms of Service</span>, <span className="underline">Privacy Policy</span>.
                    </p>
                </div>
            </footer>
        </div>
    );
}
