import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, CheckCircle2, Star, Menu, X } from 'lucide-react';
import WeightChart from '@/components/weightChart';

export default function PredictedResultsPage() {
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

      <main className="mx-auto w-full max-w-xl px-6 pt-8">
        <div className="mb-4 space-y-3 text-center">
          <p className="mb-4 text-base font-normal text-[#10181FB2]">
            Based on your answers
          </p>
          <h2 className="baikal-trial mx-auto max-w-md text-center text-[28px] leading-[1.1em] font-semibold text-[#10181F] md:text-[32px]">
            We estimate you could reach 62kg by April 30th
          </h2>
          <p className="mx-auto md:mt-6 mt-[18px] md:mb-8 mb-6 max-w-md text-base font-normal text-[#10181FB2]">
            This projection is based on people with similar profiles following a
            personalized Mediterranean plan
          </p>
        </div>

        {/* Projection Chart Placeholder */}
        <div className="rounded-[14px] border border-[#10181F1A] p-8 shadow-[-4px_-4px_10px_0px_#00000005]">
          <div className="relative flex w-full flex-col justify-between">
            {/* <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-black tracking-widest text-[#1a1a1b]/20 uppercase">
                  82kg
                </p>
                <div className="h-3 w-3 rounded-full border-2 border-white bg-[#D90655] shadow-sm" />
              </div>
              <div className="space-y-1 text-right">
                <div className="mb-2 inline-block rounded-lg bg-[#34a853] px-3 py-1.5 text-[10px] font-black text-white shadow-lg shadow-[#34a853]/20">
                  ESTIMATED TARGET: 62kg
                </div>
                <div className="flex justify-end">
                  <div className="h-3 w-3 rounded-full border-2 border-white bg-[#34a853] shadow-sm" />
                </div>
              </div>
            </div> */}

            {/* Chart Line Placeholder */}
            {/* <div className="absolute inset-0 -z-10 flex items-center justify-center px-6">
              <div className="h-1 w-full rotate-12 transform rounded-full bg-gradient-to-r from-[#D90655] via-[#FC3F39] to-[#34a853] opacity-50" />
            </div> */}

            {/* <div className="flex justify-between border-t border-[#1a1a1b]/5 pt-8">
              <span className='text-[#10181FB2] text-[14px] font-normal capitalize'>Now</span>
              <span className='text-[#10181FB2] text-[14px] font-normal capitalize'>Feb</span>
              <span className='text-[#10181FB2] text-[14px] font-normal capitalize'>Mar</span>
              <span className='text-[#10181FB2] text-[14px] font-normal capitalize'>Apr</span>
            </div> */}

            <WeightChart />
          </div>
        </div>

        <div className="w-full space-y-8">
          <h3 className="baikal-trial mt-8 mb-6 text-left text-[20px] leading-[1.1em] font-semibold text-[#10181F] md:text-[24px]">
            What people like you are saying
          </h3>

          {/* Testimonial */}
          <div className="mt-6 mb-8 rounded-[14px] border border-[#10181F1A] p-8 shadow-[-4px_-4px_10px_0px_#00000005] ">
            <div className="mb-6 flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-[#1a1a1b] text-[#1a1a1b]"
                />
              ))}
            </div>
            <p className="mb-6 text-base font-normal text-[#10181FB2]">
              “This quiz helped me understand what kind of Mediterranean diet
              actually works for me. The meal plan is simple, delicious, and
              fits perfectly into my routine. I finally feel consistent without
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
        </div>

        <div className="w-full text-center ">
          <Button
            className="rounded-full px-14 pt-2 pb-3.5 text-xl font-normal md:pb-4 md:text-2xl"
            onClick={() => navigate('/login')}
          >
            Continue to your <span className='md:block hidden'>&nbsp; personalized &nbsp; </span> plan
          </Button>
          <div className="mt-auto flex items-center justify-center text-xs font-bold text-[#1a1a1b]/60 pt-4 pb-10">
            <span className="text-xs font-normal text-[#10181FCC]">
              Take less that a minute
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
