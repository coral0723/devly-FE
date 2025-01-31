import { faker } from '@faker-js/faker';
import { http, HttpResponse } from 'msw';

const delay = (ms: number) => new Promise((res) => {
  setTimeout(res, ms);
});

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
          total: 1,
          completed: false
        },
        discussion: {
          groupId: 4,
          total: 1,
          completed: false
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
              "createdAt": "2025-01-20 15:18:53.752306",
              "id": 1,
              "studyId": 1,
              "updatedAt": "2025-01-20 15:18:53.752306",
              "example": {
                "source": "Spring Framework Documentation",
                "text": "Spring allows for annotation-based configuration of your application.",
                "translation": "스프링은 애플리케이션의 주석 기반 설정을 허용합니다."
              },
              "quiz": {
                "text": "What does Annotation-based Configuration mean in Spring Framework?",
                "distractors": [
                  "Code-based Configuration",
                  "XML-based Configuration",
                  "Java-based Configuration",
                  "HTML-based Configuration"
                ]
              },
              "meaning": "주석 기반 설정",
              "pronunciation": "/ænəʊˈteɪʃən beɪst kənˈfɪɡəˈreɪʃən/",
              "word": "Annotation-based Configuration"
            },
            {
              "createdAt": "2025-01-20 15:18:53.754271",
              "id": 2,
              "studyId": 1,
              "updatedAt": "2025-01-20 15:18:53.754271",
              "example": {
                "source": "Spring Framework Documentation",
                "text": "Dependency Injection is a fundamental aspect of the Spring framework.",
                "translation": "의존성 주입은 스프링 프레임워크의 기본적인 측면입니다."
              },
              "quiz": {
                "text": "What is a fundamental aspect of the Spring framework?",
                "distractors": [
                  "Dependency Extraction",
                  "Dependency Reduction",
                  "Dependency Increase",
                  "Dependency Multiplication"
                ]
              },
              "meaning": "의존성 주입",
              "pronunciation": "/dɪˈpɛndənsi ɪnˈdʒɛkʃən/",
              "word": "Dependency Injection"
            },
            {
              "createdAt": "2025-01-20 15:18:53.754702",
              "id": 3,
              "studyId": 1,
              "updatedAt": "2025-01-20 15:18:53.754702",
              "example": {
                "source": "Spring Framework Documentation",
                "text": "Spring supports Aspect Oriented Programming (AOP) for separation of concerns.",
                "translation": "스프링은 관심사의 분리를 위해 관점 지향 프로그래밍(AOP)를 지원합니다."
              },
              "quiz": {
                "text": "What does Spring use for separation of concerns?",
                "distractors": [
                  "Object Oriented Programming",
                  "Functional Programming",
                  "Procedural Programming",
                  "Modular Programming"
                ]
              },
              "meaning": "관점 지향 프로그래밍",
              "pronunciation": "/ˈæspekt ˈɔːrientid ˈproʊgræmɪŋ/",
              "word": "Aspect Oriented Programming (AOP)"
            },
            {
              "createdAt": "2025-01-20 15:18:53.755095",
              "id": 4,
              "studyId": 1,
              "updatedAt": "2025-01-20 15:18:53.755095",
              "example": {
                "source": "Spring Framework Documentation",
                "text": "Inversion of Control (IoC) is a design principle which guides the design of Spring Framework.",
                "translation": "제어의 역전(IoC)은 스프링 프레임워크의 설계를 안내하는 설계 원칙입니다."
              },
              "quiz": {
                "text": "What is a design principle which guides the design of Spring Framework?",
                "distractors": [
                  "Control of Inversion",
                  "Inversion of Command",
                  "Control of Command",
                  "Command of Inversion"
                ]
              },
              "meaning": "제어의 역전",
              "pronunciation": "/ɪnˈvɜːrʒən ɒv kənˈtroʊl/",
              "word": "Inversion of Control (IoC)"
            },
            {
              "createdAt": "2025-01-20 15:18:53.755493",
              "id": 5,
              "studyId": 1,
              "updatedAt": "2025-01-20 15:18:53.755493",
              "example": {
                "source": "Spring Framework Documentation",
                "text": "Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications.",
                "translation": "스프링 부트는 독립 실행형, 생산 수준의 스프링 기반 애플리케이션을 쉽게 만들 수 있습니다."
              },
              "quiz": {
                "text": "What makes it easy to create stand-alone, production-grade Spring based Applications?",
                "distractors": [
                  "Spring Bean",
                  "Spring Cloud",
                  "Spring MVC",
                  "Spring Batch"
                ]
              },
              "meaning": "스프링 부트",
              "pronunciation": "/sprɪŋ buːt/",
              "word": "Spring Boot"
            },
            {
              "createdAt": "2025-01-20 15:18:53.755886",
              "id": 6,
              "studyId": 1,
              "updatedAt": "2025-01-20 15:18:53.755886",
              "example": {
                "source": "Spring Framework Documentation",
                "text": "Spring MVC is a Java framework which is used to build web applications.",
                "translation": "스프링 MVC는 웹 애플리케이션을 구축하는 데 사용되는 자바 프레임워크입니다."
              },
              "quiz": {
                "text": "What is a Java framework which is used to build web applications?",
                "distractors": [
                  "Spring Boot",
                  "Spring Cloud",
                  "Spring Batch",
                  "Spring Security"
                ]
              },
              "meaning": "스프링 MVC",
              "pronunciation": "/sprɪŋ ɛmviːsiː/",
              "word": "Spring MVC"
            },
            {
              "createdAt": "2025-01-20 15:18:53.756252",
              "id": 7,
              "studyId": 1,
              "updatedAt": "2025-01-20 15:18:53.756252",
              "example": {
                "source": "Spring Framework Documentation",
                "text": "A bean is an object that is instantiated, assembled, and otherwise managed by a Spring IoC container.",
                "translation": "빈은 스프링 IoC 컨테이너에 의해 인스턴스화, 조립, 그리고 관리되는 객체입니다."
              },
              "quiz": {
                "text": "What is an object that is instantiated, assembled, and otherwise managed by a Spring IoC container?",
                "distractors": [
                  "Module",
                  "Class",
                  "Component",
                  "Package"
                ]
              },
              "meaning": "빈",
              "pronunciation": "/biːn/",
              "word": "Bean"
            },
            {
              "createdAt": "2025-01-20 15:18:53.756635",
              "id": 8,
              "studyId": 1,
              "updatedAt": "2025-01-20 15:18:53.756635",
              "example": {
                "source": "Spring Framework Documentation",
                "text": "The DispatcherServlet is the entry point of a Spring MVC application.",
                "translation": "디스패처 서블릿은 스프링 MVC 애플리케이션의 진입점입니다."
              },
              "quiz": {
                "text": "What is the entry point of a Spring MVC application?",
                "distractors": [
                  "Controller",
                  "Model",
                  "View",
                  "Service"
                ]
              },
              "meaning": "디스패처 서블릿",
              "pronunciation": "/dɪsˈpæʧərsɜːrvlɪt/",
              "word": "DispatcherServlet"
            },
            {
              "createdAt": "2025-01-20 15:18:53.75699",
              "id": 9,
              "studyId": 1,
              "updatedAt": "2025-01-20 15:18:53.75699",
              "example": {
                "source": "Spring Framework Documentation",
                "text": "The ApplicationContext is the central interface within a Spring application for providing configuration.",
                "translation": "ApplicationContext는 스프링 애플리케이션에서 구성을 제공하는 중앙 인터페이스입니다."
              },
              "quiz": {
                "text": "What is the central interface within a Spring application for providing configuration?",
                "distractors": [
                  "BeanFactory",
                  "ConfigurableApplicationContext",
                  "WebApplicationContext",
                  "AnnotationConfigApplicationContext"
                ]
              },
              "meaning": "애플리케이션 컨텍스트",
              "pronunciation": "/ˈæplɪkeɪʃən kɒnˈtekst/",
              "word": "ApplicationContext"
            },
            {
              "createdAt": "2025-01-20 15:18:53.757475",
              "id": 10,
              "studyId": 1,
              "updatedAt": "2025-01-20 15:18:53.757475",
              "example": {
                "source": "Spring Framework Documentation",
                "text": "Spring Data’s mission is to provide a familiar and consistent, Spring-based programming model for data access.",
                "translation": "스프링 데이터의 목표는 데이터 접근을 위한 친숙하고 일관된 스프링 기반 프로그래밍 모델을 제공하는 것입니다."
              },
              "quiz": {
                "text": "What is the mission of Spring Data?",
                "distractors": [
                  "To provide a difficult and inconsistent, Spring-based programming model for data access",
                  "To provide a familiar and consistent, Java-based programming model for data access",
                  "To provide a familiar and inconsistent, Spring-based programming model for data access",
                  "To provide a difficult and consistent, Spring-based programming model for data access"
                ]
              },
              "meaning": "스프링 데이터",
              "pronunciation": "/sprɪŋ deɪtə/",
              "word": "Spring Data"
            }
          ]
      )
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
      JSON.stringify({
        title: 'Database Connector 싱글톤 패턴 구현',
        commits: [
            { hash: 'a1b2c3d', message: 'Add DatabaseConnector singleton class' },
            { hash: 'e4f5g6h', message: 'Implement connection pool' },
            { hash: 'i7j8k9l', message: 'Add configuration loader' }
        ],
        changedFiles: [
          {
            name: 'src/main/java/com/example/database/DatabaseConnector.java',
            language: 'java',
            changes: [
              {
                  type: 'addition',
                  content: 'package com.example.database;',
                  highlight: { color: 'text-purple-600' }
              },
              {
                  type: 'addition',
                  content: '',
              },
              {
                  type: 'addition',
                  content: 'import java.sql.Connection;',
                  highlight: { color: 'text-purple-600' }
              },
              {
                  type: 'addition',
                  content: 'import java.sql.SQLException;',
                  highlight: { color: 'text-purple-600' }
              },
              {
                  type: 'addition',
                  content: 'import com.zaxxer.hikari.HikariConfig;',
                  highlight: { color: 'text-purple-600' }
              },
              {
                  type: 'addition',
                  content: 'import com.zaxxer.hikari.HikariDataSource;',
                  highlight: { color: 'text-purple-600' }
              },
              {
                  type: 'addition',
                  content: '',
              },
              {
                  type: 'addition',
                  content: '@ThreadSafe',
                  highlight: { color: 'text-blue-600' }
              },
              {
                  type: 'addition',
                  content: 'public final class DatabaseConnector {',
                  highlight: { color: 'text-blue-600' }
              },
              {
                  type: 'addition',
                  content: '    private static volatile DatabaseConnector instance;',
                  highlight: { color: 'text-purple-600' }
              },
              {
                  type: 'addition',
                  content: '    private final HikariDataSource dataSource;',
                  highlight: { color: 'text-purple-600' }
              },
              {
                  type: 'addition',
                  content: '',
              },
              {
                  type: 'addition',
                  content: '    private DatabaseConnector() {',
                  highlight: { color: 'text-blue-600' }
              },
              {
                  type: 'addition',
                  content: '        HikariConfig config = loadConfiguration();',
                  highlight: { color: 'text-black' }
              },
              {
                  type: 'addition',
                  content: '        this.dataSource = new HikariDataSource(config);',
                  highlight: { color: 'text-black' }
              },
              {
                  type: 'addition',
                  content: '    }',
                  highlight: { color: 'text-black' }
              },
              {
                  type: 'addition',
                  content: '}',
                  highlight: { color: 'text-black' }
              }
            ]
          },
          {
            name: 'src/main/java/com/example/database/DatabaseConfig.java',
            language: 'java',
            changes: [
              {
                  type: 'addition',
                  content: 'package com.example.database;',
                  highlight: { color: 'text-purple-600' }
              },
              {
                  type: 'addition',
                  content: '',
              },
              {
                  type: 'addition',
                  content: 'import java.io.IOException;',
                  highlight: { color: 'text-purple-600' }
              },
              {
                  type: 'addition',
                  content: 'import java.util.Properties;',
                  highlight: { color: 'text-purple-600' }
              },
              {
                  type: 'addition',
                  content: '',
              },
              {
                  type: 'addition',
                  content: 'public class DatabaseConfig {',
                  highlight: { color: 'text-blue-600' }
              },
              {
                  type: 'addition',
                  content: '    private static final String CONFIG_FILE = "database.properties";',
                  highlight: { color: 'text-purple-600' }
              },
              {
                  type: 'addition',
                  content: '',
              },
              {
                  type: 'addition',
                  content: '    public static Properties loadProperties() throws IOException {',
                  highlight: { color: 'text-blue-600' }
              },
              {
                  type: 'addition',
                  content: '        Properties props = new Properties();',
                  highlight: { color: 'text-black' }
              },
              {
                  type: 'addition',
                  content: '        ClassLoader loader = Thread.currentThread().getContextClassLoader();',
                  highlight: { color: 'text-black' }
              },
              {
                  type: 'addition',
                  content: '        props.load(loader.getResourceAsStream(CONFIG_FILE));',
                  highlight: { color: 'text-black' }
              },
              {
                  type: 'addition',
                  content: '        return props;',
                  highlight: { color: 'text-black' }
              },
              {
                  type: 'addition',
                  content: '    }',
                  highlight: { color: 'text-black' }
              },
              {
                  type: 'addition',
                  content: '}',
                  highlight: { color: 'text-black' }
              }
            ]
          }
        ],
        reviewComment: {
          comment: "The singleton implementation looks good, but have you considered using double-checked locking for better thread safety? Also, what happens if the connection pool exhausts all available connections?"
        },
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
  })
];
