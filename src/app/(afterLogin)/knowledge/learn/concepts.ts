import { Concept } from "./types";

export const CONCEPT_DATA: Concept[] = [
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
]