import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

export default function EmailFormPage() {
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

            <main className="flex-1 max-w-xl mx-auto w-full px-6 py-20 flex flex-col items-center justify-center text-center">
                <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1b] tracking-tight mb-12">
                    Enter your name and email to <br /> view the results
                </h2>

                <form className="w-full space-y-4 mb-8" onSubmit={(e) => { e.preventDefault(); navigate('/calculating'); }}>
                    <Input
                        placeholder="Name"
                        className="h-16 rounded-2xl border-2 border-[#1a1a1b]/5 bg-white px-6 text-lg font-bold placeholder:text-[#1a1a1b]/20"
                        required
                    />
                    <Input
                        placeholder="email@email.com"
                        type="email"
                        className="h-16 rounded-2xl border-2 border-[#1a1a1b]/5 bg-white px-6 text-lg font-bold placeholder:text-[#1a1a1b]/20"
                        required
                    />

                    <div className="bg-[#34a853]/5 border-2 border-[#34a853]/10 rounded-[24px] p-6 flex items-start space-x-4 mt-8">
                        <div className="w-8 h-8 bg-[#34a853]/10 rounded-full flex items-center justify-center text-[#34a853] flex-shrink-0">
                            <Lock className="w-4 h-4" />
                        </div>
                        <p className="text-sm font-bold text-[#1a1a1b]/60 text-left leading-relaxed">
                            We respect your privacy. Your email is safe with us. We&apos;ll send you a copy of your results for easy access — no spam, ever.
                        </p>
                    </div>

                    <Button
                        className="w-full h-16 text-xl font-black rounded-full shadow-lg shadow-primary/20 mt-8"
                        type="submit"
                    >
                        Continue
                    </Button>
                </form>

                <div className="mt-12 flex items-center space-x-2 text-xs font-bold text-[#1a1a1b]/60">
                    <div className="w-2 h-2 bg-[#34a853] rounded-full animate-pulse" />
                    <span>856 people are taking this quiz right now</span>
                </div>
            </main>
        </div>
    );
}
