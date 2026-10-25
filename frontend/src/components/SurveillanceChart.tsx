import React, { useMemo } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceArea
} from 'recharts';
import type { InstrumentData } from '../types';

interface SurveillanceChartProps {
  data: InstrumentData[];
  isAnomaly: boolean;
  selectedSymbol: string;
  onSymbolSelect: (symbol: string) => void;
}

export const SurveillanceChart = ({ data, isAnomaly, selectedSymbol, onSymbolSelect }: SurveillanceChartProps) => {
  // We mock a history based on the current data for the chart's visual effect
  // In a real app, we'd pass the full historical series
  const mockHistory = useMemo(() => {
    if (!data.length) return [];
    
    const instrument = data.find(d => d.symbol === selectedSymbol) || data[0];
    if (!instrument) return [];

    const basePrice = instrument.price;
    const history = [];
    let currentPrice = basePrice * 0.95;
    
    for (let i = 0; i < 40; i++) {
      history.push({
        time: `12:${(i + 10).toString().padStart(2, '0')}`,
        price: currentPrice,
        baseline: basePrice * 0.96,
        upper: basePrice * 0.98,
        lower: basePrice * 0.94,
      });
      currentPrice += (Math.random() - 0.5) * 2;
    }
    
    // Add current live point
    history.push({
      time: instrument.timestamp,
      price: instrument.price,
      baseline: instrument.baseline,
      upper: instrument.expectedRange[1],
      lower: instrument.expectedRange[0],
    });
    
    return history;
  }, [data, selectedSymbol]);

  return (
    <div className="panel-container flex-1 min-h-0 flex flex-col mb-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-sm font-bold text-white tracking-wide">LIVE MARKET SURVEILLANCE</h2>
          <p className="text-xs text-gray-500">Real-time behavioural deviation monitoring</p>
        </div>
        <div className="flex space-x-2">
          {['1m', '5m', '15m', '1H'].map(t => (
            <button key={t} className="px-2 py-1 text-xs font-mono text-gray-400 hover:text-white border border-dark-700 rounded-sm bg-dark-900">
              {t}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex space-x-2 mb-4">
        {['AAPL', 'TSLA', 'NVDA', 'AMZN', 'MSFT', 'GOOGL'].map((s) => (
          <button 
            key={s} 
            onClick={() => onSymbolSelect(s)}
            className={`px-3 py-1 text-xs font-mono rounded-sm border transition-colors ${s === selectedSymbol ? 'border-accent-green text-accent-green bg-accent-green/10' : 'border-dark-700 text-gray-400 bg-dark-900 hover:bg-dark-700'}`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex-1 relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockHistory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
            <XAxis dataKey="time" stroke="#4b5563" fontSize={10} tickMargin={10} />
            <YAxis stroke="#4b5563" fontSize={10} domain={['auto', 'auto']} tickFormatter={val => `$${val.toFixed(0)}`} width={60} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#11161d', borderColor: '#374151', color: '#fff', fontSize: '12px' }}
              itemStyle={{ color: '#fff' }}
            />
            
            <ReferenceArea 
              y1={mockHistory[0]?.lower} 
              y2={mockHistory[0]?.upper} 
              fill="#22c55e" 
              fillOpacity={0.05} 
            />
            
            {isAnomaly && (
              <ReferenceArea 
                x1={mockHistory[mockHistory.length - 2]?.time} 
                x2={mockHistory[mockHistory.length - 1]?.time} 
                fill="#ef4444" 
                fillOpacity={0.15} 
              />
            )}

            <Line 
              type="monotone" 
              dataKey="price" 
              stroke={isAnomaly ? "#ef4444" : "#22c55e"} 
              strokeWidth={2} 
              dot={false}
              isAnimationActive={false}
            />
            <Line 
              type="step" 
              dataKey="baseline" 
              stroke="#6b7280" 
              strokeWidth={1} 
              strokeDasharray="5 5" 
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
        
        {isAnomaly && (
          <div className="absolute top-4 right-10 bg-accent-red/20 border border-accent-red text-accent-red px-3 py-1 text-xs font-mono rounded-sm font-bold flex items-center animate-pulse">
            <span className="w-2 h-2 bg-accent-red rounded-full mr-2"></span>
            ANOMALY DETECTED
          </div>
        )}
      </div>
    </div>
  );
};
