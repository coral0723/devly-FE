"use client";

import { Chat } from "@/model/interview/Chat";
import { SpeechRecognition as ISpeechRecognition } from "@/model/Speech";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useRef, useState } from "react";
import { getInterview } from "../_lib/getInterview";
import axios from "axios";
import Header from "./Header";
import ChatMessage from "./ChatMessage";
import BottomButton from "./BottomButton";
import TimeoutModal from "./TimeoutModal";
import { CompletionModal } from "./CompletionModal";
import ExitConfirmModal from "./ExitConfirmModal";
import ContentsWrapper from "@/app/_component/ContentsWrapper";
import { msUntilNextMidnight } from "@/app/(afterLogin)/_utils/msUntilNextMidnight";
import LoadingSpinner from "@/app/_component/LoadingSpinner";

declare global {
  interface Window {
    SpeechRecognition: new () => ISpeechRecognition;
    webkitSpeechRecognition: new () => ISpeechRecognition;
  }
}

type Props = {
  interviewId: string;
  isReview: boolean;
};

export default function InterviewLearningContainer({ interviewId, isReview }: Props) {
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [showTimeoutModal, setShowTimeoutModal] = useState<boolean>(false);
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);
  const [showCompletion, setShowCompletion] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<ISpeechRecognition | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: interview, isLoading: isInterviewLoading } = useQuery<Chat[], object, Chat[], [string, string, string]>({
    queryKey: ["interview", "learn", interviewId],
    queryFn: getInterview,
    staleTime: msUntilNextMidnight(),
  });

  // UI는 캐시만 사용
  const chats = interview ?? [];

  // 남은 시간 계산 
  useEffect(() => {
    if (timeLeft > 0 && !isEnd) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft <= 0) {
      setShowTimeoutModal(true);
    }
  }, [timeLeft, isEnd]);

  // 채팅 추가 시 스크롤 자동 이동
  useEffect(() => {
    const scrollToBottom = () => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    };
    scrollToBottom();
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [chats]);

  // 사용자의 메시지 전송
  const postChat = useMutation({
    mutationFn: () => {
      return axios.post(`/mock/study/interview/recomment/${chats[chats.length - 1].id}`, {
        role: "user",
        content: transcript,
      });
    },
    onMutate: () => {
      queryClient.setQueryData(["interview", "learn", interviewId], (old?: Chat[]) => {
        if (!old) return [];
        const next = [...old];

        // 기존 user 메시지에 녹음 내용 반영
        const lastIndex = next.length - 1;
        if (next[lastIndex]?.role === "user") {
          next[lastIndex].content = transcript;
        }

        // AI 빈 메시지 추가
        next.push({
          id: Date.now() + 1,
          role: "ai",
          content: "",
          end: false,
        });

        return next;
      });
    },
    onSuccess: (response) => {
      const recomment = response.data;

      queryClient.setQueryData(["interview", "learn", interviewId], (old?: Chat[]) => {
        if (!old) return [];
        const next = [...old];

        // AI 빈 메시지가 마지막에 있으므로 교체
        next[next.length - 1] = recomment;

        return next;
      });

      if (recomment.end) {
        setIsEnd(true);
      }
    },
    onError: (error) => {
      console.error('Mutation error:', error);
      alert("메시지를 전송하지 못했습니다. 다시 시도해주세요.");
    }
  });


  // 음성 인식
  const handleRecord = () => {
    try {
      if (!isRecording) {
        const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!Speech) {
          console.error("Browser does not support SpeechRecognition");
          return;
        }

        recognition.current = new Speech();
        recognition.current.lang = "ko-KR";
        recognition.current.continuous = true;
        recognition.current.interimResults = true;

        // 말하는 동안 녹음 내용 반영 + 캐시 업데이트
        recognition.current.onresult = (event) => {
          const newTranscript = Array.from(event.results)
            .map((r) => r[0].transcript)
            .join("");

          setTranscript(newTranscript);

          queryClient.setQueryData(["interview", "learn", interviewId], (old?: Chat[]) => {
            if (!old) return [];
            const next = [...old];

            // 마지막 user 메시지 업데이트 
            const targetIndex = next.length - 1;
            if (next[targetIndex]?.role === "user") {
              next[targetIndex].content = newTranscript;
            }

            return next;
          });
        };

        // 녹음 시작 시 빈 사용자 메시지 추가 
        queryClient.setQueryData(["interview", "learn", interviewId], (old?: Chat[]) => {
          const next = old ? [...old] : [];

          next.push({
            id: Date.now(),
            role: "user",
            content: "",
            end: false,
          });

          return next;
        });

        recognition.current.start();
      } else {
        recognition.current?.stop();
        setTimeLeft(30);
        postChat.mutate();
      }

      setIsRecording(!isRecording);
    } catch (e) {
      console.error("Speech Recognition error:", e);
      setIsRecording(false);
    }
  };

  // 언마운트 시 정리
  useEffect(() => {
    return () => {
      recognition.current?.stop();
    };
  }, []);

  if( isInterviewLoading || !interview ) {
    return (
      <div className='flex max-w-lg mx-auto min-h-screen bg-gray-50 items-center justify-center'>
        <LoadingSpinner size={"md"} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header timeLeft={timeLeft} setShowExitConfirm={setShowExitConfirm} />

      <ContentsWrapper
        ref={containerRef}
        headerMobileHeight={56}
        headerDesktopHeight={60}
        className="max-w-4xl mx-auto overflow-y-auto scrollbar-hide h-[calc(100vh-40px)] pb-24"
      >
        {chats.map((chat) => (
          <ChatMessage
            key={chat.id}
            chat={chat}
            isLoading={chat.role === "ai" && chat.content === "" && postChat.isPending}
          />
        ))}
      </ContentsWrapper>

      <BottomButton
        interviewId={interviewId}
        isRecording={isRecording}
        isEnd={isEnd}
        setShowCompletion={setShowCompletion}
        handleRecord={handleRecord}
      />

      {showTimeoutModal && (
        <TimeoutModal
          onClose={() => {
            queryClient.removeQueries({ queryKey: ["interview", "learn", interviewId], exact: true });
            router.replace("/home");
          }}
        />
      )}

      {showCompletion && (
        <CompletionModal
          isReview={isReview}
          onClose={() => {
            queryClient.removeQueries({ queryKey: ["interview", "learn", interviewId], exact: true });
            router.replace(isReview ? "/review" : "/home");
          }}
        />
      )}

      {showExitConfirm && (
        <ExitConfirmModal
          onClose={() => setShowExitConfirm(false)}
          onExit={() => {
            queryClient.removeQueries({ queryKey: ["interview", "learn", interviewId], exact: true });
            router.replace(isReview ? "/review" : "/home");
          }}
        />
      )}
    </div>
  );
}
