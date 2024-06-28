type ScoreRow = {
  name: string;
  score: number;
};

export interface ScoreState {
  updatedAt?: string;
  rows: ScoreRow[];
}
