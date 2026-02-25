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
    <div className="selection:bg-primary/20 selection:text-primary-foreground flex xl:h-screen flex-col overflow-hidden bg-white md:py-8 py-6 font-sans">
      {/* Header / Nav - UI preserved exactly as original */}
<div className='md:mx-6'>
      <header className="bg-opacity-30 mx-auto flex w-full max-w-[1360px] items-center justify-between rounded-full bg-white md:px-8 px-6 py-3.5 md:shadow-[4px_4px_10px_0px_rgba(0,0,0,0.05)] backdrop-blur-[40px] backdrop-blur-lg">
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
              className=" leading-[1.8em] hidden py-2 cursor-pointer rounded-full bg-gradient-to-r from-[#D90655] to-[#FC3F39] px-6 text-sm font-normal text-white shadow-xl transition-all hover:opacity-90 active:scale-[0.98] md:block"
              onClick={handleLogout}
            >
            Logout
            </button>
          ) : (
            <button
              className="hidden leading-[1.8em] py-2 cursor-pointer rounded-full bg-gradient-to-r from-[#D90655] to-[#FC3F39] px-6 text-sm font-normal text-white shadow-xl transition-all hover:opacity-90 active:scale-[0.98] md:block"
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
</div>
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

      {/* Main Hero Section */}
      <main className="md:bg-[url('/public/banner.png')] bg-no-repeat bg-right bg-cover h-full md:mt-4">
          <div className='max-w-[1360px] mx-auto md:px-8'>
        <div className='md:flex '>
            <div className="md:pt-32 pt-8 px-6 md:px-0">
                <div className="space-y-6">
                <h1 className="xl:max-w-screen-md max-w-xl font-extrabold lg:text-[56px] text-[40px] m-0 leading-tight amsiproblack">
                    Create your ideal 30-day <br className="hidden xl:block" />
                    Mediterranean meal plan
                </h1>
                <p className="md:text-xl text-base text-[#10181FB2] font-normal mt-5 md:mb-10 mb-8">
                    Take 1-minute FREE test
                </p>
                </div>
                <div className="space-y-6">
                <p className="text-[#10181F] font-normal text-sm mb-3">
                    Start by selecting your gender:
                </p>

                <div className="flex flex-col md:gap-5 gap-2 sm:flex-row">
                    <button
                    className="amsipro font-normal cursor-pointer shadow-primary/20 py-4 px-14 rounded-full bg-gradient-to-r from-[#D90655] to-[#FC3F39] text-[16px] font-normal text-white transition-all hover:opacity-90 active:scale-[0.98]"
                    onClick={() => navigate('/quiz?gender=female')}
                    >
                    Female
                    </button>
                    <button
                    className="amsipro  font-normal cursor-pointer shadow-primary/20 py-4 px-14 rounded-full bg-[#121A16] text-[16px] font-normal text-white  transition-all hover:opacity-90 active:scale-[0.98]"
                    onClick={() => navigate('/quiz?gender=male')}
                    >
                    Male
                    </button>
                </div>
                </div>
                {/* Social Proof */}
                <div className="flex flex-wrap items-center gap-x-10 md:gap-y-6 gap-y-3 md:mt-16 mt-10">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                        key={i}
                        className="h-4 w-4 fill-[#ff9500] text-[#ff9500]"
                        />
                    ))}
                    </div>
                    <p className="text-sm font-normal text-[#10181F]">
                    2475 customer reviews
                    </p>
                </div>
                <div className="flex items-center gap-2 ">
                    <span className="text-lg"><img src="/public/trusted.svg" alt="" /></span>
                    <span className="text-sm font-normal text-[#10181F]">
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
      <footer className="px-6 md:py-5 pt-5">
        <div className="max-w-[1360px] mx-auto md:px-8 md:flex justify-between items-center">

          <p className="text-[#10181F80] font-normal text-xs">
            © 2026 Mediterranean Plan. <br /> All rights reserved.
          </p>

          <div className="md:pt-0 pt-3.5">
            <p className="text-[#10181F80] font-normal text-xs">
              Disclaimer: Results may vary depending on the individual. By{' '}
              <br />
              proceeding, you agree to our{' '}
              <span className="cursor-pointer ">Terms of Service</span>
              , <span className="cursor-pointer">Privacy Policy</span>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
