
import React from 'react';
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { Package, User } from '../types';
import { PACKAGES } from '../constants';

interface PackagesProps {
  user: User;
  onPurchase: (pkg: Package) => void;
}

const Packages: React.FC<PackagesProps> = ({ user, onPurchase }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-3xl font-bold text-slate-800">আপনার জন্য সেরা প্যাকেজটি বেছে নিন</h2>
        <p className="text-slate-500">সঠিক প্যাকেজে বিনিয়োগ করুন এবং প্রতিদিন নিশ্চিত আয় শুরু করুন। স্বচ্ছ এবং নিরাপদ পেমেন্ট সিস্টেম।</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
        {PACKAGES.map((pkg) => {
          const isCurrent = user.currentPackageId === pkg.id;
          return (
            <div 
              key={pkg.id} 
              className={`relative overflow-hidden bg-white rounded-[2rem] border-2 transition-all duration-300 ${
                isCurrent 
                  ? 'border-indigo-500 shadow-xl scale-105 z-10' 
                  : 'border-slate-100 shadow-sm hover:shadow-lg hover:border-indigo-200'
              }`}
            >
              {isCurrent && (
                <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest shadow-lg">
                  বর্তমান প্যাকেজ
                </div>
              )}
              
              <div className="p-8">
                <div className={`w-14 h-14 ${pkg.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-100`}>
                  <Zap size={32} />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800">{pkg.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-slate-900">৳{pkg.price}</span>
                  <span className="ml-2 text-slate-500">/ {pkg.durationDays} দিন</span>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-slate-600">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    <span>প্রতিদিন <span className="font-bold text-slate-800">{pkg.dailyAds}টি</span> বিজ্ঞাপন</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    <span>প্রতি বিজ্ঞাপনে আয় <span className="font-bold text-slate-800">৳{pkg.earningPerAd}</span></span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    <span>দৈনিক আয় <span className="font-bold text-slate-800">৳{pkg.dailyAds * pkg.earningPerAd}</span></span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    <span>রেফারেল বোনাস ১৫% পর্যন্ত</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <ShieldCheck size={18} className="text-indigo-500" />
                    <span>নিরাপদ উইথড্রাল সিস্টেম</span>
                  </div>
                </div>

                <button 
                  disabled={isCurrent}
                  onClick={() => onPurchase(pkg)}
                  className={`mt-10 w-full py-4 rounded-2xl font-bold text-lg transition-all ${
                    isCurrent 
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1'
                  }`}
                >
                  {isCurrent ? 'ইতিমধ্যেই সক্রিয়' : 'প্যাকেজ কিনুন'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Packages;
