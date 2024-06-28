export type Item = {
  name: string;
  description: string;
};

export type BackpackItem = string;

export type User = {
  name: string;
  password: string;
};

export type ScoreRow = {
  name: string;
  score: number;
};

export type Score = {
  updatedAt?: string;
  rows: ScoreRow[];
};
