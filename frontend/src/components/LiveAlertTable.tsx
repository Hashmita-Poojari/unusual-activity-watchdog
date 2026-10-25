import React from 'react';
import type { Alert } from '../types';
import { AlertTriangle, Info } from 'lucide-react';

export const LiveAlertTable = ({ alerts }: { alerts: Alert[] }) => {
  // Add some mock normal alerts if real list is short
  const displayAlerts = [...alerts];
  if (displayAlerts.length < 5) {
    displayAlerts.push(
      {
        id: 'UAW-1041', time: '10:32:41', instrument: 'MSFT', event: 'Normal movement', 
        anomaly_score: 8, confidence: 95, pattern: 'None', status: 'CLOSED', severity: 'NORMAL', news_context: '', reasoning: []
      },
      {
        id: 'UAW-1040', time: '09:15:22', instrument: 'GOOGL', event: 'Earnings release volume', 
        anomaly_score: 22, confidence: 98, pattern: 'Expected volatility', status: 'LEGITIMATE', severity: 'LOW', news_context: '', reasoning: []
      }
    );
  }

  const getSeverityColor = (sev: string) => {
    switch(sev) {
      case 'CRITICAL': return 'text-accent-red';
      case 'HIGH': return 'text-accent-orange';
      case 'MEDIUM': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="panel-container flex-1">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-bold text-white">LIVE ALERTS</h2>
        <div className="flex space-x-2">
          <button className="text-xs font-mono text-gray-400 hover:text-white flex items-center">
            <Info className="w-3 h-3 mr-1" /> FILTER
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="text-gray-500 border-b border-dark-700">
              <th className="pb-2 font-normal">TIME</th>
              <th className="pb-2 font-normal">INSTRUMENT</th>
              <th className="pb-2 font-normal">EVENT</th>
              <th className="pb-2 font-normal">ANOMALY</th>
              <th className="pb-2 font-normal">CONFIDENCE</th>
              <th className="pb-2 font-normal">PATTERN</th>
              <th className="pb-2 font-normal text-right">SEVERITY</th>
            </tr>
          </thead>
          <tbody>
            {displayAlerts.map((alert, i) => (
              <tr key={i} className="border-b border-dark-700/50 hover:bg-dark-700/30 transition-colors cursor-pointer group">
                <td className="py-3 text-gray-400">{alert.time}</td>
                <td className="py-3 text-white font-bold">{alert.instrument}</td>
                <td className="py-3 text-gray-300">{alert.event}</td>
                <td className="py-3">
                  <span className={`${alert.anomaly_score > 80 ? 'text-accent-red' : alert.anomaly_score > 50 ? 'text-accent-orange' : 'text-gray-400'}`}>
                    {alert.anomaly_score}%
                  </span>
                </td>
                <td className="py-3 text-gray-400">{alert.confidence}%</td>
                <td className="py-3 text-gray-400">{alert.pattern}</td>
                <td className={`py-3 text-right font-bold flex items-center justify-end ${getSeverityColor(alert.severity)}`}>
                  {alert.severity === 'CRITICAL' && <AlertTriangle className="w-3 h-3 mr-2 animate-pulse" />}
                  {alert.severity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
