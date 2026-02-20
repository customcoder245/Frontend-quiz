import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, CheckCircle2, Star } from 'lucide-react';

export default function PredictedResultsPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white font-sans flex flex-col pb-20">
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

            <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-12 flex flex-col items-center">
                <div className="text-center space-y-3 mb-12">
                    <p className="text-sm font-bold text-[#1a1a1b]/40 uppercase tracking-widest">Based on your answers</p>
                    <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1b] tracking-tight leading-[1.1]">
                        We estimate you could <br /> reach 62kg by April 30th
                    </h2>
                    <p className="text-[#1a1a1b]/40 font-bold max-w-md mx-auto pt-2">
                        This projection is based on people with similar profiles following a personalized Mediterranean plan
                    </p>
                </div>

                {/* Projection Chart Placeholder */}
                <div className="w-full bg-white rounded-[40px] p-8 border-2 border-[#1a1a1b]/5 shadow-2xl shadow-[#1a1a1b]/5 mb-12">
                    <div className="relative h-64 w-full flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <p className="text-sm font-black text-[#1a1a1b]/20 uppercase tracking-widest">82kg</p>
                                <div className="w-3 h-3 bg-[#D90655] rounded-full border-2 border-white shadow-sm" />
                            </div>
                            <div className="text-right space-y-1">
                                <div className="bg-[#34a853] text-white text-[10px] font-black rounded-lg px-3 py-1.5 mb-2 inline-block shadow-lg shadow-[#34a853]/20">
                                    ESTIMATED TARGET: 62kg
                                </div>
                                <div className="flex justify-end">
                                    <div className="w-3 h-3 bg-[#34a853] rounded-full border-2 border-white shadow-sm" />
                                </div>
                            </div>
                        </div>

                        {/* Chart Line Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center -z-10 px-6">
                            <div className="w-full h-1 bg-gradient-to-r from-[#D90655] via-[#FC3F39] to-[#34a853] rounded-full transform rotate-12 opacity-50" />
                        </div>

                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-[#1a1a1b]/20 pt-8 border-t border-[#1a1a1b]/5">
                            <span>Now</span>
                            <span>Feb</span>
                            <span>Mar</span>
                            <span>Apr</span>
                        </div>
                    </div>
                </div>

                <div className="w-full space-y-8">
                    <h3 className="text-3xl font-black text-[#1a1a1b] tracking-tight">What people like you are saying</h3>

                    {/* Testimonial */}
                    <div className="w-full bg-[#f4f4f5]/50 rounded-[32px] p-8 border-2 border-[#1a1a1b]/5">
                        <div className="space-y-6">
                            <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} className="w-5 h-5 fill-[#1a1a1b] text-[#1a1a1b]" />
                                ))}
                            </div>
                            <p className="text-lg font-bold text-[#1a1a1b]/60 italic leading-relaxed">
                                &ldquo;This quiz helped me understand what kind of Mediterranean diet actually works for me. The meal plan is simple, delicious, and fits perfectly into my routine.&rdquo;
                            </p>
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-white rounded-full border-2 border-[#1a1a1b]/5 flex items-center justify-center overflow-hidden">
                                    <span className="font-black text-[#1a1a1b]/20">MR</span>
                                </div>
                                <div>
                                    <p className="font-black text-[#1a1a1b]">Michael R.</p>
                                    <p className="text-[10px] font-bold text-[#1a1a1b]/30 uppercase tracking-widest">Managing Partner, DP Group</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full pt-12 space-y-4">
                    <Button
                        className="w-full h-16 text-xl font-black rounded-full shadow-lg shadow-[#D90655]/20 bg-gradient-to-r from-[#D90655] to-[#FC3F39] hover:opacity-90"
                        onClick={() => navigate('/login')}
                    >
                        Continue to your personalized plan
                    </Button>
                    <p className="text-center text-[10px] font-black text-[#1a1a1b]/20 uppercase tracking-widest">
                        Take less than a minute
                    </p>
                </div>
            </main>
        </div>
    );
}
