
import { Incident, SkillMatrixData } from '../types';

// ★ YOUR AZURE FUNCTION URL ★
const API_BASE_URL = "https://functionforlogic011026-fxgnfxaqhygvbhc7.eastasia-01.azurewebsites.net/api/HttpTrigger1?code=SSZEPSxKltmeSa6zv0D8zFbAdPKogjGZAQLx3xLRBMHUAzFu0-PRAQ==";

export const fetchIncidents = async (startDate: string, endDate: string): Promise<Incident[]> => {
  const url = `${API_BASE_URL}&startDate=${startDate}&endDate=${endDate}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return await response.json();
};

export const processMatrixData = (data: Incident[]): SkillMatrixData => {
  const engineers = new Set<string>();
  const skills = new Set<string>();
  const matrix: Record<string, Record<string, number>> = {};
  const skillCounts: Record<string, number> = {};
  
  data.forEach(item => {
    const eng = item.OwnerAlias || "Unknown";
    const skill = item.VDMSkillName || "Other";
    engineers.add(eng);
    skills.add(skill);
    
    // Process Matrix
    if (!matrix[eng]) matrix[eng] = {};
    if (!matrix[eng][skill]) matrix[eng][skill] = 0;
    matrix[eng][skill]++;

    // Track Top Skill
    skillCounts[skill] = (skillCounts[skill] || 0) + 1;
  });

  // Calculate top skill
  let topSkill = "N/A";
  let maxCount = 0;
  Object.entries(skillCounts).forEach(([skill, count]) => {
    if (count > maxCount) {
      maxCount = count;
      topSkill = skill;
    }
  });

  return {
    engineers: Array.from(engineers).sort(),
    skills: Array.from(skills).sort(),
    matrix,
    totalCases: data.length,
    activeEngineers: engineers.size,
    topSkill
  };
};
