import { Incident, SkillMatrixData } from '../types';

// ★ 请确保这里是你正确的 Azure Function URL ★
const API_BASE_URL = "https://functionforlogic011026-fxgnfxaqhygvbhc7.eastasia-01.azurewebsites.net/api/HttpTrigger1?code=SSZEPSxKltmeSa6zv0D8zFbAdPKogjGZAQLx3xLRBMHUAzFu0-PRAQ==";

export const fetchIncidents = async (startDate: string, endDate: string): Promise<Incident[]> => {
  const url = `${API_BASE_URL}&startDate=${startDate}&endDate=${endDate}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return await response.json();
};

// --- 新增：技能分类映射逻辑 ---
const mapSkillToCategory = (rawSkill: string): string => {
  if (!rawSkill) return "Other";
  
  const upper = rawSkill.toUpperCase();

  // 根据前缀进行归类
  if (upper.startsWith("AAPDEV")) return "AAPdev";
  if (upper.startsWith("AAPCFG")) return "AAPcfg";
  if (upper.startsWith("AAPPRF")) return "AAPprf";
  if (upper.startsWith("AAPOSS")) return "AAPoss";
  if (upper.startsWith("AISLGA")) return "AISLGA";
  if (upper.startsWith("PDAPIM")) return "PDapim";
  
  // 特殊处理 Storage (通常 PDSTG 或包含 Storage 字样)
  if (upper.startsWith("PDSTG") || upper.includes("STORAGE")) return "Storage";

  // 所有未匹配的都归为 Other
  return "Other";
};

export const processMatrixData = (data: Incident[]): SkillMatrixData => {
  const engineers = new Set<string>();
  const matrix: Record<string, Record<string, number>> = {};
  
  // 1. 定义我们想要的固定列顺序 (和你截图一致)
  const targetCategories = [
    "Total",    // 我们顺便把 Total 算出来放在第一列
    "AAPdev", 
    "AAPcfg", 
    "AAPprf", 
    "AAPoss", 
    "Storage", 
    "AISLGA", 
    "PDapim", 
    "Other"
  ];

  // 用于统计 Top Skill (排除 Total)
  const skillCounts: Record<string, number> = {};

  data.forEach(item => {
    const eng = item.OwnerAlias || "Unknown";
    const rawSkill = item.VDMSkillName || "";
    
    // ★ 核心变化：使用映射函数获取短分类
    const category = mapSkillToCategory(rawSkill);

    engineers.add(eng);

    // 初始化矩阵节点
    if (!matrix[eng]) matrix[eng] = {};
    
    // 累加具体分类
    if (!matrix[eng][category]) matrix[eng][category] = 0;
    matrix[eng][category]++;

    // 累加 Total (总数)
    if (!matrix[eng]["Total"]) matrix[eng]["Total"] = 0;
    matrix[eng]["Total"]++;

    // 统计全局 Top Skill (不含 Total)
    if (category !== "Total") {
      skillCounts[category] = (skillCounts[category] || 0) + 1;
    }
  });

  // 找出 Top Skill
  let topSkill = "N/A";
  let maxCount = 0;
  Object.entries(skillCounts).forEach(([skill, count]) => {
    if (count > maxCount) {
      maxCount = count;
      topSkill = skill;
    }
  });

  return {
    engineers: Array.from(engineers).sort(), // 工程师按字母排序
    skills: targetCategories,                // ★ 强制使用我们定义的列顺序
    matrix,
    totalCases: data.length,
    activeEngineers: engineers.size,
    topSkill
  };
};