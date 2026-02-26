import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Menu,
  X,
} from 'lucide-react';

export default function BreakPage2() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromIndex = parseInt(searchParams.get('index') || searchParams.get('fromIndex') || '0');

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(21);
  const [profile, setProfile] = useState({
    age: '32',
    height: 165,
    weight: 82,
    goalWeight: 62,
    bmi: 30.1,
    category: 'Overweight',
    idealBmi: 21.5,
    unit: 'kg'
  });

  useEffect(() => {
    const saved = sessionStorage.getItem('quizResponses');
    if (saved) {
      const responses = JSON.parse(saved);

      let age = '32';
      let weightKg = 82;
      let heightM = 1.65;
      let goalWeightKg = 62;

      responses.forEach((resp: any) => {
        const text = resp.questionText?.toLowerCase() || '';
        const answer = resp.answer || '';

        if (text.includes('age') || text.includes('how old')) {
          age = answer;
        } else if (text.includes('height')) {
          if (answer.includes("'")) {
            const ft = parseInt(answer.match(/(\d+)'/)?.[1] || '5');
            const inch = parseInt(answer.match(/(\d+)"/)?.[1] || '6');
            const totalInches = (ft * 12) + inch;
            heightM = totalInches * 0.0254;
          } else {
            const cm = parseInt(answer.match(/(\d+)/)?.[1] || '165');
            heightM = cm / 100;
          }
        } else if (text.includes('current weight')) {
          const val = parseInt(answer.match(/(\d+)/)?.[1] || '180');
          if (answer.toLowerCase().includes('lbs')) {
            weightKg = val * 0.45359237;
          } else {
            weightKg = val;
          }
        } else if (text.includes('goal weight')) {
          const val = parseInt(answer.match(/(\d+)/)?.[1] || '150');
          if (answer.toLowerCase().includes('lbs')) {
            goalWeightKg = val * 0.45359237;
          } else {
            goalWeightKg = val;
          }
        }
      });

      // Weight (kg) ÷ Height² (m²) - Standard Metric Formula
      const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));

      let category = 'Normal';
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';

      setProfile({
        age,
        height: Math.round(heightM * 100),
        weight: Math.round(weightKg),
        goalWeight: Math.round(goalWeightKg),
        bmi,
        category,
        idealBmi: 21.5,
        unit: 'kg'
      });
    }

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

  const getGaugeRotation = () => {
    const min = 15;
    const max = 40;
    const clampedBmi = Math.min(Math.max(profile.bmi, min), max);
    const percentage = (clampedBmi - min) / (max - min);
    // 0% is -90deg, 100% is 90deg
    return -90 + (percentage * 180);
  };

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

      {/* Content Area */}
      <main className="mx-auto w-full max-w-xl px-6 pt-4 pb-10 overflow-y-auto no-scrollbar">
        <div className="mb-8 space-y-3 text-center">
          <p className="mb-4 text-base font-normal text-[#10181FB2] capitalize">
            Your health snapshot
          </p>
          <h2 className="mx-auto baikal-trial max-w-[475px] text-[28px] leading-[1.1em] font-semibold text-[#10181F] md:text-[32px]">
            Here&apos;s a snapshot of your current profile
          </h2>
        </div>

        {/* BMI Card */}
        <div className="mt-6 md:mb-8 mb-4 rounded-[14px] border border-[#10181F1A] md:p-8 p-6 shadow-[-4px_-4px_10px_0px_#00000005]">
          <div className="mb-6 flex items-center gap-3">
            <img src="/heart.svg" alt="" />
            <span className="baikal-trial text-[20px] leading-[1.2em] font-semibold text-[#10181F] md:text-[24px]">
              Body Mass Index (BMI)
            </span>
          </div>

          <div className="grid items-center gap-8 md:grid-cols-2">
            {/* BMI Gauge SVG */}
            <div className="relative flex flex-col items-center justify-center">
              <div className="relative w-full aspect-[2/1]">
                <svg viewBox="0 0 200 100" className="w-full">
                  <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#67B1B1" />
                      <stop offset="40%" stopColor="#F5E49F" />
                      <stop offset="100%" stopColor="#F28E51" />
                    </linearGradient>
                  </defs>
                  {/* Background Track */}
                  <path
                    d="M 20 90 A 80 80 0 0 1 180 90"
                    fill="none"
                    stroke="#f4f4f5"
                    strokeWidth="18"
                    strokeLinecap="round"
                  />
                  {/* Gradient Arc */}
                  <path
                    d="M 20 90 A 80 80 0 0 1 180 90"
                    fill="none"
                    stroke="url(#gaugeGradient)"
                    strokeWidth="18"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Needle Placeholder (Indicator) */}
                <div
                  className="absolute bottom-[-2px] left-1/2 w-4 h-[75%] origin-bottom transition-transform duration-1000"
                  style={{ transform: `translateX(-50%) rotate(${getGaugeRotation()}deg)` }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-7 h-7 bg-white rounded-full shadow-md border-2 border-white" />
                </div>

                <div className="absolute inset-0 flex items-end justify-center pb-0">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-[#10181F] mb-0.5">{profile.bmi}</p>
                    <p className="text-sm font-semibold tracking-widest text-[#10181FB2] uppercase leading-none">
                      {profile.category}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-[#088E44]" />
                <span className="text-sm font-normal text-[#10181FB2]">
                  Ideal = {profile.idealBmi}
                </span>
              </div>
            </div>

            {/* BMI Stats */}
            <div className="space-y-4">
              <div className="rounded-[12px] bg-[#10181F08] p-5">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img src="/age.svg" alt="" className="w-5 h-5 opacity-50" />
                    <span className="text-lg font-normal text-[#10181F80]">Age:</span>
                    <span className="text-lg font-medium text-[#10181F] ml-auto">{profile.age}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <img src="/height.svg" alt="" className="w-5 h-5 opacity-50" />
                    <span className="text-lg font-normal text-[#10181F80]">Height:</span>
                    <span className="text-lg font-medium text-[#10181F] ml-auto">{profile.height} cm</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <img src="/weight.svg" alt="" className="w-5 h-5 opacity-50" />
                    <span className="text-lg font-normal text-[#10181F80]">Weight:</span>
                    <span className="text-lg font-medium text-[#10181F] ml-auto">{profile.weight} kg</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#E7F4ED] rounded-[8px] py-4 px-5">
                <div className="flex items-center gap-3">
                  <img src="/goal.svg" alt="" className="w-5 h-5" />
                  <span className="text-lg font-normal text-[#10181F80]">Goal:</span>
                  <span className="text-lg font-bold text-[#10181F] ml-auto">
                    {profile.weight > profile.goalWeight ? `Lose ${profile.weight - profile.goalWeight} kg` : `Gain ${profile.goalWeight - profile.weight} kg`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Box */}
        <div className="flex gap-4 rounded-[14px] border border-[#FCB6401A] bg-[#FEF7EB] p-6 mb-6">
          <img src="/unhealthy.svg" className="h-6 w-6 mt-1" alt="" />
          <div>
            <h3 className="mb-2 text-xl font-semibold text-[#10181F] leading-tight">
              Risks of an unhealthy BMI
            </h3>
            <p className="text-base text-[#10181FB2] leading-relaxed">
              High blood pressure, heart diseases, type 2 diabetes, osteoarthritis, certain cancers, depression and anxiety, reduced life expectancy.
            </p>
          </div>
        </div>

        {/* Encouragement Box */}
        <div className="mb-10 flex gap-4 rounded-[14px] border border-[#088E441A] bg-[#E7F4ED] p-6 lg:p-8">
          <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center shrink-0">
            <img src="/check.svg" className="h-4 w-4" alt="" />
          </div>
          <p className="text-base text-[#10181FB2] leading-relaxed">
            You&apos;re not alone — we&apos;ll build a plan that fits your lifestyle, preferences, and long-term goals.
          </p>
        </div>

        <div className="text-center">
          <button
            className="cursor-pointer w-full max-w-xs h-16 rounded-full bg-gradient-to-r from-[#D90655] to-[#FC3F39] text-white text-xl font-bold shadow-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => navigate(`/quiz?index=${fromIndex + 1}`)}
          >
            Continue
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center space-x-2 text-xs font-bold text-[#1a1a1b]/60">
          <div className="h-2 w-2 rounded-full bg-[#088E44]" />
          <span className="text-sm font-normal text-[#10181FCC]">
            856 people are taking this quiz right now
          </span>
        </div>
      </main>
    </div>
  );
}
