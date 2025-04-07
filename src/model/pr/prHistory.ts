import { Feedback } from "./Feedback";

export interface PrHistory {
  id: string;
  answers: string[];
  feedbacks: Feedback[];
}