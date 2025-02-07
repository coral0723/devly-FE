export interface Tasks {
  word: {
    studyId: number | null;
    total: number;
    completed: boolean;
  },
  knowledge: {
    studyId: number | null;
    total: number;
    completed: boolean;
  },
  pr: {
    studyId: number | null;
    total: number;
    completed: boolean;
  },
  discussion: {
    studyId: number | null;
    total: number;
    completed: boolean;
  },
}
