import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, CheckCircle2, Star, Menu, X } from 'lucide-react';

export default function CalculatingResultsPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePopup, setActivePopup] = useState<number | null>(null);
  const [popupsShown, setPopupsShown] = useState<boolean[]>([]);
  const [popupQuestions, setPopupQuestions] = useState<any[]>([]);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const gender = sessionStorage.getItem('quizGender') || 'both';
        const response = await fetch(`${API_BASE_URL}/questions?gender=${gender}&isPopup=true`);
        const data = await response.json();

        if (data.questions && data.questions.length > 0) {
          const numQuestions = data.questions.length;
          const questions = data.questions.map((q: any, i: number) => ({
            _id: q._id,
            text: q.questionText,
            options: q.options.map((opt: any) => opt.text),
            triggerAt: ((i + 1) / (numQuestions + 1)) * 100
          }));
          setPopupQuestions(questions);
          setPopupsShown(new Array(questions.length).fill(false));
        }
      } catch (err) {
        console.error('Error fetching popup questions:', err);
      }
    };
    fetchQuestions();
  }, [API_BASE_URL]);

  useEffect(() => {
    if (activePopup !== null) return;
    if (progress >= 100) return;

    const timer = setTimeout(() => {
      setProgress((oldProgress) => {
        let nextProgress = Math.min(oldProgress + Math.random() * 10, 100);

        for (let i = 0; i < popupQuestions.length; i++) {
          if (oldProgress < popupQuestions[i].triggerAt && nextProgress >= popupQuestions[i].triggerAt && !popupsShown[i]) {
            nextProgress = popupQuestions[i].triggerAt;
            setActivePopup(i);
            setPopupsShown((prev) => {
              const newShown = [...prev];
              newShown[i] = true;
              return newShown;
            });
            break;
          }
        }
        return nextProgress;
      });
    }, 200);

    return () => clearTimeout(timer);
  }, [progress, activePopup, popupsShown]);

  const handlePopupAnswer = async (questionId: string, answer: string) => {
    setActivePopup(null);
    try {
      const token = localStorage.getItem('token');
      if (!token || !questionId) return;
      await fetch(`${API_BASE_URL}/questions/responses/append`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ questionId, answer })
      });
    } catch (err) {
      console.error('Error saving popup answer:', err);
    }
  };

  const size = 250; // Base coordinate size
  const strokeWidth = 24;
  const center = size / 2;
  const radius = center - strokeWidth; // Creates the padding for the stroke
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col bg-white pt-5 font-sans xl:h-screen">
      {/* Header */}
      <header className="bg-opacity-30 mx-auto flex w-full max-w-[1360px] items-center justify-between bg-white px-6 py-3.5 backdrop-blur-[40px] backdrop-blur-lg md:px-8">
        <div
          className="flex cursor-pointer items-center"
          onClick={() => navigate('/')}
        >
          <img
            src="/logo.png"
            alt="The Mediterranean Diet"
            className="h-8 w-auto object-contain md:h-10"
          />
        </div>

        <div className="hidden items-center space-x-6 sm:flex">
          <div className="flex items-center gap-2">
            <img src="/check.svg" className="m-0" alt="" />
            <span className="text-sm leading-[1.8em] font-normal text-[#10181F]">
              95% Success rate
            </span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/Shield.svg" className="m-0" alt="" />
            <span className="text-sm leading-[1.8em] font-normal text-[#10181F]">
              Trusted by 127K+
            </span>
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
              <li className="py-2">
                <a href="#" className="text-base font-normal text-[#10181F]">
                  Home
                </a>
              </li>
              <li className="py-2">
                <a href="#" className="text-base font-normal text-[#10181F]">
                  About us
                </a>
              </li>
              <li className="py-2">
                <a href="#" className="text-base font-normal text-[#10181F]">
                  FAQ
                </a>
              </li>
              <li className="py-2">
                <a href="#" className="text-base font-normal text-[#10181F]">
                  Contact us
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <main className="mx-auto w-full max-w-xl px-6 pt-8">
        {/* Modal Popup */}
        {activePopup !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl md:p-10 p-6 w-full max-w-lg shadow-2xl transform transition-all animate-in zoom-in-95 duration-300">
              <h3 className="text-[24px] md:text-[28px] font-semibold mb-8 text-[#10181F] text-center baikal-trial leading-tight">
                {popupQuestions[activePopup].text}
              </h3>
              <div className="space-y-4">
                {popupQuestions[activePopup].options.map((option: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => handlePopupAnswer(popupQuestions[activePopup]._id, option)}
                    className="cursor-pointer w-full px-6 py-4 md:text-lg rounded-xl transition-all flex items-center justify-center leading-tight bg-white border text-[#1a1a1b] border-[#10181F1A] hover:bg-gradient-to-r hover:from-[#D90655] hover:to-[#FC3F39] hover:text-white hover:border-transparent hover:scale-[1.02] active:scale-95 shadow-sm"
                  >
                    <span className="text-center font-normal">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        <h2 className="baikal-trial text-center text-[28px] leading-[1.2em] font-semibold text-[#10181F] md:text-[32px]">
          Calculating results
        </h2>

        {/* Circular Progress Placeholder */}
        {/* <div className="relative mx-auto mt-8 mb-6 flex md:h-64 md:w-64 w-[200px] h-[200px] items-center justify-center">
          <svg className="h-full w-full -rotate-90 transform">
            <circle
              cx="128"
              cy="128"
              r="110"
              stroke="#f4f4f5"
              strokeWidth="24"
              fill="transparent"
            />
            <circle
              cx="128"
              cy="128"
              r="110"
              stroke="url(#gradient)"
              strokeWidth="24"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 110}
              strokeDashoffset={2 * Math.PI * 110 * (1 - progress / 100)}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D90655" />
                <stop offset="100%" stopColor="#FC3F39" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-normal md:text-[32px] text-[24px]">
              {Math.round(progress)}%
            </span>
          </div>
        </div> */}

        <div className="mt-8 mb-6 relative w-full max-w-[200px] md:max-w-[256px] aspect-square mx-auto">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="h-full w-full -rotate-90 transform"
          >
            <defs>
              <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D90655" />
                <stop offset="100%" stopColor="#FC3F39" />
              </linearGradient>
            </defs>

            {/* Gray Background Circle */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#F4F4F5"
              strokeWidth={strokeWidth}
              fill="none"
            />

            {/* Progress Circle (Gradient) */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="url(#progress-gradient)"
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
            />
          </svg>

          {/* Centered Percentage Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-normal text-[#18181B] font-semibold text-[24px] md:text-[32px] ">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Info Box */}
        <div className="flex gap-4 rounded-[14px] border border-[#088E441A] bg-[#088E441A] p-6 text-base font-normal md:p-8">
          <div className="">
            <img src="/check-join.svg" className="h[24px] w-[24px]" alt="" />
          </div>
          <div>
            <h3 className="mb-2 text-xl leading-6 font-normal text-[#10181F]">
              Join over 1.1 million people
            </h3>
            <p className="text-sm text-[#10181FB2] md:text-base">
              Who’ve already created their Mediterranean plan
            </p>
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="mt-6 mb-8 rounded-[14px] border border-[#10181F1A] p-8 shadow-[-4px_-4px_10px_0px_#00000005] ">
          <div className="mb-6 flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-5 w-5 fill-[#1a1a1b] text-[#1a1a1b]" />
            ))}
          </div>
          <p className="mb-6 text-base font-normal text-[#10181FB2]">
            “This quiz helped me understand what kind of Mediterranean diet
            actually works for me. The meal plan is simple, delicious, and fits
            perfectly into my routine. I finally feel consistent without
            stress.”
          </p>
          <div className="flex items-center space-x-4">
            <div className="">
              <img src="/michael.svg" alt="" />
            </div>
            <div>
              <p className="texrt-[#10181F] text-xl">Michael R.</p>
              <p className="text-xs text-[#10181FB2]">
                Managing Partner, DP Group
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <Button
            className={`rounded-full md:max-w-[214px] max-w-[196px] px-14 pt-2 pb-3.5 text-xl font-normal md:pb-4 md:text-2xl ${progress < 100 ? 'cursor-not-allowed opacity-50' : 'opacity-100'}`}
            disabled={progress < 100}
            onClick={() => navigate('/predicted')}
          >
            Continue
          </Button>
        </div>
        <div className="mt-auto flex items-center justify-center space-x-2 pt-8 pb-6 text-xs font-bold text-[#1a1a1b]/60 md:pt-20 md:pb-10">
          <div className="center h-2 w-2 rounded-full bg-[#088E44]" />
          <span className="text-xs font-normal text-[#10181FCC]">
            856 people are taking this quiz right now
          </span>
        </div>
      </main>
    </div>
  );
}
