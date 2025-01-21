export interface Feedback {
  score: number;  // 점수
  feedbackPoints: {
    strengths: {
      example: string;      // 실제 작성된 텍스트 예시
      explanation: string;  // 왜 잘했는지에 대한 구체적인 설명
    }[];
    improvements: {
      point: string;       // 개선이 필요한 부분
      reason: string;      // 왜 개선이 필요한지에 대한 설명
    }[];
  };
  suggestions: {
    title: string; // 제안하는 개선된 내용
    description: string;  // 개선 제안에 대한 설명
  };
  betterPRExplainer: string;  // 모범 답안 예시
}

