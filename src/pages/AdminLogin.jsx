import { UserCircle, Mail, Lock, ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';
import greenLogo from '../assets/greenlogo.png';
import { useState } from 'react';

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { users } from '../mockdata/users';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    securityPassword: ''
  });

  const [showPwd, setShowPwd] = useState(false);
  const [showSecPwd, setShowSecPwd] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Find user in mock data
    const user = users.find(u => u.email.toLowerCase() === formData.email.toLowerCase());

    if (user && 
        user.passwords.primary === formData.password && 
        user.passwords.secondary === formData.securityPassword) {
      console.log('Login Successful:', user.name);
      login(user); // Global context update
      navigate('/admin/dashboard'); // Navigation via router
    } else {
      setError('Invalid credentials. Please check your email and both passwords.');
    }
  };

  return (
    <div className="flex h-screen w-full flex-col lg:flex-row font-sans selection:bg-[#186b53]/30 overflow-hidden">
      
      {/* Left Sidebar / Hero Area */}
      <div className="relative flex h-full w-full flex-col items-center justify-center bg-[#0f4c3a] px-8 py-12 lg:w-[45%] lg:px-16 xl:px-24">
        {/* Absolute Logo at Top Left */}
        <div className="absolute top-8 left-8 lg:top-12 lg:left-12 xl:left-16 z-30 pointer-events-none">
          <img src={greenLogo} alt="Arrivio Logo" className="h-9 w-auto object-contain brightness-0 invert opacity-90" />
        </div>

        {/* Background dark glowing effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
           <div className="absolute -top-[20%] -left-[10%] h-[70%] w-[70%] rounded-full bg-[#186b53]/60 blur-[120px]"></div>
           <div className="absolute top-[40%] -right-[20%] h-[60%] w-[60%] rounded-full bg-emerald-500/20 blur-[120px]"></div>
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        </div>

        {/* Welcome hero */}
        <div className="relative z-10 flex items-center justify-center px-4">
          <div className="text-center text-white drop-shadow-xl max-w-md">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-[-0.02em] leading-[1.1]">
              Hey there,<br />
              welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 to-emerald-300">
                Arrivio
              </span>
            </h2>
            <p className="mt-6 text-base lg:text-lg text-emerald-100/80">
              The operating layer for settlement, services, and community
              for global talent moving to Germany.
            </p>
          </div>
        </div>
      </div>

      {/* Right Content Area - Sign In Form */}
      <div className="relative z-20 flex h-full w-full items-center justify-center bg-[#f2f2f2] shadow-[-15px_0_40px_rgba(0,0,0,0.15)] px-6 py-12 lg:w-[55%] lg:px-16 xl:px-24 overflow-hidden">
         <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#111827_1px,transparent_1px)] [background-size:24px_24px]"></div>
         
         <div className="relative z-30 w-full max-w-md animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
            <div className="mb-8 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-[#0f4c3a]">Admin Portal Login</h1>
              <p className="mt-2 text-gray-600">Enter your credentials below to access the management portal.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium animate-pulse">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 ml-1">Email Address / Admin ID</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400 group-focus-within:text-[#186b53] transition-colors">
                    <Mail size={20} />
                  </div>
                  <input 
                    type="email"
                    required
                    className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#186b53] focus:border-[#186b53] block pl-11 p-3.5 shadow-sm transition-all outline-none"
                    placeholder="admin@arrivio.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Primary Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">Primary Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400 group-focus-within:text-[#186b53] transition-colors">
                      <Lock size={18} />
                    </div>
                    <input 
                      type={showPwd ? "text" : "password"}
                      required
                      className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#186b53] focus:border-[#186b53] block pl-10 p-3.5 shadow-sm transition-all outline-none"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPwd(!showPwd)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Security Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">Security Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400 group-focus-within:text-[#186b53] transition-colors">
                      <ShieldCheck size={18} />
                    </div>
                    <input 
                      type={showSecPwd ? "text" : "password"}
                      required
                      className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#186b53] focus:border-[#186b53] block pl-10 p-3.5 shadow-sm transition-all outline-none"
                      placeholder="••••••••"
                      value={formData.securityPassword}
                      onChange={(e) => setFormData({...formData, securityPassword: e.target.value})}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowSecPwd(!showSecPwd)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    >
                      {showSecPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full flex items-center justify-center mt-4 px-6 py-4 text-white font-semibold bg-[#0f4c3a] rounded-xl hover:bg-[#186b53] focus:ring-4 focus:ring-emerald-200 transition-all duration-300 shadow-lg shadow-[#0f4c3a]/20 group"
              >
                Sign In to Portal
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-8 text-center pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500 italic">
                  Protected by dual-factor authentication system.
                </p>
              </div>
            </form>
         </div>
      </div>
    </div>
  );
}
