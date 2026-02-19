import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Star } from 'lucide-react';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="selection:bg-primary/10 flex min-h-screen flex-col overflow-x-hidden bg-white font-sans">
            {/* Nav Container */}
            <header className="z-30 flex w-full items-center justify-between bg-white bg-opacity-30 backdrop-blur-lg px-8 py-4 rounded-full shadow-[4px_4px_10px_0px_rgba(0,0,0,0.05)]">
                <div className="flex items-center">
                    <img
                        src="/logo.png"
                        alt="The Mediterranean Diet"
                        className="h-8 w-auto object-contain md:h-11"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <nav className="hidden items-center space-x-10 md:flex">
                        <a href="#" className="text-sm font-bold text-[#1a1a1b] transition-opacity hover:opacity-70">Home</a>
                        <a href="#" className="text-sm font-bold text-[#1a1a1b] transition-opacity hover:opacity-70">About us</a>
                        <a href="#" className="text-sm font-bold text-[#1a1a1b] transition-opacity hover:opacity-70">FAQ</a>
                        <a href="#" className="text-sm font-bold text-[#1a1a1b] transition-opacity hover:opacity-70">Contact us</a>
                    </nav>
                    <button className="bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 h-[35px] min-w-[25px] rounded-full px-16 text-[14px] font-bold text-white transition-all active:scale-[0.98]" onClick={() => navigate('/login')}>Login</button>
                </div>
            </header>




            {/* Main Hero Section */}
            <main className="relative flex flex-1 items-center justify-between pt-12 lg:pt-0">
                <div className="w-full px-10 lg:pl-20 flex flex-col lg:flex-row items-center justify-between gap-8"> {/* Reduced gap here */}

                    {/* Left Side: Text Content */}
                    <div className="z-10 w-full lg:w-1/2 space-y-12 animate-in fade-in slide-in-from-left duration-700 text-left">
                        <div className="space-y-6">
                            <h1 className="text-[32px] md:text-[48px] lg:text-[56px] xl:text-[60px] font-extrabold leading-tight tracking-tight text-[#1a1a1b]">
                                Create your ideal 30-day Mediterranean meal plan
                            </h1>
                            <p className="text-lg font-bold tracking-tight text-[#1a1a1b]/40 md:text-xl lg:text-2xl">
                                Take 1-minute FREE test
                            </p>
                        </div>

                        <div className="mt-6 lg:mt-8 space-y-6"> {/* Adjusted margin-top here */}
                            <p className="text-[10px] font-black uppercase tracking-[0.08em] text-[#1a1a1b]/30">
                                Start by selecting your gender:
                            </p>
                            <div className="flex flex-col sm:flex-row justify-start gap-4">
                                <Button
                                    className="bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 h-[55px] min-w-[25px] rounded-full px-16 text-[24px] font-bold text-white transition-all active:scale-[0.98]"
                                    onClick={() => navigate('/quiz')}
                                >
                                    Female
                                </Button>
                                <Button
                                    className="h-[55px] min-w-[210px] rounded-full bg-[#1a1a1b] px-16 text-[24px] font-bold text-white shadow-xl shadow-black/10 transition-all hover:bg-[#1a1a1b]/90 active:scale-[0.98]"
                                    onClick={() => navigate('/quiz')}
                                >
                                    Male
                                </Button>
                            </div>
                        </div>

                        {/* Social Proof */}
                        <div className="mt-6 flex flex-wrap items-center justify-start gap-x-10 gap-y-4">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-0.5">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Star key={i} className="h-4 w-4 fill-[#ff9500] text-[#ff9500]" />
                                    ))}
                                </div>
                                <span className="text-[14px] font-bold text-[#1a1a1b]">
                                    2475 customer reviews
                                </span>
                            </div>
                            <div className="flex items-center gap-2.5 text-[14px] font-bold text-[#1a1a1b] opacity-60">
                                <span className="text-primary text-lg">🛡️</span>
                                Trusted by 127K+
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Hero Image */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-6 lg:mt-0 animate-in fade-in slide-in-from-right duration-1000">
                        <img
                            src="/hero-meals.png"
                            alt="Mediterranean Diet Meals"
                            className="w-full max-w-[2500px] lg:max-w-[3000px] xl:max-w-[3500px] lg:scale-150 xl:scale-[3.5] transform lg:translate-x-[-25%] xl:translate-x-[-25%] lg:translate-y-[10%] xl:translate-y-[15%] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
                        />
                    </div>
                </div>
            </main>


            {/* Footer */}
            <footer className="w-full px-10 py-12 mt-auto">
                <div className="mx-auto max-w-[1400px] flex flex-col items-start justify-between gap-8 border-t border-black/[0.04] pt-12 md:flex-row">
                    <div className="space-y-0.5 text-[11px] font-bold whitespace-nowrap text-[#1a1a1b]/20">
                        <p>© 2026 Mediterranean Plan. All rights reserved.</p>
                    </div>
                    <div className="max-w-[700px]">
                        <p className="text-[11px] leading-[1.8] font-medium text-[#1a1a1b]/25 md:text-right">
                            Disclaimer: Results may vary depending on the individual. By
                            proceeding, you agree to our <span className="cursor-pointer underline transition-colors hover:text-[#1a1a1b]">Terms of Service</span>, <span className="cursor-pointer underline transition-colors hover:text-[#1a1a1b]">Privacy Policy</span>.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
