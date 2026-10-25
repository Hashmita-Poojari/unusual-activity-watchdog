import random
import datetime
from typing import Dict, List, Any
from anomaly_engine import engine

class MarketSimulator:
    def __init__(self):
        self.symbols = ["AAPL", "TSLA", "NVDA", "AMZN", "MSFT", "GOOGL", "META", "NFLX"]
        self.base_prices = {
            "AAPL": 185.0,
            "TSLA": 210.0,
            "NVDA": 850.0,
            "AMZN": 175.0,
            "MSFT": 410.0,
            "GOOGL": 145.0,
            "META": 480.0,
            "NFLX": 620.0
        }
        self.is_anomaly_mode = False
        self.history: Dict[str, List[Any]] = {s: [] for s in self.symbols}
        self.current_data: Dict[str, Any] = {}
        
    def set_anomaly_mode(self, mode: bool):
        self.is_anomaly_mode = mode
        
    def step(self):
        now = datetime.datetime.now().strftime("%H:%M:%S")
        
        # Update prices
        for symbol in self.symbols:
            if symbol not in self.current_data:
                self.current_data[symbol] = {
                    "symbol": symbol,
                    "price": self.base_prices[symbol],
                    "volume": random.randint(1000, 5000),
                    "timestamp": now,
                    "priceChange": 0.0,
                    "volumeChange": 0.0,
                    "baseline": self.base_prices[symbol],
                    "expectedRange": [self.base_prices[symbol] * 0.99, self.base_prices[symbol] * 1.01],
                    "anomalyScore": 0.0
                }
            
            # Normal random walk
            volatility = 0.001
            if self.is_anomaly_mode and symbol in ["AAPL", "TSLA", "NVDA", "AMZN"]:
                volatility = 0.02 # High volatility during anomaly
                
            change_percent = random.uniform(-volatility, volatility)
            if self.is_anomaly_mode and symbol in ["AAPL", "TSLA", "NVDA", "AMZN"]:
                change_percent = random.uniform(0.01, 0.03) # Forced upward spike
                
            old_price = self.current_data[symbol]["price"]
            new_price = old_price * (1 + change_percent)
            
            volume_multiplier = 1.0
            if self.is_anomaly_mode and symbol in ["AAPL", "TSLA", "NVDA", "AMZN"]:
                volume_multiplier = random.uniform(3.0, 5.0)
                
            new_volume = int(random.randint(1000, 5000) * volume_multiplier)
            
            self.current_data[symbol].update({
                "price": round(new_price, 2),
                "volume": new_volume,
                "timestamp": now,
                "priceChange": round(change_percent * 100, 2),
                "volumeChange": round((volume_multiplier - 1) * 100, 2),
            })
            
            self.history[symbol].append(self.current_data[symbol].copy())
            if len(self.history[symbol]) > 100:
                self.history[symbol].pop(0)
                
        # Run anomaly engine
        analysis = engine.evaluate(self.current_data, self.history, self.is_anomaly_mode)
        
        for symbol in self.symbols:
            self.current_data[symbol]["anomalyScore"] = analysis["scores"].get(symbol, 0)
            
        return {
            "instruments": list(self.current_data.values()),
            "alerts": analysis["alerts"],
            "feed": analysis["feed"],
            "risk": analysis["risk"]
        }

simulator = MarketSimulator()
