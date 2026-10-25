import React, { useState, useEffect } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { BookOpen, ShieldAlert } from 'lucide-react';

interface Pattern {
  title: string;
  code: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
  description: string;
  indicators: string[];
  baseData: { v: number }[];
}

const makeWave = (fn: (i: number) => number) =>
  Array.from({ length: 30 }, (_, i) => ({ v: fn(i) }));

const PATTERNS: Pattern[] = [
  {
    title: "Spoofing / Layering",
    code: "SPF-01",
    severity: "CRITICAL",
    description:
      "Large limit orders placed then rapidly cancelled to create false price signals and manipulate order-book depth perception.",
    indicators: ["Order cancellation rate >85%", "Depth-of-book imbalance", "Sub-100ms lifecycles"],
    baseData: makeWave((i) => 50 + 30 * Math.sin(i * 0.8) * (i % 5 === 0 ? 2.5 : 1)),
  },
  {
    title: "Wash Trading",
    code: "WSH-02",
    severity: "CRITICAL",
    description:
      "Simultaneous buy and sell orders from the same beneficial owner to simulate liquidity and inflate volume metrics artificially.",
    indicators: ["Self-matching accounts", "Volume w/o net position change", "Circular fund flows"],
    baseData: makeWave((i) => 50 + (i % 3 === 0 ? 25 : -10) + Math.random() * 5),
  },
  {
    title: "Front-Running",
    code: "FRN-03",
    severity: "HIGH",
    description:
      "Executing orders based on advance knowledge of pending client orders, exploiting informational asymmetry for profit.",
    indicators: ["Microsecond order pre-positioning", "Correlated latency spikes", "Co-location anomalies"],
    baseData: makeWave((i) => 30 + i * 1.4 + Math.random() * 8),
  },
  {
    title: "Momentum Ignition",
    code: "MIG-04",
    severity: "HIGH",
    description:
      "Series of trades designed to trigger stop-losses and algorithmic momentum strategies, then profiting from the resulting cascade.",
    indicators: ["Rapid directional bursts", "Cluster stop triggers", "Reversal within 90s"],
    baseData: makeWave((i) =>
      i < 10 ? 50 + i * 4 : i < 18 ? 90 - (i - 10) * 8 : 25 + Math.random() * 10
    ),
  },
  {
    title: "Quote Stuffing",
    code: "QST-05",
    severity: "MEDIUM",
    description:
      "Flooding the market with excessive order messages to degrade competitor systems and gain latency advantage.",
    indicators: ["Message rate >50k/sec", "Order-to-trade ratio spike", "Selective venue targeting"],
    baseData: makeWave((_i) => 40 + Math.random() * 50),
  },
  {
    title: "Marking the Close",
    code: "MTC-06",
    severity: "MEDIUM",
    description:
      "Aggressive trading in the final minutes of the session to artificially influence closing prices for settlement or valuation benefit.",
    indicators: ["Close-window volume surge", "Price drift >2 sigma in last 5 min", "Correlated after-hours reversal"],
    baseData: makeWave((i) => (i < 22 ? 48 + Math.random() * 10 : 55 + (i - 22) * 7)),
  },
];

const severityStyle = (s: string) =>
  s === "CRITICAL"
    ? "bg-accent-red/10 text-accent-red border-accent-red/30"
    : s === "HIGH"
    ? "bg-accent-orange/10 text-accent-orange border-accent-orange/30"
    : "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";

const sparkColor = (s: string) =>
  s === "CRITICAL" ? "#ef4444" : s === "HIGH" ? "#f59e0b" : "#eab308";

export const PatternLibraryTab = () => {
  const [patterns, setPatterns] = useState(PATTERNS.map((p) => ({ ...p, data: p.baseData })));

  useEffect(() => {
    const id = setInterval(() => {
      setPatterns((prev) =>
        prev.map((p) => ({
          ...p,
          data: [
            ...p.data.slice(1),
            { v: p.data[p.data.length - 1].v + (Math.random() - 0.48) * 12 },
          ],
        }))
      );
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full h-full overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="panel-container flex items-center justify-between flex-shrink-0">
        <div>
          <h2 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-accent-green" />
            MANIPULATION PATTERN LIBRARY
          </h2>
          <p className="text-xs text-gray-500">Reference catalogue of known market manipulation signatures</p>
        </div>
        <div className="text-xs font-mono text-gray-500">
          {patterns.length} PATTERNS INDEXED &nbsp;·&nbsp; <span className="text-accent-green">LIVE SPARKLINES</span>
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
        {patterns.map((p, i) => (
          <div
            key={i}
            className="panel-container flex flex-col gap-3 hover:border-dark-600 transition-colors"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] font-mono text-gray-600 mb-1">{p.code}</div>
                <h3 className="text-sm font-bold text-white">{p.title}</h3>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-sm border font-mono flex-shrink-0 ${severityStyle(p.severity)}`}
              >
                {p.severity}
              </span>
            </div>

            {/* Sparkline */}
            <div className="h-16 w-full bg-dark-900 rounded-sm border border-dark-700/50">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={p.data}>
                  <Line
                    type="monotone"
                    dataKey="v"
                    stroke={sparkColor(p.severity)}
                    strokeWidth={1.5}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-400 leading-relaxed">{p.description}</p>

            {/* Indicators */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono text-gray-600">DETECTION SIGNALS:</div>
              {p.indicators.map((ind, j) => (
                <div key={j} className="flex items-center gap-2 text-[11px] font-mono text-gray-400">
                  <ShieldAlert className="w-3 h-3 text-gray-600 flex-shrink-0" />
                  {ind}
                </div>
              ))}
            </div>

            {/* Action */}
            <button className="mt-auto text-[10px] font-mono text-accent-green hover:text-white border border-accent-green/30 hover:border-accent-green/70 px-3 py-1.5 rounded-sm transition-colors text-left">
              VIEW CASE PRECEDENTS →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
