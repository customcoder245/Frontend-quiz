import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';

interface Option {
    text: string;
    emoji?: string;
}

interface Question {
    _id: string;
    questionText: string;
    type: 'single-select' | 'multi-select' | 'text-input' | 'number-input' | 'breakpoint';
    options: Option[];
    subtitle?: string;
    customHtml?: string;
    customCss?: string;
    customJs?: string;
}

export default function QuizPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const gender = searchParams.get('gender') || 'both';

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [responses, setResponses] = useState<any[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
    const [inputValue, setInputValue] = useState('');

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/questions?gender=${gender}`);
                const data = await response.json();
                if (data.questions) {
                    setQuestions(data.questions);
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [gender, API_BASE_URL]);

    // Handle Custom CSS and JS for Breakpoints
    useEffect(() => {
        const currentQuestion = questions[currentIndex];
        if (currentQuestion?.type === 'breakpoint') {
            // Inject CSS
            if (currentQuestion.customCss) {
                const styleId = `custom-css-${currentQuestion._id}`;
                if (!document.getElementById(styleId)) {
                    const style = document.createElement('style');
                    style.id = styleId;
                    style.innerHTML = currentQuestion.customCss;
                    document.head.appendChild(style);
                }
            }

            // Execute JS
            if (currentQuestion.customJs) {
                try {
                    // eslint-disable-next-line no-new-func
                    const runScript = new Function(currentQuestion.customJs);
                    runScript();
                } catch (err) {
                    console.error('Error in Breakpoint JS:', err);
                }
            }
        }

        return () => {
            // Optional: Cleanup CSS if needed
            // const styleId = `custom-css-${currentQuestion?._id}`;
            // document.getElementById(styleId)?.remove();
        };
    }, [currentIndex, questions]);

    const handleNext = () => {
        const currentQuestion = questions[currentIndex];

        if (currentQuestion.type === 'breakpoint') {
            // No response to save for breakpoints
            moveToNext();
            return;
        }

        let answer: any;

        if (currentQuestion.type === 'multi-select') {
            answer = selectedOptions.map(idx => currentQuestion.options[idx].text);
        } else if (currentQuestion.type === 'text-input' || currentQuestion.type === 'number-input') {
            answer = inputValue;
        } else {
            // single-select handled in handleOptionSelect
            return;
        }

        saveResponse(answer);
    };

    const handleOptionSelect = (optionIndex: number) => {
        const currentQuestion = questions[currentIndex];

        if (currentQuestion.type === 'multi-select') {
            if (selectedOptions.includes(optionIndex)) {
                setSelectedOptions(selectedOptions.filter(i => i !== optionIndex));
            } else {
                setSelectedOptions([...selectedOptions, optionIndex]);
            }
        } else {
            setSelectedOptions([optionIndex]);
            saveResponse(currentQuestion.options[optionIndex].text);
        }
    };

    const saveResponse = (answer: any) => {
        const currentQuestion = questions[currentIndex];
        const newResponse = {
            questionId: currentQuestion._id,
            answer: answer
        };

        const updatedResponses = [...responses];
        updatedResponses[currentIndex] = newResponse;
        setResponses(updatedResponses);

        // Save progress to session storage
        sessionStorage.setItem('quizResponses', JSON.stringify(updatedResponses));
        sessionStorage.setItem('quizGender', gender);

        setTimeout(() => {
            moveToNext();
        }, 500);
    };

    const moveToNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedOptions([]);
            setInputValue('');
        } else {
            navigate('/email-form');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl font-bold">No questions found.</p>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
        <div className="min-h-screen bg-white font-sans flex flex-col">
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

            <div className="max-w-3xl mx-auto w-full px-6 pt-10 pb-6 space-y-8">
                <div className="flex items-center justify-between">
                    <button
                        className="p-2 hover:bg-[#1a1a1b]/5 rounded-full transition-colors text-[#1a1a1b]/40"
                        onClick={() => currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : navigate('/')}
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <span className="text-xl font-black text-[#1a1a1b]/20 tracking-tighter">
                        {currentIndex + 1}/{questions.length}
                    </span>
                </div>

                <div className="w-full h-2 bg-[#f4f4f5] rounded-full overflow-hidden relative">
                    <div
                        className="h-full bg-gradient-to-r from-[#D90655] to-[#FC3F39] transition-all duration-500 rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-8 flex flex-col items-center">
                <div className="text-center space-y-4 mb-12">
                    <p className="text-sm font-bold text-[#1a1a1b]/40">
                        {currentQuestion.subtitle || "PERSONALIZING YOUR RESULTS"}
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1b] tracking-tight">
                        {currentQuestion.questionText}
                    </h2>
                </div>

                <div className="w-full space-y-4">
                    {currentQuestion.type === 'breakpoint' ? (
                        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div
                                className="breakpoint-container"
                                dangerouslySetInnerHTML={{ __html: currentQuestion.customHtml || '' }}
                            />
                            <div className="mt-12 flex justify-center">
                                <button
                                    onClick={handleNext}
                                    className="w-full max-w-md h-16 rounded-full bg-[#1a1a1b] text-white text-xl font-black shadow-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    ) : currentQuestion.type === 'text-input' || currentQuestion.type === 'number-input' ? (
                        <div className="space-y-6">
                            <input
                                type={currentQuestion.type === 'number-input' ? 'number' : 'text'}
                                className="w-full h-20 rounded-2xl border-2 border-[#f4f4f5] bg-[#f4f4f5] px-8 text-2xl font-bold focus:bg-white focus:border-primary transition-all text-center"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Enter value..."
                            />
                            <button
                                onClick={handleNext}
                                disabled={!inputValue}
                                className="w-full h-16 rounded-full bg-[#1a1a1b] text-white text-xl font-black shadow-xl disabled:opacity-50"
                            >
                                Continue
                            </button>
                        </div>
                    ) : (
                        <>
                            {currentQuestion.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleOptionSelect(index)}
                                    className={`w-full p-6 text-xl font-bold rounded-2xl border-2 transition-all flex items-center justify-between px-8 leading-tight
                                        ${selectedOptions.includes(index)
                                            ? 'bg-gradient-to-r from-[#D90655] to-[#FC3F39] border-transparent text-white shadow-lg shadow-[#D90655]/20 scale-[1.02]'
                                            : 'bg-[#f4f4f5] border-[#f4f4f5] text-[#1a1a1b] hover:border-[#1a1a1b]/10'
                                        }`}
                                >
                                    <span>{option.text}</span>
                                    {option.emoji && <span className="text-2xl">{option.emoji}</span>}
                                </button>
                            ))}
                            {currentQuestion.type === 'multi-select' && (
                                <button
                                    onClick={handleNext}
                                    disabled={selectedOptions.length === 0}
                                    className="w-full h-16 rounded-full bg-[#1a1a1b] text-white text-xl font-black shadow-xl mt-6 disabled:opacity-50"
                                >
                                    Continue
                                </button>
                            )}
                        </>
                    )}
                </div>

                <div className="mt-auto py-12 flex items-center space-x-2 text-xs font-bold text-[#1a1a1b]/60">
                    <div className="w-2 h-2 bg-[#34a853] rounded-full animate-pulse" />
                    <span>856 people are taking this quiz right now</span>
                </div>
            </main>
        </div>
    );
}
