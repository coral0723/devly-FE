export interface Feedback {
  score: number; //점수
  feedbackPoints: {
    strengths: { // 잘한 점들 
      example: string; //사용자가 적은 텍스트
      content: string; //그에 따른 설명
    }[];    
    improvements: string[]; // 개선이 필요한 점들
  };
  suggestions: {           // 구체적인 개선 제안
    title?: string;        // 제목 개선 제안
    description?: string;  // 설명 개선 제안
  };
  betterPRExplainer: string; //개선된 pr 설명 예시
}

