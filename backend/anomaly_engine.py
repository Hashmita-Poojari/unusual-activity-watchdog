import random
from typing import List, Dict, Any

class AnomalyEngine:
    def __init__(self):
        pass

    def evaluate(self, current_data: Dict[str, Any], historical_data: Dict[str, List[Any]], is_anomaly_mode: bool) -> Dict[str, Any]:
        """
        Evaluates the current market state and returns scores and potential alerts.
        """
        # In a real system, this would use Isolation Forest or statistical baselines.
        # Here we simulate the logic based on the 'is_anomaly_mode' flag.
        
        scores = {}
        alerts = []
        feed = []
        
        overall_risk = 12
        if is_anomaly_mode:
            overall_risk = random.randint(85, 98)
            
            # Generate a correlated anomaly
            affected_symbols = ["AAPL", "TSLA", "NVDA", "AMZN"]
            
            for symbol in affected_symbols:
                score = random.randint(80, 95)
                scores[symbol] = score
                
            # Cross-stock correlation is high
            cross_stock_score = 91
            
            # Create a critical alert for the primary affected stock (e.g., AAPL)
            alerts.append({
                "id": "UAW-1042",
                "time": "LIVE",
                "instrument": "AAPL",
                "event": "Price +4.8% & Volume Burst",
                "anomaly_score": scores["AAPL"],
                "confidence": 92.0,
                "pattern": "Cross-stock anomaly",
                "status": "NEW",
                "severity": "CRITICAL",
                "news_context": "No matching market event found",
                "reasoning": [
                    "Price moved significantly outside normal range (+4.7σ)",
                    "Trading volume increased 312%",
                    "Activity occurred within an unusual time window",
                    "AAPL movement correlated with multiple unrelated stocks (Correlation: 0.91)",
                    "No legitimate news/context was found to explain the movement"
                ]
            })
            
            feed.extend([
                {"time": "LIVE", "instrument": "AAPL", "message": "Trade burst detected"},
                {"time": "LIVE", "instrument": "TSLA", "message": "Volume deviation +312%"},
                {"time": "LIVE", "instrument": "NVDA", "message": "Cross-stock movement detected"},
                {"time": "LIVE", "instrument": "AAPL", "message": "Price deviation +4.8%"},
                {"time": "LIVE", "instrument": "SYSTEM", "message": "NEWS CHECK: No matching market event"},
                {"time": "LIVE", "instrument": "SYSTEM", "message": "MODEL: Anomaly score recalculated to CRITICAL"}
            ])
            
        else:
            # Normal mode
            overall_risk = random.randint(10, 25)
            for symbol in current_data.keys():
                scores[symbol] = random.randint(5, 15)
                
            feed.append({"time": "LIVE", "instrument": "SYSTEM", "message": "Market operating within normal parameters"})
            
        return {
            "scores": scores,
            "alerts": alerts,
            "feed": feed,
            "risk": overall_risk
        }

engine = AnomalyEngine()
