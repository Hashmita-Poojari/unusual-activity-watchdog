import React from 'react';
import type { FeedItem } from '../types';

export const ActivityFeed = ({ feed }: { feed: FeedItem[] }) => {
  return (
    <div className="panel-container flex-none h-64 flex flex-col mb-4">
      <h2 className="text-sm font-bold text-white mb-4">LIVE ACTIVITY</h2>
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        <div className="space-y-3">
          {feed.slice().reverse().map((item, i) => (
            <div key={i} className="text-xs font-mono">
              <div className="text-gray-500 mb-0.5">{item.time}</div>
              <div className="flex items-start">
                <span className={`font-bold mr-2 w-12 ${
                  item.instrument === 'SYSTEM' || item.instrument === 'MODEL' ? 'text-accent-green' : 
                  item.instrument === 'NEWS CHECK' ? 'text-gray-400' : 'text-white'
                }`}>
                  {item.instrument}
                </span>
                <span className={`flex-1 ${
                  item.message.includes('deviation') || item.message.includes('burst') ? 'text-accent-red' : 'text-gray-300'
                }`}>
                  {item.message}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
