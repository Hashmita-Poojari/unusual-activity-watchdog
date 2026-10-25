import React from 'react';

interface KpiStripProps {
  risk: number;
}

export const KpiStrip = ({ risk }: KpiStripProps) => {
  const isCritical = risk >= 80;
  
  return (
    <div className="flex border-b border-dark-700 bg-dark-800/50">
      <div className="flex-1 p-4 border-r border-dark-700">
        <div className="text-xs text-gray-500 font-mono mb-1">MARKET STATUS</div>
        <div className="text-lg font-semibold text-accent-green">LIVE</div>
      </div>
      <div className="flex-1 p-4 border-r border-dark-700">
        <div className="text-xs text-gray-500 font-mono mb-1">INSTRUMENTS MONITORED</div>
        <div className="text-lg font-semibold text-white">08</div>
      </div>
      <div className="flex-1 p-4 border-r border-dark-700">
        <div className="text-xs text-gray-500 font-mono mb-1">EVENTS ANALYZED</div>
        <div className="text-lg font-semibold text-white">12,482</div>
      </div>
      <div className="flex-1 p-4 border-r border-dark-700">
        <div className="text-xs text-gray-500 font-mono mb-1">ACTIVE ALERTS</div>
        <div className="text-lg font-semibold text-white">{isCritical ? '01' : '00'}</div>
      </div>
      <div className="flex-1 p-4 border-r border-dark-700">
        <div className="text-xs text-gray-500 font-mono mb-1">CRITICAL</div>
        <div className={`text-lg font-semibold ${isCritical ? 'text-accent-red' : 'text-white'}`}>
          {isCritical ? '01' : '00'}
        </div>
      </div>
      <div className="flex-1 p-4">
        <div className="text-xs text-gray-500 font-mono mb-1">AVG CONFIDENCE</div>
        <div className="text-lg font-semibold text-white">{isCritical ? '92.4%' : 'N/A'}</div>
      </div>
    </div>
  );
};
