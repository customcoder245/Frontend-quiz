import { useNavigate } from 'react-router-dom';
import { Star, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    /* Entire page locked to viewport height with no scroll */
    <div className="selection:bg-primary/20 selection:text-primary-foreground flex h-screen flex-col overflow-hidden bg-white py-8 font-sans">
      {/* Header / Nav - UI preserved exactly as original */}

      <header className="bg-opacity-30 mx-auto flex w-full max-w-[1360px] items-center justify-between rounded-full bg-white px-8 py-3.5 shadow-[4px_4px_10px_0px_rgba(0,0,0,0.05)] backdrop-blur-[40px] backdrop-blur-lg">
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
          {isLoggedIn ? (
            <button
              className="hidden h-[35px] cursor-pointer rounded-full bg-gradient-to-r from-[#D90655] to-[#FC3F39] px-6 text-sm font-bold text-white shadow-xl transition-all hover:opacity-90 active:scale-[0.98] md:block"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="hidden h-[35px] cursor-pointer rounded-full bg-gradient-to-r from-[#D90655] to-[#FC3F39] px-6 text-sm font-bold text-white shadow-xl transition-all hover:opacity-90 active:scale-[0.98] md:block"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="rounded-full p-2 text-[#1a1a1b] transition-colors hover:bg-black/5 md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
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

          <div className="mt-auto border-t border-black/5 pt-8">
            <button
              className="shadow-primary/20 h-[50px] w-full rounded-full bg-gradient-to-r from-[#D90655] to-[#FC3F39] text-[16px] font-bold text-white shadow-xl transition-all hover:opacity-90 active:scale-[0.98]"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Main Hero Section */}
      <main className="md:bg-[url('/public/banner.png')] bg-no-repeat bg-right bg-cover h-full mt-4">
          <div className='max-w-[1360px] mx-auto md:px-8'>

          
        <div className='md:flex '>
            <div className="md:pt-32 pt-8 px-6 md:px-0">
                <div className="space-y-6">
                <h1 className="font-extrabold text-[56px]  leading-tight">
                    Create your ideal 30-day <br className="hidden xl:block" />
                    Mediterranean meal plan
                </h1>
                <p className="font-AmsiPro-Regular text-20px font-bold text-[#1a1a1b]/30 md:text-2xl">
                    Take 1-minute FREE test
                </p>
                </div>
                <div className="space-y-6">
                <p className="font-AmsiPro-Regular text-[13px] font-bold text-[#1a1a1b]/40">
                    Start by selecting your gender:
                </p>

                <div className="flex flex-col gap-5 sm:flex-row">
                    <button
                    className="h-[56px] rounded-[50px] bg-gradient-to-r from-[#D90655] to-[#FC3F39] text-[24px] font-bold text-white shadow-xl shadow-pink-100 transition-all active:scale-[0.98] sm:w-[196px]"
                    onClick={() => navigate('/quiz?gender=female')}
                    >
                    Female
                    </button>
                    <button
                    className="h-[56px] rounded-[50px] bg-[#1a1a1b] text-[24px] font-bold text-white shadow-xl shadow-black/5 transition-all hover:bg-[#2a2a2b] active:scale-[0.98] sm:w-[195px]"
                    onClick={() => navigate('/quiz?gender=male')}
                    >
                    Male
                    </button>
                </div>
                </div>
                {/* Social Proof */}
                <div className="flex flex-wrap items-center gap-x-10 gap-y-4 pt-4">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                        key={i}
                        className="h-4 w-4 fill-[#ff9500] text-[#ff9500]"
                        />
                    ))}
                    </div>
                    <p className="text-[13px] font-bold text-[#1a1a1b]">
                    2475 customer reviews
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-lg">🛡️</span>
                    <span className="text-[13px] font-bold text-[#1a1a1b]">
                    Trusted by 127K+
                    </span>
                </div>
                </div>
            </div>
            <div className='md:hidden block w-full'>
                <img src="/public/mobile-banner.png" className='w-full h-full' alt="" />
            </div>
        </div>
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="mt-auto w-full shrink-0 px-6 py-6 md:px-12">
        <div className="mx-auto flex max-w-[1800px] flex-col items-start justify-between gap-6 border-t border-slate-50 pt-2 md:flex-row">
          <p className="font-AmsiPro-Regular text-[12px] font-bold text-[#1a1a1b]/20">
            © 2026 Mediterranean Plan. <br /> All rights reserved.
          </p>

          <div className="max-w-[700px] md:text-right">
            <p className="font-AmsiPro-Regular text-[12px] leading-relaxed font-bold text-[#1a1a1b]/10">
              Disclaimer: Results may vary depending on the individual. By{' '}
              <br />
              proceeding, you agree to our{' '}
              <span className="cursor-pointer underline">Terms of Service</span>
              , <span className="cursor-pointer underline">Privacy Policy</span>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
