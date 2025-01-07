import { Topic } from "./types";

export const TOPIC_DATA: Topic[] = [
  {
    id: 1,
    title: "시간 복잡도와 공간 복잡도",
    subtitle: "알고리즘 성능 분석의 기초",
    tags: ["Algorithm", "Performance", "BigO"],
    content: [
        {
            type: "intro",
            text: "프로그램의 성능을 측정하는 두 가지 중요한 지표에 대해 알아봅시다.",
            imageSrc: "/images/complexity.svg"
        },
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
    title: "데이터베이스 인덱스",
    subtitle: "빠른 검색을 위한 핵심 기술",
    tags: ["Database", "Performance", "Index"],
    content: [
        {
            type: "intro",
            text: "인덱스는 어떻게 데이터베이스 성능을 향상시킬까요?",
            imageSrc: "/images/index.svg"
        },
        {
            type: "explanation",
            title: "인덱스의 원리",
            text: "도서관의 목차와 같이, 데이터를 빠르게 찾을 수 있게 도와줍니다.",
            examples: [
                "B-Tree 구조",
                "Primary Key 인덱스",
                "Secondary 인덱스"
            ]
        },
        {
            type: "realWorld",
            title: "실무에서는?",
            text: "적절한 인덱스 설계로 쿼리 성능을 최적화할 수 있습니다.",
            examples: ["사용자 검색 최적화", "주문 조회 성능 향상"]
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
            type: "intro",
            text: "컨테이너화가 왜 현대 개발에서 중요할까요?",
            imageSrc: "/images/docker.svg"
        },
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