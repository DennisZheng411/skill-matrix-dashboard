import React from 'react';
import { SkillMatrixData } from '../types.ts';

interface DashboardStatsProps {
  data: SkillMatrixData;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Incidents Card */}
      <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total Incidents</p>
        <div className="flex items-baseline gap-2">
          <h2 className="text-4xl font-extrabold text-slate-900">{data.totalCases}</h2>
        </div>
      </div>

      {/* Active Engineers Card */}
      <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Active Engineers</p>
        <div className="flex items-baseline gap-2">
          <h2 className="text-4xl font-extrabold text-slate-900">{data.activeEngineers}</h2>
        </div>
      </div>

      {/* Peak Vertical Card */}
      <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Peak Vertical</p>
        <div className="flex items-baseline gap-2">
          <h2 className="text-2xl font-extrabold text-blue-600 truncate">{data.topSkill}</h2>
          <span className="text-sm font-bold text-slate-900 font-mono">
            ({data.skillTotals[data.topSkill] || 0})
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
