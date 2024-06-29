export type Log = {
  adventure: string;
  report: string;
  score: number;
  createdAt: string;
};

export interface UserState {
  name?: string;
  password?: string;
  registered: boolean;
  backpack: string[];
  logs: Log[];
}
