export interface Counter {
  emoji: string;
  by: { userID: string; fullName: string; avatar: string };
}

export interface PostStatsProps {
  comments: number;
  counters: Counter[];
}
