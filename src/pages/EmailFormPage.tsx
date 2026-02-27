import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Loader2, Menu, X } from 'lucide-react';

export default function EmailFormPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const quizResponses = JSON.parse(sessionStorage.getItem('quizResponses') || '[]');
            const quizGender = sessionStorage.getItem('quizGender') || 'both';

            const calculatedBMI = sessionStorage.getItem('calculatedBMI');
            const bmiNumber = calculatedBMI ? parseFloat(calculatedBMI) : undefined;

            const response = await fetch(`${API_BASE_URL}/questions/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    firstName: name,
                    responses: quizResponses,
                    gender: quizGender,
                    bmi: bmiNumber
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Submission failed');
            }

            // Store the JWT token and user info so results pages can authenticate
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
            } else {
                localStorage.setItem('user', JSON.stringify({ email, firstName: name }));
            }

            // Clear quiz session data
            sessionStorage.removeItem('quizResponses');
            sessionStorage.removeItem('quizGender');

            navigate('/calculating');
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
            console.error('Quiz submission error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="xl:h-screen bg-white font-sans flex flex-col pt-5">

            <header className="bg-opacity-30 mx-auto flex w-full max-w-[1360px] items-center justify-between  bg-white md:px-8 px-6 py-3.5 backdrop-blur-[40px] backdrop-blur-lg">
                <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                    <img src="/logo.png" alt="The Mediterranean Diet" className="h-8 md:h-10 w-auto object-contain" />
                </div>

                <div className="hidden sm:flex items-center space-x-6">
                    <div className="flex items-center gap-2 ">
                        <img src="/check.svg" className='m-0' alt="" />
                        <span className='text-[#10181F] text-sm font-normal leading-[1.8em]'>95% Success rate</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src="/Shield.svg" className='m-0' alt="" />
                        <span className="text-[#10181F] text-sm font-normal leading-[1.8em]">Trusted by 127K+</span>
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
                </div>
            </div>

            <main className="max-w-xl mx-auto w-full px-6 pt-8">
                <h2 className="md:text-[32px] text-[28px] font-semibold leading-[1.2em] baikal-trial text-[#10181F] text-center">
                    Enter your name and email to view the results
                </h2>

                {error && (
                    <div className="my-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 font-bold">
                        {error}
                    </div>
                )}

                <form className="w-full mt-8 space-y-4 " onSubmit={handleSubmit}>
                    <Input
                        placeholder="Name"
                        className="rounded-lg font-normal border-[1px] border-[#10181F1A] md:h-[60px] h-[48px] md:text-xl text-base bg-white placeholder:text-[#10181F80]"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        placeholder="email@email.com"
                        type="email"
                        className="focus-visible:shadow-none rounded-lg font-normal border-[1px] border-[#10181F1A] md:h-[60px] h-[48px]  md:text-xl text-base bg-white placeholder:text-[#10181F80]"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className="bg-[#088E441A] border border-[#088E441A] md:p-8 p-6  flex rounded-[14px] text-base font-normal gap-4 ">
                        <div className="md:w-[10%] w-[20%]">
                            <img src="/lock.svg" className='w-[24px] h[24px]' alt="" />
                        </div>
                        <p className="text-[#10181FB2] md:text-base text-sm">
                            We respect your privacy. Your email is safe with us. We&apos;ll send you a copy of your results for easy access — no spam, ever.
                        </p>
                    </div>
                    <div className='text-center mt-6'>
                        <Button
                            className="md:max-w-[214px] max-w-[196px] md:text-2xl text-xl font-normal rounded-full px-14 !h-full pt-2 md:pb-4 pb-3.5"
                            type="submit"
                            disabled={isLoading}
                        >
                            <span>
                                {isLoading ? <Loader2 className="animate-spin" /> : 'Continue'}
                            </span>
                        </Button>
                    </div>
                </form>

                <div className="mt-auto md:pt-20 pt-8 md:pb-10 pb-6 flex items-center justify-center space-x-2 text-xs font-bold text-[#1a1a1b]/60">
                    <div className="w-2 h-2 bg-[#088E44] rounded-full  center" />
                    <span className='text-[#10181FCC] text-xs font-normal'>856 people are taking this quiz right now</span>
                </div>
            </main>
        </div>
    );
}
