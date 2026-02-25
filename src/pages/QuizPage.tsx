import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, Menu, X } from 'lucide-react';

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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const constructSrcDoc = (html: string, css?: string, js?: string) => {
        if (!html) return `<html><body style="margin:0;display:flex;align-items:center;justify-content:center;height:100vh;background:#fafafa;color:#ccc;font-family:sans-serif;"><h1 style="font-size:10vw;font-weight:900;margin:0;">PREVIEW</h1></body></html>`;
        if (html.toLowerCase().includes('<html') || html.toLowerCase().includes('<!doctype')) return html;
        return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body{margin:0;font-family:sans-serif;}${css || ''}</style></head><body>${html}<script>${js || ''}</script></body></html>`;
    };

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [responses, setResponses] = useState<any[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
    const [inputValue, setInputValue] = useState('');

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

    // Load saved responses from session storage on mount
    useEffect(() => {
        const savedResponses = sessionStorage.getItem('quizResponses');
        if (savedResponses) {
            try {
                setResponses(JSON.parse(savedResponses));
            } catch (e) {
                console.error('Error parsing saved responses', e);
            }
        }
    }, []);

    // Restore selected options and input value when navigating between questions
    useEffect(() => {
        if (questions.length > 0 && questions[currentIndex]) {
            const currentQuestion = questions[currentIndex];
            const currentResponse = responses[currentIndex];

            if (currentResponse) {
                if (currentQuestion.type === 'text-input' || currentQuestion.type === 'number-input') {
                    setInputValue(currentResponse.answer || '');
                    setSelectedOptions([]);
                } else if (currentQuestion.type === 'multi-select') {
                    const answers = Array.isArray(currentResponse.answer) ? currentResponse.answer : [];
                    const indices = currentQuestion.options
                        .map((opt, idx) => (answers.includes(opt.text) ? idx : -1))
                        .filter(idx => idx !== -1);
                    setSelectedOptions(indices);
                    setInputValue('');
                } else if (currentQuestion.type === 'single-select') {
                    const answer = currentResponse.answer;
                    const index = currentQuestion.options.findIndex(opt => opt.text === answer);
                    setSelectedOptions(index !== -1 ? [index] : []);
                    setInputValue('');
                } else {
                    setSelectedOptions([]);
                    setInputValue('');
                }
            } else {
                // No previous response, clear for new question
                setSelectedOptions([]);
                setInputValue('');
            }
        }
    }, [currentIndex, questions, responses]);

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
        <div className="xl:h-screen bg-white font-sans flex flex-col pt-5">

            <header className="bg-opacity-30 mx-auto flex w-full max-w-[1360px] items-center justify-between  bg-white md:px-8 px-6 py-3.5 backdrop-blur-[40px] backdrop-blur-lg">
                <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                    <img src="/logo.png" alt="The Mediterranean Diet" className="h-8 md:h-10 w-auto object-contain" />
                </div>

                <div className="hidden sm:flex items-center space-x-6">
                    <div className="flex items-center gap-2 ">
                        <img src="/check.svg" className='m-0' alt="" />
                        <span className='text-[#10181F] text-sm font-normal leading-[1.8em]'>95% Success rate</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src="/Shield.svg" className='m-0' alt="" />
                        <span className="text-[#10181F] text-sm font-normal leading-[1.8em]">Trusted by 127K+</span>
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

            {/* Mobile Sidebar / Slider */}
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

                </div>
            </div>

            <div className="max-w-xl mx-auto w-full mt-6 px-6 ">
                <div className="flex items-center justify-between mb-3">
                    <button
                        className="cursor-pointer"
                        onClick={() => currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : navigate('/')}
                    >
                        {/* <ArrowLeft className="w-6 h-6" /> */}
                        <img src="/arrow.svg" alt="" />
                    </button>
                    <span className="text-[#10181F] text-base font-normal">
                        {currentIndex + 1}/{questions.length}
                    </span>
                </div>

                <div className="shadow-[inset_1px_1px_4px_0px_#0000001A] w-full h-2 bg-[#f4f4f5] rounded-full  relative">
                    <div
                        className="h-full bg-gradient-to-r from-[#D90655] to-[#FC3F39] transition-all duration-500 rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                    {/* Black Dot */}
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#10181F] rounded-full transition-all duration-500 z-10"
                        style={{
                            left: `calc(${progress}% - 8px)`,
                            outline: '2px solid #FFFFFF',
                            boxShadow: '-2px -2px 4px 0px #0000001A'
                        }}
                    />
                </div>
            </div>

            <main className="max-w-xl mx-auto w-full px-6 pt-8">
                <div className="text-center space-y-4 md:mb-8 mb-6">
                    <p className="text-[#10181FB2] text-base capitalize font-normal mb-4">
                        {currentQuestion.subtitle || "Personalizing Your Results"}
                    </p>
                    <h2 className="md:text-[32px] text-[28px] font-semibold leading-[1.2em] baikal-trial text-[#10181F]">
                        {currentQuestion.questionText}
                    </h2>
                </div>

                <div className="w-full space-y-4">
                    {currentQuestion.type === 'breakpoint' ? (
                        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#f4f4f5] h-[650px] relative">
                                <iframe
                                    srcDoc={constructSrcDoc(currentQuestion.customHtml || '', currentQuestion.customCss, currentQuestion.customJs)}
                                    className="w-full h-full border-none"
                                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                                    title="Breakpoint"
                                />
                            </div>
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
                                className="w-full rounded-xl border leading-[1.7em] border-[#10181F1A] py-4 px-8 text-2xl font-normal focus:bg-white focus:border-[#10181F1A] transition-all text-center"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Enter value..."
                            />
                            <button
                                onClick={handleNext}
                                disabled={!inputValue}
                                className="cursor-pointer w-full h-16 rounded-full bg-gradient-to-r from-[#D90655] to-[#FC3F39] text-white text-xl font-black shadow-xl disabled:opacity-50"
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
                                    className={`cursor-pointer w-full px-6 py-5 md:text-lg rounded-xl border transition-all flex items-center justify-center  leading-tight 
                                        ${selectedOptions.includes(index)
                                            ? 'bg-gradient-to-r from-[#D90655] to-[#FC3F39] border-transparent text-white scale-[1.02]'
                                            : 'bg-[#f4f4f5] border-[#f4f4f5] text-[#1a1a1b] !border-[#10181F1A] border-solid'
                                        }`}
                                >
                                    <span>{option.text}</span>
                                    {/* {option.emoji && <span className="text-2xl">{option.emoji}</span>} */}
                                </button>
                            ))}
                            {currentQuestion.type === 'multi-select' && (
                                <button
                                    onClick={handleNext}
                                    disabled={selectedOptions.length === 0}
                                    className="cursor-pointer w-full h-16 rounded-full bg-gradient-to-r from-[#D90655] to-[#FC3F39] text-white text-xl font-black shadow-xl mt-6 disabled:opacity-50"
                                >
                                    Continue
                                </button>
                            )}
                        </>
                    )}
                </div>

                <div className="mt-auto md:pt-20 pt-8 md:pb-10 pb-6 flex items-center justify-center space-x-2 text-xs font-bold text-[#1a1a1b]/60">
                    <div className="w-2 h-2 bg-[#088E44] rounded-full  center" />
                    <span className='text-[#10181FCC] text-xs font-normal'>856 people are taking this quiz right now</span>
                </div>
            </main>
        </div>
    );
}
