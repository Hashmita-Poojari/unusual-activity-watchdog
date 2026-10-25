import React from 'react';
import { AlertTriangle, TrendingUp } from 'lucide-react';
import type { InstrumentData } from '../types';

export const MultiSignalPanel = ({ instrument, isAnomaly }: { instrument?: InstrumentData, isAnomaly: boolean }) => {
  const score = instrument?.anomalyScore || (isAnomaly ? 92 : 12);
  const status = score >= 80 ? 'CRITICAL' : score >= 50 ? 'HIGH' : score >= 30 ? 'MEDIUM' : 'NORMAL';
  
  // Synthesize individual signal scores based on the overall anomaly score to look realistic
  const priceScore = Math.min(100, Math.max(0, score + (Math.random() * 20 - 10)));
  const volScore = Math.min(100, Math.max(0, score + (Math.random() * 20 - 5)));
  const timingScore = Math.min(100, Math.max(0, score - 15 + (Math.random() * 10)));
  const corrScore = isAnomaly ? 91 : Math.max(5, score - 20);

  const signals = [
    { label: 'PRICE MOVEMENT', score: Math.round(priceScore), color: priceScore > 80 ? 'bg-accent-red' : priceScore > 50 ? 'bg-accent-orange' : 'bg-accent-green' },
    { label: 'TRADE VOLUME', score: Math.round(volScore), color: volScore > 80 ? 'bg-accent-red' : volScore > 50 ? 'bg-accent-orange' : 'bg-accent-green' },
    { label: 'TIMING PATTERN', score: Math.round(timingScore), color: timingScore > 80 ? 'bg-accent-red' : timingScore > 50 ? 'bg-accent-orange' : 'bg-accent-green' },
    { label: 'CROSS-STOCK CORRELATION', score: Math.round(corrScore), color: corrScore > 80 ? 'bg-accent-red' : corrScore > 50 ? 'bg-accent-orange' : 'bg-accent-green' },
  ];

  return (
    <div className="panel-container flex gap-6">
      <div className="flex-1">
        <h2 className="text-sm font-bold text-white mb-4">MULTI-SIGNAL ANALYSIS</h2>
        <div className="space-y-4">
          {signals.map(s => (
            <div key={s.label}>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-gray-400">{s.label}</span>
                <span className="text-white">{s.score}%</span>
              </div>
              <div className="h-1.5 bg-dark-900 rounded-sm overflow-hidden flex">
                <div className={`h-full ${s.color}`} style={{ width: `${s.score}%` }}></div>
                <div className="h-full bg-dark-700 opacity-50 flex-1"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-64 border-l border-dark-700 pl-6 flex flex-col justify-center">
        <div className="text-xs font-mono text-gray-500 mb-2">UNIFIED ANOMALY SCORE</div>
        <div className="flex items-end mb-2">
          <span className={`text-4xl font-bold font-mono mr-2 ${score >= 80 ? 'text-accent-red' : score >= 50 ? 'text-accent-orange' : 'text-accent-green'}`}>
            {Math.round(score)}
          </span>
          <span className="text-gray-500 font-mono mb-1">/ 100</span>
        </div>
        <div className={`text-sm font-bold tracking-widest ${score >= 80 ? 'text-accent-red' : score >= 50 ? 'text-accent-orange' : 'text-accent-green'}`}>
          {status}
        </div>
      </div>
      
      {isAnomaly && (
        <div className="flex-1 border-l border-dark-700 pl-6">
           <h3 className="text-xs font-bold text-gray-400 mb-3 flex items-center">
             <TrendingUp className="w-4 h-4 mr-2" />
             CROSS-STOCK CORRELATION DETECTED
           </h3>
           <div className="grid grid-cols-2 gap-2 text-xs font-mono">
             <div className="bg-dark-900 p-2 rounded-sm"><span className="text-gray-400">AAPL</span> <span className="text-accent-red float-right">↑ +4.8%</span></div>
             <div className="bg-dark-900 p-2 rounded-sm"><span className="text-gray-400">TSLA</span> <span className="text-accent-red float-right">↑ +5.2%</span></div>
             <div className="bg-dark-900 p-2 rounded-sm"><span className="text-gray-400">NVDA</span> <span className="text-accent-red float-right">↑ +4.6%</span></div>
             <div className="bg-dark-900 p-2 rounded-sm"><span className="text-gray-400">AMZN</span> <span className="text-accent-red float-right">↑ +4.9%</span></div>
           </div>
           <p className="text-xs text-gray-500 mt-3 leading-relaxed">
             Multiple unrelated instruments moved outside their expected behavioural range within the same time window.
           </p>
        </div>
      )}
    </div>
  );
};
