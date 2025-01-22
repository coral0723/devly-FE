export interface DailyActivity {
  day: string;
  activities: {
    study: string;
    title: string;
    exp: number;
    date: Date;
  }[];
}