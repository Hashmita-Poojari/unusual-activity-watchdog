from pydantic import BaseModel
from typing import List, Optional

class InstrumentData(BaseModel):
    symbol: str
    price: float
    volume: int
    timestamp: str
    priceChange: float
    volumeChange: float
    baseline: float
    expectedRange: List[float]
    anomalyScore: float

class Alert(BaseModel):
    id: str
    time: str
    instrument: str
    event: str
    anomaly_score: float
    confidence: float
    pattern: str
    status: str
    severity: str
    news_context: str
    reasoning: List[str]

class MarketState(BaseModel):
    instruments: List[InstrumentData]
    alerts: List[Alert]
    activity_feed: List[dict]
    risk_score: float
    is_anomaly_mode: bool
