export interface StudyLog {
  date: string;
  logs: {
    study: string;
    title: string;
    exp: number;
  }[];
}