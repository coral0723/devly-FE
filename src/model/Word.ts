export interface Word {
  id: number;
  word: string;
  pronunciation: string;
  meaning: string;
  example: {
    source: string;
    text: string;
    translation: string;
  };
  quiz: {
    text: string;
    distractors: string[];
  }
}