import { DeveloperType } from '@/model/User';
import { faker } from '@faker-js/faker';
import { http, HttpResponse } from 'msw';

const delay = (ms: number) => new Promise((res) => {
  setTimeout(res, ms);
});

const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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
          discussion: {
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
  http.get(`${baseUrl}/mock/weeklyActivity`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
        result: [
          {
            day: '월',
            activities: [
              {
                study: 'word',
                title: "리액트 훅 사용법 정리",
                exp: 150,
                date: new Date("2025-01-20")
              },
              {
                study: 'knowledge',
                title: "Next.js 13 새로운 기능 학습",
                exp: 180,
                date: new Date("2025-01-21")
              },
              {
                study: 'pr',
                title: "로그인 페이지 UI 구현",
                exp: 200,
                date: new Date("2025-01-20")
              },
              {
                study: 'discussion',
                title: "프로젝트 아키텍처 설계 논의",
                exp: 120,
                date: new Date("2025-01-21")
              }
            ]
          },
          {
            day: '화',
            activities: [
              {
                study: 'knowledge',
                title: "Next.js 13 새로운 기능 학습",
                exp: 180,
                date: new Date("2025-01-21")
              },
              {
                study: 'discussion',
                title: "프로젝트 아키텍처 설계 논의",
                exp: 120,
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
                exp: 160,
                date: new Date("2025-01-22")
              }
            ]
          },
          {
            day: '목',
            activities: [
              {
                study: 'word',
                title: "타입스크립트 제네릭 정리글 작성",
                exp: 130,
                date: new Date("2025-01-23")
              },
              {
                study: 'knowledge',
                title: "상태관리 라이브러리 비교 분석",
                exp: 200,
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
                exp: 190,
                date: new Date("2025-01-24")
              },
              {
                study: 'discussion',
                title: "코드 리뷰 및 피드백",
                exp: 140,
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
        ]
      })
    )
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
              word: "Annotation-based Configuration",
              meaning: "주석 기반 설정",
              example: JSON.stringify({
                source: "Spring Framework Documentation",
                text: "Spring allows for annotation-based configuration of your application.",
                translation: "스프링은 애플리케이션의 주석 기반 설정을 허용합니다."
              }),
              quiz: JSON.stringify({
                text: "What does Annotation-based Configuration mean in Spring Framework?",
                distractors: [
                  "Code-based Configuration",
                  "XML-based Configuration",
                  "Java-based Configuration",
                  "HTML-based Configuration"
                ]
              }),
              pronunciation: "/ænəʊˈteɪʃən beɪst kənˈfɪɡəˈreɪʃən/"
            },
            {
              id: 2,
              word: "Dependency Injection",
              meaning: "의존성 주입",
              example: JSON.stringify({
                source: "Spring Framework Documentation",
                text: "Dependency Injection is a fundamental aspect of the Spring framework.",
                translation: "의존성 주입은 스프링 프레임워크의 기본적인 측면입니다."
              }),
              quiz: JSON.stringify({
                text: "What is a fundamental aspect of the Spring framework?",
                distractors: [
                  "Dependency Extraction",
                  "Dependency Reduction",
                  "Dependency Increase",
                  "Dependency Multiplication"
                ]
              }),
              pronunciation: "/dɪˈpɛndənsi ɪnˈdʒɛkʃən/"
            },
            {
              id: 3,
              word: "Aspect Oriented Programming (AOP)",
              meaning: "관점 지향 프로그래밍",
              example: JSON.stringify({
                source: "Spring Framework Documentation",
                text: "Spring supports Aspect Oriented Programming (AOP) for separation of concerns.",
                translation: "스프링은 관심사의 분리를 위해 관점 지향 프로그래밍(AOP)를 지원합니다."
              }),
              quiz: JSON.stringify({
                text: "What does Spring use for separation of concerns?",
                distractors: [
                  "Object Oriented Programming",
                  "Functional Programming",
                  "Procedural Programming",
                  "Modular Programming"
                ]
              }),
              pronunciation: "/ˈæspekt ˈɔːrientid ˈproʊgræmɪŋ/"
            },
            {
              id: 4,
              word: "Inversion of Control (IoC)",
              meaning: "제어의 역전",
              example: JSON.stringify({
                source: "Spring Framework Documentation",
                text: "Inversion of Control (IoC) is a design principle which guides the design of Spring Framework.",
                translation: "제어의 역전(IoC)은 스프링 프레임워크의 설계를 안내하는 설계 원칙입니다."
              }),
              quiz: JSON.stringify({
                text: "What is a design principle which guides the design of Spring Framework?",
                distractors: [
                  "Control of Inversion",
                  "Inversion of Command",
                  "Control of Command",
                  "Command of Inversion"
                ]
              }),
              pronunciation: "/ɪnˈvɜːrʒən ɒv kənˈtroʊl/"
            },
            {
              id: 5,
              word: "Spring Boot",
              meaning: "스프링 부트",
              example: JSON.stringify({
                source: "Spring Framework Documentation",
                text: "Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications.",
                translation: "스프링 부트는 독립 실행형, 생산 수준의 스프링 기반 애플리케이션을 쉽게 만들 수 있습니다."
              }),
              quiz: JSON.stringify({
                text: "What makes it easy to create stand-alone, production-grade Spring based Applications?",
                distractors: [
                  "Spring Bean",
                  "Spring Cloud",
                  "Spring MVC",
                  "Spring Batch"
                ]
              }),
              pronunciation: "/sprɪŋ buːt/"
            }
          ]
        }
      })
    )
  }),
  http.get('/api/knowledge/review/studies/:studyId', async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
        result: {
          correctIds: [1],
          incorrectIds: [2, 3]
        }
      })
    )
  }),
  http.put('/api/knowledge/review/studies/:studyId', async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
      })
    )
  }),
  http.get('/study/knowledges/:studyId', async ({ }) => {
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
            code: `// Java에서 스레드 생성 예시
              class MyThread extends Thread {
              public void run() {
                  System.out.println("스레드 실행 중");
              }
              }
        
              public class Main {
              public static void main(String[] args) {
                  MyThread thread = new MyThread();
                  thread.start(); // 새로운 스레드 시작
              }
              }`
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
            code: `// 동기화 예시
              public class Counter {
              private int count = 0;
        
              public synchronized void increment() {
                  count++;
              }
        
              public synchronized int getCount() {
                  return count;
              }
              }`
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
            code: `// Next.js SSR 예시
              // pages/index.js
              export async function getServerSideProps() {
              const res = await fetch('https://api.example.com/data')
              const data = await res.json()
        
              return {
              props: {
                data,
              },
              }
              }
        
              export default function Home({ data }) {
              return (
              <div>
                {data.map(item => (
                  <div key={item.id}>{item.title}</div>
                ))}
              </div>
              )
              }`
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
            code: `// Java에서 스레드 생성 예시
              class MyThread extends Thread {
              public void run() {
                  System.out.println("스레드 실행 중");
              }
              }
        
              public class Main {
              public static void main(String[] args) {
                  MyThread thread = new MyThread();
                  thread.start(); // 새로운 스레드 시작
              }
              }`
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
            code: `// 동기화 예시
              public class Counter {
              private int count = 0;
        
              public synchronized void increment() {
                  count++;
              }
        
              public synchronized int getCount() {
                  return count;
              }
              }`
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
            code: `// Next.js SSR 예시
              // pages/index.js
              export async function getServerSideProps() {
              const res = await fetch('https://api.example.com/data')
              const data = await res.json()
        
              return {
              props: {
                data,
              },
              }
              }
        
              export default function Home({ data }) {
              return (
              <div>
                {data.map(item => (
                  <div key={item.id}>{item.title}</div>
                ))}
              </div>
              )
              }`
          },
        ]
      })
    )
  }),
  http.get('/api/pr/study/:studyId', async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
        result: {
          id: 1,
          title: "테스트 PR 제목",
          description: "테스트 PR 설명",
          labels: [
            "backend",
            "feature",
            "bug-fix",
          ]
        }
      })
    )
  }),
  http.get(`/api/pr/:prId/changed-files`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
        result: {
          files: [
            { 
              id: null,
              prId: 1,
              fileName: "src/main/java/com/example/SingletonService.java",
              language: "Java",
              content: "public class SingletonService {\n\n    private static volatile SingletonService instance;\n\n    private SingletonService() {\n        // private constructor\n    }\n\n    public static SingletonService getInstance() {\n        if (instance == null) {\n            synchronized (SingletonService.class) {\n                if (instance == null) {\n                    instance = new SingletonService();\n                }\n            }\n        }\n        return instance;\n    }\n}"
            },
            {
              id: null,
              prId: 1,
              fileName: "src/test/java/com/example/SingletonServiceTest.java",
              language: "Java",
              content: "import org.junit.jupiter.api.Test;\nimport static org.junit.jupiter.api.Assertions.*;\n\npublic class SingletonServiceTest {\n\n    @Test\n    void testSingletonInstance() {\n        SingletonService instance1 = SingletonService.getInstance();\n        SingletonService instance2 = SingletonService.getInstance();\n        assertSame(instance1, instance2);\n    }\n}"
            }
          ]
        }
      })
    )
  }),
  http.get('/api/pr/:prId/comments', async ({  }) => {
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
              content: "이 부분은 어떻게 구현하면 좋을까요?"
            },
            {
              id: 6,
              idx: 1,
              prId: 1,
              content: "사용자가 슬라이더를 원하는 이미지로 넘길 수 있는 기능에 대한 의견을 여쭤보고 싶습니다."
            },
            {
              id: 7,
              idx: 2,
              prId: 1,
              content: "UX를 더 좋게 만드려면 어떻게 해야 할까요?"
            }
          ]
        }
      })
    )
  }),
  http.post('/api/pr/review/comment/:commentId', async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "Success",
        message: "성공",
        result: {
          review: "동의합니다. 이 부분은 이런 부분이 타당하지 못하지만 이 부분은 다시 볼 필요가 ---",
        },
      })
    )
  }),
  http.post('/api/pr/:prId/study/:studyId/done', async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "Success",
        message: "성공",
      })
    )
  }),
  http.get('/study/pr/:id/finalFeedback', async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        score: 85,
        strengths: [
          "기술적 용어의 적절한 사용",
          "명확한 문장 구조로 의도 전달이 잘 됨"
        ],
        improvements: [
          "현재완료(have/has + p.p.)와 단순과거 시제의 구분이 필요해요. 특히 구현 결과를 설명할 때는 현재완료를 사용하면 좋습니다.",
          "Singleton Pattern의 장단점과 적용 시나리오에 대한 더 깊은 이해가 도움될 것 같아요. 특히 Thread Safety와 관련된 부분을 추가로 학습해보세요."
        ],
        recommendedResources: [
          "Java의 시제와 관사 사용법 가이드",
          "Effective Java - Chapter 2: Singleton Pattern",
          "Thread Safety in Java - Best Practices"
        ]
      })
    )
  }),
  http.get(`/api/pr/solutions/:prId`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "Success",
        message: "성공",
        result: {
          solutions: [
            {
              id: generateId(),
              text: "이 문제는 useCallback을 활용하여 메모이제이션을 구현하면 해결할 수 있습니다. 렌더링 최적화에 도움이 됩니다.",
              user: {
                id: "user123",
                email: "frontend_dev@example.com",
                nickname: "리액트마스터",
                profile: "https://randomuser.me/api/portraits/men/1.jpg",
                developerType: DeveloperType.Frontend,
                level: 4
              },
              isLiked: true,
              likeCount: 42,
              commentCount: 7
            },
            {
              id: generateId(),
              text: "JPA의 지연 로딩(Lazy Loading)을 사용하면 N+1 문제를 효과적으로 해결할 수 있습니다. 예제 코드를 첨부합니다.",
              user: {
                id: "user456",
                email: "backend_guru@example.com",
                nickname: "스프링마스터",
                profile: "https://randomuser.me/api/portraits/women/2.jpg",
                developerType: DeveloperType.Backend,
                level: 5
              },
              isLiked: false,
              likeCount: 65,
              commentCount: 12
            },
            {
              id: generateId(),
              text: "이 이슈는 서비스 레이어에서 트랜잭션 관리를 제대로 하지 않아서 발생했습니다. @Transactional 애노테이션을 추가하면 해결됩니다.",
              user: {
                id: "user789",
                email: "java_expert@example.com",
                nickname: "자바개발왕",
                profile: "https://randomuser.me/api/portraits/men/3.jpg",
                developerType: DeveloperType.Backend,
                level: 3
              },
              isLiked: true,
              likeCount: 28,
              commentCount: 4
            },
            {
              id: generateId(),
              text: "CSS Grid를 사용하면 이 레이아웃 문제를 더 간단하게 해결할 수 있습니다. flexbox보다 이 경우에 더 적합합니다.",
              user: {
                id: "user101",
                email: "css_wizard@example.com",
                nickname: "디자인코더",
                profile: "https://randomuser.me/api/portraits/women/4.jpg",
                developerType: DeveloperType.Frontend,
                level: 4
              },
              isLiked: false,
              likeCount: 33,
              commentCount: 8
            },
            {
              id: generateId(),
              text: "이 PR에서는 코드 중복이 많이 보입니다. 공통 로직을 유틸리티 함수로 추출하는 것이 좋을 것 같습니다.",
              user: {
                id: "user202",
                email: "code_reviewer@example.com",
                nickname: "클린코더",
                profile: "https://randomuser.me/api/portraits/men/5.jpg",
                developerType: DeveloperType.Backend,
                level: 5
              },
              isLiked: true,
              likeCount: 51,
              commentCount: 9
            }
          ]
        }
      })
    )
  }),
  http.post(`/api/pr/solution/like/:solutionId`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "Success",
        message: "성공",
      })
    )
  }),
  http.post(`/api/pr/solution/unlike/:solutionId`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "Success",
        message: "성공",
      })
    )
  }),
  http.post(`/api/pr/solution/addComment/:solutionId`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "Success",
        message: "성공",
      })
    )
  }),
  http.get(`/api/pr/history/:prId/:userId`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "Success",
        message: "성공",
        result: {
          id: 1,
          answers: [
            "이 문제는 useCallback을 활용하여 메모이제이션을 구현하면 해결할 수 있습니다. 렌더링 최적화에 도움이 됩니다.",
            "JPA의 지연 로딩(Lazy Loading)을 사용하면 N+1 문제를 효과적으로 해결할 수 있습니다. 예제 코드를 첨부합니다.",
          ],
          feedbacks: [
            { review: "패턴 구현의 목적이나 이점을 제목에 포함하면 좋을 것 같습니다 (예: '... - 커넥션 풀 최적화')" },
            { review: "패턴 구현의 목적이나 이점을 제목에 포함하면 좋을 것 같습니다 (예: '... - 커넥션 풀 최적화')" },
          ],
        },
      })
    )
  }),
  http.get(`/api/pr/solution/comments/:solutionId`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "Success",
        message: "성공",
        result: {
          comments: [
            { id: generateId(), name: "이지민", profile: faker.image.avatar(), text: "좋은 접근법이네요! 저도 비슷하게 풀었어요.", time: new Date(2025, 2, 19, 12, 30) },
            { id: generateId(), name: "박도현", profile: faker.image.avatar(), text: "이 부분 조금 더 최적화할 수 있을 것 같아요!", time: new Date(2025, 2, 19, 13, 45) },
            { id: generateId(), name: "최서연", profile: faker.image.avatar(), text: "코드가 너무 깔끔해요! 참고하겠습니다.", time: new Date(2025, 2, 19, 14, 20) },
            { id: generateId(), name: "정민준", profile: faker.image.avatar(), text: "이런 방식으로도 문제를 해결할 수 있군요. 배울 점이 많네요.", time: new Date(2025, 2, 19, 14, 35) },
            { id: generateId(), name: "김지우", profile: faker.image.avatar(), text: "시간 복잡도 측면에서도 효율적인 것 같아요!", time: new Date(2025, 2, 19, 15, 0) },
          ]
        }
      })
    )
  }),
  http.get('/study/discussions/:studyId', async ({ }) => {
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
  http.get('/study/discussion/:id', async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
        result: [{
          id: Date.now(),
          role: 'ai',
          content: 'Virtual DOM의 개념에 대해 설명해주시겠어요?'
        }]
      })
    );
  }),
  http.post(`/study/discussion/recomment/:id`, async ({ }) => {
    await delay(2000);
    return new HttpResponse(
      JSON.stringify({
        id: Date.now() + 1,
        role: 'ai',
        content: '정말 chill 하군요...'
      })
    )
  }),
  http.get(`/profile`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
        result: {
          id: "user1234",
          nickname: "김데블리",
          profile: faker.image.urlLoremFlickr(),
          developerType: 2,
          level: 6
        }
      })
    );
  }),
  http.get(`/profile/stats`, async ({ }) => {
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
          discussion: 4
        }
      })
    );
  }),
  http.get(`/rankings`, async ({ }) => {
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
            { rank: 42, name: "박정수", score: 2220, level: 4, change: 'same', isMe: true },
            { rank: 42, name: "한소희", score: 2220, level: 4, change: 'up' },
            { rank: 44, name: "송태호", score: 2190, level: 4, change: 'down' },
          ]
        }
      })
    );
  }),
  http.get(`/review`, async ({  }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
        result: [
          {
            date: new Date("2025-01-20"),
            logs: [
              {
                id: 1,
                study: 'word',
                title: "리액트 훅 사용법 정리",
                exp: 130
              },
              {
                id: 2,
                study: 'knowledge',
                title: "Next.js 13 새로운 기능 학습",
                exp: 200
              },
              {
                id: 58,
                prId: 27,
                study: 'pr',
                title: "로그인 페이지 UI 구현",
                exp: 150
              },
              {
                id: 4,
                study: 'discussion',
                title: "프로젝트 아키텍처 설계 논의",
                exp: 200
              }
            ]
          },
          {
            date: new Date("2025-01-27"),
            logs: [
              {
                id: 1,
                study: 'word',
                title: "리액트 훅 사용법 정리",
                exp: 130
              },
              {
                id: 58,
                prId: 27,
                study: 'pr',
                title: "로그인 페이지 UI 구현",
                exp: 150
              },
            ]
          },
          {
            date: new Date("2025-02-20"),
            logs: [
              {
                id: 2,
                study: 'knowledge',
                title: "Next.js 13 새로운 기능 학습",
                exp: 200
              },
              {
                id: 58,
                prId: 27,
                study: 'pr',
                title: "로그인 페이지 UI 구현",
                exp: 150
              },
            ]
          },
        ]
      })
    )
  }),
  http.get('/api/words/:studyId/review', () => {
    return HttpResponse.json({
      code: "SUCCESS",
      message: "성공",
      result: {
        words: [
          {
            "id": 1,
            "word": "Middleware",
            "meaning": "     ",
            "example": "{\"source\": \"Express.js documentation\", \"text\": \"Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle.\", \"translation\": \"   (req),  (res),   -        .\"}",
            "quiz": "{\"text\": \"Middleware is a software that provides an interface between _______.\", \"distractors\": [\"Client and server\", \"User and application\", \"Database and server\", \"Server and application\"]}",
            "pronunciation": "/mdlwer/"
          },
          {
            "id": 2,
            "word": "RESTful",
            "meaning": "     , HTTP (GET, POST, PUT, DELETE)    ",
            "example": "{\"source\": \"RESTful Web Services\", \"text\": \"A RESTful web service exposes a set of resources that identify the targets of the interaction with its clients.\", \"translation\": \"RESTful          .\"}",
            "quiz": "{\"text\": \"RESTful web service is a way to implement web services that process resources through _____.\", \"distractors\": [\"XML\", \"JSON\", \"SOAP\", \"HTTP methods\"]}",
            "pronunciation": "/restfl/"
          },
          {
            "id": 3,
            "word": "Endpoint",
            "meaning": "     URL  ",
            "example": "{\"source\": \"Amazon Web Services\", \"text\": \"Each API is deployed at one or many HTTP endpoints.\", \"translation\": \" API    HTTP  .\"}",
            "quiz": "{\"text\": \"Endpoint refers to a specific location of a URL where you can access _____\", \"distractors\": [\"Web browser\", \"Operating system\", \"Network service\", \"Database\"]}",
            "pronunciation": "/ndpont/"
          },
          {
            "id": 4,
            "word": "Payload",
            "meaning": "       .",
            "example": "{\"source\": \"Node.js API documentation\", \"text\": \"The payload of a packet is the actual data that is sent over the network.\", \"translation\": \"      .\"}",
            "quiz": "{\"text\": \"What is the term for the actual data that is sent over the network?\", \"distractors\": [\"Protocol\", \"Port\", \"Socket\", \"API\"]}",
            "pronunciation": "/pe.lod/"
          },
          {
            "id": 5,
            "word": "Query",
            "meaning": "     .",
            "example": "{\"source\": \"MySQL documentation\", \"text\": \"A query is a request for data from a database.\", \"translation\": \"    .\"}",
            "quiz": "{\"text\": \"What is a request for data from a database called?\", \"distractors\": [\"Payload\", \"Schema\", \"Entity\", \"API\"]}",
            "pronunciation": "/kwr.i/"
          }
        ]
      }
    });
  }),
];
