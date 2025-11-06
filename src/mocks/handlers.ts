import { DeveloperType } from '@/model/User';
import { faker } from '@faker-js/faker';
import { http, HttpResponse } from 'msw';

let requestCount = 0;

const delay = (ms: number) => new Promise((res) => {
  setTimeout(res, ms);
});

const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

const baseUrl = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_FRONTEND_URL : process.env.NEXT_PUBLIC_BASE_URL;

export const handlers = [
  http.get('/developerType', async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
        result: [1, 2],
      })
    );
  }),
  http.get(`${baseUrl}/mock/studies/tasks`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
        result: {
          word: {
            studyId: 1,
            total: 5,
            completed: false
          },
          knowledge: {
            studyId: 2,
            total: 3,
            completed: false
          },
          pr: {
            studyId: 3,
            total: 1,
            completed: false
          },
          interview: {
            studyId: 4,
            total: 1,
            completed: false
          },
        }
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }),
  http.get(`${baseUrl}/mock/weeklyActivity`, async () => {
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

    // 오늘의 요일 인덱스 구함 (0: 일 ~ 6: 토)
    const today = new Date();
    const todayIndex = today.getDay();

    // 오늘 포함 이후 요일 리스트 (ex. 금요일이면 ['금', '토', '일'])
    const targetDays = weekDays.slice(todayIndex).concat(todayIndex === 0 ? [] : []);

    // 전체 요일 데이터
    const fullWeekData = [
      {
        day: '월',
        activities: [
          {
            study: 'word',
            title: "개발 용어 5개",
            exp: 100,
            date: new Date("2025-01-20")
          },
          {
            study: 'knowledge',
            title: "개발/CS 지식 3개",
            exp: 150,
            date: new Date("2025-01-21")
          },
          {
            study: 'pr',
            title: "로그인 페이지 UI 구현",
            exp: 200,
            date: new Date("2025-01-20")
          },
          {
            study: 'interview',
            title: "프로젝트 아키텍처 설계 논의",
            exp: 200,
            date: new Date("2025-01-21")
          }
        ]
      },
      {
        day: '화',
        activities: [
          {
            study: 'knowledge',
            title: "개발/CS 지식 3개",
            exp: 150,
            date: new Date("2025-01-21")
          },
          {
            study: 'interview',
            title: "프로젝트 아키텍처 설계 논의",
            exp: 200,
            date: new Date("2025-01-21")
          }
        ]
      },
      {
        day: '수',
        activities: [
          {
            study: 'pr',
            title: "회원가입 유효성 검사 추가",
            exp: 200,
            date: new Date("2025-01-22")
          }
        ]
      },
      {
        day: '목',
        activities: [
          {
            study: 'word',
            title: "개발 용어 5개",
            exp: 100,
            date: new Date("2025-01-23")
          },
          {
            study: 'knowledge',
            title: "개발/CS 지식 3개",
            exp: 150,
            date: new Date("2025-01-23")
          }
        ]
      },
      {
        day: '금',
        activities: [
          {
            study: 'pr',
            title: "마이페이지 기능 구현",
            exp: 200,
            date: new Date("2025-01-24")
          },
          {
            study: 'interview',
            title: "코드 리뷰 및 피드백",
            exp: 200,
            date: new Date("2025-01-24")
          }
        ]
      },
      {
        day: '토',
        activities: [
          {
            study: 'word',
            title: "주간 개발 회고록 작성",
            exp: 100,
            date: new Date("2025-01-25")
          }
        ]
      },
      {
        day: '일',
        activities: []
      }
    ];

    // 오늘 포함 이후 요일의 activities를 빈 배열로 설정
    const modifiedResult = fullWeekData.map(item => ({
      ...item,
      activities: targetDays.includes(item.day) ? [] : item.activities
    }));

    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
        result: modifiedResult
      })
    );
  }),
  http.get(`${baseUrl}/mock/studies/:studyId/words/review`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
        result: {
          correctIds: [],
          incorrectIds: [1, 2, 3, 4, 5]
        }
      })
    )
  }),
  http.put(`${baseUrl}/mock/studies/:studyId/words/review`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
      })
    )
  }),
  http.get(`${baseUrl}/mock/words/:studyId`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
        result: {
          words: [
            {
              id: 1,
              word: "Encapsulation",
              meaning: "캡슐화",
              example: JSON.stringify({
                source: "Object-Oriented Programming Guide",
                text: "Encapsulation helps to protect an object's internal state by restricting direct access.",
                translation: "캡슐화는 직접적인 접근을 제한함으로써 객체의 내부 상태를 보호하는 데 도움이 됩니다."
              }),
              quiz: JSON.stringify({
                text: "Encapsulation helps to protect an object's internal state by restricting direct access.",
                distractors: [
                  "Abstraction",
                  "Polymorphism",
                  "Inheritance"
                ]
              }),
              pronunciation: "/ɛnˌkæpsjʊˈleɪʃən/"
            },
            {
              id: 2,
              word: "Abstraction",
              meaning: "추상화",
              example: JSON.stringify({
                source: "Software Engineering Textbook",
                text: "Abstraction hides complexity by showing only essential features of an object.",
                translation: "추상화는 객체의 필수적인 특징만 보여줌으로써 복잡성을 숨깁니다."
              }),
              quiz: JSON.stringify({
                text: "Abstraction hides complexity by showing only essential features of an object.",
                distractors: [
                  "Encapsulation",
                  "Serialization",
                  "Mutation"
                ]
              }),
              pronunciation: "/æbˈstrækʃən/"
            },
            {
              id: 3,
              word: "Polymorphism",
              meaning: "다형성",
              example: JSON.stringify({
                source: "OOP Principles Overview",
                text: "Polymorphism allows objects to be treated as instances of their parent class.",
                translation: "다형성은 객체들이 부모 클래스의 인스턴스로 취급될 수 있도록 합니다."
              }),
              quiz: JSON.stringify({
                text: "Polymorphism allows objects to be treated as instances of their parent class.",
                distractors: [
                  "Inheritance",
                  "Casting",
                  "Typing"
                ]
              }),
              pronunciation: "/ˌpɒliˈmɔːfɪzəm/"
            },
            {
              id: 4,
              word: "Inheritance",
              meaning: "상속",
              example: JSON.stringify({
                source: "Java Programming Handbook",
                text: "Inheritance enables a class to acquire properties and behavior from another class.",
                translation: "상속은 한 클래스가 다른 클래스의 속성과 동작을 얻을 수 있게 합니다."
              }),
              quiz: JSON.stringify({
                text: "Inheritance enables a class to acquire properties and behavior from another class.",
                distractors: [
                  "Aggregation",
                  "Composition",
                  "Cloning"
                ]
              }),
              pronunciation: "/ɪnˈhɛrɪtəns/"
            },
            {
              id: 5,
              word: "Recursion",
              meaning: "재귀",
              example: JSON.stringify({
                source: "Algorithms 101",
                text: "Recursion is a method where the solution to a problem depends on solutions to smaller instances of the same problem.",
                translation: "재귀는 문제의 해결이 같은 문제의 더 작은 인스턴스들의 해결에 의존하는 방식입니다."
              }),
              quiz: JSON.stringify({
                text: "Recursion is a method where the solution to a problem depends on solutions to smaller instances of the same problem.",
                distractors: [
                  "Iteration",
                  "Looping",
                  "Branching"
                ]
              }),
              pronunciation: "/rɪˈkɜːʃən/"
            }
          ]
        }
      })
    )
  }),
  http.get(`${baseUrl}/mock/studies/:studyId/knowledge/review`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
        result: {
          correctIds: [],
          incorrectIds: [1, 2, 3]
        }
      })
    )
  }),
  http.put(`${baseUrl}/mock/studies/:studyId/knowledge/review`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
      })
    )
  }),
  http.get(`${baseUrl}/mock/knowledges/:studyId`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
        result: [
          {
            id: 1,
            title: "스레드의 기본 개념",
            content: "스레드는 프로세스 내에서 실행되는 가장 작은 실행 단위입니다.\n하나의 프로세스는 여러 개의 스레드를 가질 수 있으며, 각 스레드는 같은 프로세스의 메모리를 공유합니다.",
            quiz: {
              text: "다음 중 스레드의 특징이 아닌 것은?",
              distractors: [
                {
                  id: 1,
                  distractor: "프로세스의 메모리를 공유한다",
                },
                {
                  id: 2,
                  distractor: "각 스레드는 독립적인 메모리 공간을 가진다",
                },
                {
                  id: 3,
                  distractor: "동시에 여러 작업을 수행할 수 있다",
                },
                {
                  id: 4,
                  distractor: "스택 영역은 스레드마다 독립적이다",
                },
              ],
              answer: 1
            },
            code: "// Java에서 스레드 생성 예시\n\nclass MyThread extends Thread {\npublic void run() {\n    System.out.println(\"스레드 실행 중\");\n}\n}\n\npublic class Main {\npublic static void main(String[] args) {\n    MyThread thread = new MyThread();\n    thread.start(); // 새로운 스레드 시작\n}\n}"
          },
          {
            id: 2,
            title: "스레드 동기화",
            content: "여러 스레드가 동시에 같은 자원에 접근할 때 발생할 수 있는 문제를 방지하기 위해 동기화가 필요합니다.\n synchronized 키워드나 락을 사용하여 스레드 간 동기화를 구현할 수 있습니다.",
            quiz: {
              text: "다음 중 스레드 동기화 방법이 아닌 것은?",
              distractors: [
                {
                  id: 1,
                  distractor: "synchronized 키워드 사용",
                },
                {
                  id: 2,
                  distractor: "ReentrantLock 사용",
                },
                {
                  id: 3,
                  distractor: "volatile 키워드 사용",
                },
                {
                  id: 4,
                  distractor: "thread.stop() 메서드 사용"
                },
              ],
              answer: 3
            },
            code: "// 동기화 예시\n\npublic class Counter {\nprivate int count = 0;\n\npublic synchronized void increment() {\n    count++;\n}\n\npublic synchronized int getCount() {\n    return count;\n}\n}"
          },
          {
            id: 3,
            title: "SSR(Server-Side Rendering)의 개념",
            content: "SSR은 서버에서 페이지의 HTML을 생성하여 클라이언트에 전달하는 렌더링 방식입니다.\n초기 로딩 속도와 SEO 측면에서 장점을 가집니다.",
            quiz: {
              text: "SSR의 주요 장점이 아닌 것은?",
              distractors: [
                {
                  id: 1,
                  distractor: "더 나은 SEO",
                },
                {
                  id: 2,
                  distractor: "빠른 초기 페이지 로드",
                },
                {
                  id: 3,
                  distractor: "낮은 서버 부하",
                },
                {
                  id: 4,
                  distractor: "더 나은 소셜 미디어 공유",
                },
              ],
              answer: 2
            },
            code: "// Next.js SSR 예시\n\n// pages/index.js\nexport async function getServerSideProps() {\nconst res = await fetch('https://api.example.com/data')\nconst data = await res.json()\n\nreturn {\nprops: {\ndata,\n},\n}\n}\n\nexport default function Home({ data }) {\nreturn (\n<div>\n{data.map(item => (\n<div key={item.id}>{item.title}</div>\n))}\n</div>\n)\n}"
          },
        ]
      })
    )
  }),
  http.get('/api/knowledges/:studyId/review', async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
        result: [
          {
            id: 1,
            title: "스레드의 기본 개념",
            content: "스레드는 프로세스 내에서 실행되는 가장 작은 실행 단위입니다. 하나의 프로세스는 여러 개의 스레드를 가질 수 있으며, 각 스레드는 같은 프로세스의 메모리를 공유합니다.",
            quiz: {
              text: "다음 중 스레드의 특징이 아닌 것은?",
              distractors: [
                {
                  id: 1,
                  distractor: "프로세스의 메모리를 공유한다",
                },
                {
                  id: 2,
                  distractor: "각 스레드는 독립적인 메모리 공간을 가진다",
                },
                {
                  id: 3,
                  distractor: "동시에 여러 작업을 수행할 수 있다",
                },
                {
                  id: 4,
                  distractor: "스택 영역은 스레드마다 독립적이다",
                },
              ],
              answer: 1
            },
            code: "// Java에서 스레드 생성 예시입니당\nclass MyThread extends Thread {\npublic void run() {\n    System.out.println(\"스레드 실행 중\");\n}\n}\n\npublic class Main {\npublic static void main(String[] args) {\n    MyThread thread = new MyThread();\n    thread.start(); // 새로운 스레드 시작\n}\n}"
          },
          {
            id: 2,
            title: "스레드 동기화",
            content: "여러 스레드가 동시에 같은 자원에 접근할 때 발생할 수 있는 문제를 방지하기 위해 동기화가 필요합니다. synchronized 키워드나 락을 사용하여 스레드 간 동기화를 구현할 수 있습니다.",
            quiz: {
              text: "다음 중 스레드 동기화 방법이 아닌 것은?",
              distractors: [
                {
                  id: 1,
                  distractor: "synchronized 키워드 사용",
                },
                {
                  id: 2,
                  distractor: "ReentrantLock 사용",
                },
                {
                  id: 3,
                  distractor: "volatile 키워드 사용",
                },
                {
                  id: 4,
                  distractor: "thread.stop() 메서드 사용"
                },
              ],
              answer: 3
            },
            code: "// 동기화 예시\npublic class Counter {\nprivate int count = 0;\n\npublic synchronized void increment() {\n    count++;\n}\n\npublic synchronized int getCount() {\n    return count;\n}\n}"
          },
          {
            id: 3,
            title: "SSR(Server-Side Rendering)의 개념",
            content: "SSR은 서버에서 페이지의 HTML을 생성하여 클라이언트에 전달하는 렌더링 방식입니다. 초기 로딩 속도와 SEO 측면에서 장점을 가집니다.",
            quiz: {
              text: "SSR의 주요 장점이 아닌 것은?",
              distractors: [
                {
                  id: 1,
                  distractor: "더 나은 SEO",
                },
                {
                  id: 2,
                  distractor: "빠른 초기 페이지 로드",
                },
                {
                  id: 3,
                  distractor: "낮은 서버 부하",
                },
                {
                  id: 4,
                  distractor: "더 나은 소셜 미디어 공유",
                },
              ],
              answer: 2
            },
            code: "// Next.js SSR 예시\n// pages/index.js\nexport async function getServerSideProps() {\nconst res = await fetch('https://api.example.com/data')\nconst data = await res.json()\n\nreturn {\nprops: {\ndata,\n},\n}\n}\n\nexport default function Home({ data }) {\nreturn (\n<div>\n{data.map(item => (\n<div key={item.id}>{item.title}</div>\n))}\n</div>\n)\n}"
          },
        ]
      })
    )
  }),
  http.get(`${baseUrl}/mock/pr/study/:studyId`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
        result: {
          id: 1,
          title: "Refactor login flow to improve readability and error handling",
          description: `로그인 흐름을 리팩터링하여 가독성과 오류 처리를 개선`,
          labels: [
            "refactor",
            "login",
            "frontend",
            "improvement"
          ]
        }
      })
    )
  }),
  http.get(`${baseUrl}/mock/pr/:prId/changed-files`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
        result: {
          files: [
            {
              id: null,
              prId: 1,
              fileName: "src/hooks/useLogin.ts",
              language: "TypeScript",
              content: "import { useState } from \"react\";\nimport axios from \"axios\";\n\nexport function useLogin() {\n  const [loading, setLoading] = useState(false);\n\n  async function login(username: string, password: string) {\n    setLoading(true);\n    try {\n      const res = await axios.post(\"/api/login\", { username, password });\n      if (res.status !== 200) {\n        alert(\"Login failed\");\n      }\n    } catch (e) {\n      console.error(e);\n    } finally {\n      setLoading(false);\n    }\n  }\n\n  return { login, loading };\n}"
            },
            {
              id: null,
              prId: 1,
              fileName: "src/hooks/useLogin.ts",
              language: "TypeScript",
              content: "import { useState } from \"react\";\nimport axios from \"axios\";\n\nexport function useLogin() {\n  const [loading, setLoading] = useState(false);\n  const [error, setError] = useState<string | null>(null);\n\n  async function login(username: string, password: string) {\n    setLoading(true);\n    setError(null);\n    try {\n      const res = await axios.post(\"/api/login\", { username, password });\n      if (res.status !== 200) {\n        throw new Error(\"Invalid credentials\");\n      }\n    } catch (e: any) {\n      console.error(\"Login error:\", e);\n      setError(e.message || \"Unknown error\");\n    } finally {\n      setLoading(false);\n    }\n  }\n\n  return { login, loading, error };\n}"
            }
          ]
        }
      })
    )
  }),
  http.get(`${baseUrl}/mock/pr/:prId/comments`, async ({  }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
        result: {
          comments: [
            {
              id: 5,
              idx: 0,
              prId: 1,
              content: "변경된 파일을 확인하여 PR을 작성해 주세요."
            },
            {
              id: 6,
              idx: 1,
              prId: 1,
              content: "에러 상태를 관리하는 방식에 대해 더 나은 접근이 있을지 궁금합니다."
            },
            {
              id: 7,
              idx: 2,
              prId: 1,
              content: "로그인 실패 시 사용자 경험을 개선할 수 있는 방법이 있을까요?"
            }
          ]
        }
      })
    )
  }),
  http.post(`${baseUrl}/mock/pr/review/comment/:commentId`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "Success",
        message: "성공",
        result: {
          review: "좋은 지적입니다. 해당 부분은 사용자 경험과 코드 유지보수 측면에서 더 고민해볼 여지가 있는 것 같습니다.",
        },
      })
    )
  }),
  http.post(`${baseUrl}/mock/pr/:prId/study/:studyId/done`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "Success",
        message: "성공",
      })
    )
  }),
  http.get(`${baseUrl}/mock/study/interviews/:studyId`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
        result: [
          {
            id: 1,
            title: "React Virtual DOM",
            description: "간단한 Virtual DOM과 실제 DOM의 차이점을 설명해보세요.",
            difficulty: "고급",
            estimatedTime: "45분",
            category: "React",
            tags: ["Virtual DOM", "React", "Performance"]
          },
        ]
      })
    )
  }),
  http.get(`${baseUrl}/mock/study/interview/:id`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
        result: [{
          id: Date.now(),
          role: 'ai',
          content: 'Virtual DOM의 개념에 대해 설명해주시겠어요?',
          end: false
        }]
      })
    );
  }),
  http.post(`${baseUrl}/mock/study/interview/recomment/:id`, async ({ }) => {
    await delay(2000);
    return new HttpResponse(
      JSON.stringify({
        id: Date.now() + 1,
        role: 'ai',
        content: '좋은 답변이었습니다.',
        end: Math.random() < 0.7
      })
    )
  }),
  http.get(`${baseUrl}/mock/profile`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
        result: {
          id: "user",
          nickname: "devly",
          profile: faker.image.avatar(),
          developerType: 2,
          level: 6
        }
      })
    );
  }),
  http.get(`${baseUrl}/mock/profile/stats`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
        result: {
          days: 24,
          exp: 3434,
          words: 32,
          knowledge: 55,
          pr: 19,
          interview: 4
        }
      })
    );
  }),
  http.get(`/mock/rankings`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
        result: {
          totalUsers: 1234,
          myRank: 33,
          rankings: [
            // Top 3
            { rank: 1, name: "김서준", score: 2840, level: 8, change: 'up' },
            { rank: 2, name: "이도윤", score: 2790, level: 7, change: 'same' },
            { rank: 3, name: "박지호", score: 2755, level: 7, change: 'up' },
            // 4-5위
            { rank: 4, name: "최수아", score: 2720, level: 6, change: 'down' },
            { rank: 5, name: "정하준", score: 2685, level: 6, change: 'up' },
            // 구분선
            { type: 'separator', rank: '...' },
            // 내 주변 순위
            { rank: 40, name: "장현우", score: 2250, level: 4, change: 'up' },
            { rank: 41, name: "임지원", score: 2235, level: 4, change: 'down' },
            { rank: 42, name: "devly", score: 2220, level: 4, change: 'same', isMe: true },
            { rank: 42, name: "한소희", score: 2220, level: 4, change: 'up' },
            { rank: 44, name: "송태호", score: 2190, level: 4, change: 'down' },
          ]
        }
      })
    );
  }),
  http.get(`${baseUrl}/mock/review`, async ({ }) => {
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - 1 - requestCount * 3); // 시작 날짜

    const result = Array.from({ length: 3 }, (_, i) => {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() - i); // 하루씩 감소

      return {
        date,
        logs: [
          {
            id: 1,
            study: 'word',
            title: "개발 용어 5개",
            exp: 130
          },
          {
            id: 2,
            study: 'knowledge',
            title: "개발/CS 지식 3개",
            exp: 200
          },
          {
            id: 3,
            prId: 1,
            study: 'pr',
            title: "로그인 흐름 리팩토링",
            exp: 150
          },
          {
            id: 4,
            interviewId: 1,
            study: 'interview',
            title: "React Vitual DOM",
            exp: 200
          }
        ]
      };
    });

    requestCount++; // 요청 수 증가

    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
        result,
      })
    );
  })
];
