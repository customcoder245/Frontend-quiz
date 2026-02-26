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
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1'}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );

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
    <>
    
      <div className="flex min-h-screen bg-[#f8f6f4]">
        <div
          className="hidden w-1/2 !bg-cover !bg-top !bg-no-repeat lg:block"
          id="login-bg"
        ></div>
        <div className="mx-auto w-full px-3 pt-10 sm:pt-20 lg:w-1/2">
          <div className="mx-auto mb-8 flex items-center justify-center text-center">
            <a href="/" data-discover="true" className="max-w-[250px]">
              <img src="/logo.png" alt="Logo" className="mx-auto w-fit" />
            </a>
          </div>
          <div className="mx-auto w-full max-w-full rounded-xl border border-[#FA3B3B)] bg-white px-4 py-6 shadow-[4px_4px_10px_0px_#0000000D] sm:max-w-96 sm:px-10 sm:py-10">

            <h2 className="sm:text-2xl text-xl font-bold text-[] sm:mb-6 mb-3">Account Login</h2>
                 <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="font-bold text-[#10181FB2] text-sm cursor-pointer"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="font-medium text-sm text-[#5D5D5D] w-full p-3 mt-2 border rounded-lg transition-all outline-none focus-within:shadow-[0_0_1px_rgba(45,93,130,0.5)] border-[#E8E8E8] focus:border-[var(--primary-color)]"
                    required
                  />
                </div>
                <div className="space-y-2">
                    <Label
                    htmlFor="password"
                    className="font-bold text-[#10181FB2] text-sm cursor-pointer"
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="font-medium text-sm text-[#5D5D5D] w-full p-3 mt-2 border rounded-lg transition-all outline-none focus-within:shadow-[0_0_1px_rgba(45,93,130,0.5)] border-[#E8E8E8] focus:border-[var(--primary-color)]"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className=" bg-gradient-to-r from-[#D90655] to-[#FC3F39] text-primary-foreground hover:opacity-90 shadow-sm rounded-full px-14 pt-2.5 pb-2.5 text-base font-normal w-full md:pb-4 md:text-xl opacity-100"
                  >
                    {isLoading ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </div>
              </form>   
          </div>
        </div>
      </div>
    </>
  );
}
