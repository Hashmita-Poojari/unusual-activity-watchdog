export interface InstrumentData {
  symbol: string;
  price: number;
  volume: number;
  timestamp: string;
  priceChange: number;
  volumeChange: number;
  baseline: number;
  expectedRange: [number, number];
  anomalyScore: number;
}

export interface Alert {
  id: string;
  time: string;
  instrument: string;
  event: string;
  anomaly_score: number;
  confidence: number;
  pattern: string;
  status: string;
  severity: string;
  news_context: string;
  reasoning: string[];
}

export interface FeedItem {
  time: string;
  instrument: string;
  message: string;
}

export interface MarketState {
  instruments: InstrumentData[];
  alerts: Alert[];
  feed: FeedItem[];
  risk: number;
}
