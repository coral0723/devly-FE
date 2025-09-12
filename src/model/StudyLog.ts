export interface Log {
  id: number;
  prId?: number;
  interviewId?: number;
  study: string;
  title: string;
  exp: number;
}

export interface StudyLog {
  date: string;
  logs: Log[];
}