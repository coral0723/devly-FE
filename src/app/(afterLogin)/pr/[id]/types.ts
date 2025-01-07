export interface Commit {
  hash: string;
  message: string;
}

export interface Code {
  type: string;
  content: string;
  highlight?: { color: string; }
}

export interface File {
  name: string;
  language: string;
  changes: Code[];
}

export interface ReviewComment {
  id: number;
  comment: string;
}

export interface PrDetailedData {
  title: string;
  commits: Commit[];
  changedFiles: File[];
  reviewComments: ReviewComment[];
}