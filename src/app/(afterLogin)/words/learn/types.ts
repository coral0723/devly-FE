export interface WordData {
  id: number;
  word: string;
  pronunciation: string;
  meaning: string;
  example: {
    source: string;
    text: string;
    highlight: string;
    context: string;
  };
  quiz: {
    text: string;
    distractors: string[]
  }
}