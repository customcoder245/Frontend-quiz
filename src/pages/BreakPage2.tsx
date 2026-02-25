import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import {
  ShieldCheck,
  CheckCircle2,
  Heart,
  AlertTriangle,
  Menu,
  X,
} from 'lucide-react';

export default function BreakPage2() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

      {/* Content Area */}
      <main className="mx-auto w-full max-w-xl px-6 pt-8">
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
          <div className="">
            <div className="mb-6 flex items-center gap-3">
              <div className="">
                <img src="/heart.svg" alt="" />
              </div>
              <span className="baikal-trial text-[20px] leading-[1.2em] font-semibold text-[#10181F] md:text-[24px]">
                Body Mass Index (BMI)
              </span>
            </div>

            <div className="grid items-center gap-8 md:grid-cols-2">
              {/* BMI Gauge Placeholder */}
              <div className="relative flex flex-col items-center justify-center">
                <div className="relative h-24 w-48 overflow-hidden">
                  <div className="h-48 w-48 rotate-45 rounded-full border-[16px] border-t-transparent border-l-transparent bg-gradient-to-r from-[#34a853] via-yellow-400 to-orange-500 opacity-20" />
                  {/* Active part would be here */}
                  <div className="absolute inset-0 flex items-end justify-center">
                    <div className="text-center">
                      <p className="text-4xl font-black text-[#1a1a1b]">31.2</p>
                      <p className="text-xs font-bold tracking-widest text-[#1a1a1b]/40 uppercase">
                        Overweight
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-[#34a853]" />
                  <span className="text-xs font-bold text-[#1a1a1b]/40">
                    Ideal = 21.5
                  </span>
                </div>
              </div>

              {/* BMI Stats */}
              <div className="space-y-4">
                <div className="rounded-[12px] bg-[#10181F08] md:p-5.5 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[12px]">
                      <div className="flex items-center gap-[6px]">
                        <div>
                          <img src="/age.svg" alt="" />
                        </div>
                        <span className="text-base font-normal text-[#10181F80] md:text-xl">
                          Age:
                        </span>
                      </div>
                      <div>
                        <span className="text-base font-normal text-[#10181F] md:text-xl">
                          32
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="my-3 flex items-center justify-between md:my-6">
                    <div className="flex items-center gap-[12px]">
                      <div className="flex items-center gap-[6px]">
                        <div>
                          <img src="/height.svg" alt="" />
                        </div>
                        <span className="text-base font-normal text-[#10181F80] md:text-xl">
                          Height:
                        </span>
                      </div>
                      <div>
                        <span className="text-base font-normal text-[#10181F] md:text-xl">
                          165 cm
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[12px]">
                      <div className="flex items-center gap-[6px]">
                        <div>
                          <img src="/weight.svg" alt="" />
                        </div>
                        <span className="text-base font-normal text-[#10181F80] md:text-xl">
                          Weight:
                        </span>
                      </div>
                      <div>
                        <span className="text-base font-normal text-[#10181F] md:text-xl">
                          82 kg
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#088E441A] rounded-[8px] py-3 px-3.5">
                   <div className="flex items-center gap-[12px]">
                      <div className="flex items-center gap-[6px]">
                        <div>
                          <img src="/goal.svg" alt="" />
                        </div>
                        <span className="text-base font-normal text-[#10181F80] md:text-xl">
                          Goal:
                        </span>
                      </div>
                      <div>
                        <span className="text-base font-normal text-[#10181F] md:text-xl">
                         Lose 20 kg
                        </span>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Box */}
        <div className="flex gap-4 rounded-[14px] border border-[#FCB6401A] bg-[#FCB6401A] p-6 text-base font-normal md:p-8">
          <div className="md:w-[15%] w-[30%]">
            <img src="/unhealthy.svg" className="h[24px] w-[24px]" alt="" />
          </div>
          <div>
            <h3 className="mb-2 md:text-xl text-[18px] leading-6 font-normal text-[#10181F]">
              Risks of an unhealthy BMI
            </h3>
            <p className="text-sm text-[#10181FB2] md:text-base">
              High blood pressure, heart diseases, type 2 diabetes, osteoarthritis, certain cancers, depression and anxiety, reduced life expectancy.
            </p>
          </div>
        </div>

        {/* Encouragement Box */}
        <div className=" mt-6 mb-8 flex gap-4 rounded-[14px] border border-[#088E441A] bg-[#088E441A] p-6 text-base font-normal md:p-8">
          <div className="md:w-[10%] w-[20%]">
            <img src="/check.svg" className="h[24px] w-[24px]" alt="" />
          </div>
          <div>
            <p className="text-sm text-[#10181FB2] md:text-base">
              You're not alone — we'll build a plan that fits your lifestyle, preferences, and long-term goals.
            </p>
          </div>
        </div>
<div className=" text-center">
        <Button
          className="rounded-full px-14 pt-2 pb-3.5 text-xl font-normal md:pb-4 md:text-2xl"
          onClick={() => navigate('/email-form')}
        >
          Continue
        </Button>
</div>
       <div className="mt-auto flex items-center justify-center pt-8 pb-6 text-xs font-bold text-[#1a1a1b]/60 md:pt-8 md:pb-10">
          <div className="center h-2 w-2 rounded-full bg-[#088E44]" />
          <span className="text-xs font-normal text-[#10181FCC]">
            856 people are taking this quiz right now
          </span>
        </div>
      </main>
    </div>
  );
}
