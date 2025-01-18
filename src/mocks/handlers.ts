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
          total: 3,
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
  }),
  http.get('/study/knowledges/:groupId', async ({ }) => {
    return new HttpResponse(
      JSON.stringify([
        {
          id: 1,
          title: "스레드의 기본 개념",
          content: "스레드는 프로세스 내에서 실행되는 가장 작은 실행 단위입니다. 하나의 프로세스는 여러 개의 스레드를 가질 수 있으며, 각 스레드는 같은 프로세스의 메모리를 공유합니다.",
          practice: {
            question: "다음 중 스레드의 특징이 아닌 것은?",
            options: [
              "프로세스의 메모리를 공유한다",
              "각 스레드는 독립적인 메모리 공간을 가진다",
              "동시에 여러 작업을 수행할 수 있다",
              "스택 영역은 스레드마다 독립적이다"
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
          practice: {
            question: "다음 중 스레드 동기화 방법이 아닌 것은?",
            options: [
              "synchronized 키워드 사용",
              "ReentrantLock 사용",
              "volatile 키워드 사용",
              "thread.stop() 메서드 사용"
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
          practice: {
            question: "SSR의 주요 장점이 아닌 것은?",
            options: [
              "더 나은 SEO",
              "빠른 초기 페이지 로드",
              "낮은 서버 부하",
              "더 나은 소셜 미디어 공유"
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
      ])
    )
  }),
  http.get('/developerType', async ({ }) => {
    return new HttpResponse(
      JSON.stringify([1, 2])
    )
  })
];
