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
    Plus
} from 'lucide-react';
import { cn } from '@/utils/cn';


export default function ResultSales() {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState('1-month');
    const [activeTab, setActiveTab] = useState('SCORE');

    const tabs = ['SCORE', 'BMI', 'HEALTH', 'FOOD', 'METABOLISM'];

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans pb-0">
            {/* Header */}
            <header className="bg-white/90 backdrop-blur-md px-6 md:px-12 py-4 flex items-center justify-between border-b border-gray-50 sticky top-0 z-[100]">
                <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                    <img src="/logo.png" alt="Logo" className="h-8 md:h-10" />
                </div>
                <div className="flex items-center gap-6 md:gap-12">
                    <div className="hidden lg:flex items-center gap-2.5 text-[13px] font-bold text-gray-400 uppercase tracking-wider">
                        <Phone size={18} className="text-[#34A853]" />
                        <span>Support: 890 120 45 61</span>
                    </div>
                    <div className="hidden lg:flex items-center gap-2.5 text-[13px] font-bold text-gray-400 uppercase tracking-wider">
                        <Clock size={18} className="text-[#FFA500]" />
                        <span>08:00 - 20:00 (EST)</span>
                    </div>
                    <button className="lg:hidden p-2 hover:bg-gray-50 rounded-full transition-colors" onClick={() => setIsMobileMenuOpen(true)}>
                        <Menu className="h-7 w-7 text-[#10181F]" />
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[110] bg-white p-8 flex flex-col transition-all duration-500">
                    <div className="flex justify-between items-center mb-12">
                        <img src="/logo.png" alt="Logo" className="h-10" />
                        <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={32} /></button>
                    </div>
                    <nav className="flex flex-col gap-8 text-2xl font-black text-[#10181F] uppercase tracking-tighter">
                        <a href="#" className="flex justify-between items-center border-b border-gray-100 pb-4">Home <ArrowRight size={24} className="text-gray-300" /></a>
                        <a href="#" className="flex justify-between items-center border-b border-gray-100 pb-4">About the plan <ArrowRight size={24} className="text-gray-300" /></a>
                        <a href="#" className="flex justify-between items-center border-b border-gray-100 pb-4">FAQ <ArrowRight size={24} className="text-gray-300" /></a>
                        <a href="#" className="flex justify-between items-center border-b border-gray-100 pb-4">Support <ArrowRight size={24} className="text-gray-300" /></a>
                    </nav>
                </div>
            )}

            {/* Profile Summary Section */}
            <section className="bg-white pt-12 md:pt-20 pb-16">
                <div className="max-w-[1000px] mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-[32px] md:text-[44px] font-black text-[#10181F] amsiproblack leading-tight">
                            We've built your perfect <br /> Mediterranean diet plan
                        </h2>
                    </div>

                    <div className="bg-white rounded-[24px] border border-gray-100 shadow-2xl p-6 md:p-10 max-w-[850px] mx-auto overflow-hidden">
                        {/* Summary Header */}
                        <div className="flex items-center gap-4 mb-8 border-b border-gray-50 pb-6">
                            <div className="bg-red-50 p-2 rounded-lg">
                                <Users size={20} className="text-[#D90655]" />
                            </div>
                            <h3 className="text-xl font-bold text-[#10181F]">Your profile summary</h3>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 mb-10 items-center md:items-start">
                            {/* Profile Image */}
                            <div className="w-full md:w-[280px] shrink-0">
                                <img
                                    src="/resul-page-women.png"
                                    alt="Profile"
                                    className="w-full rounded-[20px] object-cover shadow-sm"
                                />
                            </div>

                            {/* Profile Details List */}
                            <div className="flex-1 w-full space-y-6">
                                <div className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <img src="/age.svg" className="h-4 w-4 opacity-40" alt="" />
                                        <span className="text-gray-400 font-medium text-sm">Age:</span>
                                    </div>
                                    <span className="text-[#10181F] font-bold">32 years old</span>
                                </div>
                                <div className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <div className="h-4 w-4 rounded-full border-2 border-gray-200" />
                                        <span className="text-gray-400 font-medium text-sm">Sex:</span>
                                    </div>
                                    <span className="text-[#10181F] font-bold">Female</span>
                                </div>
                                <div className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <Clock size={16} className="text-gray-300" />
                                        <span className="text-gray-400 font-medium text-sm">Current BMI:</span>
                                    </div>
                                    <span className="text-[#10181F] font-bold">31.2 overweight</span>
                                </div>
                                <div className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <img src="/height.svg" className="h-4 w-4 opacity-40" alt="" />
                                        <span className="text-gray-400 font-medium text-sm">Height:</span>
                                    </div>
                                    <span className="text-[#10181F] font-bold">165 cm</span>
                                </div>
                                <div className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <img src="/weight.svg" className="h-4 w-4 opacity-40" alt="" />
                                        <span className="text-gray-400 font-medium text-sm">Weight:</span>
                                    </div>
                                    <span className="text-[#10181F] font-bold">82 kg</span>
                                </div>
                                <div className="flex items-center justify-between group pt-2">
                                    <div className="flex items-center gap-3">
                                        <img src="/goal.svg" className="h-4 w-4 opacity-40" alt="" />
                                        <span className="text-gray-400 font-medium text-sm">Goal:</span>
                                    </div>
                                    <div className="bg-[#E6F4EA] text-[#34A853] px-6 py-2 rounded-lg text-sm font-bold">
                                        Lose 20 kg
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Metabolism Block */}
                        <div className="bg-[#FFF8F2] rounded-[16px] p-6 mb-6">
                            <div className="flex gap-4 items-start">
                                <div className="bg-[#FF9900] p-1.5 rounded-lg text-white mt-1 shrink-0">
                                    <div className="h-5 w-5 flex items-center justify-center font-bold text-sm">!</div>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-bold text-[#10181F] text-[17px]">Sedentary-Adjusted Metabolism</h4>
                                    <p className="text-gray-500 text-[14px] leading-relaxed">
                                        Your metabolism is currently affected by excess body fat and limited daily movement.
                                        With the right nutrition structure and gradual activity increase, your body can shift into
                                        efficient fat-burning mode without extreme dieting.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Energy Target Block */}
                        <div className="bg-[#E6F4EA] rounded-[16px] p-6 mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="bg-[#34A853] h-8 w-8 rounded-full flex items-center justify-center text-white shrink-0">
                                    <Check size={18} strokeWidth={4} />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[12px] font-bold uppercase tracking-wider mb-0.5">Daily energy target</p>
                                    <p className="text-[#10181F] text-xl font-bold">≈ 1,650 kcal / day</p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Detail Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-[#F8F9FA] rounded-[16px] p-5 flex items-center gap-4 border border-gray-50">
                                <Zap size={20} className="text-[#10181F] shrink-0" />
                                <div>
                                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Daily calorie range</p>
                                    <p className="text-[#10181F] text-sm font-black">1,500 – 1,750 kcal</p>
                                </div>
                            </div>
                            <div className="bg-[#F8F9FA] rounded-[16px] p-5 flex items-center gap-4 border border-gray-50">
                                <div className="h-5 w-5 text-[#10181F] shrink-0">
                                    <Users size={18} />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Protein minimum</p>
                                    <p className="text-[#10181F] text-sm font-black">≥ 95 g protein / day</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Your Plan Section - NEW */}
                <div className="max-w-[1000px] mx-auto px-6 mt-8">
                    <div className="bg-white rounded-[24px] border border-gray-100 shadow-2xl p-6 md:p-10 max-w-[850px] mx-auto overflow-hidden text-left">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-[#FFF1F2] p-2 rounded-lg">
                                <img src="/target.svg" alt="" className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-black text-[#10181F]">Your plan:</h3>
                        </div>

                        {/* Estimated Results Green Card */}
                        <div className="bg-[#E6F4EA] rounded-[16px] p-6 mb-8 flex items-center gap-6 relative">
                            <div className="bg-[#34A853] h-10 w-10 rounded-full flex items-center justify-center text-white shrink-0">
                                <Check size={24} strokeWidth={4} />
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-500 text-[12px] font-bold uppercase tracking-wider mb-1">Estimated results</p>
                                <p className="text-[#10181F] text-2xl font-black">12–18 lbs in 6 weeks</p>
                            </div>
                            <div className="text-[#34A853] text-[11px] font-black uppercase text-right leading-tight max-w-[100px]">
                                =1–2 dress sizes smaller
                            </div>
                        </div>

                        {/* Status Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-[#F8F9FA] rounded-[16px] p-6 flex items-start gap-4">
                                <Users size={20} className="text-[#10181F] mt-1 shrink-0" />
                                <div>
                                    <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-1">Metabolic profile</p>
                                    <p className="text-[#10181F] text-[15px] font-black">Sedentary-adjusted metabolism</p>
                                </div>
                            </div>
                            <div className="bg-[#F8F9FA] rounded-[16px] p-6 flex items-start gap-4">
                                <div className="text-[#10181F] mt-1 shrink-0"><Zap size={20} /></div>
                                <div>
                                    <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-1">Energy boost</p>
                                    <p className="text-[#10181F] text-[15px] font-black">Day 3</p>
                                </div>
                            </div>
                            <div className="bg-[#F8F9FA] rounded-[16px] p-6 flex items-start gap-4">
                                <div className="text-red-500 mt-1 shrink-0"><Zap size={20} fill="currentColor" /></div>
                                <div>
                                    <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-1">Fat burn mode</p>
                                    <p className="text-[#10181F] text-[15px] font-black">Week 1</p>
                                </div>
                            </div>
                            <div className="bg-[#F8F9FA] rounded-[16px] p-6 flex items-start gap-4">
                                <Star size={20} className="text-[#10181F] mt-1 shrink-0" />
                                <div>
                                    <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-1">Visible results</p>
                                    <p className="text-[#10181F] text-[15px] font-black">Week 2–3</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recipe Combinations Section - NEW */}
                <div className="max-w-[1000px] mx-auto px-6 mt-8">
                    <div className="bg-white rounded-[24px] border border-gray-100 shadow-2xl p-6 md:p-10 max-w-[850px] mx-auto text-left">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-[#FFF1F2] p-2 rounded-lg">
                                <img src="/meal-icon.svg" alt="" className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-black text-[#10181F]">Mediterranean recipe combinations</h3>
                        </div>
                        <p className="text-gray-500 text-[15px] mb-10">Unlock 1000+ Recipe combinations, flexible, mix and match crafted for lasting fat loss</p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                            {[
                                { img: '/breakfast.png', label: 'Breakfast', desc: 'Light, high-protein starts' },
                                { img: '/lunch.png', label: 'Lunch', desc: 'Balanced meals for energy' },
                                { img: '/dinner.png', label: 'Dinner', desc: 'Satisfying, fat-burning dinners' }
                            ].map((item, i) => (
                                <div key={i} className="bg-[#F8F9FA] rounded-[24px] p-4 flex flex-col h-full border border-gray-50">
                                    <div className="rounded-[16px] overflow-hidden mb-4 aspect-[4/3] bg-white">
                                        <img src={item.img} alt={item.label} className="w-full h-full object-cover p-2" />
                                    </div>
                                    <h4 className="font-black text-[#10181F] text-lg mb-1">{item.label}</h4>
                                    <p className="text-gray-400 text-[12px] font-medium leading-tight">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center">
                            <Button
                                className="w-full max-w-[450px] py-8 rounded-full text-xl font-black bg-gradient-to-r from-[#D90655] to-[#FC3F39] shadow-2xl shadow-[#D90655]/40 hover:scale-[1.02] transition-transform active:scale-[0.98]"
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
                <div className="max-w-[1000px] mx-auto px-6 text-center">
                    <p className="text-[#10181F] text-[20px] font-black mb-10 amsiproblack tracking-tight">As featured in:</p>

                    {/* Logos Container */}
                    <div className="flex flex-wrap justify-center items-center gap-4 mb-16">
                        {['forbes', 'health', 'womens-health', 'mens-health', 'yahoo'].map(logo => (
                            <div key={logo} className="bg-white px-8 py-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center min-w-[140px] h-[70px]">
                                <img src={`/${logo}.svg`} alt={logo} className="h-7 object-contain grayscale opacity-60" />
                            </div>
                        ))}
                    </div>

                    {/* Stats Row */}
                    <div className="flex justify-center items-center gap-10 md:gap-16 mb-24 max-w-[800px] mx-auto">
                        <div className="text-center">
                            <p className="text-[#E31D1C] text-[34px] md:text-[44px] font-black leading-none mb-2 amsiproblack">50+</p>
                            <p className="text-gray-400 text-[13px] font-bold uppercase tracking-wider">Media features</p>
                        </div>
                        <div className="w-[1px] h-12 bg-gray-200 hidden md:block opacity-60" />
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <p className="text-[#34A853] text-[34px] md:text-[44px] font-black leading-none amsiproblack">4.9</p>
                                <Star fill="#34A853" className="text-[#34A853] h-6 w-6" />
                            </div>
                            <p className="text-gray-400 text-[13px] font-bold uppercase tracking-wider">Avg rating</p>
                        </div>
                        <div className="w-[1px] h-12 bg-gray-200 hidden md:block opacity-60" />
                        <div className="text-center">
                            <p className="text-[#E31D1C] text-[34px] md:text-[44px] font-black leading-none mb-2 amsiproblack">127K+</p>
                            <p className="text-gray-400 text-[13px] font-bold uppercase tracking-wider">Customers</p>
                        </div>
                    </div>
                </div>

                {/* Timeline Journey Card */}
                <div className="max-w-[1000px] mx-auto px-6 pb-12">
                    <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_15px_60px_-15px_rgba(0,0,0,0.05)] p-10 md:p-20 max-w-[850px] mx-auto relative overflow-hidden text-left">
                        <div className="flex gap-10 md:gap-16 relative">
                            {/* Vertical Progress Line */}
                            <div className="flex flex-col items-center py-2 shrink-0 relative">
                                <div className="h-4 w-4 rounded-full bg-[#E31D1C] z-10" />
                                <div className="w-[3px] flex-1 bg-gradient-to-b from-[#E31D1C] via-[#EDC948] to-[#34A853] my-1" />
                                <div className="h-4 w-4 rounded-full bg-[#34A853] z-10" />

                                <div className="absolute top-[38%] h-4 w-4 rounded-full bg-[#EDC948] z-10" />
                            </div>

                            <div className="flex-1 space-y-16">
                                {/* Stage 1: NOW */}
                                <div>
                                    <h4 className="text-[#10181F] text-[28px] font-black mb-10 amsiproblack leading-tight">Now</h4>
                                    <ul className="space-y-6">
                                        {[
                                            "Frustration from short-term diets",
                                            "Inconsistent energy and hunger",
                                            "Difficulty maintaining results"
                                        ].map((text, i) => (
                                            <li key={i} className="flex items-center gap-5">
                                                <div className="h-6 w-6 rounded-full bg-[#E31D1C] flex items-center justify-center text-white shrink-0">
                                                    <X size={12} strokeWidth={4} />
                                                </div>
                                                <span className="text-[#757E85] font-semibold text-[17px] leading-tight">{text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Stage 2: 7-10 DAYS */}
                                <div>
                                    <h4 className="text-[#10181F] text-[22px] font-black mb-10 amsiproblack leading-tight uppercase">IN 7–10 DAYS <span className="text-[#10181F] normal-case opacity-100">(after following your plan)</span></h4>
                                    <ul className="space-y-6">
                                        {[
                                            "Clear daily eating rhythm",
                                            "Reduced decision fatigue around food",
                                            "Improved energy consistency"
                                        ].map((text, i) => (
                                            <li key={i} className="flex items-center gap-5">
                                                <div className="h-6 w-6 rounded-full bg-[#EDC948] flex items-center justify-center text-white shrink-0">
                                                    <Check size={12} strokeWidth={4} />
                                                </div>
                                                <span className="text-[#757E85] font-semibold text-[17px] leading-tight">{text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Stage 3: 30 DAYS */}
                                <div>
                                    <h4 className="text-[#10181F] text-[22px] font-black mb-10 amsiproblack leading-tight uppercase">IN 30 DAYS</h4>
                                    <ul className="space-y-6">
                                        {[
                                            "Noticeable progress toward your target weight",
                                            "Greater confidence in food choices",
                                            "Habits that feel realistic long-term"
                                        ].map((text, i) => (
                                            <li key={i} className="flex items-center gap-5">
                                                <div className="h-6 w-6 rounded-full bg-[#34A853] flex items-center justify-center text-white shrink-0">
                                                    <Check size={12} strokeWidth={4} />
                                                </div>
                                                <span className="text-[#757E85] font-semibold text-[17px] leading-tight">{text}</span>
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
            <section className="bg-[#FFFDF5] py-24 border-y border-[#F5E6CC]">
                <div className="max-w-[1100px] mx-auto px-6 text-center">
                    <h2 className="text-[32px] md:text-[48px] font-black text-[#10181F] mb-8 amsiproblack leading-tight">
                        Start your personalized Mediterranean <br className="hidden md:block" /> plan today for less than a cup of coffee
                    </h2>

                    {/* Timer Bar */}
                    <div className="bg-white rounded-[20px] p-6 mb-16 shadow-sm border border-orange-50/50 max-w-[750px] mx-auto">
                        <p className="text-[#E31D1C] font-black text-[18px] md:text-[24px] uppercase tracking-tighter">
                            THIS OFFER ENDS IN: <span className="ml-4 tabular-nums">08 : 59</span>
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-[1000px] mx-auto mb-10">
                        {[
                            {
                                id: '3-month',
                                name: '3-month plan',
                                label: 'every 3 months',
                                oldPrice: '$125',
                                newPrice: '$62.99',
                                oldDayPrice: '$1.38/day',
                                newDayPrice: '$0.69/day'
                            },
                            {
                                id: '1-month',
                                name: '1-month plan',
                                label: 'every month',
                                oldPrice: '$59.99',
                                newPrice: '$29.99',
                                oldDayPrice: '$1.98/day',
                                newDayPrice: '$0.99/day',
                                badge: 'The best for you'
                            },
                            {
                                id: '6-month',
                                name: '6-month plan',
                                label: 'every 6 months',
                                oldPrice: '$179.99',
                                newPrice: '$89.99',
                                oldDayPrice: '$0.98/day',
                                newDayPrice: '$0.49/day'
                            }
                        ].map((plan) => (
                            <div
                                key={plan.id}
                                className={cn(
                                    "bg-white rounded-[32px] p-8 flex flex-col items-start text-left border-2 transition-all cursor-pointer relative",
                                    selectedPlan === plan.id ? "border-[#D90655] shadow-xl" : "border-gray-100 hover:border-gray-200"
                                )}
                                onClick={() => setSelectedPlan(plan.id)}
                            >
                                {plan.badge && (
                                    <div className="absolute -top-3 right-6 bg-[#D90655] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg">
                                        {plan.badge}
                                    </div>
                                )}
                                <div className="flex items-start gap-4 mb-6">
                                    <div className={cn(
                                        "h-6 w-6 rounded-full border-2 mt-1 flex items-center justify-center shrink-0 transition-colors",
                                        selectedPlan === plan.id ? "border-[#D90655]" : "border-gray-300"
                                    )}>
                                        {selectedPlan === plan.id && <div className="h-3 w-3 rounded-full bg-[#D90655]" />}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[20px] font-black text-[#10181F] leading-tight">{plan.name}</span>
                                        <span className="text-gray-400 text-sm font-bold">{plan.label}</span>
                                    </div>
                                </div>
                                <div className="mt-auto w-full flex justify-between items-end border-t border-gray-50 pt-6">
                                    <div className="flex flex-col">
                                        <span className="text-gray-300 text-sm font-bold line-through mb-0.5">{plan.oldPrice}</span>
                                        <span className="text-gray-400 text-[18px] font-black">{plan.newPrice}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-300 text-[11px] font-bold line-through mb-0.5">{plan.oldDayPrice}</p>
                                        <p className="text-[#D90655] text-2xl font-black">{plan.newDayPrice}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mb-10">
                        <p className="text-gray-400 text-[13px] font-bold italic mb-6">Introductory price for first billing period only. Regular price applies after.</p>
                        <Button
                            className="w-full max-w-[480px] py-10 rounded-full text-[20px] font-black bg-gradient-to-r from-[#D90655] to-[#FC3F39] shadow-2xl shadow-[#D90655]/40 hover:scale-[1.02] transition-all active:scale-[0.98]"
                            onClick={() => navigate('/login')}
                        >
                            Claim my plan
                        </Button>
                    </div>

                    {/* Payment & Security Footer */}
                    <div className="flex flex-col items-center gap-10">
                        <div className="flex flex-col items-center gap-4">
                            <p className="text-[#10181F] font-black text-[13px] uppercase tracking-[0.2em] opacity-80">Secure payment by:</p>
                            <div className="flex flex-wrap justify-center items-center gap-8 bg-white/50 backdrop-blur-sm px-10 py-4 rounded-[24px] border border-white">
                                <div className="flex items-center gap-2"><div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center text-[10px] font-bold text-gray-400">PayPal</div></div>
                                <div className="flex items-center gap-2"><div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center text-[10px] font-bold text-gray-400">MC</div></div>
                                <div className="flex items-center gap-2"><div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center text-[10px] font-bold text-gray-400">VISA</div></div>
                                <div className="flex items-center gap-2"><div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center text-[10px] font-bold text-gray-400">AMEX</div></div>
                                <div className="flex items-center gap-2"><div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center text-[10px] font-bold text-gray-400">DISC</div></div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                            <img src="/McAfee Secure.png" alt="McAfee" className="h-10 cursor-pointer" />
                            <img src="/TrustedSite.png" alt="Trusted" className="h-10 cursor-pointer" />
                            <img src="/Nortan.png" alt="Norton" className="h-10 cursor-pointer" />
                            <img src="/VeriSign.png" alt="VeriSign" className="h-10 cursor-pointer" />
                        </div>
                    </div>
                </div>
            </section>

            {/* People Achievements Section */}
            <section className="bg-white py-24">
                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <h2 className="text-[34px] md:text-[52px] font-black text-[#10181F] mb-12 tracking-tight amsiproblack uppercase">
                        People just like you achieved great <br /> results using our Mediterranean Plan
                    </h2>

                    <div className="relative mt-20">
                        <div className="grid md:grid-cols-3 gap-10">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="bg-white rounded-[40px] overflow-hidden shadow-2xl border border-gray-50 group hover:-translate-y-2 transition-transform duration-500">
                                    <div className="flex w-full relative">
                                        <div className="w-1/2 overflow-hidden border-r border-white">
                                            <img src="/review-pic-1.png" className="w-full aspect-[4/5] object-cover" alt="Before" />
                                        </div>
                                        <div className="w-1/2 overflow-hidden">
                                            <img src="/resul-page-women.png" className="w-full aspect-[4/5] object-cover" alt="After" />
                                        </div>
                                    </div>
                                    <div className="p-10 text-left">
                                        <div className="flex gap-1 mb-6 text-[#10181F]">
                                            {[1, 2, 3, 4, 5].map(s => <Star key={s} size={18} fill="currentColor" />)}
                                        </div>
                                        <p className="text-gray-500 text-[15px] leading-relaxed mb-8">
                                            "This quiz helped me understand what kind of Mediterranean diet actually works for me. The meal plan is simple, delicious, and fits perfectly into my routine. I finally feel consistent without stress."
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#10181F] font-black text-lg">Sandra R.</span>
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-[#34A853]" />
                                                <span className="text-[#34A853] text-[11px] font-bold uppercase tracking-widest">Verified customer</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Carousel Controls */}
                        <div className="flex justify-between items-center mt-12 px-4">
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className={cn("h-2 w-2 rounded-full", i === 1 ? "bg-[#D90655]" : "bg-gray-200")} />
                                ))}
                            </div>
                            <div className="flex gap-4">
                                <button className="h-12 w-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 hover:bg-gray-50 transition-all">
                                    <ChevronDown className="rotate-90" />
                                </button>
                                <button className="h-12 w-12 rounded-full bg-[#D90655] flex items-center justify-center text-white shadow-lg shadow-[#D90655]/20 hover:scale-105 transition-all">
                                    <ChevronDown className="-rotate-90" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who is this plan for Section */}
            <section className="bg-white py-24">
                <div className="max-w-[1000px] mx-auto px-6 text-center">
                    <h2 className="text-[34px] md:text-[44px] font-black text-[#10181F] mb-6 tracking-tight amsiproblack uppercase">Who is this plan for?</h2>
                    <p className="text-gray-500 text-lg mb-16 max-w-3xl mx-auto leading-relaxed font-medium">
                        This personalized Mediterranean plan is for people who want to lose weight sustainably without extreme or restrictive dieting. It's designed to help you build eating habits you can maintain long term.
                    </p>

                    <div className="relative mb-24 flex justify-center">
                        <img src="/hero-meals.png" alt="Plan Meals" className="w-full max-w-[850px]" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-20">
                        {[
                            { val: "93%", desc: "of users reported improved consistency and energy within 30 days" },
                            { val: "89%", desc: "started with similar challenges around weight and eating habits" },
                            { val: "79%", desc: "had previously struggled with multiple failed diets" }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white rounded-[24px] p-8 border border-gray-50 shadow-sm text-center md:text-left hover:shadow-md transition-shadow">
                                <span className="text-[#D90655] text-[32px] font-black block mb-4">{stat.val}</span>
                                <p className="text-gray-400 text-[14px] leading-relaxed font-bold uppercase tracking-wide opacity-80">{stat.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Award Banner */}
                    <div className="bg-[#E6F4EA] rounded-[24px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 text-center md:text-left border border-teal-50">
                        <div className="flex-shrink-0 bg-white p-4 rounded-2xl shadow-sm border border-teal-100">
                            <img src="/logo.png" className="h-12 grayscale opacity-40" alt="Award" />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-[#10181F] text-xl md:text-2xl font-black amsiproblack leading-tight uppercase">The Mediterranean Diet has been voted the World's Best Diet 8 years in a row</h4>
                            <p className="text-gray-400 text-[13px] font-bold uppercase tracking-[0.2em] italic">Based on rankings by leading global health publications</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* What's included Section */}
            <section className="bg-white py-24">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h2 className="text-[34px] md:text-[48px] font-black text-[#10181F] mb-16 text-center tracking-tight amsiproblack leading-tight">What's included?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* First Column */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-[320px] flex flex-col justify-between">
                                <div className="bg-[#E31D1C]/10 h-10 w-10 rounded-xl flex items-center justify-center">
                                    <div className="bg-[#E31D1C] h-4 w-3 rounded-[2px]" />
                                </div>
                                <div>
                                    <h3 className="text-[22px] font-black text-[#10181F] mb-4 leading-tight">Your personalized Mediterranean meal plan</h3>
                                    <p className="text-gray-400 text-sm font-medium leading-relaxed">Clear breakfast, lunch, and dinner plans by registered dietitians.</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-[320px] flex flex-col justify-between">
                                <div className="bg-[#E31D1C]/10 h-10 w-10 rounded-xl flex items-center justify-center">
                                    <div className="bg-[#E31D1C] h-4 w-4 rotate-45" />
                                </div>
                                <div>
                                    <h3 className="text-[22px] font-black text-[#10181F] mb-4 leading-tight">Mediterranean snacks and desserts</h3>
                                    <p className="text-gray-400 text-sm font-medium leading-relaxed">Satisfying snacks and desserts that support your goals.</p>
                                </div>
                            </div>
                        </div>

                        {/* Second Column - Large Image Card */}
                        <div className="md:row-span-1">
                            <div className="bg-[#FDF9F0] rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                                <div className="h-[450px] overflow-hidden">
                                    <img src="/simple-ingrediants.jpg" alt="Shopping" className="w-full h-full object-cover" />
                                </div>
                                <div className="p-10">
                                    <h3 className="text-[22px] font-black text-[#10181F] mb-4 leading-tight">Simple ingredients from any store</h3>
                                    <p className="text-gray-400 text-sm font-medium leading-relaxed">All meals use commonly available ingredients to save time, effort, and money every week.</p>
                                </div>
                            </div>
                        </div>

                        {/* Third Column - Mixed layout handled by continuing the grid */}
                        <div className="md:col-span-2">
                            <div className="bg-[#FDF9F0] rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-[320px] flex">
                                <div className="w-1/2 overflow-hidden">
                                    <img src="/breakfast.png" alt="Cooking" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-1/2 p-10 flex flex-col justify-center">
                                    <h3 className="text-[22px] font-black text-[#10181F] mb-4 leading-tight">Easy-to-follow recipes</h3>
                                    <p className="text-gray-400 text-sm font-medium leading-relaxed">Prepare simple meals that leave you full and confident, including practical guidance for eating out.</p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-[#E31D1C]/10 h-10 w-10 rounded-xl flex items-center justify-center mb-10">
                                <Users size={20} className="text-[#E31D1C]" />
                            </div>
                            <h3 className="text-[22px] font-black text-[#10181F] mb-4 leading-tight">24/7 nutritionist support</h3>
                            <p className="text-gray-400 text-sm font-medium leading-relaxed">Access science-based guidance whenever you need it to make confident, informed health and nutrition decisions.</p>
                        </div>
                        <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm hover:shadow-md transition-shadow md:col-span-1">
                            <div className="bg-[#E31D1C]/10 h-10 w-10 rounded-xl flex items-center justify-center mb-10">
                                <div className="bg-[#E31D1C] h-4 w-4 rounded-full flex items-center justify-center text-white text-[10px] font-bold">i</div>
                            </div>
                            <h3 className="text-[22px] font-black text-[#10181F] mb-4 leading-tight">Complete Mediterranean Diet guide for beginners</h3>
                            <p className="text-gray-400 text-sm font-medium leading-relaxed">Step-by-step support designed to help you start confidently and stay on track with your goals long term.</p>
                        </div>
                    </div>
                </div>
            </section>





            {/* Stick To Plan Section */}
            <section className="bg-white py-24 overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <h2 className="text-[34px] md:text-[52px] font-black text-[#10181F] mb-6 tracking-tight amsiproblack uppercase leading-tight">
                        Finally, a Mediterranean plan <br className="hidden md:block" /> you can stick to
                    </h2>
                    <p className="text-gray-400 text-lg font-bold mb-20 uppercase tracking-[0.2em] italic">
                        No calorie counting. No extremes. Just simple daily structure.
                    </p>

                    <div className="grid md:grid-cols-3 gap-10 items-start">
                        {/* Phone 1: Kimberly Clark */}
                        <div className="relative group perspective-1000">
                            <div className="bg-[#10181F] rounded-[60px] p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[8px] border-[#2A2F35] relative overflow-hidden h-[650px]">
                                <div className="bg-white h-full rounded-[45px] overflow-hidden flex flex-col pt-10 px-6">
                                    <div className="flex justify-center mb-6">
                                        <img src="/logo.png" className="h-4" alt="Mediterranean Diet" />
                                    </div>
                                    <div className="bg-[#F8F9FA] p-4 rounded-2xl flex items-center gap-4 mb-8">
                                        <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                            <img src="/michael.svg" className="h-full w-full object-cover" alt="Kimberly Clark" />
                                        </div>
                                        <div className="text-left">
                                            <div className="bg-[#D90655] text-white text-[8px] font-black px-2 py-0.5 rounded-full inline-block mb-1 tracking-wider uppercase">From The Desk Of</div>
                                            <p className="font-black text-[#10181F] text-sm">Kimberly Clark <span className="text-[#4285F4]">✓</span></p>
                                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Nutritionist And Health Advisor</p>
                                        </div>
                                    </div>
                                    <div className="text-left space-y-4">
                                        <h4 className="text-xl font-black text-[#10181F] leading-tight amsiproblack uppercase">"I Don't Sell <br />Anything That Big... <br /><span className="text-[#D90655]">You Can't Fit Into <br />A 3X?"</span></h4>
                                        <p className="text-[11px] text-gray-400 font-bold leading-relaxed italic border-t border-gray-50 pt-4 uppercase tracking-tighter">
                                            Just accepted a job at a medical office...
                                        </p>
                                        <p className="text-[11px] text-gray-400 font-bold leading-relaxed italic uppercase tracking-tighter">
                                            And they asked us to wear medical scrubs like you see doctors wear...
                                        </p>
                                        <p className="text-[11px] text-gray-400 font-bold leading-relaxed italic uppercase tracking-tighter">
                                            So I went to a place that had them cheaply priced...
                                        </p>
                                    </div>
                                    <div className="mt-auto mb-6">
                                        <img src="/breakfast.png" className="w-full rounded-2xl shadow-lg border-2 border-white grayscale opacity-80" alt="Scrubs" />
                                    </div>
                                    <div className="mt-auto flex items-center justify-between py-4 border-t border-gray-50">
                                        <ChevronDown className="rotate-90 text-gray-300" size={16} />
                                        <div className="bg-gray-50 px-4 py-1.5 rounded-full text-[8px] font-bold text-gray-400 flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full border border-gray-200" />
                                            mediterraneanplan.com
                                            <div className="h-2 w-2 rounded-full border border-gray-200" />
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="h-1 w-1 bg-gray-200 rounded-full" />
                                            <div className="h-1 w-1 bg-gray-200 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Phone 2: How's That Possible? */}
                        <div className="relative group scale-105 z-10">
                            <div className="bg-[#10181F] rounded-[60px] p-4 shadow-[0_60px_120px_-30px_rgba(217,6,85,0.2)] border-[8px] border-[#2A2F35] h-[650px]">
                                <div className="bg-white h-full rounded-[45px] overflow-hidden flex flex-col pt-12 px-8">
                                    <h4 className="text-2xl font-black text-[#10181F] mb-10 amsiproblack leading-tight uppercase">How's That Possible?</h4>
                                    <div className="space-y-6 text-left mb-10">
                                        <p className="text-[13px] text-gray-400 font-bold leading-relaxed uppercase tracking-tighter">Turns out, if you knew what the ITALIANS knew...</p>
                                        <p className="text-[13px] text-gray-400 font-bold leading-relaxed uppercase tracking-tighter">Then you'd know the secret that burns fat...</p>
                                        <p className="text-[13px] text-gray-400 font-black text-[#10181F] uppercase tracking-tighter">Loses huge amounts of weight...</p>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center justify-center -mt-10">
                                        <img src="/resul-page-women.png" className="w-full max-w-[180px] object-contain" alt="Transformation" />
                                        <div className="flex gap-20 -mt-20 relative z-10">
                                            <ArrowRight className="rotate-180 text-[#4285F4]" size={24} />
                                            <ArrowRight className="text-[#4285F4]" size={24} />
                                        </div>
                                    </div>
                                    <div className="text-left space-y-4 mb-8">
                                        <p className="text-[11px] text-gray-400 font-bold leading-relaxed uppercase tracking-tighter">
                                            Which transforms your body naturally, safely, and <span className="text-[#10181F] font-black underline decoration-[#D90655] decoration-2">PERMANENTLY...</span>
                                        </p>
                                        <p className="text-[11px] text-gray-400 font-bold leading-relaxed uppercase tracking-tighter">
                                            All without exercise, magic pills, or stressful dieting.
                                        </p>
                                    </div>
                                    <div className="mt-auto flex items-center justify-between py-4 border-t border-gray-50">
                                        <ChevronDown className="rotate-90 text-gray-300" size={16} />
                                        <div className="bg-gray-50 px-4 py-1.5 rounded-full text-[8px] font-bold text-gray-400 flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full border border-gray-200" />
                                            mediterraneanplan.com
                                            <div className="h-2 w-2 rounded-full border border-gray-200" />
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="h-1 w-1 bg-gray-200 rounded-full" />
                                            <div className="h-1 w-1 bg-gray-200 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Phone 3: Testimonials */}
                        <div className="relative group">
                            <div className="bg-[#10181F] rounded-[60px] p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[8px] border-[#2A2F35] h-[650px]">
                                <div className="bg-[#FFFDF5] h-full rounded-[45px] overflow-hidden flex flex-col pt-12 px-6">
                                    <h4 className="text-xl font-black text-[#10181F] mb-10 amsiproblack leading-tight uppercase">Here's Some People Who <br />Chose Option 2...</h4>

                                    <div className="space-y-6">
                                        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-orange-50/50 relative group/card hover:scale-[1.02] transition-transform">
                                            <div className="absolute -right-2 -top-2">
                                                <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                                                    <img src="/review-pic-1.png" className="w-full h-full object-cover" alt="User" />
                                                </div>
                                            </div>
                                            <h5 className="font-black text-[#10181F] text-[13px] mb-3 pr-8 leading-tight">Cherish loved the flavors and shed her unwanted weight!</h5>
                                            <p className="text-[10px] text-gray-400 font-bold italic leading-relaxed uppercase tracking-tighter">
                                                "I've felt a lot better on this diet! More energy and I've gotten out walking often! I lost 13 lbs and the variety of ingredients have been fun! Love the flavors! I'd keep making these meals!" 🤟
                                            </p>
                                            <p className="text-[9px] font-black text-[#D90655] mt-3 uppercase tracking-[0.2em]">-Cherish, <span className="text-gray-300">Ohio</span></p>
                                        </div>

                                        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-orange-50/50 relative group/card hover:scale-[1.02] transition-transform">
                                            <div className="absolute -right-2 -top-2">
                                                <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                                                    <img src="/review-pic-2.png" className="w-full h-full object-cover" alt="User" />
                                                </div>
                                            </div>
                                            <h5 className="font-black text-[#10181F] text-[13px] mb-3 pr-8 leading-tight">Perris crushed her weight loss goals and feels amazing!</h5>
                                            <p className="text-[10px] text-gray-400 font-bold italic leading-relaxed uppercase tracking-tighter">
                                                "I feel so much better! Yes, I'll continue to eat this way! My family loves it also! Overall, I'm pleased!" 😍
                                            </p>
                                            <p className="text-[9px] font-black text-[#D90655] mt-3 uppercase tracking-[0.2em]">-Perris, <span className="text-gray-300">Oklahoma</span></p>
                                        </div>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between py-4 border-t border-gray-50/20">
                                        <ChevronDown className="rotate-90 text-gray-300" size={16} />
                                        <div className="bg-white/50 px-4 py-1.5 rounded-full text-[8px] font-bold text-gray-400 flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full border border-gray-200" />
                                            mediterraneanplan.com
                                            <div className="h-2 w-2 rounded-full border border-gray-200" />
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="h-1 w-1 bg-gray-200 rounded-full" />
                                            <div className="h-1 w-1 bg-gray-200 rounded-full" />
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
                <div className="max-w-[1100px] mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-[32px] md:text-[44px] font-black text-[#10181F] mb-8 amsiproblack leading-tight">
                            Start your personalized Mediterranean <br className="hidden md:block" /> plan today for less than a cup of coffee
                        </h2>

                        <div className="inline-block bg-white px-8 md:px-20 py-6 rounded-[24px] border border-[#DEE2E6] shadow-sm mb-12">
                            <span className="text-[#E31D1C] font-black text-sm md:text-lg uppercase tracking-[0.2em] mr-6">THIS OFFER ENDS IN:</span>
                            <span className="text-[#E31D1C] font-black text-[32px] md:text-[40px] font-mono tracking-tighter">08 : 59</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {[
                            {
                                id: '3-months',
                                name: '3-month plan',
                                label: 'every 3 months',
                                oldPrice: '$125',
                                newPrice: '$62.99',
                                oldDayPrice: '$1.38/day',
                                newDayPrice: '$0.69/day'
                            },
                            {
                                id: '1-month',
                                name: '1-month plan',
                                label: 'every month',
                                oldPrice: '$59.99',
                                newPrice: '$29.99',
                                oldDayPrice: '$1.98/day',
                                newDayPrice: '$0.99/day',
                                badge: 'The best for you'
                            },
                            {
                                id: '6-months',
                                name: '6-month plan',
                                label: 'every 6 months',
                                oldPrice: '$179.99',
                                newPrice: '$89.99',
                                oldDayPrice: '$0.98/day',
                                newDayPrice: '$0.49/day'
                            }
                        ].map((plan) => (
                            <div
                                key={plan.id}
                                className={cn(
                                    "bg-white rounded-[24px] p-8 flex flex-col items-start text-left border-2 transition-all cursor-pointer relative",
                                    selectedPlan === plan.id ? "border-[#E31D1C] shadow-lg shadow-[#E31D1C]/5" : "border-transparent"
                                )}
                                onClick={() => setSelectedPlan(plan.id)}
                            >
                                {plan.badge && (
                                    <div className="absolute -top-3 right-6 bg-[#D90655] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg">
                                        {plan.badge}
                                    </div>
                                )}
                                <div className="flex items-start gap-4 mb-8">
                                    <div className={cn(
                                        "h-6 w-6 rounded-full border-2 mt-1 flex items-center justify-center shrink-0 transition-colors",
                                        selectedPlan === plan.id ? "border-[#E31D1C]" : "border-gray-200"
                                    )}>
                                        {selectedPlan === plan.id && <div className="h-3 w-3 rounded-full bg-[#E31D1C]" />}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[22px] font-black text-[#10181F] leading-tight">{plan.name}</span>
                                        <span className="text-gray-400 text-sm font-bold">{plan.label}</span>
                                    </div>
                                </div>
                                <div className="mt-auto w-full flex justify-between items-end border-t border-gray-50 pt-6">
                                    <div className="flex flex-col">
                                        <span className="text-gray-300 text-sm font-bold line-through mb-0.5">{plan.oldPrice}</span>
                                        <span className="text-gray-400 text-[18px] font-black">{plan.newPrice}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-300 text-[11px] font-bold line-through mb-0.5">{plan.oldDayPrice}</p>
                                        <p className="text-[#E31D1C] text-[32px] font-black leading-none">{plan.newDayPrice}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mb-16">
                        <p className="text-gray-400 text-[13px] font-bold italic mb-8">Introductory price for first billing period only. Regular price applies after.</p>
                        <Button
                            className="w-full max-w-[440px] py-10 rounded-full text-[20px] font-black bg-gradient-to-r from-[#D90655] to-[#FC3F39] shadow-2xl shadow-[#D90655]/40 hover:scale-[1.02] transition-all active:scale-[0.98]"
                            onClick={() => navigate('/login')}
                        >
                            Claim my plan
                        </Button>
                    </div>

                    {/* Payment & Security Footer */}
                    <div className="flex flex-col items-center gap-12">
                        <div className="flex flex-col items-center gap-6">
                            <p className="text-[#10181F] font-black text-[14px] uppercase tracking-[0.2em] opacity-80">Secure payment by:</p>
                            <div className="flex flex-wrap justify-center items-center gap-10">
                                <div className="flex items-center gap-2 underline decoration-gray-200 underline-offset-8"><div className="h-8 w-16 bg-gray-50 rounded-lg flex items-center justify-center text-[11px] font-black text-blue-800 italic">PayPal</div></div>
                                <div className="flex items-center gap-2"><div className="h-4 w-6 bg-red-500 rounded-sm" /><div className="h-4 w-6 bg-orange-400 rounded-sm -ml-4 opacity-80" /></div>
                                <div className="text-[14px] font-black text-blue-900 italic tracking-tighter">VISA</div>
                                <div className="h-5 w-8 bg-[#0070CE] rounded flex items-center justify-center text-[6px] font-bold text-white">AMEX</div>
                                <div className="text-[16px] font-black text-gray-800 tracking-tighter uppercase">Discover</div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
                            <img src="/McAfee Secure.png" alt="McAfee" className="h-12 cursor-pointer transition-transform hover:scale-105" />
                            <img src="/TrustedSite.png" alt="Trusted" className="h-12 cursor-pointer transition-transform hover:scale-105" />
                            <img src="/Nortan.png" alt="Norton" className="h-12 cursor-pointer transition-transform hover:scale-105" />
                            <img src="/VeriSign.png" alt="VeriSign" className="h-12 cursor-pointer transition-transform hover:scale-105" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Analysis Tabs Section */}
            <section className="bg-white pb-24">
                <div className="max-w-[1100px] mx-auto px-6">
                    <div className="bg-white rounded-[50px] p-10 md:p-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] border border-gray-50">
                        <div className="flex border-b border-gray-100 mb-12 overflow-x-auto no-scrollbar gap-10">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={cn(
                                        "pb-6 px-4 text-[15px] font-black uppercase tracking-[0.15em] transition-all relative shrink-0",
                                        activeTab === tab ? "text-[#D90655]" : "text-gray-300 hover:text-gray-400"
                                    )}
                                >
                                    {tab}
                                    {activeTab === tab && <div className="absolute bottom-[-2px] left-0 w-full h-1 bg-[#D90655] rounded-full shadow-[0_2px_10px_rgba(217,6,85,0.4)]" />}
                                </button>
                            ))}
                        </div>

                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <div className="text-center md:text-left">
                                <div className="flex gap-2.5 mb-8 justify-center md:justify-start">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="#D90655" className="text-[#D90655]" size={40} />)}
                                </div>
                                <p className="text-[72px] font-black text-[#10181F] mb-4 tracking-tighter leading-none">4.7<span className="text-3xl text-gray-200">/5.0</span></p>
                                <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                                    <Users className="text-[#D90655]" size={20} />
                                    <p className="text-gray-400 font-extrabold uppercase tracking-widest text-[14px]">127k+ Happy Users</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {[
                                    { label: "Dietary habits", score: 85, color: "bg-[#D90655]" },
                                    { label: "Health status", score: 92, color: "bg-[#34A853]" },
                                    { label: "Physical activity", score: 78, color: "bg-[#FFA500]" },
                                    { label: "Metabolism support", score: 88, color: "bg-[#4285F4]" }
                                ].map((stat, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-center mb-3 px-1">
                                            <span className="text-[15px] font-black text-[#10181F] uppercase tracking-widest">{stat.label}</span>
                                            <span className="text-lg font-black text-[#10181F]">{stat.score}%</span>
                                        </div>
                                        <div className="h-3 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100 shadow-inner">
                                            <div className={cn("h-full rounded-full transition-all duration-1000", stat.color)} style={{ width: `${stat.score}%` }} />
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
                <div className="max-w-[1000px] mx-auto px-6">
                    <h2 className="text-[34px] md:text-[48px] font-black text-[#10181F] mb-16 text-center tracking-tight amsiproblack uppercase">Why we are the best choice</h2>
                    <div className="bg-white rounded-[50px] p-8 md:p-16 shadow-2xl border border-white overflow-x-auto no-scrollbar">
                        <table className="w-full min-w-[600px]">
                            <thead>
                                <tr className="border-b border-gray-50 text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">
                                    <th className="py-8 text-left">Key Features</th>
                                    <th className="py-8 text-center bg-[#FDF2F5]/50 rounded-t-[30px]"><img src="/logo.png" className="h-6 mx-auto" /></th>
                                    <th className="py-8 text-center text-gray-400">Other Diets</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    "Personalized Daily meal plans",
                                    "Over 500 delicious recipes",
                                    "No 'forbidden' food groups",
                                    "Sustainable long-term results",
                                    "Community support group",
                                    "Shopping lists & meal preps"
                                ].map((feat, i) => (
                                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                        <td className="py-8 font-black text-[#10181F] text-lg">{feat}</td>
                                        <td className="py-8 text-center bg-[#FDF2F5]/50 last:rounded-b-[30px]">
                                            <div className="h-10 w-10 rounded-full bg-[#34A853] flex items-center justify-center text-white mx-auto shadow-lg shadow-[#34A853]/20">
                                                <Check size={20} strokeWidth={4} />
                                            </div>
                                        </td>
                                        <td className="py-8 text-center">
                                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-300 mx-auto">
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
            <section className="bg-white py-24 overflow-hidden">
                <div className="max-w-[1100px] mx-auto px-6 text-center">
                    <div className="relative inline-block mb-12">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="#D90655" className="text-[#D90655] inline-block mx-1" size={32} />)}
                    </div>
                    <h3 className="text-[28px] md:text-[42px] font-black text-[#10181F] leading-[1.3] mb-16 amsipro italic max-w-4xl mx-auto">
                        "This quiz helped me understand what kind of Mediterranean diet actually works for me. The meal plan is simple, delicious, and fits perfectly into my routine. I finally feel consistent without stress."
                    </h3>
                    <div className="flex flex-col items-center gap-4">
                        <div className="h-24 w-24 rounded-full border-4 border-[#FDF2F5] shadow-2xl overflow-hidden mb-4">
                            <img src="/michael.svg" alt="Michael" className="w-full h-full object-cover" />
                        </div>
                        <p className="text-[11px] font-black text-[#D90655] uppercase tracking-[0.3em]">Michael R.</p>
                        <p className="text-lg font-black text-[#10181F]">Managing Partner, DP Group</p>
                    </div>
                </div>
            </section>

            {/* Mobile App Preview */}
            <section className="bg-[#10181F] py-24 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D90655]/10 rounded-full blur-[120px] -mr-64 -mt-64" />
                <div className="max-w-[1200px] mx-auto px-6 text-center text-white">
                    <h2 className="text-[34px] md:text-[56px] font-black mb-10 amsiproblack uppercase tracking-tight">Your health is in your hand</h2>
                    <p className="text-gray-400 text-lg mb-20 max-w-2xl mx-auto font-medium">Access your plan, track your progress, and get expert help anytime using our mobile-friendly dashboard.</p>
                    <div className="max-w-[1000px] mx-auto transform hover:scale-[1.02] transition-transform duration-700">
                        <img src="/plan-food.png" alt="Dashboard" className="w-full drop-shadow-[0_80px_100px_rgba(217,6,85,0.15)]" />
                    </div>
                </div>
            </section>





            {/* People often ask Section */}
            <section className="bg-white py-24">
                <div className="max-w-[1000px] mx-auto px-6">
                    <h2 className="text-[34px] md:text-[48px] font-black text-[#10181F] mb-16 text-center tracking-tight amsiproblack uppercase">People often ask</h2>

                    <div className="space-y-4">
                        {[
                            {
                                q: "What is your money-back guarantee?",
                                a: "Because we believe so much in the quality and effectiveness of The Mediterranean Diet, we offer our customers a 60-day money-back guarantee. If you're unhappy for any reason whatsoever, you will get a full refund with no questions asked!",
                                isOpen: true
                            },
                            {
                                q: "How much weight can I expect to lose?",
                                a: "Individual results vary based on starting weight, activity level, and consistency with the plan. Most users report healthy, steady progress that feels sustainable long term.",
                                isOpen: false
                            },
                            {
                                q: "Will this help with my cholesterol?",
                                a: "The Mediterranean diet is clinically shown to support heart health and healthy cholesterol levels through its focus on healthy fats and whole foods.",
                                isOpen: false
                            },
                            {
                                q: "Will this help with my blood sugar levels?",
                                a: "By focusing on complex carbohydrates and balanced meal structures, our plan helps support consistent energy and healthy blood sugar levels.",
                                isOpen: false
                            }
                        ].map((faq, i) => (
                            <FAQSection key={i} faq={faq} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ClickBank Disclaimer & Footer */}
            <footer className="bg-white pt-24 pb-12 px-6">
                <div className="max-w-[1000px] mx-auto">
                    <div className="space-y-10 text-center mb-20 px-4">
                        <p className="text-[#A2ABB2] text-[11px] leading-relaxed max-w-4xl mx-auto font-medium tracking-tight">
                            ClickBank is the retailer of products on this site. CLICKBANK® is a registered trademark of Click Sales Inc., a Delaware corporation located at 1444 S. Entertainment Ave., Suite 410 Boise, ID 83709, USA and used by permission. ClickBank's role as retailer does not constitute an endorsement, approval or review of these products or any claim, statement or opinion used in promotion of these products.
                        </p>

                        <p className="text-[#A2ABB2] text-[11px] font-medium tracking-tight">
                            All pictures shown are for illustration purpose only. Actual product may vary due to product enhancement and may not be an exact representation of the product.
                        </p>

                        <p className="text-[#A2ABB2] text-[11px] leading-relaxed max-w-4xl mx-auto font-medium tracking-tight">
                            Any order help you can get from Clickbank through the "Order Support" link below. Any product help you can get from the vendor through the "Product Support" link below.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 mb-16">
                        {["GET STARTED", "PRIVACY POLICY", "PRODUCT SUPPORT", "ORDER SUPPORT", "BLOG"].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-[#10181F] text-[11px] font-black uppercase tracking-[0.2em] hover:text-[#D90655] transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    <div className="text-center pt-8 border-t border-gray-50">
                        <p className="text-[#A2ABB2] text-[11px] font-black uppercase tracking-[0.3em]">©2026 MEDITERRANEANPLAN.COM</p>
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
        <div className={cn(
            "rounded-[24px] transition-all duration-300 border",
            isOpen ? "bg-white shadow-[0_15px_40px_rgba(0,0,0,0.04)] border-gray-100 p-10" : "bg-[#F8F9FA] border-transparent p-8 md:p-10"
        )}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full text-left"
            >
                <span className="text-lg md:text-xl font-bold text-[#10181F] leading-tight pr-8">{faq.q}</span>
                {isOpen ? <X size={20} className="text-[#10181F] shrink-0" /> : <Plus size={20} className="text-[#10181F] shrink-0" />}
            </button>
            {isOpen && (
                <div className="mt-8 text-gray-500 font-medium leading-relaxed max-w-3xl animate-in fade-in slide-in-from-top-4 duration-500">
                    {faq.a}
                </div>
            )}
        </div>
    );
}
