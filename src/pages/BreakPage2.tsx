import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, CheckCircle2, Heart, AlertTriangle } from 'lucide-react';

export default function BreakPage2() {
    const navigate = useNavigate();

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
            </header>

            {/* Content Area */}
            <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-12 flex flex-col items-center">
                <div className="text-center space-y-3 mb-12">
                    <p className="text-sm font-bold text-[#1a1a1b]/40 uppercase tracking-widest">Your health snapshot</p>
                    <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1b] tracking-tight leading-[1.1]">
                        Here&apos;s a snapshot of your <br /> current profile
                    </h2>
                </div>

                {/* BMI Card */}
                <div className="w-full bg-white rounded-[32px] p-1 border-2 border-[#1a1a1b]/5 shadow-xl shadow-[#1a1a1b]/5 mb-8">
                    <div className="p-8 space-y-8">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                <Heart className="w-6 h-6 fill-primary" />
                            </div>
                            <span className="text-2xl font-black text-[#1a1a1b]">Body Mass Index (BMI)</span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            {/* BMI Gauge Placeholder */}
                            <div className="relative flex flex-col items-center justify-center pt-8">
                                <div className="w-48 h-24 overflow-hidden relative">
                                    <div className="w-48 h-48 border-[16px] border-t-transparent border-l-transparent rounded-full rotate-45 bg-gradient-to-r from-[#34a853] via-yellow-400 to-orange-500 opacity-20" />
                                    {/* Active part would be here */}
                                    <div className="absolute inset-0 flex items-end justify-center">
                                        <div className="text-center">
                                            <p className="text-4xl font-black text-[#1a1a1b]">31.2</p>
                                            <p className="text-xs font-bold text-[#1a1a1b]/40 uppercase tracking-widest">Overweight</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 mt-4">
                                    <div className="w-2 h-2 bg-[#34a853] rounded-full" />
                                    <span className="text-xs font-bold text-[#1a1a1b]/40">Ideal = 21.5</span>
                                </div>
                            </div>

                            {/* BMI Stats */}
                            <div className="space-y-4">
                                <div className="bg-[#f4f4f5] rounded-[24px] p-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[#1a1a1b]/40 font-bold flex items-center gap-2">🎂 Age:</span>
                                        <span className="font-black text-[#1a1a1b]">32</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[#1a1a1b]/40 font-bold flex items-center gap-2">📏 Height:</span>
                                        <span className="font-black text-[#1a1a1b]">165 cm</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[#1a1a1b]/40 font-bold flex items-center gap-2">⚖️ Weight:</span>
                                        <span className="font-black text-[#1a1a1b]">82 kg</span>
                                    </div>
                                </div>
                                <div className="bg-[#34a853]/5 border-2 border-[#34a853]/10 rounded-full px-6 py-4 flex items-center justify-between">
                                    <span className="text-[#1a1a1b]/40 font-black uppercase text-[10px] tracking-widest">🎯 Goal:</span>
                                    <span className="font-black text-[#1a1a1b]">Lose 20 kg</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Risk Box */}
                <div className="w-full bg-orange-50 border-2 border-orange-100 rounded-[24px] p-6 flex items-start space-x-4 mb-6">
                    <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white flex-shrink-0 mt-1 shadow-lg shadow-orange-500/20">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                        <p className="text-lg font-black text-[#1a1a1b]">Risks of an unhealthy BMI</p>
                        <p className="text-[#1a1a1b]/60 font-medium text-sm leading-relaxed">
                            High blood pressure, heart diseases, type 2 diabetes, osteoarthritis, certain cancers, depression and anxiety, reduced life expectancy.
                        </p>
                    </div>
                </div>

                {/* Encouragement Box */}
                <div className="w-full bg-[#34a853]/5 border-2 border-[#34a853]/10 rounded-[24px] p-6 flex items-start space-x-4 mb-10">
                    <div className="w-8 h-8 bg-[#34a853] rounded-full flex items-center justify-center text-white flex-shrink-0 mt-1">
                        <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <p className="font-bold text-[#1a1a1b]/60 leading-relaxed">
                        You&apos;re not alone — we&apos;ll build a plan that fits your lifestyle, preferences, and long-term goals.
                    </p>
                </div>

                <Button
                    className="w-full h-16 text-xl font-black rounded-full shadow-lg shadow-primary/20"
                    onClick={() => navigate('/email-form')}
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
