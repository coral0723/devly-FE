export interface Knowledge {
  id: number;
  title: string;
  content: string;
  practice: {
    question: string;
    options: string[];
    answer: number;
  };
  code: string;
}