import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { KpiStrip } from './components/KpiStrip';
import { SurveillanceChart } from './components/SurveillanceChart';
import { MultiSignalPanel } from './components/MultiSignalPanel';
import { LiveAlertTable } from './components/LiveAlertTable';
import { ActivityFeed } from './components/ActivityFeed';
import { RiskPanel } from './components/RiskPanel';
import { ExplainableAlert } from './components/ExplainableAlert';
import { SimulationControls } from './components/SimulationControls';
import { useMarketStream } from './hooks/useMarketStream';
import { OverviewTab } from './components/OverviewTab';
import { InvestigationsTab } from './components/InvestigationsTab';
import { CrossAssetTab } from './components/CrossAssetTab';
import { NewsContextTab } from './components/NewsContextTab';
import { AnalystFeedbackTab } from './components/AnalystFeedbackTab';
import { PatternLibraryTab } from './components/PatternLibraryTab';
import { SystemTab } from './components/SystemTab';

function App() {
  const { marketState, isConnected, triggerControl } = useMarketStream();
  const [analystAction, setAnalystAction] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  
  if (!marketState || !isConnected) {
    return (
      <div className="h-screen bg-dark-900 flex items-center justify-center flex-col font-mono text-gray-400">
        <div className="w-8 h-8 border-2 border-accent-green border-t-transparent rounded-full animate-spin mb-4"></div>
        <p>CONNECTING TO MARKET STREAM...</p>
      </div>
    );
  }

  const isAnomaly = marketState.risk >= 80;
  const criticalAlert = marketState.alerts.find(a => a.severity === 'CRITICAL') || null;

  const handleAction = (action: string) => {
    setAnalystAction(action);
    setTimeout(() => setAnalystAction(null), 3000);
  };
  
  const currentInstrument = marketState.instruments.find(i => i.symbol === selectedSymbol);

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <OverviewTab />;
      case 'Live Monitor':
        return (
          <>
            {/* Left Column (Chart & Multi-Signal) */}
            <div className="flex-[2] flex flex-col min-w-0 gap-4">
              <SurveillanceChart 
                data={marketState.instruments} 
                isAnomaly={isAnomaly} 
                selectedSymbol={selectedSymbol}
                onSymbolSelect={setSelectedSymbol}
              />
              <MultiSignalPanel instrument={currentInstrument} isAnomaly={isAnomaly} />
              <LiveAlertTable alerts={marketState.alerts} />
            </div>

            {/* Right Column (Intelligence & Action) */}
            <div className="w-80 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
              <RiskPanel risk={marketState.risk} />
              <ExplainableAlert alert={criticalAlert} onAction={handleAction} />
              <ActivityFeed feed={marketState.feed} />
              <SimulationControls onControl={triggerControl} />
            </div>
          </>
        );
      case 'Alerts':
        return (
          <div className="flex-1 flex flex-col">
            <LiveAlertTable alerts={marketState.alerts} />
          </div>
        );
      case 'Investigations':
        return <InvestigationsTab />;
      case 'Cross-Asset':
        return <CrossAssetTab />;
      case 'Pattern Library':
        return <PatternLibraryTab />;
      case 'News & Context':
        return <NewsContextTab />;
      case 'Analyst Feedback':
        return <AnalystFeedbackTab />;
      case 'System':
        return <SystemTab />;
      default:
        return (
          <div className="flex-1 flex items-center justify-center text-gray-500 font-mono">
            MODULE NOT YET PROVISIONED FOR PROTOTYPE
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-dark-900 text-gray-300 overflow-hidden font-sans">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <KpiStrip risk={marketState.risk} />
        
        {/* Main Dashboard Area */}
        <div className="flex-1 p-4 flex gap-4 overflow-hidden">
          {renderContent()}
        </div>
      </div>
      
      {/* Toast Notification */}
      {analystAction && (
        <div className="fixed bottom-4 right-4 bg-dark-800 border border-dark-600 p-4 rounded-sm shadow-lg z-50 flex items-center animate-in slide-in-from-bottom-4">
          <div className="w-2 h-2 bg-accent-green rounded-full mr-3"></div>
          <div>
            <div className="text-xs font-mono font-bold text-white mb-1">ANALYST FEEDBACK RECORDED</div>
            <div className="text-xs font-mono text-gray-400">Action: {analystAction} - MODEL CALIBRATION QUEUED</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

