import React from 'react';
import { Play, AlertOctagon, CheckSquare, RefreshCw } from 'lucide-react';

export const SimulationControls = ({ onControl }: { onControl: (c: 'normal' | 'anomaly' | 'reset') => void }) => {
  return (
    <div className="panel-container flex-none p-3 border-accent-orange/30">
      <h2 className="text-xs font-bold text-gray-500 mb-2">SIMULATION CONTROLS</h2>
      <div className="grid grid-cols-2 gap-2">
        <button 
          onClick={() => onControl('normal')}
          className="flex items-center justify-center py-1.5 px-2 bg-dark-900 border border-dark-700 hover:bg-dark-700 rounded-sm text-xs font-mono text-gray-300 transition-colors"
        >
          <CheckSquare className="w-3 h-3 mr-2 text-accent-green" /> NORMAL
        </button>
        <button 
          onClick={() => onControl('anomaly')}
          className="flex items-center justify-center py-1.5 px-2 bg-dark-900 border border-dark-700 hover:border-accent-red/50 hover:bg-accent-red/10 rounded-sm text-xs font-mono text-accent-red transition-colors"
        >
          <AlertOctagon className="w-3 h-3 mr-2" /> INJECT ANOMALY
        </button>
        <button 
          onClick={() => onControl('reset')}
          className="col-span-2 flex items-center justify-center py-1.5 px-2 bg-dark-900 border border-dark-700 hover:bg-dark-700 rounded-sm text-xs font-mono text-gray-400 transition-colors"
        >
          <RefreshCw className="w-3 h-3 mr-2" /> RESET SIMULATION
        </button>
      </div>
    </div>
  );
};
