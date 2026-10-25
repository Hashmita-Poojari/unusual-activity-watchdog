import React from 'react';
import { Brain } from 'lucide-react';

export const AiIntelligencePanel = () => {
  return (
    <div className="panel-container flex-1 flex flex-col font-mono text-xs border border-dark-700">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-dark-700 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <Brain className="w-5 h-5 text-accent-red animate-pulse" />
          </div>
          <h2 className="font-bold text-white text-sm">WATCHDOG CO-PILOT // ACTIVE ANALYSIS</h2>
        </div>
        <span className="bg-red-500/10 text-accent-red font-bold px-2 py-1 rounded text-[10px] border border-red-500/20">
          CRITICAL RISK (UA-984)
        </span>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4">
        {/* Section 1 */}
        <div>
          <h3 className="text-[10px] font-bold text-gray-400 tracking-widest mb-1">WHAT IS HAPPENING?</h3>
          <p className="text-gray-300 leading-relaxed">
            Cross-asset anomaly triggered: High-frequency order spoofing loops detected on the NSE spot order book, symmetrically paired with block trade volume surges in NVDA front-month equity options.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h3 className="text-[10px] font-bold text-gray-400 tracking-widest mb-1">WHY IT IS HAPPENING?</h3>
          <p className="text-gray-300 leading-relaxed">
            Multi-signal statistical deviation exceeded <span className="text-accent-red font-bold">+4.2σ</span>. This kinematic pattern matches historical signatures of <span className="text-accent-orange">Momentum Ignition</span> and algorithmic front-running behaviors.
          </p>
        </div>

        {/* Section 3 */}
        <div>
          <h3 className="text-[10px] font-bold text-gray-400 tracking-widest mb-2">RECOMMENDED PLAYBOOK // WHAT TO DO?</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-accent-green mt-0.5">1.</span>
              <span>Freeze Trader <strong>UUID-90211</strong> for immediate risk review.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-green mt-0.5">2.</span>
              <span>Export localized L3 order book packets for timestamp 14:02:11.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-green mt-0.5">3.</span>
              <span>Route pre-formatted incident logs to compliance workflows.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-3 border-t border-dark-700 flex gap-2">
        <button className="flex-1 bg-accent-green/10 text-accent-green border border-accent-green/30 hover:bg-accent-green/20 font-bold py-2 px-3 rounded transition-colors text-center text-xs">
          Execute AI Playbook
        </button>
        <button className="flex-1 bg-dark-700/50 text-gray-400 hover:text-gray-200 border border-dark-600 hover:bg-dark-600/50 font-bold py-2 px-3 rounded transition-colors text-center text-xs">
          Dismiss False Positive
        </button>
      </div>
    </div>
  );
};
