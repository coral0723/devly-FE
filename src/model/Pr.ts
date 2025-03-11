export interface Pr {
  id: number;
  title: string;
  changedFiles: { //"변경된 파일" modal의 정보
    name: string;
    language: 'java' | 'javascript';
    content: string;
  }[];
  reviewComment: { // "리뷰어 답변" 페이지의 코멘트
    comment: string;
  };
}

export interface PrFiles {
  files: {
    id: number;
    prId: number; 
    fileName: string;
    language: 'Java | Javascript';
    content: string;
  }[];
}