
import React, { useState } from 'react';
import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Wallet as WalletIcon, 
  Banknote,
  Smartphone,
  CheckCircle,
  AlertCircle,
  History
} from 'lucide-react';
import { User, Transaction } from '../types';
import { PAYMENT_METHODS } from '../constants';

interface WalletProps {
  user: User;
  transactions: Transaction[];
  onWithdraw: (amount: number, method: string, accountNo: string) => void;
  onDeposit: (amount: number, method: string, trxId: string) => void;
}

const Wallet: React.FC<WalletProps> = ({ user, transactions, onWithdraw, onDeposit }) => {
  const [activeTab, setActiveTab] = useState<'withdraw' | 'deposit' | 'history'>('withdraw');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [trxId, setTrxId] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  const handleSubmitWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!amt || amt < 100) {
      setFeedback({ type: 'error', msg: 'সর্বনিম্ন ১০০ টাকা উইথড্র করা সম্ভব' });
      return;
    }
    if (amt > user.balance) {
      setFeedback({ type: 'error', msg: 'আপনার পর্যাপ্ত ব্যালেন্স নেই' });
      return;
    }
    if (!method || !accountNo) {
      setFeedback({ type: 'error', msg: 'সবগুলো তথ্য সঠিকভাবে পূরণ করুন' });
      return;
    }
    onWithdraw(amt, method, accountNo);
    setFeedback({ type: 'success', msg: 'উইথড্র রিকোয়েস্ট পাঠানো হয়েছে!' });
    setAmount('');
    setAccountNo('');
  };

  const handleSubmitDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!amt || amt < 500) {
      setFeedback({ type: 'error', msg: 'সর্বনিম্ন ৫০০ টাকা ডিপোজিট করা সম্ভব' });
      return;
    }
    if (!method || !trxId) {
      setFeedback({ type: 'error', msg: 'সবগুলো তথ্য সঠিকভাবে পূরণ করুন' });
      return;
    }
    onDeposit(amt, method, trxId);
    setFeedback({ type: 'success', msg: 'ডিপোজিট রিকোয়েস্ট সফলভাবে জমা হয়েছে। রিভিউ এর জন্য অপেক্ষা করুন।' });
    setAmount('');
    setTrxId('');
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-indigo-600 p-8 rounded-[2.5rem] shadow-xl text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-white/10 rounded-full" />
          <div className="relative z-10">
            <WalletIcon size={32} className="mb-4 opacity-80" />
            <p className="text-indigo-100 text-sm font-medium uppercase tracking-widest">বর্তমান ব্যালেন্স</p>
            <h2 className="text-4xl font-black mt-2">৳{user.balance}</h2>
          </div>
          <div className="mt-8 relative z-10">
            <div className="flex justify-between items-center text-sm">
              <span className="opacity-80">মোট উপার্জন</span>
              <span className="font-bold">৳{user.totalEarned}</span>
            </div>
            <div className="w-full h-1.5 bg-white/20 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-white rounded-full w-[70%]" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white p-4 sm:p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8">
            <button 
              onClick={() => setActiveTab('withdraw')}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${activeTab === 'withdraw' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <ArrowDownCircle size={18} /> উইথড্র
            </button>
            <button 
              onClick={() => setActiveTab('deposit')}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${activeTab === 'deposit' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <ArrowUpCircle size={18} /> ডিপোজিট
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${activeTab === 'history' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <History size={18} /> ইতিহাস
            </button>
          </div>

          {feedback && (
            <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${feedback.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
              {feedback.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              <span className="font-medium">{feedback.msg}</span>
            </div>
          )}

          {activeTab === 'withdraw' && (
            <form onSubmit={handleSubmitWithdraw} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">টাকার পরিমাণ (৳)</label>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="উদাঃ ৫০০"
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-bold text-indigo-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">পেমেন্ট মাধ্যম</label>
                  <select 
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-bold text-indigo-600 appearance-none"
                  >
                    <option value="">নির্বাচন করুন</option>
                    {PAYMENT_METHODS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">অ্যাকাউন্ট নম্বর / ফোন নম্বর</label>
                <input 
                  type="text" 
                  value={accountNo}
                  onChange={(e) => setAccountNo(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-bold tracking-widest text-indigo-600 placeholder:tracking-normal"
                />
              </div>
              <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all hover:-translate-y-1">
                উইথড্র রিকোয়েস্ট পাঠান
              </button>
            </form>
          )}

          {activeTab === 'deposit' && (
            <div className="space-y-8">
              <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 space-y-4">
                <h4 className="font-bold text-indigo-900 flex items-center gap-2">
                  <AlertCircle size={18} /> ডিপোজিট নির্দেশিকা
                </h4>
                <ul className="text-sm text-indigo-700 space-y-2">
                  <li>১. নিচের দেওয়া মার্চেন্ট নম্বরে "Send Money" করুন।</li>
                  <li>২. বকাস/নগদ/রকেট (পার্সোনাল): <strong>01700-000000</strong></li>
                  <li>৩. টাকা পাঠানোর পর TrxID টি নিচের ফর্মে সাবমিট করুন।</li>
                </ul>
              </div>

              <form onSubmit={handleSubmitDeposit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">পরিমাণ (৳)</label>
                    <input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="উদাঃ ২০০০"
                      className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-bold text-indigo-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">মাধ্যম</label>
                    <select 
                      value={method}
                      onChange={(e) => setMethod(e.target.value)}
                      className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-bold text-indigo-600 appearance-none"
                    >
                      <option value="">নির্বাচন করুন</option>
                      {PAYMENT_METHODS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">ট্রানজেকশন আইডি (TrxID)</label>
                  <input 
                    type="text" 
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    placeholder="XXXXXXXXXX"
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-bold tracking-widest text-indigo-600 placeholder:tracking-normal"
                  />
                </div>
                <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all hover:-translate-y-1">
                  ডিপোজিট সাবমিট করুন
                </button>
              </form>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              {transactions.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  <p className="text-slate-400 font-medium">এখনও কোনো লেনদেন করা হয়নি</p>
                </div>
              ) : (
                transactions.map(tx => (
                  <div key={tx.id} className="flex items-center justify-between p-5 rounded-2xl bg-white border border-slate-100 hover:border-indigo-200 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl ${
                        tx.type === 'withdraw' ? 'bg-rose-50 text-rose-600' : 
                        tx.type === 'deposit' ? 'bg-indigo-50 text-indigo-600' :
                        'bg-emerald-50 text-emerald-600'
                      }`}>
                        {tx.type === 'withdraw' ? <ArrowDownCircle size={24} /> : 
                         tx.type === 'deposit' ? <ArrowUpCircle size={24} /> : 
                         <History size={24} />}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 capitalize leading-tight">
                          {tx.type === 'earning' ? 'অ্যাড ভিউ ইনকাম' : 
                           tx.type === 'withdraw' ? 'টাকা উত্তোলন' : 
                           tx.type === 'deposit' ? 'টাকা জমা' : 'রেফারেল বোনাস'}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">{tx.date} • {tx.method?.toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-black ${tx.type === 'withdraw' ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {tx.type === 'withdraw' ? '-' : '+'}৳{tx.amount}
                      </p>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        tx.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 
                        tx.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {tx.status === 'completed' ? 'সফল' : 'পেন্ডিং'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
