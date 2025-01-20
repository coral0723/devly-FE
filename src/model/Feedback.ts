export interface Feedback {
  score: number; //점수
  feedbackPoints: {
    strengths: string[];    // 잘한 점들 
    improvements: string[]; // 개선이 필요한 점들
  };
  suggestions: {           // 구체적인 개선 제안
    title?: string;        // 제목 개선 제안
    description?: string;  // 설명 개선 제안
  };
  betterPRExplainer: string; //개선된 pr 설명 예시
}

