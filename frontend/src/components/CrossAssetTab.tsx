import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import { Share2, ArrowRight, RefreshCw } from 'lucide-react';

const BASE_FLOWS = [
  { ts: '14:08:12', src: 'Equity Options (TSLA)', dst: 'Crypto (BTC Perps)', vel: 3.4, risk: 0.94, status: 'CRITICAL' },
  { ts: '14:05:33', src: 'Index Options (SPY)', dst: 'VIX Call Options', vel: 2.1, risk: 0.88, status: 'HIGH' },
  { ts: '13:58:01', src: 'Bonds (US10Y)', dst: 'Gold Futures', vel: 1.6, risk: 0.72, status: 'MEDIUM' },
  { ts: '13:42:44', src: 'Equity (AAPL)', dst: 'FX (USD/JPY)', vel: 1.2, risk: 0.61, status: 'MEDIUM' },
  { ts: '13:30:10', src: 'Credit (IG CDS)', dst: 'Equity Puts (QQQ)', vel: 2.8, risk: 0.85, status: 'HIGH' },
];

const BASE_BAR = [
  { name: 'Equities', vol: 420 },
  { name: 'Options', vol: 310 },
  { name: 'Crypto', vol: 580 },
  { name: 'Bonds', vol: 190 },
  { name: 'FX', vol: 260 },
  { name: 'Commodities', vol: 340 },
];

const jitter = (v: number, range: number) =>
  parseFloat((v + (Math.random() - 0.5) * range).toFixed(2));

const statusColor = (s: string) =>
  s === 'CRITICAL' ? 'text-accent-red' : s === 'HIGH' ? 'text-accent-orange' : 'text-yellow-500';
const statusBg = (s: string) =>
  s === 'CRITICAL'
    ? 'bg-accent-red/10 border-accent-red/30'
    : s === 'HIGH'
    ? 'bg-accent-orange/10 border-accent-orange/30'
    : 'bg-yellow-500/10 border-yellow-500/30';

export const CrossAssetTab = () => {
  const [flows, setFlows] = useState(BASE_FLOWS.map(f => ({ ...f })));
  const [barData, setBarData] = useState(BASE_BAR.map(b => ({ ...b })));
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFlows(prev =>
        prev.map(f => ({
          ...f,
          vel: jitter(f.vel, 0.3),
          risk: Math.min(0.99, Math.max(0.5, jitter(f.risk, 0.04))),
        }))
      );
      setBarData(prev =>
        prev.map(b => ({ ...b, vol: Math.max(50, Math.round(b.vol + (Math.random() - 0.5) * 60)) }))
      );
      setTick(t => t + 1);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full h-full overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="panel-container flex items-center justify-between flex-shrink-0">
        <div>
          <h2 className="text-sm font-bold text-white tracking-wide">CROSS-MARKET CAPITAL ANOMALIES</h2>
          <p className="text-xs text-gray-500">Real-time fund flow surveillance across disconnected asset classes</p>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-gray-500">TICK #{tick}</span>
          <RefreshCw className="w-3 h-3 text-accent-green animate-spin" style={{ animationDuration: '3s' }} />
          <span className="text-accent-green">LIVE</span>
        </div>
      </div>

      {/* Table */}
      <div className="panel-container flex-shrink-0">
        <h3 className="text-xs font-bold text-gray-400 mb-3">ANOMALOUS FLOW VECTORS</h3>
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="text-gray-500 border-b border-dark-700">
              <th className="pb-2 font-normal">TIMESTAMP</th>
              <th className="pb-2 font-normal">ASSET SOURCE</th>
              <th className="pb-2 font-normal"></th>
              <th className="pb-2 font-normal">TARGET DESTINATION</th>
              <th className="pb-2 font-normal text-right">VEL ×</th>
              <th className="pb-2 font-normal text-right">RISK SCORE</th>
              <th className="pb-2 font-normal text-center">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {flows.map((f, i) => (
              <tr key={i} className="border-b border-dark-700/40 hover:bg-dark-700/30 transition-colors">
                <td className="py-2.5 text-gray-500">{f.ts}</td>
                <td className="py-2.5 text-blue-400 font-semibold">{f.src}</td>
                <td className="py-2.5 text-gray-600">
                  <ArrowRight className="w-3 h-3" />
                </td>
                <td className="py-2.5 text-purple-400 font-semibold">{f.dst}</td>
                <td className="py-2.5 text-right text-accent-orange font-bold">{f.vel.toFixed(1)}×</td>
                <td className={`py-2.5 text-right font-bold ${statusColor(f.status)}`}>
                  {f.risk.toFixed(2)}
                </td>
                <td className="py-2.5 text-center">
                  <span className={`px-2 py-0.5 rounded-sm border text-[10px] font-bold ${statusColor(f.status)} ${statusBg(f.status)} ${f.status === 'CRITICAL' ? 'animate-pulse' : ''}`}>
                    {f.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart */}
      <div className="panel-container flex-1 min-h-[220px] flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-gray-400">VOLUME CORRELATION SPIKES — CROSS-ASSET CLASS</h3>
          <div className="flex gap-3 text-[10px] font-mono">
            <span className="text-blue-400">■ Normal</span>
            <span className="text-accent-red">■ Anomalous</span>
          </div>
        </div>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 2, fontSize: 11, fontFamily: 'monospace' }}
                labelStyle={{ color: '#e2e8f0' }}
                cursor={{ fill: 'rgba(255,255,255,0.04)' }}
              />
              <Bar dataKey="vol" isAnimationActive={false} radius={[2, 2, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={index} fill={entry.vol > 400 ? '#ef4444' : '#3b82f6'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-[10px] font-mono text-gray-600 mt-2 text-right">
          Volume in $M · Updates every 2.5s
        </div>
      </div>
    </div>
  );
};
