import React from 'react';
import { Globe, RefreshCw, Filter } from 'lucide-react';

export const NewsContextTab = () => {
  const news = [
    { time: '14:08:12', headline: 'SEC launches unscheduled probe into high-frequency firm', source: 'Reuters Fin', sentiment: 'PANIC', related: 'MARKET WIDE' },
    { time: '14:05:33', headline: 'Unusual options block trade detected in NVDA ($45M Notional)', source: 'OptionsFlow', sentiment: 'BULLISH', related: 'NVDA' },
    { time: '13:42:01', headline: 'Federal Reserve unannounced closed-door meeting scheduled', source: 'Bloomberg', sentiment: 'BEARISH', related: 'MACRO' },
    { time: '13:15:44', headline: 'Apple (AAPL) supply chain rumours indicate heavy Q3 delays', source: 'Nikkei Asia', sentiment: 'BEARISH', related: 'AAPL' },
    { time: '12:59:10', headline: 'Unexplained flash crash in regional banking index', source: 'MarketWatch', sentiment: 'PANIC', related: 'KRE' },
  ];

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="panel-container flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white tracking-wide">MARKET NEWS & CONTEXT</h2>
          <p className="text-xs text-gray-500">Live NLP sentiment analysis and context verification</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-xs font-mono text-gray-400 hover:text-white border border-dark-700 rounded-sm bg-dark-900 flex items-center">
            <Filter className="w-3 h-3 mr-2" /> FILTER
          </button>
          <button className="px-3 py-1 text-xs font-mono text-gray-400 hover:text-white border border-dark-700 rounded-sm bg-dark-900 flex items-center">
            <RefreshCw className="w-3 h-3 mr-2" /> REFRESH
          </button>
        </div>
      </div>

      <div className="flex gap-4 flex-1">
        <div className="panel-container flex-[3] overflow-auto custom-scrollbar">
          <div className="space-y-4">
            {news.map((item, i) => (
              <div key={i} className="flex gap-4 border-b border-dark-700/50 pb-4 hover:bg-dark-700/20 p-2 rounded-sm transition-colors">
                <div className="text-xs font-mono text-gray-500 pt-1 flex-shrink-0 w-20">{item.time}</div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white mb-1 hover:text-blue-400 cursor-pointer">{item.headline}</h3>
                  <div className="flex items-center text-xs font-mono">
                    <Globe className="w-3 h-3 text-gray-500 mr-1" />
                    <span className="text-gray-400 mr-4">{item.source}</span>
                    <span className="text-gray-600 mr-2">RELATED:</span>
                    <span className="text-accent-green bg-accent-green/10 px-1 rounded-sm">{item.related}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 w-24 text-right">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-sm font-mono ${
                    item.sentiment === 'PANIC' ? 'bg-accent-red/20 text-accent-red border border-accent-red/30' :
                    item.sentiment === 'BEARISH' ? 'bg-accent-orange/20 text-accent-orange border border-accent-orange/30' :
                    'bg-accent-green/20 text-accent-green border border-accent-green/30'
                  }`}>
                    {item.sentiment}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-container flex-1 flex flex-col">
          <h3 className="text-xs font-bold text-gray-400 mb-4">CONTEXT VERIFICATION ENGINE</h3>
          
          <div className="bg-dark-900 p-4 border border-dark-700 rounded-sm mb-4">
            <div className="text-xs font-mono text-gray-500 mb-2">TARGET INCIDENT</div>
            <div className="text-sm text-white font-bold mb-1">#UAW-1042: AAPL Volume Spike</div>
            <div className="text-xs text-accent-red font-mono">STATUS: NO CONTEXT FOUND</div>
          </div>
          
          <div className="flex-1 text-xs text-gray-400 leading-relaxed font-mono space-y-3">
            <p>&gt; Searching global financial news APIs...</p>
            <p>&gt; Scanning Edgar SEC filings...</p>
            <p>&gt; Analyzing Twitter/X financial subgraphs...</p>
            <p className="text-accent-orange">&gt; No legitimate corporate announcements match the current price action window.</p>
            <p className="text-white font-bold">&gt; CONCLUSION: Suspicious market action unsupported by public information.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
