import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, ArrowLeft, Loader2, Menu, X } from 'lucide-react';

interface Option {
  text: string;
  emoji?: string;
}

interface Question {
  _id: string;
  questionText: string;
  type:
  | 'single-select'
  | 'multi-select'
  | 'text-input'
  | 'number-input'
  | 'breakpoint';
  options: Option[];
  subtitle?: string;
  customHtml?: string;
  customCss?: string;
  customJs?: string;
}

export default function QuizPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const gender = searchParams.get('gender') || 'both';

  const constructSrcDoc = (html: string, css?: string, js?: string) => {
    if (!html)
      return `<html><body style="margin:0;display:flex;align-items:center;justify-content:center;height:100vh;background:#fafafa;color:#ccc;font-family:sans-serif;"><h1 style="font-size:10vw;font-weight:900;margin:0;">PREVIEW</h1></body></html>`;
    if (
      html.toLowerCase().includes('<html') ||
      html.toLowerCase().includes('<!doctype')
    )
      return html;
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body{margin:0;font-family:sans-serif;}${css || ''}</style></head><body>${html}<script>${js || ''}</script></body></html>`;
  };

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState<any[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState('');

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/questions?gender=${gender}`
        );
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
      answer = selectedOptions.map((idx) => currentQuestion.options[idx].text);
    } else if (
      currentQuestion.type === 'text-input' ||
      currentQuestion.type === 'number-input'
    ) {
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
        setSelectedOptions(selectedOptions.filter((i) => i !== optionIndex));
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
      answer: answer,
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
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="text-primary h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl font-bold">No questions found.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      {/* <header className="px-6 py-6 flex items-center justify-between border-b border-[#1a1a1b]/5">
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
            </header> */}
      <div className="md:mx-6">
        <header className="bg-opacity-30 mx-auto flex w-full max-w-[1360px] items-center justify-between rounded-full bg-white px-6 py-3.5 backdrop-blur-[40px] backdrop-blur-lg md:px-8 md:shadow-[4px_4px_10px_0px_rgba(0,0,0,0.05)]">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="The Mediterranean Diet"
              className="h-8 w-auto object-contain transition-all duration-300 md:h-11"
            />
          </div>

          <div className="flex items-center gap-6">
            <nav className="hidden md:block">
              <ul className="flex items-center gap-8">
                <li>
                  <a href="#" className="text-base font-normal text-[#10181F]">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base font-normal text-[#10181F]">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base font-normal text-[#10181F]">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base font-normal text-[#10181F]">
                    Contact us
                  </a>
                </li>
              </ul>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className="rounded-full p-2 text-[#1a1a1b] transition-colors hover:bg-black/5 md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </header>
      </div>
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
      <div className="mx-auto w-full max-w-3xl space-y-8 px-6 pt-10 pb-6">
        <div className="flex items-center justify-between">
          <button
            className="rounded-full p-2 text-[#1a1a1b]/40 transition-colors hover:bg-[#1a1a1b]/5"
            onClick={() =>
              currentIndex > 0
                ? setCurrentIndex(currentIndex - 1)
                : navigate('/')
            }
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <span className="text-xl font-black tracking-tighter text-[#1a1a1b]/20">
            {currentIndex + 1}/{questions.length}
          </span>
        </div>

        <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#f4f4f5]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#D90655] to-[#FC3F39] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-6 py-8">
        <div className="mb-12 space-y-4 text-center">
          <p className="text-sm font-bold text-[#1a1a1b]/40">
            {currentQuestion.subtitle || 'PERSONALIZING YOUR RESULTS'}
          </p>
          <h2 className="text-4xl font-black tracking-tight text-[#1a1a1b] md:text-5xl">
            {currentQuestion.questionText}
          </h2>
        </div>

        <div className="w-full space-y-4">
          {currentQuestion.type === 'breakpoint' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 w-full duration-700">
              <div className="relative h-[650px] w-full overflow-hidden rounded-3xl border border-[#f4f4f5] bg-white shadow-2xl">
                <iframe
                  srcDoc={constructSrcDoc(
                    currentQuestion.customHtml || '',
                    currentQuestion.customCss,
                    currentQuestion.customJs
                  )}
                  className="h-full w-full border-none"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  title="Breakpoint"
                />
              </div>
              <div className="mt-12 flex justify-center">
                <button
                  onClick={handleNext}
                  className="h-16 w-full max-w-md rounded-full bg-[#1a1a1b] text-xl font-black text-white shadow-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Continue
                </button>
              </div>
            </div>
          ) : currentQuestion.type === 'text-input' ||
            currentQuestion.type === 'number-input' ? (
            <div className="space-y-6">
              <input
                type={
                  currentQuestion.type === 'number-input' ? 'number' : 'text'
                }
                className="focus:border-primary h-20 w-full rounded-2xl border-2 border-[#f4f4f5] bg-[#f4f4f5] px-8 text-center text-2xl font-bold transition-all focus:bg-white"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value..."
              />
              <button
                onClick={handleNext}
                disabled={!inputValue}
                className="h-16 w-full rounded-full bg-[#1a1a1b] text-xl font-black text-white shadow-xl disabled:opacity-50"
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
                  className={`flex w-full items-center justify-between rounded-2xl border-2 p-6 px-8 text-xl leading-tight font-bold transition-all ${selectedOptions.includes(index)
                      ? 'scale-[1.02] border-transparent bg-gradient-to-r from-[#D90655] to-[#FC3F39] text-white shadow-lg shadow-[#D90655]/20'
                      : 'border-[#f4f4f5] bg-[#f4f4f5] text-[#1a1a1b] hover:border-[#1a1a1b]/10'
                    }`}
                >
                  <span>{option.text}</span>
                  {option.emoji && (
                    <span className="text-2xl">{option.emoji}</span>
                  )}
                </button>
              ))}
              {currentQuestion.type === 'multi-select' && (
                <button
                  onClick={handleNext}
                  disabled={selectedOptions.length === 0}
                  className="mt-6 h-16 w-full rounded-full bg-[#1a1a1b] text-xl font-black text-white shadow-xl disabled:opacity-50"
                >
                  Continue
                </button>
              )}
            </>
          )}
        </div>

        <div className="mt-auto flex items-center space-x-2 py-12 text-xs font-bold text-[#1a1a1b]/60">
          <div className="h-2 w-2 animate-pulse rounded-full bg-[#34a853]" />
          <span>856 people are taking this quiz right now</span>
        </div>
      </main>
    </div>
  );
}
