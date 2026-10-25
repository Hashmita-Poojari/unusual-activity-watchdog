import React, { useState, useEffect } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Activity, AlertTriangle, ShieldCheck, TrendingUp, TrendingDown } from 'lucide-react';
import { AiIntelligencePanel } from './AiIntelligencePanel';

const makeData = (base: number, amp: number) =>
  Array.from({ length: 24 }, () => ({ v: base + (Math.random() - 0.5) * amp }));

const LOG_MESSAGES = [
  { icon: ShieldCheck, color: 'text-accent-green', msg: 'Model weights calibrated successfully.' },
  { icon: Activity, color: 'text-blue-400', msg: 'Ingested 1.2M ticks from NASDAQ feed.' },
  { icon: AlertTriangle, color: 'text-accent-orange', msg: 'Latency spike in Option Chains stream (42ms).' },
  { icon: ShieldCheck, color: 'text-accent-green', msg: 'Daily compliance check completed — all clear.' },
  { icon: Activity, color: 'text-blue-400', msg: 'Cross-asset correlation matrix updated.' },
  { icon: AlertTriangle, color: 'text-accent-orange', msg: 'Unusual volume detected in BTC perp market.' },
  { icon: ShieldCheck, color: 'text-accent-green', msg: 'Fraud graph recomputed — 3 new edges.' },
  { icon: Activity, color: 'text-blue-400', msg: 'GPU inference queue cleared — 0 pending jobs.' },
];

interface MiniChartProps {
  title: string;
  data: { v: number }[];
  color: string;
  value: string;
  delta: number;
}

const MiniChart = ({ title, data, color, value, delta }: MiniChartProps) => (
  <div className="panel-container flex-1 h-44 flex flex-col">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-[10px] font-bold text-gray-400 tracking-widest">{title}</h3>
      <div className={`flex items-center gap-1 text-[10px] font-mono ${delta >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
        {delta >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {delta >= 0 ? '+' : ''}{delta.toFixed(1)}%
      </div>
    </div>
    <div className="text-xl font-bold text-white font-mono mb-2">{value}</div>
    <div className="flex-1">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const ANOMALY_ROWS = [
  { id: 'UA-904', cluster: 'AAPL, TSLA, NVDA', corr: 0.92, sev: 'CRITICAL', status: 'INVESTIGATING' },
  { id: 'UA-882', cluster: 'BTC, ETH, SPY',   corr: 0.87, sev: 'HIGH',     status: 'OPEN' },
  { id: 'UA-841', cluster: 'GOLD, SILVER, VIX', corr: 0.78, sev: 'MEDIUM', status: 'CLOSED' },
  { id: 'UA-820', cluster: 'USD/JPY, JGB',     corr: 0.65, sev: 'MEDIUM',  status: 'OPEN' },
];

export const OverviewTab = () => {
  const [charts, setCharts] = useState({
    vol:   { data: makeData(55, 20), value: 68.4, delta: 2.3 },
    freq:  { data: makeData(70, 25), value: 12,   delta: -1.1 },
    alert: { data: makeData(22, 12), value: 7,    delta: 4.2 },
  });

  const [rows, setRows] = useState(ANOMALY_ROWS.map(r => ({ ...r })));
  const [sysLog, setSysLog] = useState(LOG_MESSAGES.slice(0, 4).map((l, i) => ({
    ...l,
    ts: new Date(Date.now() - (4 - i) * 12000).toLocaleTimeString('en-GB'),
  })));

  useEffect(() => {
    const id = setInterval(() => {
      setCharts(prev => ({
        vol:  {
          data: [...prev.vol.data.slice(1), { v: prev.vol.data.at(-1)!.v + (Math.random() - 0.5) * 8 }],
          value: parseFloat((prev.vol.value + (Math.random() - 0.5) * 2).toFixed(1)),
          delta: parseFloat(((Math.random() - 0.4) * 5).toFixed(1)),
        },
        freq: {
          data: [...prev.freq.data.slice(1), { v: prev.freq.data.at(-1)!.v + (Math.random() - 0.5) * 10 }],
          value: Math.max(0, prev.freq.value + Math.round((Math.random() - 0.5) * 3)),
          delta: parseFloat(((Math.random() - 0.5) * 4).toFixed(1)),
        },
        alert: {
          data: [...prev.alert.data.slice(1), { v: prev.alert.data.at(-1)!.v + (Math.random() - 0.5) * 6 }],
          value: Math.max(0, prev.alert.value + Math.round((Math.random() - 0.3) * 2)),
          delta: parseFloat(((Math.random() - 0.2) * 6).toFixed(1)),
        },
      }));

      // Jitter correlation scores
      setRows(prev =>
        prev.map(r => ({ ...r, corr: parseFloat(Math.min(0.99, Math.max(0.5, r.corr + (Math.random() - 0.5) * 0.03)).toFixed(2)) }))
      );

      // Append system log
      const entry = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
      setSysLog(prev => [...prev.slice(-9), { ...entry, ts: new Date().toLocaleTimeString('en-GB') }]);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  const sevColor = (s: string) =>
    s === 'CRITICAL' ? 'text-accent-red' : s === 'HIGH' ? 'text-accent-orange' : 'text-yellow-500';

  return (
    <div className="flex flex-col gap-4 w-full h-full overflow-y-auto custom-scrollbar">
      {/* Mini Charts row */}
      <div className="flex gap-4 flex-shrink-0">
        <MiniChart title="MARKET VOLATILITY INDEX" data={charts.vol.data} color="#3b82f6"
          value={charts.vol.value.toFixed(1)} delta={charts.vol.delta} />
        <MiniChart title="SYSTEM ANOMALY FREQUENCY" data={charts.freq.data} color="#f59e0b"
          value={String(charts.freq.value)} delta={charts.freq.delta} />
        <MiniChart title="UNMATCHED THREAT ALERTS" data={charts.alert.data} color="#ef4444"
          value={String(charts.alert.value)} delta={charts.alert.delta} />
      </div>

      {/* Bottom row */}
      <div className="flex gap-4 flex-1 min-h-[280px]">
        {/* Anomaly table */}
        <div className="panel-container flex-[1.5] flex flex-col">
          <h2 className="text-sm font-bold text-white mb-4">RECENT CROSS-ASSET ANOMALIES</h2>
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-gray-500 border-b border-dark-700">
                <th className="pb-2 font-normal">INCIDENT</th>
                <th className="pb-2 font-normal">ASSET CLUSTER</th>
                <th className="pb-2 font-normal">CORRELATION</th>
                <th className="pb-2 font-normal">SEVERITY</th>
                <th className="pb-2 font-normal">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-dark-700/50 hover:bg-dark-700/30 transition-colors">
                  <td className="py-3 text-white font-bold">{row.id}</td>
                  <td className="py-3 text-gray-300">{row.cluster}</td>
                  <td className={`py-3 font-bold ${row.corr >= 0.88 ? 'text-accent-red' : 'text-accent-orange'}`}>{row.corr}</td>
                  <td className={`py-3 font-bold ${sevColor(row.sev)}`}>{row.sev}</td>
                  <td className="py-3 text-gray-400">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI Co-pilot Panel */}
        <AiIntelligencePanel />

        {/* System log */}
        <div className="panel-container flex-1 flex flex-col">
          <h2 className="text-sm font-bold text-white mb-4">GLOBAL SYSTEM LOG</h2>
          <div className="flex-1 overflow-y-auto space-y-3 text-xs font-mono custom-scrollbar">
            {sysLog.map((l, i) => (
              <div key={i} className="flex items-start">
                <l.icon className={`w-4 h-4 ${l.color} mr-2 flex-shrink-0`} />
                <div>
                  <span className="text-gray-500 block">{l.ts}</span>
                  <span className="text-gray-300">{l.msg}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
