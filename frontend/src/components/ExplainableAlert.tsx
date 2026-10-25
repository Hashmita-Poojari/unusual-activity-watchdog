import React from 'react';
import type { Alert } from '../types';
import { CheckCircle, XCircle, Search, FileText, AlertTriangle } from 'lucide-react';

export const ExplainableAlert = ({ alert, onAction }: { alert: Alert | null, onAction: (action: string) => void }) => {
  if (!alert) {
    return (
      <div className="panel-container flex-1 flex items-center justify-center text-gray-500 font-mono text-xs flex-col">
        <Search className="w-8 h-8 mb-2 opacity-20" />
        NO ACTIVE INVESTIGATIONS
      </div>
    );
  }

  return (
    <div className="panel-container flex-1 flex flex-col h-full border-accent-red/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-xs text-accent-red font-mono mb-1 animate-pulse flex items-center">
             <AlertTriangle className="w-3 h-3 mr-1" />
             {alert.severity} PRIORITY
          </div>
          <h2 className="text-lg font-bold text-white flex items-center">
            {alert.instrument} — INCIDENT #{alert.id}
          </h2>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500 font-mono mb-1">CONFIDENCE</div>
          <div className="text-lg font-mono font-bold text-white">{alert.confidence}%</div>
        </div>
      </div>

      <div className="bg-dark-900 border border-dark-700 rounded-sm p-3 mb-4 text-xs font-mono">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-gray-500 block mb-1">PATTERN MATCH</span>
            <span className="text-white">{alert.pattern}</span>
          </div>
          <div>
            <span className="text-gray-500 block mb-1">NEWS CONTEXT</span>
            <span className="text-gray-300">{alert.news_context}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <h3 className="text-xs font-bold text-gray-400 mb-3">WHY FLAGGED</h3>
        <ul className="space-y-2 mb-6">
          {alert.reasoning.map((reason, i) => (
            <li key={i} className="flex text-sm text-gray-300 items-start">
              <span className="text-accent-red mr-2 mt-0.5">•</span>
              <span className="leading-relaxed">{reason}</span>
            </li>
          ))}
        </ul>

        <div className="bg-accent-red/10 border-l-2 border-accent-red p-3 mb-6">
          <p className="text-sm text-gray-300 italic">
            "The observed activity significantly deviates from the established behavioural baseline and shows synchronized movement across unrelated instruments."
          </p>
        </div>
        
        <h3 className="text-xs font-bold text-gray-400 mb-3">ANALYST ACTION LAYER</h3>
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => onAction('INVESTIGATE')}
            className="bg-dark-700 hover:bg-dark-600 text-white text-xs font-mono py-2 px-4 rounded-sm transition-colors border border-dark-600"
          >
            <Search className="w-3 h-3 inline mr-2" /> INVESTIGATE
          </button>
          <button 
            onClick={() => onAction('ESCALATE')}
            className="bg-accent-red/20 hover:bg-accent-red/30 text-accent-red border border-accent-red/50 text-xs font-mono py-2 px-4 rounded-sm transition-colors"
          >
            <AlertTriangle className="w-3 h-3 inline mr-2" /> ESCALATE
          </button>
          <button 
            onClick={() => onAction('LEGITIMATE')}
            className="bg-dark-700 hover:bg-dark-600 text-gray-300 text-xs font-mono py-2 px-4 rounded-sm transition-colors border border-dark-600"
          >
            <CheckCircle className="w-3 h-3 inline mr-2 text-accent-green" /> MARK AS LEGITIMATE
          </button>
          <button 
            onClick={() => onAction('FALSE_POSITIVE')}
            className="bg-dark-700 hover:bg-dark-600 text-gray-300 text-xs font-mono py-2 px-4 rounded-sm transition-colors border border-dark-600"
          >
            <XCircle className="w-3 h-3 inline mr-2" /> FALSE POSITIVE
          </button>
        </div>
      </div>
    </div>
  );
};
