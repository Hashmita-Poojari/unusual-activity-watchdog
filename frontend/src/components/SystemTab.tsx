import React, { useState, useEffect, useRef } from 'react';
import { Activity, Cpu, Database, Wifi, CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface Metric {
  label: string;
  value: number;
  unit: string;
  max: number;
  warn: number;
  crit: number;
  icon: React.ElementType;
}

const LOG_POOL = [
  { level: 'INFO', msg: 'Pipeline scheduler heartbeat OK' },
  { level: 'INFO', msg: 'Ingesting NASDAQ L2 order-book snapshot' },
  { level: 'SUCCESS', msg: 'Anomaly detection model v4.1 inference pass completed' },
  { level: 'INFO', msg: 'Cross-asset correlation matrix recomputed' },
  { level: 'INFO', msg: 'WebSocket broadcast: 12 connected clients' },
  { level: 'SUCCESS', msg: 'Alert classifier threshold calibration verified' },
  { level: 'WARN', msg: 'Tick buffer utilisation at 78% — monitor closely' },
  { level: 'INFO', msg: 'SEC filing crawler: 3 new documents indexed' },
  { level: 'SUCCESS', msg: 'Model weights hot-swapped — zero downtime' },
  { level: 'INFO', msg: 'Redis cache hit rate: 94.2%' },
  { level: 'WARN', msg: 'Option chain stream latency spike: 38ms' },
  { level: 'SUCCESS', msg: 'Daily compliance checkpoint — all clear' },
  { level: 'INFO', msg: 'GPU inference queue depth: 3 jobs' },
  { level: 'SUCCESS', msg: 'Fraud graph edge update batch committed' },
];

const logIcon = (level: string) => {
  if (level === 'SUCCESS') return <CheckCircle className="w-3 h-3 text-accent-green flex-shrink-0" />;
  if (level === 'WARN') return <AlertTriangle className="w-3 h-3 text-accent-orange flex-shrink-0" />;
  return <Info className="w-3 h-3 text-blue-400 flex-shrink-0" />;
};

const logColor = (level: string) =>
  level === 'SUCCESS' ? 'text-accent-green' : level === 'WARN' ? 'text-accent-orange' : 'text-blue-400';

const barColor = (val: number, warn: number, crit: number) =>
  val >= crit ? 'bg-accent-red' : val >= warn ? 'bg-accent-orange' : 'bg-accent-green';

const BASE_METRICS: Metric[] = [
  { label: 'CPU LOAD', value: 42, unit: '%', max: 100, warn: 70, crit: 90, icon: Cpu },
  { label: 'MEMORY USAGE', value: 58, unit: '%', max: 100, warn: 75, crit: 90, icon: Activity },
  { label: 'INGESTION LATENCY', value: 12, unit: 'ms', max: 100, warn: 40, crit: 70, icon: Wifi },
  { label: 'DB WRITE QUEUE', value: 3, unit: 'jobs', max: 50, warn: 20, crit: 40, icon: Database },
  { label: 'MODEL INFERENCE', value: 18, unit: 'ms', max: 100, warn: 50, crit: 80, icon: Activity },
  { label: 'TICK BUFFER FILL', value: 63, unit: '%', max: 100, warn: 75, crit: 90, icon: Database },
];

export const SystemTab = () => {
  const [metrics, setMetrics] = useState(BASE_METRICS.map(m => ({ ...m })));
  const [logs, setLogs] = useState<{ level: string; msg: string; ts: string }[]>(() =>
    Array.from({ length: 8 }, (_, i) => {
      const e = LOG_POOL[i % LOG_POOL.length];
      return { ...e, ts: new Date(Date.now() - (8 - i) * 8000).toLocaleTimeString('en-GB') };
    })
  );
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      // Animate metrics
      setMetrics(prev =>
        prev.map(m => ({
          ...m,
          value: Math.max(1, Math.min(m.max, m.value + (Math.random() - 0.5) * 6)),
        }))
      );

      // Append new log line
      const entry = LOG_POOL[Math.floor(Math.random() * LOG_POOL.length)];
      setLogs(prev => {
        const next = [...prev, { ...entry, ts: new Date().toLocaleTimeString('en-GB') }];
        return next.slice(-40); // keep last 40 lines
      });
    }, 2200);
    return () => clearInterval(id);
  }, []);

  // Auto-scroll log to bottom
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="flex gap-4 w-full h-full">
      {/* Left: Health Metrics */}
      <div className="flex flex-col gap-4 w-72 flex-shrink-0">
        <div className="panel-container">
          <h2 className="text-sm font-bold text-white mb-1">SYSTEM HEALTH</h2>
          <p className="text-xs text-gray-500 mb-4">Real-time telemetry — pipeline subsystems</p>
          <div className="space-y-5">
            {metrics.map((m, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-gray-400">
                    <m.icon className="w-3.5 h-3.5" />
                    {m.label}
                  </div>
                  <span className={`text-[11px] font-bold font-mono ${barColor(m.value, m.warn, m.crit).replace('bg-', 'text-')}`}>
                    {Math.round(m.value)}{m.unit}
                  </span>
                </div>
                <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${barColor(m.value, m.warn, m.crit)}`}
                    style={{ width: `${(m.value / m.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status summary */}
        <div className="panel-container">
          <h3 className="text-xs font-bold text-gray-400 mb-3">SUBSYSTEM STATUS</h3>
          {[
            { name: 'Market Data Feed', ok: true },
            { name: 'Anomaly Engine', ok: true },
            { name: 'Alert Dispatcher', ok: true },
            { name: 'Compliance Logger', ok: true },
            { name: 'ML Inference API', ok: true },
            { name: 'Archive Storage', ok: true },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between py-1.5 border-b border-dark-700/40 last:border-0">
              <span className="text-[11px] font-mono text-gray-400">{s.name}</span>
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${s.ok ? 'bg-accent-green animate-pulse' : 'bg-accent-red'}`} />
                <span className={`text-[10px] font-mono ${s.ok ? 'text-accent-green' : 'text-accent-red'}`}>
                  {s.ok ? 'ONLINE' : 'OFFLINE'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Live Terminal Log */}
      <div className="panel-container flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-3 flex-shrink-0">
          <h2 className="text-sm font-bold text-white">MODEL PIPELINE — LIVE LOG</h2>
          <div className="flex items-center gap-2 text-[10px] font-mono">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <span className="text-accent-green">STREAMING</span>
          </div>
        </div>

        {/* Terminal window */}
        <div
          ref={logRef}
          className="flex-1 overflow-y-auto bg-dark-900 border border-dark-700 rounded-sm p-4 font-mono text-xs space-y-1.5 custom-scrollbar"
        >
          <div className="text-gray-600 mb-3">
            ── Unusual Activity Watchdog · Pipeline Log · Session {new Date().toLocaleDateString()} ──
          </div>
          {logs.map((l, i) => (
            <div key={i} className="flex items-start gap-2">
              {logIcon(l.level)}
              <span className="text-gray-600 flex-shrink-0">[{l.ts}]</span>
              <span className={`font-bold flex-shrink-0 ${logColor(l.level)}`}>[{l.level}]</span>
              <span className="text-gray-300">{l.msg}</span>
            </div>
          ))}
          <div className="flex items-center gap-1 mt-2">
            <span className="text-accent-green">▋</span>
            <span className="text-gray-600 animate-pulse">waiting for next event...</span>
          </div>
        </div>
      </div>
    </div>
  );
};
