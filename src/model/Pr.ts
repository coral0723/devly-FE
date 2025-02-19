export interface Pr {
  id: number;
  title: string;
  changedFiles: { //"변경된 파일" modal의 정보
    name: string;
    language: string;
    content: string;
  }[];
  reviewComment: { // "리뷰어 답변" 페이지의 코멘트
    comment: string;
  };
}