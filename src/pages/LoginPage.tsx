import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Star, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1'}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Store token in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Navigate to home page or dashboard
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 sm:p-6 font-sans">
            <div className="w-full max-w-[450px] space-y-8">
                {/* Logo from Screenshot */}
                <div className="flex justify-center mb-8">
                    <img src="/logo.png" alt="The Mediterranean Diet" className="h-16 md:h-20 w-auto object-contain" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black text-[#1a1a1b] leading-[1.1] tracking-tight">
                        Sign in to your <br />
                        ideal meal plan
                    </h1>
                    <p className="text-[#1a1a1b] font-medium opacity-60">
                        Take 1-minute FREE test or access your account
                    </p>
                </div>

                <Card className="border-none shadow-none bg-transparent">
                    <CardContent className="p-0">
                        {error && (
                            <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100">
                                {error}
                            </div>
                        )}
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-[#1a1a1b] opacity-60">Email address</Label>
                                <Input
                                    id="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-14 rounded-2xl border-2 border-[#f4f4f5] bg-[#f4f4f5] focus:bg-white transition-all text-lg font-medium"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-14 rounded-2xl border-2 border-[#f4f4f5] bg-[#f4f4f5] focus:bg-white transition-all text-lg font-medium"
                                />
                            </div>

                            <div className="pt-2 space-y-3">
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full text-xl h-14 font-black rounded-full bg-gradient-to-r from-[#D90655] to-[#FC3F39] hover:opacity-90 transition-all active:scale-[0.98] shadow-lg shadow-[#D90655]/20 flex items-center justify-center"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        'Sign In'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-6 pt-8 px-0">
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

