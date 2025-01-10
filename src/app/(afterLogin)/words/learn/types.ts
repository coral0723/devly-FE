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