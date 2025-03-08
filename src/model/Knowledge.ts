export interface Distractor {
  id: number;
  distractor: string;
}

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

// export interface Knowledge {
//   id: number;
//   title: string;
//   content: string;
//   practice: {
//     question: string;
//     options: string[];
//     answer: number;
//   };
//   code: string;
// }
