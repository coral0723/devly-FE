import { Distractor } from "./Distractor";

export interface Knowledge {
  id: number;
  title: string;
  content: string;
  quiz: {
    text: string;
    distractors: Distractor[];
    answer: number;
  };
  code: string;
}
