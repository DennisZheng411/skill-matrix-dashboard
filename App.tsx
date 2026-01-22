import React, { useState, useEffect, useCallback } from 'react';
import { fetchIncidents, processMatrixData } from './services/api.ts';
import { SkillMatrixData } from './types.ts';
import SkillMatrix from './components/SkillMatrix.tsx';
import DashboardStats from './components/DashboardStats.tsx';
import { formatDate } from './utils/converters.ts';

const App: React.FC = () => {
  const [startDate, setStartDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return formatDate(d);
  });
  const [endDate, setEndDate] = useState<string>(() => formatDate(new Date()));
  const [data, setData] = useState<SkillMatrixData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const rawData = await fetchIncidents(startDate, endDate);
      const processed = processMatrixData(rawData);
      setData(processed);
      
      if (processed.totalCases === 0) {
        setError("No incidents found for the selected date range.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while fetching data.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-8 pb-16">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Skill Matrix Dashboard</h1>
          </div>
          <p className="text-slate-500 max-w-lg">
            Monitor and analyze technical support workload distribution across engineering teams based on live incident telemetry.
          </p>
        </div>

        <div className="flex flex-wrap items-end gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Start Date</label>
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">End Date</label>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50"
            />
          </div>
          <button 
            onClick={handleSearch}
            disabled={loading}
            className={`px-8 py-2 rounded-lg text-sm font-bold text-white shadow-sm transition-all flex items-center gap-2 h-[38px] ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}`}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
            Update Dashboard
          </button>
        </div>
      </header>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">{error}</span>
        </div>
      )}

      <main className="relative mb-8">
        {loading ? (
          <div className="p-32 flex flex-col items-center justify-center text-slate-400 gap-4 bg-white rounded-xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="font-medium">Updating workload matrix...</p>
          </div>
        ) : (
          data && <SkillMatrix data={data} />
        )}
      </main>
      
      {data && !loading && (
        <DashboardStats data={data} />
      )}
    </div>
  );
};

export default App;
