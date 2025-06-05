'use client';

import { useState, useEffect } from 'react';
import { getNames } from 'country-list';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

function generateCaptcha() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return { question: `${a} + ${b}`, answer: (a + b).toString() };
}

export default function LoginRegister() {
  const router = useRouter();
  const { login } = useAuth();

  const [loginCaptcha, setLoginCaptcha] = useState({ question: '', answer: '' });
  const [registerCaptcha, setRegisterCaptcha] = useState({ question: '', answer: '' });

  const [loginData, setLoginData] = useState({ usernameOrEmail: '', password: '', captcha: '' });
  const [registerData, setRegisterData] = useState({ company: '', country: '', username: '', email: '', password: '', confirmPassword: '', captcha: '', subscribe: true });

  const [countries, setCountries] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterConfirmPassword, setShowRegisterConfirmPassword] = useState(false);

  useEffect(() => {
    setCountries(getNames());
    setLoginCaptcha(generateCaptcha());
    setRegisterCaptcha(generateCaptcha());
  }, []);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setRegisterData({ ...registerData, [name]: type === 'checkbox' ? checked : value });
  };

  const validateEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setError(''); setSuccess('');

    const { password, confirmPassword, email, captcha, ...rest } = registerData;

    if (captcha !== registerCaptcha.answer) {
      setError('Invalid captcha answer.');
      setRegisterData({ ...registerData, captcha: '' });
      setRegisterCaptcha(generateCaptcha());
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Invalid email format.');
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...rest, email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed.');

      setSuccess('Registration successful! Please log in.');
      setRegisterData({ company: '', country: '', username: '', email: '', password: '', confirmPassword: '', captcha: '', subscribe: true });
      setRegisterCaptcha(generateCaptcha());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error.');
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setError(''); setSuccess('');

    if (loginData.captcha !== loginCaptcha.answer) {
      setError('Invalid captcha answer.');
      setLoginData({ ...loginData, captcha: '' });
      setLoginCaptcha(generateCaptcha());
      return;
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernameOrEmail: loginData.usernameOrEmail, password: loginData.password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed.');

      login(data.token);
      setSuccess('Login successful! Redirecting...');
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error.');
    }
  };

  return (
    <div className="bg-white text-gray-900">
      <h1 className="text-3xl font-bold text-center mb-10 py-4 px-6 shadow-md rounded-lg border-b-4 border-[#003366]">Login / Register</h1>

      {error && <div className="text-red-600 mb-4 text-center font-semibold text-2xl">{error}</div>}
      {success && <div className="text-green-600 mb-4 text-center font-semibold text-2xl">{success}</div>}

      <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto p-6">
        <div className="w-full md:w-1/2 border rounded p-6 shadow">
          <h2 className="text-xl font-bold mb-4">Login</h2>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <label>
              Username or email address
              <input name="usernameOrEmail" value={loginData.usernameOrEmail} onChange={handleLoginChange} type="text" className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#003366] transition" required />
            </label>
            <label className="relative block">
              Password
              <input name="password" value={loginData.password} onChange={handleLoginChange} type={showLoginPassword ? 'text' : 'password'} className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#003366] transition" required />
              <span className="absolute right-3 top-9 cursor-pointer" onClick={() => setShowLoginPassword(!showLoginPassword)}>
                {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </label>
            <label>
              Are you human? Solve: {loginCaptcha.question} =
              <input name="captcha" value={loginData.captcha} onChange={handleLoginChange} type="text" className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#003366] transition" required />
            </label>
            <div className="flex items-center gap-2 my-2">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <button type="submit" className="w-full bg-gray-300 hover:bg-gray-400 active:scale-95 transition transform px-4 py-2 rounded shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#003366]">
              Log in
            </button>
          </form>
          <div className="mt-2 text-sm text-gray-500 underline cursor-pointer">Lost your password?</div>
        </div>

        <div className="w-full md:w-1/2 border rounded p-6 shadow">
          <h2 className="text-xl font-bold mb-4">Register</h2>
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <input name="company" value={registerData.company} onChange={handleRegisterChange} type="text" placeholder="Enter Company" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#003366] transition" required />
            <select name="country" value={registerData.country} onChange={handleRegisterChange} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#003366] transition" required>
              <option value="">Select a country / region…</option>
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input name="username" value={registerData.username} onChange={handleRegisterChange} type="text" placeholder="Username" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#003366] transition" required />
            <input name="email" value={registerData.email} onChange={handleRegisterChange} type="email" placeholder="Email address" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#003366] transition" required />
            <label className="relative block">
              <input name="password" value={registerData.password} onChange={handleRegisterChange} type={showRegisterPassword ? 'text' : 'password'} placeholder="Password" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#003366] transition" required />
              <span className="absolute right-3 top-2.5 cursor-pointer" onClick={() => setShowRegisterPassword(!showRegisterPassword)}>
                {showRegisterPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </label>
            <label className="relative block">
              <input name="confirmPassword" value={registerData.confirmPassword} onChange={handleRegisterChange} type={showRegisterConfirmPassword ? 'text' : 'password'} placeholder="Confirm Password" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#003366] transition" required />
              <span className="absolute right-3 top-2.5 cursor-pointer" onClick={() => setShowRegisterConfirmPassword(!showRegisterConfirmPassword)}>
                {showRegisterConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </label>
            <div className="flex items-center gap-2">
              <input name="subscribe" type="checkbox" checked={registerData.subscribe} onChange={handleRegisterChange} />
              <label>Subscribe to our newsletter</label>
            </div>
            <label>
              Are you human? Solve: {registerCaptcha.question} =
              <input name="captcha" value={registerData.captcha} onChange={handleRegisterChange} type="text" className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#003366] transition" required />
            </label>
            <p className="text-sm text-gray-600 my-2">Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <span className="underline cursor-pointer text-blue-700">privacy policy</span>.</p>
            <button type="submit" className="w-full bg-gray-300 hover:bg-gray-400 active:scale-95 transition transform px-4 py-2 rounded shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#003366]">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
