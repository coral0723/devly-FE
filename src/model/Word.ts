export interface Example {
  source: string;
  text: string;
  translation: string;
}

export interface Quiz {
  text: string;
  distractors: string;
}

export interface Word {
  id: number;
  word: string;
  pronunciation: string;
  meaning: string;
  example: string;
  quiz: string;
}