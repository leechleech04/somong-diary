export interface DreamDiary {
  _id: string;
  title: string;
  content: string;
  emotion: string;
  intensity: number;
  date: Date;
  hasAnalysis: boolean;
}

export interface DreamAnalysis {
  dreamDiary_id: string;
  content: string;
}
