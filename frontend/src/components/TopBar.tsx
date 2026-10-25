import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, User, X, AlertTriangle, ShieldAlert, Activity } from 'lucide-react';

const NOTIFICATIONS = [
  {
    id: 1,
    icon: ShieldAlert,
    color: 'text-accent-red',
    title: 'CRITICAL: Coordinated spoofing detected',
    desc: 'TSLA options chain — 3 accounts flagged',
    time: '14:08:33',
  },
  {
    id: 2,
    icon: AlertTriangle,
    color: 'text-accent-orange',
    title: 'HIGH: Unusual block trade in NVDA',
    desc: '$45M notional — no public catalyst found',
    time: '13:55:12',
  },
  {
    id: 3,
    icon: Activity,
    color: 'text-blue-400',
    title: 'INFO: Model re-calibration complete',
    desc: 'New anomaly weights pushed to inference engine',
    time: '13:30:05',
  },
];

export const TopBar = () => {
  const [bellOpen, setBellOpen] = useState(false);
  const [time, setTime] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-GB'));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setBellOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="h-14 border-b border-dark-700 bg-dark-900 flex items-center justify-between px-6 relative z-30">
      <div className="flex items-center space-x-6">
        <div className="flex items-center text-xs font-mono text-gray-400">
          <span className="w-2 h-2 rounded-full bg-accent-green mr-2 animate-pulse" />
          MARKET STREAM LIVE
        </div>
        <div className="text-xs font-mono text-gray-400 border-l border-dark-700 pl-6">
          MARKET: <span className="text-white">NSE / NASDAQ SIMULATION</span>
        </div>
        <div className="text-xs font-mono text-accent-green border-l border-dark-700 pl-6">
          {time} IST
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search ticker, trader, incident..."
            className="bg-dark-800 border border-dark-700 text-sm rounded-sm py-1.5 pl-9 pr-4 w-64 text-gray-200 focus:outline-none focus:border-accent-green focus:ring-1 focus:ring-accent-green"
          />
        </div>

        <div className="flex items-center space-x-4 border-l border-dark-700 pl-6">
          {/* Notification Bell */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setBellOpen(v => !v)}
              className="text-gray-400 hover:text-white relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent-red rounded-full animate-pulse" />
            </button>

            {bellOpen && (
              <div className="absolute right-0 top-8 w-80 bg-dark-800 border border-dark-600 shadow-2xl rounded-sm z-50">
                <div className="flex items-center justify-between px-4 py-3 border-b border-dark-700">
                  <span className="text-xs font-bold font-mono text-white tracking-widest">
                    SECURITY NOTIFICATIONS
                  </span>
                  <button onClick={() => setBellOpen(false)} className="text-gray-500 hover:text-white">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <ul className="divide-y divide-dark-700">
                  {NOTIFICATIONS.map(n => (
                    <li key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-dark-700/50 cursor-pointer">
                      <n.icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${n.color}`} />
                      <div className="min-w-0">
                        <p className={`text-[11px] font-bold font-mono ${n.color}`}>{n.title}</p>
                        <p className="text-[11px] text-gray-400 font-mono truncate">{n.desc}</p>
                        <p className="text-[10px] text-gray-600 font-mono mt-1">{n.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="px-4 py-2 border-t border-dark-700 text-center">
                  <button className="text-[11px] font-mono text-accent-green hover:underline">
                    VIEW ALL ALERTS →
                  </button>
                </div>
              </div>
            )}
          </div>

          <button className="flex items-center text-gray-400 hover:text-white">
            <div className="w-7 h-7 bg-dark-700 rounded-full flex items-center justify-center mr-2">
              <User className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">Analyst</span>
          </button>
        </div>
      </div>
    </div>
  );
};
