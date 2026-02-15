
import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, Phone, Eye, EyeOff, TrendingUp, CheckCircle } from 'lucide-react';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call
    const mockUser: User = {
      id: 'u-' + Math.random().toString(36).substring(7),
      name: formData.name || 'আরিফ হোসেন',
      email: formData.email || 'arif@example.com',
      phone: formData.phone || '01712345678',
      profilePic: 'https://picsum.photos/seed/user1/200',
      balance: 1250,
      totalEarned: 3500,
      referralCode: 'EARN' + Math.floor(1000 + Math.random() * 9000),
      currentPackageId: 'pkg-pro',
      adsViewedToday: 4,
      lastAdViewDate: new Date().toISOString()
    };
    onLogin(mockUser);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-5xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
        
        {/* Left Side: Branding */}
        <div className="w-full md:w-1/2 bg-indigo-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-[-50px] left-[-50px] w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 bg-indigo-500 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp size={32} />
            </div>
            <h1 className="text-4xl font-black tracking-tight leading-tight">বিজ্ঞাপন দেখুন,<br />নিশ্চিত আয় করুন!</h1>
            <p className="mt-4 text-indigo-100 text-lg opacity-80">বাংলাদেশের সবচেয়ে বিশ্বস্ত এবং সহজ উপার্জনের প্ল্যাটফর্ম AdEarn Pro তে আপনাকে স্বাগতম।</p>
          </div>

          <div className="relative z-10 mt-12 space-y-6">
            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="p-2 bg-emerald-500 rounded-lg text-white"><CheckCircle size={20} /></div>
              <p className="font-bold">১০০% নিরাপদ উইথড্রাল</p>
            </div>
            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="p-2 bg-amber-500 rounded-lg text-white"><CheckCircle size={20} /></div>
              <p className="font-bold">প্রতিদিন আনলিমিটেড ইনকাম</p>
            </div>
          </div>

          <div className="relative z-10 mt-auto pt-12">
            <p className="text-indigo-200 text-sm">© ২০২৪ AdEarn Pro. সর্বস্বত্ব সংরক্ষিত।</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black text-slate-800">{isLogin ? 'আবার স্বাগতম!' : 'নতুন অ্যাকাউন্ট'}</h2>
            <p className="text-slate-500 mt-2">{isLogin ? 'আপনার অ্যাকাউন্টে লগইন করুন' : 'আজই আমাদের সাথে যোগ দিন'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">নাম</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    type="text" 
                    placeholder="আপনার পূর্ণ নাম" 
                    className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-medium"
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">ইমেইল / ইউজারনেম</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email" 
                  placeholder="example@mail.com" 
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-medium"
                />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">ফোন নম্বর</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    type="tel" 
                    placeholder="017XXXXXXXX" 
                    className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-medium"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-slate-500 uppercase">পাসওয়ার্ড</label>
                {isLogin && <button type="button" className="text-xs font-bold text-indigo-600 hover:underline">পাসওয়ার্ড ভুলে গেছেন?</button>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-medium"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button className="w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] font-bold text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-[0.98]">
              {isLogin ? 'লগইন করুন' : 'নিবন্ধন করুন'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 font-medium">
              {isLogin ? 'অ্যাকাউন্ট নেই?' : 'ইতিমধ্যেই অ্যাকাউন্ট আছে?'} 
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-indigo-600 font-black hover:underline"
              >
                {isLogin ? 'নতুন অ্যাকাউন্ট খুলুন' : 'লগইন করুন'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
