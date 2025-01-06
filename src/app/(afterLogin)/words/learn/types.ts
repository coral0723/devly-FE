export interface WordExample {
  source: string;
  text: string;
  highlight: string;
  context: string;
}

export interface WordData {
  id: number;
  word: string;
  pronunciation: string;
  meaning: string;
  example: WordExample;
}

export interface FeedbackData {
  accuracy: number;
  message: string;
}