import React from 'react';
import { 
  Activity, 
  AlertTriangle, 
  Search, 
  BarChart2, 
  Share2, 
  BookOpen, 
  Globe, 
  MessageSquare,
  Settings
} from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const items = [
    { icon: Activity, label: 'Overview' },
    { icon: BarChart2, label: 'Live Monitor' },
    { icon: AlertTriangle, label: 'Alerts' },
    { icon: Search, label: 'Investigations' },
    { icon: Share2, label: 'Cross-Asset' },
    { icon: BookOpen, label: 'Pattern Library' },
    { icon: Globe, label: 'News & Context' },
    { icon: MessageSquare, label: 'Analyst Feedback' },
    { icon: Settings, label: 'System' },
  ];

  return (
    <div className="w-64 bg-dark-800 border-r border-dark-700 flex flex-col h-screen">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-wider text-white">UNUSUAL ACTIVITY</h1>
        <h2 className="text-xl font-bold tracking-wider text-white">WATCHDOG</h2>
        <p className="text-xs text-gray-500 mt-2 font-mono tracking-widest">MARKET SURVEILLANCE</p>
      </div>

      <nav className="flex-1 py-4">
        <ul>
          {items.map((item, i) => {
            const isActive = activeTab === item.label;
            return (
              <li key={i}>
                <button
                  onClick={() => onTabChange(item.label)}
                  className={clsx(
                    "w-full flex items-center px-6 py-3 text-sm transition-colors text-left",
                    isActive ? "text-accent-green border-l-2 border-accent-green bg-dark-700/50" : "text-gray-400 hover:text-gray-200 hover:bg-dark-700/30"
                  )}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-6 border-t border-dark-700 space-y-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-gray-400">SYSTEM STATUS</span>
          <span className="text-accent-green flex items-center"><span className="w-2 h-2 rounded-full bg-accent-green mr-2 animate-pulse"></span>OPERATIONAL</span>
        </div>
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-gray-400">DATA STREAM</span>
          <span className="text-accent-green">LIVE</span>
        </div>
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-gray-400">MODEL</span>
          <span className="text-accent-green">ACTIVE</span>
        </div>
      </div>
    </div>
  );
};
