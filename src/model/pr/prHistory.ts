import { Feedback } from "./Feedback";

export interface PrHistory {
  id: string;
  firstAnswer: string;
  firstFeedback: Feedback;
  secondAnswer: string;
  secondFeedback: Feedback;
}