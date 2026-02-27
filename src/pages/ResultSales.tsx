import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import {
  ChevronDown,
  ChevronUp,
  Star,
  Menu,
  X,
  Phone,
  Clock,
  ArrowRight,
  Check,
  Zap,
  Users,
  Plus,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export default function ResultSales() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('1-month');
  const [activeTab, setActiveTab] = useState('SCORE');

  const [profile] = useState(() => {
    const saved = sessionStorage.getItem('userProfileSnapshot');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing userProfileSnapshot', e);
      }
    }
    return {
      age: 32,
      gender: 'female',
      height: 165,
      weight: 82,
      goalWeight: 62,
      bmi: 31.2,
    };
  });

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return 'underweight';
    if (bmi < 25) return 'normal';
    if (bmi < 30) return 'overweight';
    return 'obese';
  };

  const weightToLose = profile.weight - profile.goalWeight;
  const ageValue = parseInt(String(profile.age).replace(/\D/g, '')) || 30;

  // Mifflin-St Jeor Formula for BMR
  let bmr = 10 * profile.weight + 6.25 * profile.height - 5 * ageValue;
  bmr = profile.gender === 'male' ? bmr + 5 : bmr - 161;

  // Sedentary activity factor (1.2) - Weight loss deficit (usually 500-750)
  const dailyTargetKcal = Math.round(bmr * 1.2 - 600);
  const kcalMin = Math.round(dailyTargetKcal - 150);
  const kcalMax = Math.round(dailyTargetKcal + 100);
  const proteinMin = Math.round(profile.weight * 1.1); // Dynamic protein based on weight (1.1g/kg)

  // Projected results: 8% to 12% of total weight is a safe 6-week target for these plans
  const projectedLossKgMin = Math.round(profile.weight * 0.08);
  const projectedLossKgMax = Math.round(profile.weight * 0.12);
  const projectedLossLbsMin = Math.round(projectedLossKgMin * 2.20462);
  const projectedLossLbsMax = Math.round(projectedLossKgMax * 2.20462);

  const tabs = ['SCORE', 'BMI', 'HEALTH', 'FOOD', 'METABOLISM'];

  return (
    <div className="flex flex-col bg-white pt-5 font-sans">
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

      {/* Profile Summary Section */}
      <section className="bg-white pt-8 pb-16">
        <div className="mx-auto max-w-[880px] px-6">
          <div className="mb-11 text-center md:mb-16">
            <h2 className="baikal-trial text-[28px] leading-[1.2em] font-semibold text-[#10181F] md:text-[32px]">
              We've built your perfect <br /> Mediterranean diet plan
            </h2>
          </div>

          <div className="mb-8 rounded-[14px] border border-[#10181F1A] md:p-8 p-6 shadow-[-4px_-4px_10px_0px_#00000005]">
            {/* Summary Header */}
            <div className="mb-8 flex items-center gap-4">
              <div className="">
                <img src="profile-icon.svg" alt="" />
              </div>
              <h3 className="text-xl font-semibold text-[#10181F] md:text-2xl">
                Your profile summary
              </h3>
            </div>

            <div className="mb-6 flex flex-col items-center gap-8 md:flex-row md:items-start">
              {/* Profile Image */}
              <div className="w-full md:w-[25%]">
                <img
                  src="/girl.svg"
                  alt="Profile"
                  className="h-full w-full rounded-[12px]"
                />
              </div>

              {/* Profile Details List */}
              <div className="flex w-full flex-1 flex-col space-y-6 gap-y-[18px]">
                <div className="mb-0 flex items-center justify-between border-b border-[#10181F0D] pb-3 md:pb-4.5">
                  <div className="flex items-center gap-2">
                    <img src="/age.svg" className="" alt="" />
                    <span className="text-base font-normal text-[#10181F80] md:text-xl">
                      Age:
                    </span>
                  </div>
                  <span className="text-base font-normal text-[#10181F] md:text-xl">
                    {profile.age} years old
                  </span>
                </div>
                <div className="mb-0 flex items-center justify-between border-b border-[#10181F0D] pb-3 md:pb-4.5">
                  <div className="flex items-center gap-2">
                    <img src="/gender.svg" className="" alt="" />
                    <span className="text-base font-normal text-[#10181F80] md:text-xl">
                      Sex:
                    </span>
                  </div>
                  <span className="text-base font-normal text-[#10181F] md:text-xl">
                    {profile.gender}
                  </span>
                </div>
                <div className="mb-0 flex items-center justify-between border-b border-[#10181F0D] pb-3 md:pb-4.5">
                  <div className="flex items-center gap-2">
                    <img src="/current.svg" className="" alt="" />
                    <span className="text-base font-normal text-[#10181F80] md:text-xl">
                      Current BMI:
                    </span>
                  </div>
                  <span className="text-base font-normal text-[#10181F] md:text-xl">
                    {profile.bmi} {getBMICategory(profile.bmi)}{' '}
                  </span>
                </div>
                <div className="mb-0 flex items-center justify-between border-b border-[#10181F0D] pb-3 md:pb-4.5">
                  <div className="flex items-center gap-2">
                    <img src="/height.svg" className="" alt="" />
                    <span className="text-base font-normal text-[#10181F80] md:text-xl">
                      Height:
                    </span>
                  </div>
                  <span className="text-base font-normal text-[#10181F] md:text-xl">
                    {profile.height} cm
                  </span>
                </div>
                <div className="mb-0 flex items-center justify-between border-b border-[#10181F0D] pb-3 md:pb-4.5">
                  <div className="flex items-center gap-2">
                    <img src="/weight.svg" className="" alt="" />
                    <span className="text-base font-normal text-[#10181F80] md:text-xl">
                      Weight:
                    </span>
                  </div>
                  <span className="text-base font-normal text-[#10181F] md:text-xl">
                    {profile.weight} kg
                  </span>
                </div>
                <div className="mb-0 flex items-center justify-between pt-1 md:pb-4.5">
                  <div className="flex items-center gap-3">
                    <img
                      src="/goal.svg"
                      className=""
                      alt=""
                    />
                    <span className="text-base font-normal text-[#10181F80] md:text-xl">
                      Goal:
                    </span>
                  </div>
                  <div className="rounded-[8px] bg-[#088E441A] px-6 py-2 pb-2.5! text-base font-normal text-[#088E44] md:text-xl">
                    Lose {weightToLose > 0 ? weightToLose : 0} kg
                  </div>
                </div>
              </div>
            </div>

            {/* Metabolism Block */}
            <div className="mb-6 rounded-[14px] border border-[#FCB6401A] bg-[#FCB6401A] md:p-8 p-6">
              <div className="flex gap-4">
                <div className="md:flex-1 flex-2">
                    <img src="/sedentary.svg" className='w-full' alt="" />
                </div>
                <div className="flex-20">
                  <h4 className="md:text-xl text-base md:mb-3 mb-2 font-normal text-[#10181F]">
                    Sedentary-Adjusted Metabolism
                  </h4>
                  <p className="md:text-base text-sm leading-5 text-[#10181FB2]">
                    Your metabolism is currently affected by excess body fat and
                    limited daily movement. With the right nutrition structure
                    and gradual activity increase, your body can shift into
                    efficient fat-burning mode without extreme dieting.
                  </p>
                </div>
              </div>
            </div>

            {/* Energy Target Block */}
            <div className="mb-6 rounded-[14px] border border-[#088E441A] bg-[#088E441A] md:p-8 p-6">
              <div className="flex gap-4">
                <div className="md:flex-1 flex-2">
                    <img src="/check.svg" className='w-full' alt="" />
                </div>
                <div className="flex-20">
                  <p className="md:text-base text-sm leading-5 text-[#10181FB2]">
                    Daily energy target
                  </p>
                  <h4 className="md:text-xl text-base  mt-2 font-normal text-[#10181F]">
                   ≈ 1,650 kcal / day
                  </h4>
                  
                </div>
              </div>
            </div>
            {/* Bottom Detail Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-4 rounded-[16px] border border-gray-50 bg-[#F8F9FA] p-5">
                <Zap size={20} className="shrink-0 text-[#10181F]" />
                <div>
                  <p className="mb-0.5 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    Daily calorie range
                  </p>
                  <p className="text-sm font-black text-[#10181F]">
                    {kcalMin.toLocaleString()} – {kcalMax.toLocaleString()} kcal
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-[16px] border border-gray-50 bg-[#F8F9FA] p-5">
                <div className="h-5 w-5 shrink-0 text-[#10181F]">
                  <Users size={18} />
                </div>
                <div>
                  <p className="mb-0.5 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    Protein minimum
                  </p>
                  <p className="text-sm font-black text-[#10181F]">
                    ≥ {proteinMin} g protein / day
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Your Plan Section - NEW */}
        <div className="mx-auto max-w-[880px] px-6">
          <div className="mb-8 rounded-[14px] border border-[#10181F1A] p-8 shadow-[-4px_-4px_10px_0px_#00000005]">
            <div className="mb-8 flex items-center gap-4">
              <div className="rounded-lg bg-[#FFF1F2] p-2">
                <img src="/target.svg" alt="" className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-[#10181F]">Your plan:</h3>
            </div>

            {/* Estimated Results Green Card */}
            <div className="relative mb-8 flex items-center gap-6 rounded-[16px] bg-[#E6F4EA] p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#34A853] text-white">
                <Check size={24} strokeWidth={4} />
              </div>
              <div className="flex-1">
                <p className="mb-1 text-[12px] font-bold tracking-wider text-gray-500 uppercase">
                  Estimated results
                </p>
                <p className="text-2xl font-black text-[#10181F]">
                  {projectedLossLbsMin}–{projectedLossLbsMax} lbs in 6 weeks
                </p>
              </div>
              <div className="max-w-[100px] text-right text-[11px] leading-tight font-black text-[#34A853] uppercase">
                =1–2 dress sizes smaller
              </div>
            </div>

            {/* Status Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-4 rounded-[16px] bg-[#F8F9FA] p-6">
                <Users size={20} className="mt-1 shrink-0 text-[#10181F]" />
                <div>
                  <p className="mb-1 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                    Metabolic profile
                  </p>
                  <p className="text-[15px] font-black text-[#10181F]">
                    Sedentary-adjusted metabolism
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-[16px] bg-[#F8F9FA] p-6">
                <div className="mt-1 shrink-0 text-[#10181F]">
                  <Zap size={20} />
                </div>
                <div>
                  <p className="mb-1 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                    Energy boost
                  </p>
                  <p className="text-[15px] font-black text-[#10181F]">Day 3</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-[16px] bg-[#F8F9FA] p-6">
                <div className="mt-1 shrink-0 text-red-500">
                  <Zap size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="mb-1 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                    Fat burn mode
                  </p>
                  <p className="text-[15px] font-black text-[#10181F]">
                    Week 1
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-[16px] bg-[#F8F9FA] p-6">
                <Star size={20} className="mt-1 shrink-0 text-[#10181F]" />
                <div>
                  <p className="mb-1 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                    Visible results
                  </p>
                  <p className="text-[15px] font-black text-[#10181F]">
                    Week 2–3
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Combinations Section - NEW */}
        <div className="mx-auto max-w-[880px] px-6">
          <div className="mb-8 rounded-[14px] border border-[#10181F1A] p-8 shadow-[-4px_-4px_10px_0px_#00000005]">
            <div className="mb-4 flex items-center gap-4">
              <div className="rounded-lg bg-[#FFF1F2] p-2">
                <img src="/meal-icon.svg" alt="" className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-[#10181F]">
                Mediterranean recipe combinations
              </h3>
            </div>
            <p className="mb-10 text-[15px] text-gray-500">
              Unlock 1000+ Recipe combinations, flexible, mix and match crafted
              for lasting fat loss
            </p>

            <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                {
                  img: '/breakfast.png',
                  label: 'Breakfast',
                  desc: 'Light, high-protein starts',
                },
                {
                  img: '/lunch.png',
                  label: 'Lunch',
                  desc: 'Balanced meals for energy',
                },
                {
                  img: '/dinner.png',
                  label: 'Dinner',
                  desc: 'Satisfying, fat-burning dinners',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex h-full flex-col rounded-[24px] border border-gray-50 bg-[#F8F9FA] p-4"
                >
                  <div className="mb-4 aspect-[4/3] overflow-hidden rounded-[16px] bg-white">
                    <img
                      src={item.img}
                      alt={item.label}
                      className="h-full w-full object-cover p-2"
                    />
                  </div>
                  <h4 className="mb-1 text-lg font-black text-[#10181F]">
                    {item.label}
                  </h4>
                  <p className="text-[12px] leading-tight font-medium text-gray-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Button
                className="w-full max-w-[450px] rounded-full bg-gradient-to-r from-[#D90655] to-[#FC3F39] py-8 text-xl font-black shadow-2xl shadow-[#D90655]/40 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => navigate('/login')}
              >
                Unlock your full plan
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured In & Stats Section */}
      <section className="bg-white pt-20">
        <div className="mx-auto max-w-[1000px] px-6 text-center">
          <p className="amsiproblack mb-10 text-[20px] font-black tracking-tight text-[#10181F]">
            As featured in:
          </p>

          {/* Logos Container */}
          <div className="mb-16 flex flex-wrap items-center justify-center gap-4">
            {['forbes', 'health', 'womens-health', 'mens-health', 'yahoo'].map(
              (logo) => (
                <div
                  key={logo}
                  className="flex h-[70px] min-w-[140px] items-center justify-center rounded-2xl border border-gray-100 bg-white px-8 py-5 shadow-sm"
                >
                  <img
                    src={`/${logo}.svg`}
                    alt={logo}
                    className="h-7 object-contain opacity-60 grayscale"
                  />
                </div>
              )
            )}
          </div>

          {/* Stats Row */}
          <div className="mx-auto mb-24 flex max-w-[800px] items-center justify-center gap-10 md:gap-16">
            <div className="text-center">
              <p className="amsiproblack mb-2 text-[34px] leading-none font-black text-[#E31D1C] md:text-[44px]">
                50+
              </p>
              <p className="text-[13px] font-bold tracking-wider text-gray-400 uppercase">
                Media features
              </p>
            </div>
            <div className="hidden h-12 w-[1px] bg-gray-200 opacity-60 md:block" />
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center gap-2">
                <p className="amsiproblack text-[34px] leading-none font-black text-[#34A853] md:text-[44px]">
                  4.9
                </p>
                <Star fill="#34A853" className="h-6 w-6 text-[#34A853]" />
              </div>
              <p className="text-[13px] font-bold tracking-wider text-gray-400 uppercase">
                Avg rating
              </p>
            </div>
            <div className="hidden h-12 w-[1px] bg-gray-200 opacity-60 md:block" />
            <div className="text-center">
              <p className="amsiproblack mb-2 text-[34px] leading-none font-black text-[#E31D1C] md:text-[44px]">
                127K+
              </p>
              <p className="text-[13px] font-bold tracking-wider text-gray-400 uppercase">
                Customers
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Journey Card */}
        <div className="mx-auto max-w-[1000px] px-6 pb-12">
          <div className="relative mx-auto max-w-[850px] overflow-hidden rounded-[32px] border border-gray-100 bg-white p-10 text-left shadow-[0_15px_60px_-15px_rgba(0,0,0,0.05)] md:p-20">
            <div className="relative flex gap-10 md:gap-16">
              {/* Vertical Progress Line */}
              <div className="relative flex shrink-0 flex-col items-center py-2">
                <div className="z-10 h-4 w-4 rounded-full bg-[#E31D1C]" />
                <div className="my-1 w-[3px] flex-1 bg-gradient-to-b from-[#E31D1C] via-[#EDC948] to-[#34A853]" />
                <div className="z-10 h-4 w-4 rounded-full bg-[#34A853]" />

                <div className="absolute top-[38%] z-10 h-4 w-4 rounded-full bg-[#EDC948]" />
              </div>

              <div className="flex-1 space-y-16">
                {/* Stage 1: NOW */}
                <div>
                  <h4 className="amsiproblack mb-10 text-[28px] leading-tight font-black text-[#10181F]">
                    Now
                  </h4>
                  <ul className="space-y-6">
                    {[
                      'Frustration from short-term diets',
                      'Inconsistent energy and hunger',
                      'Difficulty maintaining results',
                    ].map((text, i) => (
                      <li key={i} className="flex items-center gap-5">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E31D1C] text-white">
                          <X size={12} strokeWidth={4} />
                        </div>
                        <span className="text-[17px] leading-tight font-semibold text-[#757E85]">
                          {text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stage 2: 7-10 DAYS */}
                <div>
                  <h4 className="amsiproblack mb-10 text-[22px] leading-tight font-black text-[#10181F] uppercase">
                    IN 7–10 DAYS{' '}
                    <span className="text-[#10181F] normal-case opacity-100">
                      (after following your plan)
                    </span>
                  </h4>
                  <ul className="space-y-6">
                    {[
                      'Clear daily eating rhythm',
                      'Reduced decision fatigue around food',
                      'Improved energy consistency',
                    ].map((text, i) => (
                      <li key={i} className="flex items-center gap-5">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EDC948] text-white">
                          <Check size={12} strokeWidth={4} />
                        </div>
                        <span className="text-[17px] leading-tight font-semibold text-[#757E85]">
                          {text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stage 3: 30 DAYS */}
                <div>
                  <h4 className="amsiproblack mb-10 text-[22px] leading-tight font-black text-[#10181F] uppercase">
                    IN 30 DAYS
                  </h4>
                  <ul className="space-y-6">
                    {[
                      'Noticeable progress toward your target weight',
                      'Greater confidence in food choices',
                      'Habits that feel realistic long-term',
                    ].map((text, i) => (
                      <li key={i} className="flex items-center gap-5">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#34A853] text-white">
                          <Check size={12} strokeWidth={4} />
                        </div>
                        <span className="text-[17px] leading-tight font-semibold text-[#757E85]">
                          {text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - EXACTLY AS SCREENSHOT */}
      <section className="border-y border-[#F5E6CC] bg-[#FFFDF5] py-24">
        <div className="mx-auto max-w-[1100px] px-6 text-center">
          <h2 className="amsiproblack mb-8 text-[32px] leading-tight font-black text-[#10181F] md:text-[48px]">
            Start your personalized Mediterranean{' '}
            <br className="hidden md:block" /> plan today for less than a cup of
            coffee
          </h2>

          {/* Timer Bar */}
          <div className="mx-auto mb-16 max-w-[750px] rounded-[20px] border border-orange-50/50 bg-white p-6 shadow-sm">
            <p className="text-[18px] font-black tracking-tighter text-[#E31D1C] uppercase md:text-[24px]">
              THIS OFFER ENDS IN:{' '}
              <span className="ml-4 tabular-nums">08 : 59</span>
            </p>
          </div>

          <div className="mx-auto mb-10 grid max-w-[1000px] gap-6 md:grid-cols-3">
            {[
              {
                id: '3-month',
                name: '3-month plan',
                label: 'every 3 months',
                oldPrice: '$125',
                newPrice: '$62.99',
                oldDayPrice: '$1.38/day',
                newDayPrice: '$0.69/day',
              },
              {
                id: '1-month',
                name: '1-month plan',
                label: 'every month',
                oldPrice: '$59.99',
                newPrice: '$29.99',
                oldDayPrice: '$1.98/day',
                newDayPrice: '$0.99/day',
                badge: 'The best for you',
              },
              {
                id: '6-month',
                name: '6-month plan',
                label: 'every 6 months',
                oldPrice: '$179.99',
                newPrice: '$89.99',
                oldDayPrice: '$0.98/day',
                newDayPrice: '$0.49/day',
              },
            ].map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  'relative flex cursor-pointer flex-col items-start rounded-[32px] border-2 bg-white p-8 text-left transition-all',
                  selectedPlan === plan.id
                    ? 'border-[#D90655] shadow-xl'
                    : 'border-gray-100 hover:border-gray-200'
                )}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.badge && (
                  <div className="absolute -top-3 right-6 rounded-full bg-[#D90655] px-4 py-1.5 text-[10px] font-black tracking-wider text-white uppercase shadow-lg">
                    {plan.badge}
                  </div>
                )}
                <div className="mb-6 flex items-start gap-4">
                  <div
                    className={cn(
                      'mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                      selectedPlan === plan.id
                        ? 'border-[#D90655]'
                        : 'border-gray-300'
                    )}
                  >
                    {selectedPlan === plan.id && (
                      <div className="h-3 w-3 rounded-full bg-[#D90655]" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[20px] leading-tight font-black text-[#10181F]">
                      {plan.name}
                    </span>
                    <span className="text-sm font-bold text-gray-400">
                      {plan.label}
                    </span>
                  </div>
                </div>
                <div className="mt-auto flex w-full items-end justify-between border-t border-gray-50 pt-6">
                  <div className="flex flex-col">
                    <span className="mb-0.5 text-sm font-bold text-gray-300 line-through">
                      {plan.oldPrice}
                    </span>
                    <span className="text-[18px] font-black text-gray-400">
                      {plan.newPrice}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="mb-0.5 text-[11px] font-bold text-gray-300 line-through">
                      {plan.oldDayPrice}
                    </p>
                    <p className="text-2xl font-black text-[#D90655]">
                      {plan.newDayPrice}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-10 text-center">
            <p className="mb-6 text-[13px] font-bold text-gray-400 italic">
              Introductory price for first billing period only. Regular price
              applies after.
            </p>
            <Button
              className="w-full max-w-[480px] rounded-full bg-gradient-to-r from-[#D90655] to-[#FC3F39] py-10 text-[20px] font-black shadow-2xl shadow-[#D90655]/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => navigate('/login')}
            >
              Claim my plan
            </Button>
          </div>

          {/* Payment & Security Footer */}
          <div className="flex flex-col items-center gap-10">
            <div className="flex flex-col items-center gap-4">
              <p className="text-[13px] font-black tracking-[0.2em] text-[#10181F] uppercase opacity-80">
                Secure payment by:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 rounded-[24px] border border-white bg-white/50 px-10 py-4 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-12 items-center justify-center rounded bg-gray-100 text-[10px] font-bold text-gray-400">
                    PayPal
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-12 items-center justify-center rounded bg-gray-100 text-[10px] font-bold text-gray-400">
                    MC
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-12 items-center justify-center rounded bg-gray-100 text-[10px] font-bold text-gray-400">
                    VISA
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-12 items-center justify-center rounded bg-gray-100 text-[10px] font-bold text-gray-400">
                    AMEX
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-12 items-center justify-center rounded bg-gray-100 text-[10px] font-bold text-gray-400">
                    DISC
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 md:gap-12">
              <img
                src="/McAfee Secure.png"
                alt="McAfee"
                className="h-10 cursor-pointer"
              />
              <img
                src="/TrustedSite.png"
                alt="Trusted"
                className="h-10 cursor-pointer"
              />
              <img
                src="/Nortan.png"
                alt="Norton"
                className="h-10 cursor-pointer"
              />
              <img
                src="/VeriSign.png"
                alt="VeriSign"
                className="h-10 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* People Achievements Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <h2 className="amsiproblack mb-12 text-[34px] font-black tracking-tight text-[#10181F] uppercase md:text-[52px]">
            People just like you achieved great <br /> results using our
            Mediterranean Plan
          </h2>

          <div className="relative mt-20">
            <div className="grid gap-10 md:grid-cols-3">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="group overflow-hidden rounded-[40px] border border-gray-50 bg-white shadow-2xl transition-transform duration-500 hover:-translate-y-2"
                >
                  <div className="relative flex w-full">
                    <div className="w-1/2 overflow-hidden border-r border-white">
                      <img
                        src="/review-pic-1.png"
                        className="aspect-[4/5] w-full object-cover"
                        alt="Before"
                      />
                    </div>
                    <div className="w-1/2 overflow-hidden">
                      <img
                        src="/resul-page-women.png"
                        className="aspect-[4/5] w-full object-cover"
                        alt="After"
                      />
                    </div>
                  </div>
                  <div className="p-10 text-left">
                    <div className="mb-6 flex gap-1 text-[#10181F]">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={18} fill="currentColor" />
                      ))}
                    </div>
                    <p className="mb-8 text-[15px] leading-relaxed text-gray-500">
                      "This quiz helped me understand what kind of Mediterranean
                      diet actually works for me. The meal plan is simple,
                      delicious, and fits perfectly into my routine. I finally
                      feel consistent without stress."
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-black text-[#10181F]">
                        Sandra R.
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#34A853]" />
                        <span className="text-[11px] font-bold tracking-widest text-[#34A853] uppercase">
                          Verified customer
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <div className="mt-12 flex items-center justify-between px-4">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      'h-2 w-2 rounded-full',
                      i === 1 ? 'bg-[#D90655]' : 'bg-gray-200'
                    )}
                  />
                ))}
              </div>
              <div className="flex gap-4">
                <button className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-100 text-gray-300 transition-all hover:bg-gray-50">
                  <ChevronDown className="rotate-90" />
                </button>
                <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D90655] text-white shadow-lg shadow-[#D90655]/20 transition-all hover:scale-105">
                  <ChevronDown className="-rotate-90" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who is this plan for Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1000px] px-6 text-center">
          <h2 className="amsiproblack mb-6 text-[34px] font-black tracking-tight text-[#10181F] uppercase md:text-[44px]">
            Who is this plan for?
          </h2>
          <p className="mx-auto mb-16 max-w-3xl text-lg leading-relaxed font-medium text-gray-500">
            This personalized Mediterranean plan is for people who want to lose
            weight sustainably without extreme or restrictive dieting. It's
            designed to help you build eating habits you can maintain long term.
          </p>

          <div className="relative mb-24 flex justify-center">
            <img
              src="/hero-meals.png"
              alt="Plan Meals"
              className="w-full max-w-[850px]"
            />
          </div>

          <div className="mb-20 grid gap-6 md:grid-cols-3">
            {[
              {
                val: '93%',
                desc: 'of users reported improved consistency and energy within 30 days',
              },
              {
                val: '89%',
                desc: 'started with similar challenges around weight and eating habits',
              },
              {
                val: '79%',
                desc: 'had previously struggled with multiple failed diets',
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-[24px] border border-gray-50 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md md:text-left"
              >
                <span className="mb-4 block text-[32px] font-black text-[#D90655]">
                  {stat.val}
                </span>
                <p className="text-[14px] leading-relaxed font-bold tracking-wide text-gray-400 uppercase opacity-80">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Award Banner */}
          <div className="flex flex-col items-center gap-10 rounded-[24px] border border-teal-50 bg-[#E6F4EA] p-8 text-center md:flex-row md:p-12 md:text-left">
            <div className="flex-shrink-0 rounded-2xl border border-teal-100 bg-white p-4 shadow-sm">
              <img
                src="/logo.png"
                className="h-12 opacity-40 grayscale"
                alt="Award"
              />
            </div>
            <div className="space-y-2">
              <h4 className="amsiproblack text-xl leading-tight font-black text-[#10181F] uppercase md:text-2xl">
                The Mediterranean Diet has been voted the World's Best Diet 8
                years in a row
              </h4>
              <p className="text-[13px] font-bold tracking-[0.2em] text-gray-400 uppercase italic">
                Based on rankings by leading global health publications
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* What's included Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <h2 className="amsiproblack mb-16 text-center text-[34px] leading-tight font-black tracking-tight text-[#10181F] md:text-[48px]">
            What's included?
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* First Column */}
            <div className="space-y-6">
              <div className="flex h-[320px] flex-col justify-between rounded-[32px] border border-gray-100 bg-white p-10 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E31D1C]/10">
                  <div className="h-4 w-3 rounded-[2px] bg-[#E31D1C]" />
                </div>
                <div>
                  <h3 className="mb-4 text-[22px] leading-tight font-black text-[#10181F]">
                    Your personalized Mediterranean meal plan
                  </h3>
                  <p className="text-sm leading-relaxed font-medium text-gray-400">
                    Clear breakfast, lunch, and dinner plans by registered
                    dietitians.
                  </p>
                </div>
              </div>
              <div className="flex h-[320px] flex-col justify-between rounded-[32px] border border-gray-100 bg-white p-10 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E31D1C]/10">
                  <div className="h-4 w-4 rotate-45 bg-[#E31D1C]" />
                </div>
                <div>
                  <h3 className="mb-4 text-[22px] leading-tight font-black text-[#10181F]">
                    Mediterranean snacks and desserts
                  </h3>
                  <p className="text-sm leading-relaxed font-medium text-gray-400">
                    Satisfying snacks and desserts that support your goals.
                  </p>
                </div>
              </div>
            </div>

            {/* Second Column - Large Image Card */}
            <div className="md:row-span-1">
              <div className="flex h-full flex-col overflow-hidden rounded-[32px] border border-gray-100 bg-[#FDF9F0] shadow-sm transition-shadow hover:shadow-md">
                <div className="h-[450px] overflow-hidden">
                  <img
                    src="/simple-ingrediants.jpg"
                    alt="Shopping"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-10">
                  <h3 className="mb-4 text-[22px] leading-tight font-black text-[#10181F]">
                    Simple ingredients from any store
                  </h3>
                  <p className="text-sm leading-relaxed font-medium text-gray-400">
                    All meals use commonly available ingredients to save time,
                    effort, and money every week.
                  </p>
                </div>
              </div>
            </div>

            {/* Third Column - Mixed layout handled by continuing the grid */}
            <div className="md:col-span-2">
              <div className="flex h-[320px] overflow-hidden rounded-[32px] border border-gray-100 bg-[#FDF9F0] shadow-sm transition-shadow hover:shadow-md">
                <div className="w-1/2 overflow-hidden">
                  <img
                    src="/breakfast.png"
                    alt="Cooking"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex w-1/2 flex-col justify-center p-10">
                  <h3 className="mb-4 text-[22px] leading-tight font-black text-[#10181F]">
                    Easy-to-follow recipes
                  </h3>
                  <p className="text-sm leading-relaxed font-medium text-gray-400">
                    Prepare simple meals that leave you full and confident,
                    including practical guidance for eating out.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="rounded-[32px] border border-gray-100 bg-white p-10 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-10 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E31D1C]/10">
                <Users size={20} className="text-[#E31D1C]" />
              </div>
              <h3 className="mb-4 text-[22px] leading-tight font-black text-[#10181F]">
                24/7 nutritionist support
              </h3>
              <p className="text-sm leading-relaxed font-medium text-gray-400">
                Access science-based guidance whenever you need it to make
                confident, informed health and nutrition decisions.
              </p>
            </div>
            <div className="rounded-[32px] border border-gray-100 bg-white p-10 shadow-sm transition-shadow hover:shadow-md md:col-span-1">
              <div className="mb-10 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E31D1C]/10">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#E31D1C] text-[10px] font-bold text-white">
                  i
                </div>
              </div>
              <h3 className="mb-4 text-[22px] leading-tight font-black text-[#10181F]">
                Complete Mediterranean Diet guide for beginners
              </h3>
              <p className="text-sm leading-relaxed font-medium text-gray-400">
                Step-by-step support designed to help you start confidently and
                stay on track with your goals long term.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stick To Plan Section */}
      <section className="overflow-hidden bg-white py-24">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <h2 className="amsiproblack mb-6 text-[34px] leading-tight font-black tracking-tight text-[#10181F] uppercase md:text-[52px]">
            Finally, a Mediterranean plan <br className="hidden md:block" /> you
            can stick to
          </h2>
          <p className="mb-20 text-lg font-bold tracking-[0.2em] text-gray-400 uppercase italic">
            No calorie counting. No extremes. Just simple daily structure.
          </p>

          <div className="grid items-start gap-10 md:grid-cols-3">
            {/* Phone 1: Kimberly Clark */}
            <div className="group perspective-1000 relative">
              <div className="relative h-[650px] overflow-hidden rounded-[60px] border-[8px] border-[#2A2F35] bg-[#10181F] p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
                <div className="flex h-full flex-col overflow-hidden rounded-[45px] bg-white px-6 pt-10">
                  <div className="mb-6 flex justify-center">
                    <img
                      src="/logo.png"
                      className="h-4"
                      alt="Mediterranean Diet"
                    />
                  </div>
                  <div className="mb-8 flex items-center gap-4 rounded-2xl bg-[#F8F9FA] p-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-sm">
                      <img
                        src="/michael.svg"
                        className="h-full w-full object-cover"
                        alt="Kimberly Clark"
                      />
                    </div>
                    <div className="text-left">
                      <div className="mb-1 inline-block rounded-full bg-[#D90655] px-2 py-0.5 text-[8px] font-black tracking-wider text-white uppercase">
                        From The Desk Of
                      </div>
                      <p className="text-sm font-black text-[#10181F]">
                        Kimberly Clark <span className="text-[#4285F4]">✓</span>
                      </p>
                      <p className="text-[9px] font-bold tracking-tighter text-gray-400 uppercase">
                        Nutritionist And Health Advisor
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4 text-left">
                    <h4 className="amsiproblack text-xl leading-tight font-black text-[#10181F] uppercase">
                      "I Don't Sell <br />
                      Anything That Big... <br />
                      <span className="text-[#D90655]">
                        You Can't Fit Into <br />A 3X?"
                      </span>
                    </h4>
                    <p className="border-t border-gray-50 pt-4 text-[11px] leading-relaxed font-bold tracking-tighter text-gray-400 uppercase italic">
                      Just accepted a job at a medical office...
                    </p>
                    <p className="text-[11px] leading-relaxed font-bold tracking-tighter text-gray-400 uppercase italic">
                      And they asked us to wear medical scrubs like you see
                      doctors wear...
                    </p>
                    <p className="text-[11px] leading-relaxed font-bold tracking-tighter text-gray-400 uppercase italic">
                      So I went to a place that had them cheaply priced...
                    </p>
                  </div>
                  <div className="mt-auto mb-6">
                    <img
                      src="/breakfast.png"
                      className="w-full rounded-2xl border-2 border-white opacity-80 shadow-lg grayscale"
                      alt="Scrubs"
                    />
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-gray-50 py-4">
                    <ChevronDown
                      className="rotate-90 text-gray-300"
                      size={16}
                    />
                    <div className="flex items-center gap-2 rounded-full bg-gray-50 px-4 py-1.5 text-[8px] font-bold text-gray-400">
                      <div className="h-2 w-2 rounded-full border border-gray-200" />
                      mediterraneanplan.com
                      <div className="h-2 w-2 rounded-full border border-gray-200" />
                    </div>
                    <div className="flex gap-2">
                      <div className="h-1 w-1 rounded-full bg-gray-200" />
                      <div className="h-1 w-1 rounded-full bg-gray-200" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone 2: How's That Possible? */}
            <div className="group relative z-10 scale-105">
              <div className="h-[650px] rounded-[60px] border-[8px] border-[#2A2F35] bg-[#10181F] p-4 shadow-[0_60px_120px_-30px_rgba(217,6,85,0.2)]">
                <div className="flex h-full flex-col overflow-hidden rounded-[45px] bg-white px-8 pt-12">
                  <h4 className="amsiproblack mb-10 text-2xl leading-tight font-black text-[#10181F] uppercase">
                    How's That Possible?
                  </h4>
                  <div className="mb-10 space-y-6 text-left">
                    <p className="text-[13px] leading-relaxed font-bold tracking-tighter text-gray-400 uppercase">
                      Turns out, if you knew what the ITALIANS knew...
                    </p>
                    <p className="text-[13px] leading-relaxed font-bold tracking-tighter text-gray-400 uppercase">
                      Then you'd know the secret that burns fat...
                    </p>
                    <p className="text-[13px] font-black tracking-tighter text-[#10181F] text-gray-400 uppercase">
                      Loses huge amounts of weight...
                    </p>
                  </div>
                  <div className="-mt-10 flex flex-1 flex-col items-center justify-center">
                    <img
                      src="/resul-page-women.png"
                      className="w-full max-w-[180px] object-contain"
                      alt="Transformation"
                    />
                    <div className="relative z-10 -mt-20 flex gap-20">
                      <ArrowRight
                        className="rotate-180 text-[#4285F4]"
                        size={24}
                      />
                      <ArrowRight className="text-[#4285F4]" size={24} />
                    </div>
                  </div>
                  <div className="mb-8 space-y-4 text-left">
                    <p className="text-[11px] leading-relaxed font-bold tracking-tighter text-gray-400 uppercase">
                      Which transforms your body naturally, safely, and{' '}
                      <span className="font-black text-[#10181F] underline decoration-[#D90655] decoration-2">
                        PERMANENTLY...
                      </span>
                    </p>
                    <p className="text-[11px] leading-relaxed font-bold tracking-tighter text-gray-400 uppercase">
                      All without exercise, magic pills, or stressful dieting.
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-gray-50 py-4">
                    <ChevronDown
                      className="rotate-90 text-gray-300"
                      size={16}
                    />
                    <div className="flex items-center gap-2 rounded-full bg-gray-50 px-4 py-1.5 text-[8px] font-bold text-gray-400">
                      <div className="h-2 w-2 rounded-full border border-gray-200" />
                      mediterraneanplan.com
                      <div className="h-2 w-2 rounded-full border border-gray-200" />
                    </div>
                    <div className="flex gap-2">
                      <div className="h-1 w-1 rounded-full bg-gray-200" />
                      <div className="h-1 w-1 rounded-full bg-gray-200" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone 3: Testimonials */}
            <div className="group relative">
              <div className="h-[650px] rounded-[60px] border-[8px] border-[#2A2F35] bg-[#10181F] p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
                <div className="flex h-full flex-col overflow-hidden rounded-[45px] bg-[#FFFDF5] px-6 pt-12">
                  <h4 className="amsiproblack mb-10 text-xl leading-tight font-black text-[#10181F] uppercase">
                    Here's Some People Who <br />
                    Chose Option 2...
                  </h4>

                  <div className="space-y-6">
                    <div className="group/card relative rounded-[24px] border border-orange-50/50 bg-white p-6 shadow-sm transition-transform hover:scale-[1.02]">
                      <div className="absolute -top-2 -right-2">
                        <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-md">
                          <img
                            src="/review-pic-1.png"
                            className="h-full w-full object-cover"
                            alt="User"
                          />
                        </div>
                      </div>
                      <h5 className="mb-3 pr-8 text-[13px] leading-tight font-black text-[#10181F]">
                        Cherish loved the flavors and shed her unwanted weight!
                      </h5>
                      <p className="text-[10px] leading-relaxed font-bold tracking-tighter text-gray-400 uppercase italic">
                        "I've felt a lot better on this diet! More energy and
                        I've gotten out walking often! I lost 13 lbs and the
                        variety of ingredients have been fun! Love the flavors!
                        I'd keep making these meals!" 🤟
                      </p>
                      <p className="mt-3 text-[9px] font-black tracking-[0.2em] text-[#D90655] uppercase">
                        -Cherish, <span className="text-gray-300">Ohio</span>
                      </p>
                    </div>

                    <div className="group/card relative rounded-[24px] border border-orange-50/50 bg-white p-6 shadow-sm transition-transform hover:scale-[1.02]">
                      <div className="absolute -top-2 -right-2">
                        <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-md">
                          <img
                            src="/review-pic-2.png"
                            className="h-full w-full object-cover"
                            alt="User"
                          />
                        </div>
                      </div>
                      <h5 className="mb-3 pr-8 text-[13px] leading-tight font-black text-[#10181F]">
                        Perris crushed her weight loss goals and feels amazing!
                      </h5>
                      <p className="text-[10px] leading-relaxed font-bold tracking-tighter text-gray-400 uppercase italic">
                        "I feel so much better! Yes, I'll continue to eat this
                        way! My family loves it also! Overall, I'm pleased!" 😍
                      </p>
                      <p className="mt-3 text-[9px] font-black tracking-[0.2em] text-[#D90655] uppercase">
                        -Perris, <span className="text-gray-300">Oklahoma</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-gray-50/20 py-4">
                    <ChevronDown
                      className="rotate-90 text-gray-300"
                      size={16}
                    />
                    <div className="flex items-center gap-2 rounded-full bg-white/50 px-4 py-1.5 text-[8px] font-bold text-gray-400">
                      <div className="h-2 w-2 rounded-full border border-gray-200" />
                      mediterraneanplan.com
                      <div className="h-2 w-2 rounded-full border border-gray-200" />
                    </div>
                    <div className="flex gap-2">
                      <div className="h-1 w-1 rounded-full bg-gray-200" />
                      <div className="h-1 w-1 rounded-full bg-gray-200" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Pricing Section */}
      <section className="bg-[#FAF7F2] py-24">
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="mb-16 text-center">
            <h2 className="amsiproblack mb-8 text-[32px] leading-tight font-black text-[#10181F] md:text-[44px]">
              Start your personalized Mediterranean{' '}
              <br className="hidden md:block" /> plan today for less than a cup
              of coffee
            </h2>

            <div className="mb-12 inline-block rounded-[24px] border border-[#DEE2E6] bg-white px-8 py-6 shadow-sm md:px-20">
              <span className="mr-6 text-sm font-black tracking-[0.2em] text-[#E31D1C] uppercase md:text-lg">
                THIS OFFER ENDS IN:
              </span>
              <span className="font-mono text-[32px] font-black tracking-tighter text-[#E31D1C] md:text-[40px]">
                08 : 59
              </span>
            </div>
          </div>

          <div className="mb-12 grid gap-6 md:grid-cols-3">
            {[
              {
                id: '3-months',
                name: '3-month plan',
                label: 'every 3 months',
                oldPrice: '$125',
                newPrice: '$62.99',
                oldDayPrice: '$1.38/day',
                newDayPrice: '$0.69/day',
              },
              {
                id: '1-month',
                name: '1-month plan',
                label: 'every month',
                oldPrice: '$59.99',
                newPrice: '$29.99',
                oldDayPrice: '$1.98/day',
                newDayPrice: '$0.99/day',
                badge: 'The best for you',
              },
              {
                id: '6-months',
                name: '6-month plan',
                label: 'every 6 months',
                oldPrice: '$179.99',
                newPrice: '$89.99',
                oldDayPrice: '$0.98/day',
                newDayPrice: '$0.49/day',
              },
            ].map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  'relative flex cursor-pointer flex-col items-start rounded-[24px] border-2 bg-white p-8 text-left transition-all',
                  selectedPlan === plan.id
                    ? 'border-[#E31D1C] shadow-lg shadow-[#E31D1C]/5'
                    : 'border-transparent'
                )}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.badge && (
                  <div className="absolute -top-3 right-6 rounded-full bg-[#D90655] px-4 py-1.5 text-[10px] font-black tracking-wider text-white uppercase shadow-lg">
                    {plan.badge}
                  </div>
                )}
                <div className="mb-8 flex items-start gap-4">
                  <div
                    className={cn(
                      'mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                      selectedPlan === plan.id
                        ? 'border-[#E31D1C]'
                        : 'border-gray-200'
                    )}
                  >
                    {selectedPlan === plan.id && (
                      <div className="h-3 w-3 rounded-full bg-[#E31D1C]" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[22px] leading-tight font-black text-[#10181F]">
                      {plan.name}
                    </span>
                    <span className="text-sm font-bold text-gray-400">
                      {plan.label}
                    </span>
                  </div>
                </div>
                <div className="mt-auto flex w-full items-end justify-between border-t border-gray-50 pt-6">
                  <div className="flex flex-col">
                    <span className="mb-0.5 text-sm font-bold text-gray-300 line-through">
                      {plan.oldPrice}
                    </span>
                    <span className="text-[18px] font-black text-gray-400">
                      {plan.newPrice}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="mb-0.5 text-[11px] font-bold text-gray-300 line-through">
                      {plan.oldDayPrice}
                    </p>
                    <p className="text-[32px] leading-none font-black text-[#E31D1C]">
                      {plan.newDayPrice}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-16 text-center">
            <p className="mb-8 text-[13px] font-bold text-gray-400 italic">
              Introductory price for first billing period only. Regular price
              applies after.
            </p>
            <Button
              className="w-full max-w-[440px] rounded-full bg-gradient-to-r from-[#D90655] to-[#FC3F39] py-10 text-[20px] font-black shadow-2xl shadow-[#D90655]/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => navigate('/login')}
            >
              Claim my plan
            </Button>
          </div>

          {/* Payment & Security Footer */}
          <div className="flex flex-col items-center gap-12">
            <div className="flex flex-col items-center gap-6">
              <p className="text-[14px] font-black tracking-[0.2em] text-[#10181F] uppercase opacity-80">
                Secure payment by:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-10">
                <div className="flex items-center gap-2 underline decoration-gray-200 underline-offset-8">
                  <div className="flex h-8 w-16 items-center justify-center rounded-lg bg-gray-50 text-[11px] font-black text-blue-800 italic">
                    PayPal
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-6 rounded-sm bg-red-500" />
                  <div className="-ml-4 h-4 w-6 rounded-sm bg-orange-400 opacity-80" />
                </div>
                <div className="text-[14px] font-black tracking-tighter text-blue-900 italic">
                  VISA
                </div>
                <div className="flex h-5 w-8 items-center justify-center rounded bg-[#0070CE] text-[6px] font-bold text-white">
                  AMEX
                </div>
                <div className="text-[16px] font-black tracking-tighter text-gray-800 uppercase">
                  Discover
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
              <img
                src="/McAfee Secure.png"
                alt="McAfee"
                className="h-12 cursor-pointer transition-transform hover:scale-105"
              />
              <img
                src="/TrustedSite.png"
                alt="Trusted"
                className="h-12 cursor-pointer transition-transform hover:scale-105"
              />
              <img
                src="/Nortan.png"
                alt="Norton"
                className="h-12 cursor-pointer transition-transform hover:scale-105"
              />
              <img
                src="/VeriSign.png"
                alt="VeriSign"
                className="h-12 cursor-pointer transition-transform hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Tabs Section */}
      <section className="bg-white pb-24">
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="rounded-[50px] border border-gray-50 bg-white p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] md:p-16">
            <div className="no-scrollbar mb-12 flex gap-10 overflow-x-auto border-b border-gray-100">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'relative shrink-0 px-4 pb-6 text-[15px] font-black tracking-[0.15em] uppercase transition-all',
                    activeTab === tab
                      ? 'text-[#D90655]'
                      : 'text-gray-300 hover:text-gray-400'
                  )}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-[-2px] left-0 h-1 w-full rounded-full bg-[#D90655] shadow-[0_2px_10px_rgba(217,6,85,0.4)]" />
                  )}
                </button>
              ))}
            </div>

            <div className="grid items-center gap-20 lg:grid-cols-2">
              <div className="text-center md:text-left">
                <div className="mb-8 flex justify-center gap-2.5 md:justify-start">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      fill="#D90655"
                      className="text-[#D90655]"
                      size={40}
                    />
                  ))}
                </div>
                <p className="mb-4 text-[72px] leading-none font-black tracking-tighter text-[#10181F]">
                  4.7<span className="text-3xl text-gray-200">/5.0</span>
                </p>
                <div className="mb-2 flex items-center justify-center gap-3 md:justify-start">
                  <Users className="text-[#D90655]" size={20} />
                  <p className="text-[14px] font-extrabold tracking-widest text-gray-400 uppercase">
                    127k+ Happy Users
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                {[
                  { label: 'Dietary habits', score: 85, color: 'bg-[#D90655]' },
                  { label: 'Health status', score: 92, color: 'bg-[#34A853]' },
                  {
                    label: 'Physical activity',
                    score: 78,
                    color: 'bg-[#FFA500]',
                  },
                  {
                    label: 'Metabolism support',
                    score: 88,
                    color: 'bg-[#4285F4]',
                  },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="mb-3 flex items-center justify-between px-1">
                      <span className="text-[15px] font-black tracking-widest text-[#10181F] uppercase">
                        {stat.label}
                      </span>
                      <span className="text-lg font-black text-[#10181F]">
                        {stat.score}%
                      </span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full border border-gray-100 bg-gray-50 shadow-inner">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-1000',
                          stat.color
                        )}
                        style={{ width: `${stat.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-[#F8F9FA] py-24">
        <div className="mx-auto max-w-[1000px] px-6">
          <h2 className="amsiproblack mb-16 text-center text-[34px] font-black tracking-tight text-[#10181F] uppercase md:text-[48px]">
            Why we are the best choice
          </h2>
          <div className="no-scrollbar overflow-x-auto rounded-[50px] border border-white bg-white p-8 shadow-2xl md:p-16">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-50 text-[10px] font-black tracking-[0.3em] text-gray-300 uppercase">
                  <th className="py-8 text-left">Key Features</th>
                  <th className="rounded-t-[30px] bg-[#FDF2F5]/50 py-8 text-center">
                    <img src="/logo.png" className="mx-auto h-6" />
                  </th>
                  <th className="py-8 text-center text-gray-400">
                    Other Diets
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  'Personalized Daily meal plans',
                  'Over 500 delicious recipes',
                  "No 'forbidden' food groups",
                  'Sustainable long-term results',
                  'Community support group',
                  'Shopping lists & meal preps',
                ].map((feat, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-50 transition-colors hover:bg-gray-50/50"
                  >
                    <td className="py-8 text-lg font-black text-[#10181F]">
                      {feat}
                    </td>
                    <td className="bg-[#FDF2F5]/50 py-8 text-center last:rounded-b-[30px]">
                      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#34A853] text-white shadow-lg shadow-[#34A853]/20">
                        <Check size={20} strokeWidth={4} />
                      </div>
                    </td>
                    <td className="py-8 text-center">
                      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-300">
                        <X size={20} strokeWidth={4} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Michael R Testimonial */}
      <section className="overflow-hidden bg-white py-24">
        <div className="mx-auto max-w-[1100px] px-6 text-center">
          <div className="relative mb-12 inline-block">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                fill="#D90655"
                className="mx-1 inline-block text-[#D90655]"
                size={32}
              />
            ))}
          </div>
          <h3 className="amsipro mx-auto mb-16 max-w-4xl text-[28px] leading-[1.3] font-black text-[#10181F] italic md:text-[42px]">
            "This quiz helped me understand what kind of Mediterranean diet
            actually works for me. The meal plan is simple, delicious, and fits
            perfectly into my routine. I finally feel consistent without
            stress."
          </h3>
          <div className="flex flex-col items-center gap-4">
            <div className="mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-[#FDF2F5] shadow-2xl">
              <img
                src="/michael.svg"
                alt="Michael"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-[11px] font-black tracking-[0.3em] text-[#D90655] uppercase">
              Michael R.
            </p>
            <p className="text-lg font-black text-[#10181F]">
              Managing Partner, DP Group
            </p>
          </div>
        </div>
      </section>

      {/* Mobile App Preview */}
      <section className="relative overflow-hidden bg-[#10181F] py-24">
        <div className="absolute top-0 right-0 -mt-64 -mr-64 h-[500px] w-[500px] rounded-full bg-[#D90655]/10 blur-[120px]" />
        <div className="mx-auto max-w-[1200px] px-6 text-center text-white">
          <h2 className="amsiproblack mb-10 text-[34px] font-black tracking-tight uppercase md:text-[56px]">
            Your health is in your hand
          </h2>
          <p className="mx-auto mb-20 max-w-2xl text-lg font-medium text-gray-400">
            Access your plan, track your progress, and get expert help anytime
            using our mobile-friendly dashboard.
          </p>
          <div className="mx-auto max-w-[1000px] transform transition-transform duration-700 hover:scale-[1.02]">
            <img
              src="/plan-food.png"
              alt="Dashboard"
              className="w-full drop-shadow-[0_80px_100px_rgba(217,6,85,0.15)]"
            />
          </div>
        </div>
      </section>

      {/* People often ask Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1000px] px-6">
          <h2 className="amsiproblack mb-16 text-center text-[34px] font-black tracking-tight text-[#10181F] uppercase md:text-[48px]">
            People often ask
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'What is your money-back guarantee?',
                a: "Because we believe so much in the quality and effectiveness of The Mediterranean Diet, we offer our customers a 60-day money-back guarantee. If you're unhappy for any reason whatsoever, you will get a full refund with no questions asked!",
                isOpen: true,
              },
              {
                q: 'How much weight can I expect to lose?',
                a: 'Individual results vary based on starting weight, activity level, and consistency with the plan. Most users report healthy, steady progress that feels sustainable long term.',
                isOpen: false,
              },
              {
                q: 'Will this help with my cholesterol?',
                a: 'The Mediterranean diet is clinically shown to support heart health and healthy cholesterol levels through its focus on healthy fats and whole foods.',
                isOpen: false,
              },
              {
                q: 'Will this help with my blood sugar levels?',
                a: 'By focusing on complex carbohydrates and balanced meal structures, our plan helps support consistent energy and healthy blood sugar levels.',
                isOpen: false,
              },
            ].map((faq, i) => (
              <FAQSection key={i} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* ClickBank Disclaimer & Footer */}
      <footer className="bg-white px-6 pt-24 pb-12">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-20 space-y-10 px-4 text-center">
            <p className="mx-auto max-w-4xl text-[11px] leading-relaxed font-medium tracking-tight text-[#A2ABB2]">
              ClickBank is the retailer of products on this site. CLICKBANK® is
              a registered trademark of Click Sales Inc., a Delaware corporation
              located at 1444 S. Entertainment Ave., Suite 410 Boise, ID 83709,
              USA and used by permission. ClickBank's role as retailer does not
              constitute an endorsement, approval or review of these products or
              any claim, statement or opinion used in promotion of these
              products.
            </p>

            <p className="text-[11px] font-medium tracking-tight text-[#A2ABB2]">
              All pictures shown are for illustration purpose only. Actual
              product may vary due to product enhancement and may not be an
              exact representation of the product.
            </p>

            <p className="mx-auto max-w-4xl text-[11px] leading-relaxed font-medium tracking-tight text-[#A2ABB2]">
              Any order help you can get from Clickbank through the "Order
              Support" link below. Any product help you can get from the vendor
              through the "Product Support" link below.
            </p>
          </div>

          <div className="mb-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              'GET STARTED',
              'PRIVACY POLICY',
              'PRODUCT SUPPORT',
              'ORDER SUPPORT',
              'BLOG',
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[11px] font-black tracking-[0.2em] text-[#10181F] uppercase transition-colors hover:text-[#D90655]"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="border-t border-gray-50 pt-8 text-center">
            <p className="text-[11px] font-black tracking-[0.3em] text-[#A2ABB2] uppercase">
              ©2026 MEDITERRANEANPLAN.COM
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Add this component before or inside the main file scope
function FAQSection({ faq }: { faq: any }) {
  const [isOpen, setIsOpen] = useState(faq.isOpen);
  return (
    <div
      className={cn(
        'rounded-[24px] border transition-all duration-300',
        isOpen
          ? 'border-gray-100 bg-white p-10 shadow-[0_15px_40px_rgba(0,0,0,0.04)]'
          : 'border-transparent bg-[#F8F9FA] p-8 md:p-10'
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="pr-8 text-lg leading-tight font-bold text-[#10181F] md:text-xl">
          {faq.q}
        </span>
        {isOpen ? (
          <X size={20} className="shrink-0 text-[#10181F]" />
        ) : (
          <Plus size={20} className="shrink-0 text-[#10181F]" />
        )}
      </button>
      {isOpen && (
        <div className="animate-in fade-in slide-in-from-top-4 mt-8 max-w-3xl leading-relaxed font-medium text-gray-500 duration-500">
          {faq.a}
        </div>
      )}
    </div>
  );
}
