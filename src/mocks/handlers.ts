import { faker } from '@faker-js/faker';
import { http, HttpResponse } from 'msw';

const delay = (ms: number) => new Promise((res) => {
  setTimeout(res, ms);
});

export const handlers = [
  http.get('/api/studies/tasks', async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
        result: {
          word: {
            studyId: 1,
            total: 3,
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
  http.get('/api/studies/:groupId/words/review', async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
        result: {
          correctIds: [1, 2],
          incorrectIds: [3, 4, 5]
        }
      })
    )
  }),
  http.post('/api/studies/:groupId/words/review', async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
      })
    )
  }),
  http.get('/api/studies/:groupId/knowledge/review', async ({ }) => {
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
  http.post('/api/studies/:groupId/knowledge/review', async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        code: "SUCCESS",
        message: "성공",
      })
    )
  }),
  http.get('/api/words/:studyId', async ({ }) => {
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
  http.get('/study/knowledges/:studyId', async ({ }) => {
    return new HttpResponse(
      JSON.stringify([
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
      ])
    )
  }),
  http.get('/developerType', async ({ }) => {
    return new HttpResponse(
      JSON.stringify([1, 2])
    )
  }),
  http.get('/study/prs/:groupId', async ({ }) => {
    return new HttpResponse(
      JSON.stringify([
        {
          id: 1,
          title: "Singleton Pattern PR",
          description: "Database Connection을 관리하는 Singleton 패턴을 구현해보세요.",
          difficulty: "중급",
          estimatedTime: "30분",
          category: "Design Pattern",
          tags: ["Java", "Singleton", "Thread-safe"]
        }
      ])
    )
  }),
  http.get('/study/pr/:id', async ({ }) => {
    return new HttpResponse(
      // JSON.stringify({
      //   title: 'Database Connector 싱글톤 패턴 구현',
      //   commits: [
      //     { hash: 'a1b2c3d', message: 'Add DatabaseConnector singleton class' },
      //     { hash: 'e4f5g6h', message: 'Implement connection pool' },
      //     { hash: 'i7j8k9l', message: 'Add configuration loader' }
      //   ],
      //   changedFiles: [
      //     {
      //       name: 'src/main/java/com/example/database/DatabaseConnector.java',
      //       language: 'java',     
      //       content: 'package com.example.database;\n\nimport java.sql.Connection;\nimport java.sql.SQLException;\nimport com.zaxxer.hikari.HikariConfig;\nimport com.zaxxer.hikari.HikariDataSource;\n\n@ThreadSafe\npublic final class DatabaseConnector {\n    private static volatile DatabaseConnector instance;\n    private final HikariDataSource dataSource;\n\n    private DatabaseConnector() {\n        HikariConfig config = loadConfiguration();\n        this.dataSource = new HikariDataSource(config);\n    }\n}'
      //     },
      //     {
      //       name: 'src/main/java/com/example/database/DatabaseConfig.java',
      //       language: 'java',
      //       content: 'package com.example.database;\n\nimport java.io.IOException;\nimport java.util.Properties;\n\npublic class DatabaseConfig {\n    private static final String CONFIG_FILE = "database.properties";\n\n    public static Properties loadProperties() throws IOException {\n        Properties props = new Properties();\n        ClassLoader loader = Thread.currentThread().getContextClassLoader();\n        props.load(loader.getResourceAsStream(CONFIG_FILE));\n        return props;\n    }\n}'
      //     }
      //   ],
      //   reviewComment: {
      //     comment: "The singleton implementation looks good, but have you considered using double-checked locking for better thread safety? Also, what happens if the connection pool exhausts all available connections?"
      //   }
      // })
      JSON.stringify({
        title: 'Todo 리스트 컴포넌트 상태관리 리팩토링',
        commits: [
          { hash: 'a1b2c3d', message: 'Add TodoStore class using singleton pattern' },
          { hash: 'e4f5g6h', message: 'Implement observer pattern for state updates' },
          { hash: 'i7j8k9l', message: 'Add local storage persistence' }
        ],
        changedFiles: [
          {
            name: 'src/store/TodoStore.js',
            language: 'java',
            content: 'import { makeAutoObservable } from "mobx";\n\nclass TodoStore {\n    static #instance = null;\n    todos = [];\n    filter = "all";\n\n    constructor() {\n        makeAutoObservable(this);\n        this.#loadFromStorage();\n    }\n\n    static getInstance() {\n        if (!TodoStore.#instance) {\n            TodoStore.#instance = new TodoStore();\n        }\n        return TodoStore.#instance;\n    }\n\n    addTodo = (text) => {\n        const todo = {\n            id: Date.now(),\n            text,\n            completed: false\n        };\n        this.todos.push(todo);\n        this.#saveToStorage();\n    }\n\n    toggleTodo = (id) => {\n        const todo = this.todos.find(todo => todo.id === id);\n        if (todo) {\n            todo.completed = !todo.completed;\n            this.#saveToStorage();\n        }\n    }\n\n    setFilter = (filter) => {\n        this.filter = filter;\n    }\n\n    get filteredTodos() {\n        switch (this.filter) {\n            case "completed":\n                return this.todos.filter(todo => todo.completed);\n            case "active":\n                return this.todos.filter(todo => !todo.completed);\n            default:\n                return this.todos;\n        }\n    }\n\n    #loadFromStorage() {\n        const stored = localStorage.getItem("todos");\n        if (stored) {\n            this.todos = JSON.parse(stored);\n        }\n    }\n\n    #saveToStorage() {\n        localStorage.setItem("todos", JSON.stringify(this.todos));\n    }\n}'
          },
          {
            name: 'src/components/TodoList.js',
            language: 'javascript',
            content: 'import React from "react";\nimport { observer } from "mobx-react-lite";\nimport TodoStore from "../store/TodoStore";\n\nconst TodoList = observer(() => {\n    const todoStore = TodoStore.getInstance();\n\n    const handleToggle = (id) => {\n        todoStore.toggleTodo(id);\n    };\n\n    const handleFilterChange = (filter) => {\n        todoStore.setFilter(filter);\n    };\n\n    return (\n        <div className="todo-container">\n            <div className="filters">\n                <button onClick={() => handleFilterChange("all")}>All</button>\n                <button onClick={() => handleFilterChange("active")}>Active</button>\n                <button onClick={() => handleFilterChange("completed")}>Completed</button>\n            </div>\n            <ul className="todo-list">\n                {todoStore.filteredTodos.map(todo => (\n                    <li\n                        key={todo.id}\n                        className={todo.completed ? "completed" : ""}\n                        onClick={() => handleToggle(todo.id)}\n                    >\n                        {todo.text}\n                    </li>\n                ))}\n            </ul>\n        </div>\n    );\n});\n\nexport default TodoList;'
          }
        ],
        reviewComment: {
          comment: "MobX를 사용한 상태관리 구현이 잘 되었네요. 하지만 싱글톤 패턴 대신 React Context를 사용하는 것이 더 React스러운 방식이 아닐까요? 또한 localStorage 작업을 effect로 분리하는 것을 고려해보세요."
        }
      })
    )
  }),
  http.post('/study/pr/:id/feedback', async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        score: 65, 
        feedbackPoints: {
          strengths: [
            {
              example: '"I fix the issue" → "The issue has been fixed"',
              explanation: "핵심 구현 내용(싱글톤 패턴, 커넥션 풀)을 언급함",
            },
            {
              example: '"I fix the issue" → "The issue has been fixed"',
              explanation: "주요 메서드(getInstance)를 명시함",
            }
          ],
          improvements: [
            {
              point: '"I fix the issue" → "The issue has been fixed"',
              reason: "구체적인 구현 세부사항이 부족함 (스레드 세이프티, 풀 사이즈 등)",
            },
            {
              point: '"I fix the issue" → "The issue has been fixed"',
              reason: "변경된 파일과 영향도에 대한 설명이 없음",
            },
            {
              point: '"I fix the issue" → "The issue has been fixed"',
              reason: "테스트 관련 내용이 누락됨",
            },
          ]
        },
        suggestions: {
          title: "패턴 구현의 목적이나 이점을 제목에 포함하면 좋을 것 같습니다 (예: '... - 커넥션 풀 최적화')",
          description: "다음 내용들을 추가하면 좋을 것 같습니다:\n- 구현한 스레드 세이프티 방식\n- 커넥션 풀 크기 및 설정값\n- 수행한 테스트 내용\n- 변경된 파일 목록"
        },
        betterPRExplainer: `제목: Database Connector 싱글톤 패턴 적용 - 커넥션 풀 최적화\n
          설명: 데이터베이스 연결 관리를 위한 싱글톤 패턴을 구현했습니다:\n
          - 커넥션 풀을 도입하여 DB 연결 리소스 관리 최적화\n
          - getInstance() 메서드를 통한 단일 인스턴스 접근 보장\n
          - 최대 연결 수 설정으로 리소스 사용량 제어\n
          
          변경사항:\n
          1. DatabaseConnector 클래스에 private 생성자 구현\n
          2. 스레드 세이프를 위한 동기화 처리 추가\n
          3. 커넥션 풀 설정 (최대 연결 수: 10)\n
          4. 연결 타임아웃 및 재시도 로직 구현\n
          
          테스트:\n
          - 멀티스레드 환경에서 인스턴스 동일성 검증\n
          - 커넥션 풀 동작 확인\n
          - 메모리 누수 테스트 완료`,
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
  http.get(`/profile/stats`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        days: 24,
        exp: 3434,
        words: 32,
        knowledge: 55,
        pr: 19,
        discussion: 4
      })
    )
  }),
  http.get(`/profile`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
        nickname: "김데블리",
        profile: faker.image.urlLoremFlickr(),
        developerType: 2,
        level: 6
      })
    )
  }),
  http.get(`/rankings`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify({
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
      })
    )
  }),
  http.get(`/weeklyActivity`, async ({ }) => {
    return new HttpResponse(
      JSON.stringify([
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
      ])
    )
  }),
  http.get('/study/discussions/:groupId', async ({ }) => {
    return new HttpResponse(
      JSON.stringify([
        {
          id: 1,
          title: "React Virtual DOM",
          description: "간단한 Virtual DOM과 실제 DOM의 차이점을 설명해보세요.",
          difficulty: "고급",
          estimatedTime: "45분",
          category: "React",
          tags: ["Virtual DOM", "React", "Performance"]
          },
      ])
    )
  }),
  http.get('/study/discussion/:id', async ({ }) => {
    return new HttpResponse(
      JSON.stringify([{
        id: Date.now(),
        role: 'ai',
        content: 'Virtual DOM의 개념에 대해 설명해주시겠어요?'
      }])
    )
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
  http.get(`/review`, async ({  }) => {

    return new HttpResponse(
      JSON.stringify([
        {
          date: new Date("2025-01-20"),
          logs: [
            {
              id: 1,
              study: 'words',
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
              id: 3,
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
              study: 'words',
              title: "리액트 훅 사용법 정리",
              exp: 130
            },
            {
              id: 3,
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
              id: 3,
              study: 'pr',
              title: "로그인 페이지 UI 구현",
              exp: 150
            },
          ]
        },
      ])
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
  http.get('/api/knowledges/:studyId/review', async ({ }) => {
    return new HttpResponse(
      JSON.stringify([
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
      ])
    )
  }),
];
