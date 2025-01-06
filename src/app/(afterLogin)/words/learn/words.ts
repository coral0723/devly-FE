import { WordData } from "./types";


export const WORDS_DATA: WordData[] = [
  {
      id: 1,
      word: 'implementation',
      pronunciation: '/ˌɪmplɪmenˈteɪʃən/',
      meaning: '구현, 실행',
      example: {
          source: 'React Documentation',
          text: "The implementation details of React components should be hidden from their consumers.",
          highlight: "implementation",
          context: "React 컴포넌트의 구현 세부사항은 해당 컴포넌트를 사용하는 쪽으로부터 숨겨져야 합니다.",
      }
  },
  {
      id: 2,
      word: 'deprecated',
      pronunciation: '/ˈdeprəkeɪtɪd/',
      meaning: '더 이상 사용되지 않는, 권장되지 않는',
      example: {
          source: 'Node.js Documentation',
          text: "This API is deprecated and will be removed in the next major version.",
          highlight: "deprecated",
          context: "이 API는 더 이상 사용되지 않으며 다음 주요 버전에서 제거될 예정입니다.",
      }
  }
];

export default WORDS_DATA;