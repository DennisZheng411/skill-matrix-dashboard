export interface Incident {
  OwnerAlias?: string;
  VDMSkillName?: string;
  [key: string]: any;
}

export interface SkillMatrixData {
  engineers: string[];
  skills: string[];
  matrix: Record<string, Record<string, number>>;
  engineerTotals: Record<string, number>;
  skillTotals: Record<string, number>;
  totalCases: number;
  activeEngineers: number;
  topSkill: string;
}
