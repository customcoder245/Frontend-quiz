import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function QuizPage() {
    const navigate = useNavigate();
    const [step] = useState(2);
    const totalSteps = 24;
    const [selectedOption, setSelectedOption] = useState<number | null>(1);

    const questions = [
        {
            title: "How active are you right now?",
            subtitle: "This helps us personalize your results",
            options: [
                "Very active (5+ workouts/week)",
                "Somewhat active (2-4 workouts/week)",
                "Light activity",
                "Not active"
            ]
        }
    ];

    const handleOptionSelect = (index: number) => {
        setSelectedOption(index);
        // Simulate progress or navigate to next page if it's a break point
        setTimeout(() => {
            if (step === 2) navigate('/break-1');
        }, 500);
    };

    return (
        <div className="min-h-screen bg-white font-sans flex flex-col">
            {/* Quiz Header */}
            <header className="px-6 py-6 flex items-center justify-between border-b border-[#1a1a1b]/5">
                <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                    <span className="block text-[8px] uppercase tracking-[0.3em] font-black text-[#1a1a1b] opacity-40 leading-none mr-1">The</span>
                    <div className="flex items-center">
                        <span className="text-lg font-black uppercase tracking-tighter text-[#1a1a1b]">Med</span>
                        <span className="text-lg font-black uppercase ml-0.5 tracking-tighter text-primary">Diet</span>
                    </div>
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

            {/* Progress Bar Container */}
            <div className="max-w-3xl mx-auto w-full px-6 pt-10 pb-6 space-y-8">
                <div className="flex items-center justify-between">
                    <button className="p-2 hover:bg-[#1a1a1b]/5 rounded-full transition-colors text-[#1a1a1b]/40">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <span className="text-xl font-black text-[#1a1a1b]/20 tracking-tighter">
                        {step}/{totalSteps}
                    </span>
                </div>

                <div className="w-full h-2 bg-[#f4f4f5] rounded-full overflow-hidden relative">
                    <div
                        className="h-full bg-primary transition-all duration-500 rounded-full"
                        style={{ width: `${(step / totalSteps) * 100}%` }}
                    />
                    {/* Circle Indicator */}
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#1a1a1b] border-2 border-white rounded-full shadow-md z-10 transition-all duration-500"
                        style={{ left: `calc(${(step / totalSteps) * 100}% - 8px)` }}
                    />
                </div>
            </div>

            {/* Question Section */}
            <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-8 flex flex-col items-center">
                <div className="text-center space-y-4 mb-12">
                    <p className="text-sm font-bold text-[#1a1a1b]/40">
                        {questions[0].subtitle}
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1b] tracking-tight">
                        {questions[0].title}
                    </h2>
                </div>

                <div className="w-full space-y-4">
                    {questions[0].options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionSelect(index)}
                            className={`w-full p-6 text-xl font-bold rounded-2xl border-2 transition-all flex items-center justify-center text-center leading-tight
                                ${selectedOption === index
                                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-[1.02]'
                                    : 'bg-[#f4f4f5] border-[#f4f4f5] text-[#1a1a1b] hover:border-[#1a1a1b]/10'
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                {/* Live Activity Indicator */}
                <div className="mt-auto py-12 flex items-center space-x-2 text-xs font-bold text-[#1a1a1b]/60">
                    <div className="w-2 h-2 bg-[#34a853] rounded-full animate-pulse" />
                    <span>856 people are taking this quiz right now</span>
                </div>
            </main>
        </div>
    );
}
