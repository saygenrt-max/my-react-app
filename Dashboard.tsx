
import React, { useEffect, useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  Eye, 
  Package as PackageIcon,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Zap
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { User, Transaction } from '../types';
import { getInvestmentInsight } from '../services/geminiService';

interface DashboardProps {
  user: User;
  transactions: Transaction[];
  onNavigate: (view: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, transactions, onNavigate }) => {
  const [insight, setInsight] = useState<string>("লোড হচ্ছে...");

  useEffect(() => {
    getInvestmentInsight(user.name, user.balance).then(setInsight);
  }, [user.name, user.balance]);

  const chartData = [
    { name: 'Mon', income: 400 },
    { name: 'Tue', income: 300 },
    { name: 'Wed', income: 600 },
    { name: 'Thu', income: 800 },
    { name: 'Fri', income: 500 },
    { name: 'Sat', income: 900 },
    { name: 'Sun', income: 1100 },
  ];

  const StatCard = ({ title, value, subValue, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-2xl ${color} text-white shadow-sm`}>
          <Icon size={24} />
        </div>
        {subValue && (
          <span className="text-xs font-semibold px-2 py-1 bg-green-50 text-green-600 rounded-full flex items-center gap-1">
            <ArrowUpRight size={12} /> {subValue}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-slate-800">{value}</h3>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">স্বাগতম, {user.name}!</h2>
          <p className="text-slate-500">আজ আপনার উপার্জনের জন্য একটি চমৎকার দিন।</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => onNavigate('wallet')}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            টাকা যোগ করুন <Zap size={18} />
          </button>
        </div>
      </header>

      {/* AI Insight Box */}
      <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl flex items-start gap-4">
        <div className="p-2 bg-indigo-600 rounded-lg text-white mt-1">
          <TrendingUp size={18} />
        </div>
        <div>
          <p className="text-indigo-900 font-medium">স্মার্ট ইনভেস্টমেন্ট টিপস (AI):</p>
          <p className="text-indigo-700 text-sm">{insight}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="মোট ব্যালেন্স" 
          value={`৳${user.balance}`} 
          subValue="+12%" 
          icon={Wallet} 
          color="bg-indigo-500" 
        />
        <StatCard 
          title="মোট আয়" 
          value={`৳${user.totalEarned}`} 
          subValue="+5%" 
          icon={TrendingUp} 
          color="bg-emerald-500" 
        />
        <StatCard 
          title="আজকের অ্যাড ভিউ" 
          value={`${user.adsViewedToday}`} 
          icon={Eye} 
          color="bg-amber-500" 
        />
        <StatCard 
          title="বর্তমান প্যাকেজ" 
          value={user.currentPackageId ? user.currentPackageId.split('-')[1].toUpperCase() : 'নেই'} 
          icon={PackageIcon} 
          color="bg-purple-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-slate-800">উপার্জন এনালিটিক্স</h3>
            <select className="bg-slate-50 border-none text-sm font-medium rounded-lg px-3 py-1 text-slate-600">
              <option>গত ৭ দিন</option>
              <option>গত ৩০ দিন</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#4f46e5" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorIncome)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="font-bold text-lg text-slate-800 mb-6">সাম্প্রতিক লেনদেন</h3>
          <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
            {transactions.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-slate-400 text-sm italic">কোন লেনদেন নেই</p>
              </div>
            ) : (
              transactions.map(tx => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 group hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${tx.type === 'withdraw' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      {tx.type === 'withdraw' ? <ArrowDownRight size={18} /> : <ArrowUpRight size={18} />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm capitalize">{tx.type}</p>
                      <p className="text-xs text-slate-500">{tx.date}</p>
                    </div>
                  </div>
                  <p className={`font-bold text-sm ${tx.type === 'withdraw' ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {tx.type === 'withdraw' ? '-' : '+'}৳{tx.amount}
                  </p>
                </div>
              ))
            )}
          </div>
          <button 
            onClick={() => onNavigate('wallet')}
            className="mt-6 w-full py-3 rounded-xl border border-indigo-100 text-indigo-600 font-bold hover:bg-indigo-50 transition-colors text-sm flex items-center justify-center gap-2"
          >
            সব দেখুন <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
