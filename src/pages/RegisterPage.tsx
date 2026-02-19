import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Star } from 'lucide-react';

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 sm:p-6 font-sans">
            <div className="w-full max-w-[450px] space-y-8">
                {/* Logo from Screenshot */}
                <div className="text-left md:text-center group">
                    <div className="inline-block transition-transform duration-300">
                        <span className="block text-[10px] uppercase tracking-[0.3em] font-black text-[#1a1a1b] opacity-40 leading-none ml-1">The</span>
                        <div className="flex items-center -mt-1">
                            <span className="text-3xl font-black text-[#1a1a1b] uppercase tracking-tighter">
                                Mediterranean
                            </span>
                            <span className="text-3xl font-black text-primary uppercase ml-1 tracking-tighter">
                                Diet
                            </span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black text-[#1a1a1b] leading-[1.1] tracking-tight">
                        Create your <br />
                        ideal meal plan
                    </h1>
                    <p className="text-[#1a1a1b] font-medium opacity-60">
                        Start your 1-minute FREE test now
                    </p>
                </div>

                <Card className="border-none shadow-none bg-transparent">
                    <CardContent className="p-0">
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-[#1a1a1b] opacity-60">Full Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter your name"
                                    type="text"
                                    className="h-14 rounded-2xl border-2 border-[#f4f4f5] bg-[#f4f4f5] focus:bg-white transition-all text-lg font-medium"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-[#1a1a1b] opacity-60">Email address</Label>
                                <Input
                                    id="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    className="h-14 rounded-2xl border-2 border-[#f4f4f5] bg-[#f4f4f5] focus:bg-white transition-all text-lg font-medium"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-[#1a1a1b] opacity-60">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="h-14 rounded-2xl border-2 border-[#f4f4f5] bg-[#f4f4f5] focus:bg-white transition-all text-lg font-medium"
                                />
                            </div>

                            <div className="pt-2 space-y-3">
                                <Button className="w-full text-xl h-14 font-black rounded-full bg-primary hover:bg-primary/90 transition-all active:scale-[0.98] shadow-lg shadow-primary/20">
                                    Create My Plan
                                </Button>
                                <Button variant="secondary" className="w-full text-xl h-14 font-black rounded-full bg-[#1a1a1b] hover:bg-[#1a1a1b]/90 text-white transition-all active:scale-[0.98]">
                                    Sign Up With Google
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-6 pt-8 px-0">
                        <p className="text-center text-sm text-[#1a1a1b] font-bold">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-primary hover:underline"
                            >
                                Sign in here
                            </Link>
                        </p>

                        {/* Social Proof from Screenshot */}
                        <div className="flex flex-col items-center space-y-2 border-t pt-6 w-full">
                            <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} className="w-4 h-4 fill-[#ff9500] text-[#ff9500]" />
                                ))}
                                <span className="text-[12px] font-bold text-[#1a1a1b] ml-1">2475 customer reviews</span>
                            </div>
                            <div className="flex items-center text-[12px] font-bold text-[#1a1a1b] opacity-60">
                                <span className="mr-1">🛡️</span>
                                Trusted by 127K+
                            </div>
                        </div>
                    </CardFooter>
                </Card>

                <p className="text-center text-[10px] text-[#1a1a1b] opacity-40 leading-relaxed font-bold">
                    © 2026 Mediterranean Plan. All rights reserved.<br />
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    );
}
