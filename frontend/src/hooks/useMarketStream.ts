import { useState, useEffect, useRef } from 'react';
import type { MarketState } from '../types';

export function useMarketStream() {
  const [marketState, setMarketState] = useState<MarketState | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connect = () => {
      const ws = new WebSocket('ws://localhost:8000/ws/market');
      
      ws.onopen = () => {
        setIsConnected(true);
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMarketState(data);
      };

      ws.onclose = () => {
        setIsConnected(false);
        // Reconnect after 3 seconds
        setTimeout(connect, 3000);
      };

      wsRef.current = ws;
    };

    connect();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const triggerControl = async (command: 'normal' | 'anomaly' | 'reset') => {
    try {
      await fetch('http://localhost:8000/api/simulation/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command })
      });
    } catch (e) {
      console.error("Failed to control simulation:", e);
    }
  };

  return { marketState, isConnected, triggerControl };
}
