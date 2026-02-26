import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Menu,
  X,
  CheckCircle2,
} from 'lucide-react';

export default function BreakPage1() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromIndex = parseInt(searchParams.get('index') || searchParams.get('fromIndex') || '0');

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(21);

  useEffect(() => {
    // Try to fetch actual questions length to sync progress bar perfectly
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    const gender = sessionStorage.getItem('quizGender') || 'female';
    fetch(`${API_BASE_URL}/questions?gender=${gender}&isPopup=false`)
      .then(res => res.json())
      .then(data => {
        if (data.questions) setTotalQuestions(data.questions.length);
      })
      .catch(() => { });
  }, []);

  const progress = ((fromIndex + 1) / totalQuestions) * 100;

  return (
    <div className="flex flex-col bg-white pt-5 font-sans xl:h-screen overflow-hidden">
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
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
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
              <li className="py-2"><a href="#" className="text-base font-normal text-[#10181F]">Home</a></li>
              <li className="py-2"><a href="#" className="text-base font-normal text-[#10181F]">About us</a></li>
              <li className="py-2"><a href="#" className="text-base font-normal text-[#10181F]">FAQ</a></li>
              <li className="py-2"><a href="#" className="text-base font-normal text-[#10181F]">Contact us</a></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Progress Section */}
      <div className="max-w-xl mx-auto w-full mt-6 px-6">
        <div className="flex items-center justify-between mb-3">
          <button
            className="cursor-pointer"
            onClick={() => navigate(`/quiz?index=${fromIndex}`)}
          >
            <img src="/arrow.svg" alt="" />
          </button>
          <span className="text-[#10181F] text-base font-normal">
            {fromIndex + 1}/{totalQuestions}
          </span>
        </div>

        <div className="shadow-[inset_1px_1px_4px_0px_#0000001A] w-full h-2 bg-[#f4f4f5] rounded-full relative">
          <div
            className="h-full bg-gradient-to-r from-[#D90655] to-[#FC3F39] transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#10181F] rounded-full shadow-md transition-all duration-500"
            style={{ left: `calc(${progress}% - 8px)` }}
          />
        </div>
      </div>

      {/* Snapshot Content */}
      <main className="max-w-xl mx-auto w-full px-6 pt-8 pb-10 overflow-y-auto no-scrollbar">
        <div className="mb-8 text-center">
          <p className="text-[#10181FB2] text-base capitalize font-normal mb-4">
            Your health snapshot
          </p>
          <h2 className="md:text-[32px] text-[28px] font-semibold leading-[1.2em] baikal-trial text-[#10181F]">
            Here&apos;s what we&apos;ve learned so far
          </h2>
        </div>

        {/* Info Card */}
        <div className="mt-6 mb-8 rounded-[14px] border border-[#10181F1A] p-8 shadow-[-4px_-4px_10px_0px_#00000005]">
          <div className="">
            <div className="flex items-center space-x-4 mb-6">
              <img src="/activity.svg" alt="" />
              <span className="md:text-xl text-base font-medium text-[#10181F]">
                Daily activity level
              </span>
            </div>

            <div className="space-y-8 rounded-[14px] bg-[#10181F08] md:p-8 p-6 text-center sm:text-left">
              <div className="mb-7">
                <h3 className="md:text-[24px] text-[20px] font-semibold leading-[1.2em] baikal-trial text-[#10181F]">
                  Somewhat active
                </h3>
                <p className="text-[#10181FB2] md:text-[20px] text-[16px]">
                  2-4 workouts per week or active job
                </p>
              </div>

              {/* Slider Placeholder */}
              <div className="relative pt-6">
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#1a1a1b]/5">
                  <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-[#F4B400] via-[#34A853] to-[#088E44]" />
                </div>
                <div className="absolute top-[21px] left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-white bg-[#10181F] shadow-lg" />
                <div className="mt-4 flex justify-between text-[10px] font-black tracking-widest text-[#10181FB2] uppercase">
                  <span>Low</span>
                  <span className="text-[#34a853]">Moderate</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Box */}
        <div className="mb-10 flex w-full items-start space-x-4 rounded-[24px] border-2 border-[#088E441A] bg-[#E7F4ED] p-6">
          <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#088E44] text-white">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-lg font-black text-[#10181F]">
              You&apos;re off to a good start!
            </p>
            <p className="font-medium text-[#10181FB2]">
              Let&apos;s keep going to tailor your plan even more
            </p>
          </div>
        </div>

        <button
          className="cursor-pointer w-full h-16 rounded-full bg-gradient-to-r from-[#D90655] to-[#FC3F39] text-white text-xl font-bold shadow-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
          onClick={() => navigate(`/quiz?index=${fromIndex + 1}`)}
        >
          Continue
        </button>

        <div className="mt-12 flex items-center justify-center space-x-2 py-6 text-xs font-bold text-[#1a1a1b]/60">
          <div className="h-2 w-2 animate-pulse rounded-full bg-[#088E44]" />
          <span className="text-sm font-normal text-[#10181FCC]">856 people are taking this quiz right now</span>
        </div>
      </main>
    </div>
  );
}
