import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, Code, Play, RefreshCw } from 'lucide-react';

const ConceptLearning = () => {
  const [step, setStep] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [progress, setProgress] = useState(0);

  const concepts = {
    thread: [
      {
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
      }
    ],
    ssr: [
      {
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
      {
        title: "SSR vs CSR",
        content: "SSR은 서버에서 렌더링하고, CSR은 클라이언트(브라우저)에서 렌더링합니다. 각각의 장단점이 있어 프로젝트 특성에 따라 선택해야 합니다.",
        practice: {
          question: "CSR이 SSR보다 유리한 경우는?",
          options: [
            "검색 엔진 최적화가 중요한 경우",
            "동적 인터랙션이 많은 대시보드",
            "초기 로딩 속도가 매우 중요한 경우",
            "네트워크 속도가 느린 환경"
          ],
          answer: 1
        },
        code: `// React CSR vs Next.js SSR 비교
// CSR (React)
function App() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  if (!data) return <Loading />;
  return <Main data={data} />;
}

// SSR (Next.js)
export async function getServerSideProps() {
  const data = await fetchData();
  return { props: { data } };
}`
      }
    ]
  };

  const currentTopic = 'ssr'; // or 'thread'
  const currentConcepts = concepts[currentTopic];

  const handleOptionClick = (optionIndex) => {
    setShowAnswer(true);
    if (optionIndex === currentConcepts[step].practice.answer) {
      setProgress(prev => Math.min(100, prev + 50));
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-1 text-sm text-gray-600">
          <span>학습 진행률</span>
          <span>{progress}%</span>
        </div>
      </div>

      <Card className="mb-4">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-3">{currentConcepts[step].title}</h2>
          <p className="text-gray-600 mb-4">{currentConcepts[step].content}</p>
          
          <div className="bg-gray-900 text-gray-100 p-3 rounded-md mb-4 relative text-sm">
            <div className="absolute right-2 top-2 flex gap-2">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Play className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Code className="h-4 w-4" />
              </Button>
            </div>
            <pre className="overflow-x-auto">
              <code>{currentConcepts[step].code}</code>
            </pre>
          </div>

          <div className="mt-4">
            <h3 className="font-medium mb-2">실습하기</h3>
            <p className="text-sm mb-3">{currentConcepts[step].practice.question}</p>
            <div className="space-y-2">
              {currentConcepts[step].practice.options.map((option, index) => (
                <button
                  key={index}
                  className={`w-full p-3 text-left text-sm rounded-lg border transition-colors
                    ${showAnswer
                      ? index === currentConcepts[step].practice.answer
                        ? 'bg-green-50 border-green-500'
                        : 'bg-gray-50 border-gray-200'
                      : 'hover:bg-gray-50 border-gray-200'
                    }`}
                  onClick={() => handleOptionClick(index)}
                  disabled={showAnswer}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showAnswer && index === currentConcepts[step].practice.answer && (
                      <Check className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setStep(prev => prev - 1);
            setShowAnswer(false);
          }}
          disabled={step === 0}
        >
          이전
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setStep(prev => prev + 1);
            setShowAnswer(false);
          }}
          disabled={step === currentConcepts.length - 1 || !showAnswer}
        >
          다음
        </Button>
      </div>

      {showAnswer && (
        <div className="mt-4 text-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500"
            onClick={() => {
              setShowAnswer(false);
              setProgress(0);
            }}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            다시 풀기
          </Button>
        </div>
      )}
    </div>
  );
};

export default ConceptLearning;