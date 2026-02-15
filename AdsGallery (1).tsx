
import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { User, Ad } from '../types';
import { MOCK_ADS, PACKAGES } from '../constants';

interface AdsGalleryProps {
  user: User;
  onAdComplete: (ad: Ad) => void;
}

const AdsGallery: React.FC<AdsGalleryProps> = ({ user, onAdComplete }) => {
  const [activeAd, setActiveAd] = useState<Ad | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentPkg = PACKAGES.find(p => p.id === user.currentPackageId);
  const adsRemaining = currentPkg ? currentPkg.dailyAds - user.adsViewedToday : 0;

  useEffect(() => {
    let timer: any;
    if (activeAd && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (activeAd && timeLeft === 0) {
      setCompleted(true);
    }
    return () => clearInterval(timer);
  }, [activeAd, timeLeft]);

  const handleStartAd = (ad: Ad) => {
    if (!user.currentPackageId) return;
    if (adsRemaining <= 0) return;
    setActiveAd(ad);
    setTimeLeft(ad.duration);
    setCompleted(false);
  };

  const handleClaim = () => {
    if (activeAd) {
      onAdComplete(activeAd);
      setActiveAd(null);
      setCompleted(false);
    }
  };

  if (!user.currentPackageId) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center text-rose-500">
          <AlertCircle size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">আপনার কোন সক্রিয় প্যাকেজ নেই!</h2>
        <p className="text-slate-500 max-w-sm">বিজ্ঞাপন দেখে আয় শুরু করতে দয়া করে একটি প্যাকেজ সাবস্ক্রাইব করুন।</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">বিজ্ঞাপন দেখুন এবং আয় করুন</h2>
          <p className="text-slate-500">আজকের জন্য আপনার আরও {adsRemaining}টি বিজ্ঞাপন বাকি আছে।</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest">আজকের আয়</p>
            <p className="text-lg font-bold">৳{user.adsViewedToday * (currentPkg?.earningPerAd || 0)}</p>
          </div>
          <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-100 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest">বাকি ভিউ</p>
            <p className="text-lg font-bold">{adsRemaining}</p>
          </div>
        </div>
      </header>

      {activeAd ? (
        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-indigo-100 flex flex-col items-center max-w-2xl mx-auto overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
            <div 
              className="h-full bg-indigo-600 transition-all duration-1000 ease-linear"
              style={{ width: `${((activeAd.duration - timeLeft) / activeAd.duration) * 100}%` }}
            />
          </div>

          <div className="w-full aspect-video bg-slate-100 rounded-2xl mb-8 flex items-center justify-center relative overflow-hidden group">
            <img src={activeAd.thumbnail} alt={activeAd.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-indigo-900/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-white">
              <Clock size={48} className="mb-4 animate-pulse" />
              <p className="text-4xl font-black">{timeLeft}s</p>
              <p className="text-sm font-medium opacity-80 mt-2">অপেক্ষা করুন...</p>
            </div>
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-slate-800">{activeAd.title}</h3>
            <p className="text-slate-500">{activeAd.description}</p>
          </div>

          <button
            disabled={!completed}
            onClick={handleClaim}
            className={`mt-10 w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
              completed
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:scale-[1.02]'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {completed ? (
              <><CheckCircle size={20} /> বোনাস সংগ্রহ করুন (৳{currentPkg?.earningPerAd})</>
            ) : (
              'অপেক্ষা করুন...'
            )}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_ADS.map((ad) => (
            <div key={ad.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-video">
                <img src={ad.thumbnail} alt={ad.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/20 transition-colors" />
                <div className="absolute bottom-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg">
                  {ad.duration}s
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-800">{ad.title}</h3>
                <p className="text-sm text-slate-500 mt-1 line-clamp-1">{ad.description}</p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold">
                    <CheckCircle size={16} />
                    <span>৳{currentPkg?.earningPerAd} প্রাপ্য</span>
                  </div>
                  <button 
                    disabled={adsRemaining <= 0}
                    onClick={() => handleStartAd(ad)}
                    className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
                  >
                    <Play size={16} /> দেখুন
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdsGallery;
