export type Log = {
  adventure: string;
  backpack: {
    initialItems: string[];
    lostItems: string[];
    newItems: string[];
  };
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
