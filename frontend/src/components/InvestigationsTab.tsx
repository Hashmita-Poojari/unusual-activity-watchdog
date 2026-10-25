import React from 'react';
import { Search, FolderOpen, AlertTriangle } from 'lucide-react';

export const InvestigationsTab = () => {
  const cases = [
    { id: 'INV-4092', target: 'AAPL Block Trades', severity: 'HIGH', analyst: 'Sarah Jenkins', time: '2h ago' },
    { id: 'INV-4091', target: 'NVDA/AMD Arb', severity: 'MEDIUM', analyst: 'Marcus Chen', time: '5h ago' },
    { id: 'INV-4088', target: 'Crypto-to-Equity Flow (MSTR)', severity: 'CRITICAL', analyst: 'Unassigned', time: '1d ago' },
    { id: 'INV-4075', target: 'TSLA Pre-market Spoofing', severity: 'LOW', analyst: 'David Ross', time: '2d ago' },
  ];

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="panel-container flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white tracking-wide">CASE MANAGEMENT</h2>
          <p className="text-xs text-gray-500">Active surveillance investigations</p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search cases..." 
            className="bg-dark-900 border border-dark-700 text-xs font-mono rounded-sm py-1.5 pl-9 pr-4 w-64 text-gray-200 focus:outline-none focus:border-accent-green"
          />
        </div>
      </div>

      <div className="panel-container flex-1 overflow-auto custom-scrollbar">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="text-gray-500 border-b border-dark-700">
              <th className="pb-3 font-normal">INCIDENT ID</th>
              <th className="pb-3 font-normal">TARGET / ASSET</th>
              <th className="pb-3 font-normal">SEVERITY</th>
              <th className="pb-3 font-normal">ASSIGNED ANALYST</th>
              <th className="pb-3 font-normal">OPENED</th>
              <th className="pb-3 font-normal text-right">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c, i) => (
              <tr key={i} className="border-b border-dark-700/50 hover:bg-dark-700/30 group">
                <td className="py-4 text-white font-bold">{c.id}</td>
                <td className="py-4 text-gray-300">{c.target}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-sm text-[10px] font-bold ${
                    c.severity === 'CRITICAL' ? 'bg-accent-red/20 text-accent-red border border-accent-red/50 flex items-center w-max' : 
                    c.severity === 'HIGH' ? 'bg-accent-orange/20 text-accent-orange border border-accent-orange/50' : 
                    c.severity === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50' : 
                    'bg-gray-500/20 text-gray-400 border border-gray-500/50'
                  }`}>
                    {c.severity === 'CRITICAL' && <AlertTriangle className="w-3 h-3 mr-1 animate-pulse" />}
                    {c.severity}
                  </span>
                </td>
                <td className={`py-4 ${c.analyst === 'Unassigned' ? 'text-gray-500 italic' : 'text-gray-400'}`}>{c.analyst}</td>
                <td className="py-4 text-gray-500">{c.time}</td>
                <td className="py-4 text-right">
                  <button className="bg-dark-900 hover:bg-dark-700 text-gray-300 text-xs py-1.5 px-3 rounded-sm border border-dark-600 transition-colors inline-flex items-center">
                    <FolderOpen className="w-3 h-3 mr-2 text-accent-green" /> REVIEW CASE FILES
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
