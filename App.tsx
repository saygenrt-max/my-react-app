
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Packages from './components/Packages';
import AdsGallery from './components/AdsGallery';
import Wallet from './components/Wallet';
import Auth from './components/Auth';
import { User, Package, Ad, Transaction, View } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setView] = useState<View>('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Initial dummy state for demo
  useEffect(() => {
    const savedUser = localStorage.getItem('adearn_user');
    const savedTxs = localStorage.getItem('adearn_txs');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    if (savedTxs) {
      setTransactions(JSON.parse(savedTxs));
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('adearn_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('adearn_user');
  };

  const handlePurchasePackage = (pkg: Package) => {
    if (!user) return;
    if (user.balance < pkg.price) {
      alert("দুঃখিত, আপনার ব্যালেন্স পর্যাপ্ত নয়। আগে ডিপোজিট করুন।");
      setView('wallet');
      return;
    }

    const updatedUser = { 
      ...user, 
      balance: user.balance - pkg.price,
      currentPackageId: pkg.id 
    };
    const newTx: Transaction = {
      id: Math.random().toString(36).substring(7),
      type: 'deposit',
      amount: pkg.price,
      status: 'completed',
      date: new Date().toLocaleDateString('bn-BD'),
      method: 'wallet'
    };

    setUser(updatedUser);
    setTransactions([newTx, ...transactions]);
    localStorage.setItem('adearn_user', JSON.stringify(updatedUser));
    localStorage.setItem('adearn_txs', JSON.stringify([newTx, ...transactions]));
    alert(`${pkg.name} প্যাকেজটি সফলভাবে সক্রিয় করা হয়েছে!`);
    setView('dashboard');
  };

  const handleAdComplete = (ad: Ad) => {
    if (!user) return;
    const reward = ad.reward;
    const updatedUser = {
      ...user,
      balance: user.balance + reward,
      totalEarned: user.totalEarned + reward,
      adsViewedToday: user.adsViewedToday + 1
    };
    const newTx: Transaction = {
      id: Math.random().toString(36).substring(7),
      type: 'earning',
      amount: reward,
      status: 'completed',
      date: new Date().toLocaleDateString('bn-BD'),
      method: 'Ad System'
    };

    setUser(updatedUser);
    setTransactions([newTx, ...transactions]);
    localStorage.setItem('adearn_user', JSON.stringify(updatedUser));
    localStorage.setItem('adearn_txs', JSON.stringify([newTx, ...transactions]));
  };

  const handleWithdraw = (amount: number, method: string, accountNo: string) => {
    if (!user) return;
    const updatedUser = { ...user, balance: user.balance - amount };
    const newTx: Transaction = {
      id: Math.random().toString(36).substring(7),
      type: 'withdraw',
      amount: amount,
      status: 'pending',
      date: new Date().toLocaleDateString('bn-BD'),
      method: method
    };

    setUser(updatedUser);
    setTransactions([newTx, ...transactions]);
    localStorage.setItem('adearn_user', JSON.stringify(updatedUser));
    localStorage.setItem('adearn_txs', JSON.stringify([newTx, ...transactions]));
  };

  const handleDeposit = (amount: number, method: string, trxId: string) => {
    const newTx: Transaction = {
      id: Math.random().toString(36).substring(7),
      type: 'deposit',
      amount: amount,
      status: 'pending',
      date: new Date().toLocaleDateString('bn-BD'),
      method: method
    };
    setTransactions([newTx, ...transactions]);
    localStorage.setItem('adearn_txs', JSON.stringify([newTx, ...transactions]));
  };

  if (!isAuthenticated || !user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar 
        currentView={currentView} 
        setView={setView} 
        onLogout={handleLogout} 
      />
      
      <main className="flex-1 ml-64 p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {currentView === 'dashboard' && (
          <Dashboard 
            user={user} 
            transactions={transactions} 
            onNavigate={setView} 
          />
        )}
        {currentView === 'packages' && (
          <Packages 
            user={user} 
            onPurchase={handlePurchasePackage} 
          />
        )}
        {currentView === 'ads' && (
          <AdsGallery 
            user={user} 
            onAdComplete={handleAdComplete} 
          />
        )}
        {currentView === 'wallet' && (
          <Wallet 
            user={user} 
            transactions={transactions} 
            onWithdraw={handleWithdraw}
            onDeposit={handleDeposit}
          />
        )}
        {currentView === 'referrals' && (
          <div className="bg-white p-12 rounded-[2.5rem] text-center border border-slate-100 shadow-sm animate-in zoom-in-95 duration-500">
             <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
             </div>
             <h2 className="text-3xl font-bold text-slate-800">বন্ধুদের রেফার করুন এবং আয় করুন</h2>
             <p className="text-slate-500 mt-4 max-w-lg mx-auto">আপনার রেফারেল কোড ব্যবহার করে কেউ জয়েন করলে আপনি পাবেন সরাসরি ১৫% বোনাস!</p>
             <div className="mt-10 max-w-sm mx-auto p-4 bg-slate-50 border-2 border-dashed border-indigo-200 rounded-2xl flex items-center justify-between">
                <span className="font-mono font-bold text-xl text-indigo-600 tracking-widest">{user.referralCode}</span>
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-100">কপি করুন</button>
             </div>
          </div>
        )}
        {currentView === 'profile' && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 animate-in slide-in-from-top-4 duration-500">
             <div className="flex flex-col items-center">
                <div className="relative group">
                  <img src={user.profilePic} className="w-32 h-32 rounded-full border-4 border-indigo-100 shadow-xl group-hover:opacity-80 transition-opacity" alt="Profile" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-full font-bold">পরিবর্তন</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mt-4">{user.name}</h3>
                <p className="text-slate-500">{user.email}</p>
                <div className="mt-2 px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-widest">ভেরিফাইড ইউজার</div>
             </div>
             
             <div className="mt-12 space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center">
                   <span className="text-slate-600 font-medium">ফোন নম্বর</span>
                   <span className="text-slate-900 font-bold">{user.phone}</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center">
                   <span className="text-slate-600 font-medium">নিবন্ধন তারিখ</span>
                   <span className="text-slate-900 font-bold">১০ মে, ২০২৪</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center">
                   <span className="text-slate-600 font-medium">নিরাপত্তা</span>
                   <button className="text-indigo-600 font-bold hover:underline">পাসওয়ার্ড পরিবর্তন করুন</button>
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
