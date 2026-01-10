
import React from 'react';
import { SkillMatrixData } from '../types';

interface DashboardStatsProps {
  data: SkillMatrixData;
  aiInsight?: string | null;
  loadingInsight?: boolean;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ data, aiInsight, loadingInsight }) => {
  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Stats Cards */}
      <div className="lg:col-span-1 flex flex-col gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase mb-1">Total Incidents</p>
          <p className="text-3xl font-bold text-slate-900">{data.totalCases}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase mb-1">Active Engineers</p>
          <p className="text-3xl font-bold text-slate-900">{data.activeEngineers}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase mb-1">High Volume Skill</p>
          <p className="text-3xl font-bold text-blue-600 truncate" title={data.topSkill}>
            {data.topSkill}
          </p>
        </div>
      </div>

      {/* AI Insights Card */}
      <div className="lg:col-span-2">
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100 shadow-sm h-full flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-indigo-600 rounded text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05l-3.293 3.293a1 1 0 01-1.414 0l-3.293-3.293a1 1 0 01-.285-1.05l1.738-5.42-1.233-.616a1 1 0 01.894-1.79l1.599.8L9 4.323V3a1 1 0 011-1zm0 5a3 3 0 100 6 3 3 0 000-6z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-slate-800">AI Workload Analysis</h2>
          </div>

          <div className="flex-grow">
            {loadingInsight ? (
              <div className="flex flex-col items-center justify-center h-40 gap-3 text-indigo-400">
                <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="text-sm font-medium animate-pulse">Consulting Gemini for insights...</p>
              </div>
            ) : aiInsight ? (
              <div className="prose prose-sm prose-slate max-w-none prose-headings:text-indigo-900 prose-strong:text-indigo-800 text-slate-700">
                {/* Simplified markdown rendering */}
                <div className="whitespace-pre-wrap leading-relaxed">
                  {aiInsight}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-40 text-slate-400 italic">
                No insights available. Search for data to generate analysis.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
