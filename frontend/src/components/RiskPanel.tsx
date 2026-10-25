import React from 'react';

export const RiskPanel = ({ risk }: { risk: number }) => {
  const isCritical = risk >= 80;
  
  // A simple radial progress calculation
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (risk / 100) * circumference;
  
  return (
    <div className="panel-container flex-none h-64 flex flex-col mb-4">
      <h2 className="text-sm font-bold text-white mb-2">CURRENT RISK</h2>
      
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <svg className="w-32 h-32 transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="#1f2937"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke={isCritical ? "#ef4444" : "#22c55e"}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold font-mono ${isCritical ? 'text-accent-red' : 'text-white'}`}>
            {risk}
          </span>
          <span className={`text-[10px] font-bold tracking-widest ${isCritical ? 'text-accent-red' : 'text-gray-500'}`}>
            {isCritical ? 'CRITICAL' : 'NORMAL'}
          </span>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono">
        <div className="bg-dark-900 p-2 rounded-sm border border-dark-700">
          <div className="text-gray-500 mb-1">SIGNAL COUNT</div>
          <div className="text-white">{isCritical ? '4 / 4' : '1 / 4'}</div>
        </div>
        <div className="bg-dark-900 p-2 rounded-sm border border-dark-700">
          <div className="text-gray-500 mb-1">BASELINE DEV</div>
          <div className={isCritical ? "text-accent-red" : "text-white"}>{isCritical ? '+4.7σ' : '+0.2σ'}</div>
        </div>
      </div>
    </div>
  );
};
