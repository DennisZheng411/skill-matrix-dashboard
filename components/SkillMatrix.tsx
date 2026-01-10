
import React from 'react';
import { SkillMatrixData } from '../types';

interface SkillMatrixProps {
  data: SkillMatrixData;
}

const SkillMatrix: React.FC<SkillMatrixProps> = ({ data }) => {
  const { engineers, skills, matrix } = data;

  // Function to determine cell background color based on count intensity
  const getIntensityClass = (count: number) => {
    if (count === 0) return 'bg-slate-50 text-slate-300';
    if (count < 5) return 'bg-blue-50 text-blue-700 font-medium';
    if (count < 15) return 'bg-blue-100 text-blue-800 font-semibold';
    if (count < 30) return 'bg-blue-200 text-blue-900 font-bold';
    return 'bg-blue-600 text-white font-bold';
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 text-xs font-bold text-slate-500 uppercase sticky left-0 bg-slate-50 z-10 w-48 border-r border-slate-200">
                Engineer / Skill
              </th>
              {skills.map((skill) => (
                <th key={skill} className="p-4 text-xs font-bold text-slate-500 uppercase min-w-[120px]">
                  {skill}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {engineers.map((engineer) => (
              <tr key={engineer} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="p-4 text-sm font-semibold text-slate-700 sticky left-0 bg-white border-r border-slate-200 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                  {engineer}
                </td>
                {skills.map((skill) => {
                  const count = matrix[engineer]?.[skill] || 0;
                  return (
                    <td key={skill} className={`p-4 text-center text-sm transition-all ${getIntensityClass(count)}`}>
                      {count > 0 ? count : '-'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-slate-50 text-xs text-slate-500 flex items-center gap-4">
        <span>Intensity Key:</span>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-slate-100 border border-slate-200 rounded"></span> 0
          <span className="w-3 h-3 bg-blue-50 rounded"></span> 1-4
          <span className="w-3 h-3 bg-blue-100 rounded"></span> 5-14
          <span className="w-3 h-3 bg-blue-200 rounded"></span> 15-29
          <span className="w-3 h-3 bg-blue-600 rounded"></span> 30+
        </div>
      </div>
    </div>
  );
};

export default SkillMatrix;
