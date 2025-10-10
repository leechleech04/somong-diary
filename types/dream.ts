export interface DreamDiaryType {
  _id: string;
  title: string;
  content: string;
  emotion: string;
  intensity: number;
  date: Date;
  hasAnalysis: boolean;
}

export interface DreamAnalysisType {
  dreamDiary_id: string;
  content: string;
}
