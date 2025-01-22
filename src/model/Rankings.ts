export interface Rankings {
  totalUsers: number;
  myRank: number;
  rankings: {
    rank: number | string;
    name?: string;
    score?: number;
    level?: number;
    change?: string;
    type?: string;
    isMe?: boolean;
  }[];
}