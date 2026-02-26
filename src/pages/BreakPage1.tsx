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
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';
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
      <main className="max-w-xl mx-auto w-full px-6 pt-8 pb-10">
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
                <h3 className="md:text-[24px] text-[20px] font-semibold leading-[1.2em] baikal-trial text-[#10181F] text-left">
                  Somewhat active
                </h3>
                <p className="text-[#10181FB2] md:text-[20px] text-[16px] text-left">
                  2-4 workouts per week or active job
                </p>
              </div>

              {/* Slider Placeholder */}
              <div className="relative">
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#1a1a1b]/5">
                  <div className="h-full w-1/2 rounded-full bg-[linear-gradient(90deg,rgba(8,142,68,0)_0%,#088E44_100%)]" />
                </div>
                <div className="absolute top-[-4px] left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-white bg-[#10181F] shadow-lg" />
                <div className="mt-4 flex justify-between">
                  <span className='text-base text-[#10181FB2]'>Low</span>
                  <span className="text-[#088E44]">Moderate</span>
                  <span className='text-base text-[#10181FB2]'>High</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Box */}
      <div className="flex gap-4 rounded-[14px] border border-[#088E441A] bg-[#088E441A] p-6 mb-8">
          <img src="/check.svg" className="h-6 w-6 mt-1" alt="" />
          <div>
            <h3 className="mb-2 text-xl font-semibold text-[#10181F] leading-tight">
              You`re off to a good start!
            </h3>
            <p className="text-base text-[#10181FB2] leading-relaxed">
              Let`s keep going to tailor your plan even more
            </p>
          </div>
        </div>
 <div className="text-center">
        <button
          className="cursor-pointer w-full md:max-w-[214px] max-w-[196px] h-16 rounded-full bg-gradient-to-r from-[#D90655] to-[#FC3F39] text-white text-xl font-bold shadow-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
          onClick={() => navigate(`/quiz?index=${fromIndex + 1}`)}
        >
          Continue
        </button>
</div>
        <div className="mt-8 flex items-center justify-center space-x-2 pb-6 text-xs font-bold text-[#1a1a1b]/60">
          <div className="h-2 w-2 animate-pulse rounded-full bg-[#088E44]" />
          <span className="text-sm font-normal text-[#10181FCC]">856 people are taking this quiz right now</span>
        </div>
      </main>
    </div>
  );
}
