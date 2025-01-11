import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/study/today-tasks', async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        word: {
          groupId: 1,
          total: 5,
          completed: false
        },
        knowledge: {
          groupId: 2,
          total: 5,
          completed: false
        },
        pr: {
          groupId: 3,
          total: 5,
          completed: false
        },
        discussion: {
          groupId: 4,
          total: 5,
          completed: true
        },
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }),
  http.get('/study/words/:groupId', async ({ }) => {

    return new HttpResponse(
      JSON.stringify([
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
          },
          quiz: {
            text: "The implementation details of React components should be hidden from their consumers.",
            distractors: [
              "import",
              "book",
              "number",
            ]
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
          },
          quiz: {
            text: "The implementation details of React components should be hidden from their consumers.",
            distractors: [
              "import",
              "book",
              "number",
            ]
          }
      },
      {
        id: 3,
        word: "function",
        pronunciation: "ˈfəŋkʃn",
        meaning: "특정 작업을 수행하는 재사용 가능한 코드 블록.",
        quiz: {
          text: "A function is a block of organized and reusable code that performs a single action.",
          distractors: ["fuction", "functoin", "functon"],
        },
        example: {
          text: "A function is a block of organized and reusable code that performs a single action.",
          highlight: "function",
          source: "Programming 101",
          context: "Functions are used to create reusable code and make programs modular.",
        },
      },
      {
        id: 4,
        word: "variable",
        pronunciation: "ˈvɛːrɪəbl",
        meaning: "값을 저장하는 메모리의 명명된 위치.",
        quiz: {
          text: "A variable is used to store data that can be changed during program execution.",
          distractors: ["varible", "variabel", "veriable"],
        },
        example: {
          text: "A variable is used to store data that can be changed during program execution.",
          highlight: "variable",
          source: "Intro to Programming",
          context: "Variables provide a way to name data that can be referenced and manipulated.",
        },
      },
      {
        id: 5,
        word: "iteration",
        pronunciation: "ˌɪtəˈreɪʃn",
        meaning: "조건이 충족될 때까지 명령어 집합을 반복하는 과정.",
        quiz: {
          text: "Iteration is a process where a set of instructions is repeated until a condition is met.",
          distractors: ["iteraton", "iterarion", "itertion"],
        },
        example: {
          text: "Iteration is a process where a set of instructions is repeated until a condition is met.",
          highlight: "iteration",
          source: "Algorithm Basics",
          context: "In programming, iteration is often implemented using loops such as for or while.",
        },
      }
      ])
    )
  })
];
