import React from 'react';
import { SkillMatrixData } from '../types.ts';

interface SkillMatrixProps {
  data: SkillMatrixData;
}

const SkillMatrix: React.FC<SkillMatrixProps> = ({ data }) => {
  const getIntensityColor = (value: number) => {
    if (value === 0) return 'bg-white text-slate-300';
    if (value < 5) return 'bg-blue-50 text-blue-700';
    if (value < 15) return 'bg-blue-100 text-blue-800 font-medium';
    if (value < 30) return 'bg-blue-200 text-blue-900 font-bold';
    return 'bg-blue-600 text-white font-bold';
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider sticky left-0 bg-slate-50 z-10 border-r border-slate-200">
              Engineer / Skill
            </th>
            <th className="px-6 py-4 text-xs font-bold text-blue-600 uppercase tracking-wider text-center bg-blue-50/50">
              Total
            </th>
            {data.skills.map(skill => (
              <th key={skill} className="px-4 py-4 text-[11px] font-bold text-slate-600 uppercase tracking-tight text-center whitespace-nowrap">
                <div className="flex flex-col items-center">
                  <span className="mb-1">{skill}</span>
                  <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 font-mono text-xs">
                    = {data.skillTotals[skill] || 0}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.engineers.map(engineer => (
            <tr key={engineer} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 text-sm font-semibold text-slate-700 sticky left-0 bg-white z-10 border-r border-slate-200">
                {engineer}
              </td>
              <td className={`px-6 py-4 text-sm text-center font-mono ${getIntensityColor(data.engineerTotals[engineer])}`}>
                {data.engineerTotals[engineer]}
              </td>
              {data.skills.map(skill => {
                const val = data.matrix[engineer][skill] || 0;
                return (
                  <td 
                    key={`${engineer}-${skill}`} 
                    className={`px-6 py-4 text-sm text-center font-mono ${getIntensityColor(val)}`}
                  >
                    {val === 0 ? '-' : val}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex items-center gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
        <span>Intensity Key:</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-white border border-slate-200"></div> 0</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-blue-50"></div> 1-4</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-blue-100"></div> 5-14</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-blue-200"></div> 15-29</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-blue-600"></div> 30+</div>
        </div>
      </div>
    </div>
  );
};

export default SkillMatrix;
