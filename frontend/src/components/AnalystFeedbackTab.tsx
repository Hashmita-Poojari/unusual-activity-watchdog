import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const incidentOptions = [
  { id: 'UA-904', label: 'AAPL/TSLA/NVDA anomaly' },
  { id: 'INV-4092', label: 'AAPL Block Trades investigation' },
  { id: 'INV-4088', label: 'Crypto-to-Equity flow' },
];

export const AnalystFeedbackTab = () => {
  const [selectedIncident, setSelectedIncident] = useState(incidentOptions[0].id);
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app we'd POST to backend; here just simulate success.
    console.log('Report submitted', { incident: selectedIncident, note });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="panel-container flex items-center justify-between">
        <h2 className="text-sm font-bold text-white tracking-wide">ANALYST FEEDBACK & COMPLIANCE</h2>
        <span className="text-xs text-gray-500 font-mono">OVERRIDE OBSERVATIONS</span>
      </div>

      <form className="panel-container flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-xs text-gray-400 mb-1" htmlFor="incident-select">Select Incident</label>
          <select
            id="incident-select"
            className="bg-dark-900 border border-dark-700 text-xs font-mono text-gray-200 rounded-sm py-1.5 px-2 focus:outline-none focus:border-accent-green"
            value={selectedIncident}
            onChange={e => setSelectedIncident(e.target.value)}
          >
            {incidentOptions.map(opt => (
              <option key={opt.id} value={opt.id}>
                {opt.id} – {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-gray-400 mb-1" htmlFor="note">Override Observation</label>
          <textarea
            id="note"
            rows={5}
            className="bg-dark-800 border border-dark-600 text-xs font-mono text-gray-200 rounded-sm p-2 focus:outline-none focus:border-accent-green resize-none"
            placeholder="Type your analyst note here..."
            value={note}
            onChange={e => setNote(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="self-end flex items-center px-4 py-1.5 text-xs font-mono text-white bg-accent-green hover:bg-accent-green/80 rounded-sm border border-accent-green/50 transition-colors disabled:opacity-50"
          disabled={!note.trim()}
        >
          <CheckCircle className="w-3 h-3 mr-1" /> Submit Report to Compliance
        </button>
      </form>

      {submitted && (
        <div className="flex items-center text-sm text-accent-green bg-dark-800 border border-accent-green/30 rounded-sm px-4 py-2 mt-2">
          <CheckCircle className="w-4 h-4 mr-2" />
          Report logged successfully.
        </div>
      )}
    </div>
  );
};
