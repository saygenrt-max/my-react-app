
import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Tv, 
  Wallet, 
  Users, 
  UserCircle, 
  LogOut,
  TrendingUp
} from 'lucide-react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: LayoutDashboard },
    { id: 'packages', label: 'প্যাকেজ', icon: Package },
    { id: 'ads', label: 'বিজ্ঞাপন দেখুন', icon: Tv },
    { id: 'wallet', label: 'ওয়ালেট / উইথড্র', icon: Wallet },
    { id: 'referrals', label: 'রেফারেল', icon: Users },
    { id: 'profile', label: 'প্রোফাইল', icon: UserCircle },
  ];

  return (
    <div className="w-64 h-screen bg-indigo-900 text-white flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg">
          <TrendingUp className="text-white" size={24} />
        </div>
        <h1 className="text-xl font-bold tracking-tight">AdEarn<span className="text-indigo-400">Pro</span></h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id as View)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-indigo-700 text-white shadow-md' 
                  : 'text-indigo-300 hover:bg-indigo-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-indigo-800">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-950/30 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">লগ আউট</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
