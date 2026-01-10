
export interface Incident {
  OwnerAlias: string;
  VDMSkillName: string;
  CreatedDate?: string;
  [key: string]: any;
}

export interface SkillMatrixData {
  engineers: string[];
  skills: string[];
  matrix: Record<string, Record<string, number>>;
  totalCases: number;
  activeEngineers: number;
  topSkill: string;
}
