
import { Incident, SkillMatrixData } from '../types.ts';

const API_BASE_URL = "https://functionforlogic011026-fxgnfxaqhygvbhc7.eastasia-01.azurewebsites.net/api/HttpTrigger1?code=SSZEPSxKltmeSa6zv0D8zFbAdPKogjGZAQLx3xLRBMHUAzFu0-PRAQ==";

export const fetchIncidents = async (startDate: string, endDate: string): Promise<Incident[]> => {
  const url = `${API_BASE_URL}&startDate=${startDate}&endDate=${endDate}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return await response.json();
};

const mapSkillToCategory = (rawSkill: string): string => {
  if (!rawSkill) return "Other";
  const upper = rawSkill.toUpperCase();

  if (upper.startsWith("AAPDEV")) return "AAPdev";
  if (upper.startsWith("AAPCFG")) return "AAPcfg";
  if (upper.startsWith("AAPPRF")) return "AAPprf";
  if (upper.startsWith("AAPOSS")) return "AAPoss";
  if (upper.startsWith("AISLGA")) return "AISLGA";
  if (upper.startsWith("PDAPIM")) return "PDapim";
  if (upper.startsWith("PDSTG") || upper.includes("STORAGE")) return "Storage";

  return "Other";
};

export const processMatrixData = (data: Incident[]): SkillMatrixData => {
  const engineersSet = new Set<string>();
  const matrix: Record<string, Record<string, number>> = {};
  const engineerTotals: Record<string, number> = {};
  const skillTotals: Record<string, number> = {};

  const targetCategories = [
    "AAPdev", 
    "AAPcfg", 
    "AAPprf", 
    "AAPoss", 
    "Storage", 
    "AISLGA", 
    "PDapim", 
    "Other"
  ];

  // Initialize skill totals
  targetCategories.forEach(cat => skillTotals[cat] = 0);

  data.forEach(item => {
    const eng = item.OwnerAlias || "Unknown";
    const rawSkill = item.VDMSkillName || "";
    const category = mapSkillToCategory(rawSkill);

    engineersSet.add(eng);

    if (!matrix[eng]) {
      matrix[eng] = {};
      engineerTotals[eng] = 0;
      targetCategories.forEach(cat => matrix[eng][cat] = 0);
    }
    
    matrix[eng][category]++;
    engineerTotals[eng]++;
    skillTotals[category]++;
  });

  let topSkill = "N/A";
  let maxCount = 0;
  Object.entries(skillTotals).forEach(([skill, count]) => {
    if (count > maxCount) {
      maxCount = count;
      topSkill = skill;
    }
  });

  return {
    engineers: Array.from(engineersSet).sort(),
    skills: targetCategories,
    matrix,
    engineerTotals,
    skillTotals,
    totalCases: data.length,
    activeEngineers: engineersSet.size,
    topSkill
  };
};
