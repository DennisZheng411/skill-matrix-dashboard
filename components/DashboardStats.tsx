import React from 'react';
import { SkillMatrixData } from '../types.ts';

interface DashboardStatsProps {
  data: SkillMatrixData;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ data }) => {
  const skillEntries = Object.entries(data.skillTotals);
  const topSkillEntry = skillEntries.length > 0 
    ? skillEntries.reduce((a, b) => a[1] > b[1] ? a : b)
    : ['N/A', 0];
    
  const topSkill = topSkillEntry[0];
  const topSkillCount = topSkillEntry[1];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Incidents</p>
        <div className="flex items-baseline gap-2">
          <h2 className="text-4xl font-extrabold text-slate-900">{data.totalCases}</h2>
          <span className="text-xs text-slate-400 font-medium font-mono uppercase tracking-tighter">Telemetries</span>
        </div>
      </div>

      <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Active Engineers</p>
        <div className="flex items-baseline gap-2">
          <h2 className="text-4xl font-extrabold text-slate-900">{data.engineers.length}</h2>
          <span className="text-xs text-slate-400 font-medium font-mono uppercase tracking-tighter">Team</span>
        </div>
      </div>

      <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Peak Vertical</p>
        <div className="flex items-baseline gap-2">
          <h2 className="text-2xl font-extrabold text-blue-600 truncate">{topSkill}</h2>
          <span className="text-sm font-bold text-slate-900 font-mono">({topSkillCount})</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
