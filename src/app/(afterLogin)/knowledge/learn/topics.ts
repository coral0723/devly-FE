import { Knowlege } from "./types";

export const TOPIC_DATA: Knowlege[] = [
  {
    id: 1,
    title: "시간 복잡도와 공간 복잡도",
    subtitle: "알고리즘 성능 분석의 기초",
    tags: ["Algorithm", "Performance", "BigO"],
    content: [
        {
            type: "explanation",
            title: "시간 복잡도란?",
            text: "알고리즘이 실행되는 데 걸리는 시간을 나타내는 지표입니다.",
            examples: [
                "O(1): 상수 시간",
                "O(n): 선형 시간",
                "O(n²): 제곱 시간"
            ]
        },
        {
            type: "realWorld",
            title: "실무에서는?",
            text: "대규모 데이터를 처리할 때 시간 복잡도가 중요합니다.",
            examples: ["데이터베이스 쿼리 최적화", "검색 알고리즘 선택"]
        }
    ]
},
{
  id: 2,
  title: "React의 상태 관리",
  subtitle: "효율적인 상태 관리를 위한 기초",
  tags: ["React", "State Management", "Frontend"],
  content: [
      {
          type: "explanation",
          title: "상태 관리란?",
          text: "컴포넌트와 애플리케이션의 상태를 추적하고 업데이트하는 방법을 의미합니다.",
          examples: [
              "useState: 간단한 로컬 상태 관리",
              "useReducer: 복잡한 상태 로직 관리",
              "Context API: 전역 상태 관리"
          ]
      },
      {
          type: "realWorld",
          title: "실무에서는?",
          text: "다양한 상태 관리 라이브러리와 기법이 사용됩니다.",
          examples: [
              "Redux: 전역 상태 관리와 미들웨어 사용",
              "Recoil: React를 위한 모던 상태 관리",
              "zustand: 가벼운 상태 관리 라이브러리"
          ]
      }
  ]
},
{
    id: 3,
    title: "Docker 컨테이너",
    subtitle: "현대적 애플리케이션 배포",
    tags: ["DevOps", "Container", "Deployment"],
    content: [
        {
            type: "explanation",
            title: "컨테이너란?",
            text: "애플리케이션과 그 종속성을 패키징하는 경량화된 방식입니다.",
            examples: [
                "격리된 환경",
                "이식성",
                "확장성"
            ]
        },
        {
            type: "realWorld",
            title: "실무에서는?",
            text: "개발부터 배포까지 일관된 환경을 제공합니다.",
            examples: ["마이크로서비스 배포", "개발 환경 표준화"]
        }
    ]
}
]