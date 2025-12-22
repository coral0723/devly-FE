"use client";

import { Chat } from "@/model/interview/Chat";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useRef, useState } from "react";
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
import { useBrowserSpeechRecognition, useVoiceOptimisticChat } from "react-optimistic-chat";
import { fetchInterview } from "../_lib/fetchInterview";

type Props = {
  interviewId: string;
  isReview: boolean;
};

export default function InterviewLearningContainer({ interviewId, isReview }: Props) {
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [showTimeoutModal, setShowTimeoutModal] = useState<boolean>(false);
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);
  const [showCompletion, setShowCompletion] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const voice = useBrowserSpeechRecognition();

  const {
    messages,
    isPending,
    isInitialLoading,
    startRecording,
    stopRecording,
  } = useVoiceOptimisticChat<Chat>({
    voice,
    queryKey: ["interview", "learn", interviewId],
    queryFn: () => fetchInterview(interviewId),
    mutationFn: async (content: string): Promise<Chat> => {
      const res = await axios.post(
        `/mock/study/interview/recomment/${messages[messages.length - 1].id}`, 
        {role: "user", content }
      );
      return res.data;
    },
    map: (raw) => ({
      id: raw.id,
      role: raw.role === "ai" ? "AI" : "USER",
      content: raw.content,
      end: raw.end,
    }),
    staleTime: msUntilNextMidnight(),
  });

  // AI 응답으로 end 감지
  useEffect(() => {
    const last = messages[messages.length - 1];
    if (last?.end) setIsEnd(true);
  }, [messages]);

  // 남은 시간 계산 
  useEffect(() => {
    if (timeLeft > 0 && !isEnd) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft <= 0) {
      setShowTimeoutModal(true);
    }
  }, [timeLeft, isEnd]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleRecord = () => {
    if (voice.isRecording) {
      stopRecording();
      setTimeLeft(30);
    } else {
      startRecording();
    }
  };

  if( isInitialLoading || !messages ) {
    return (
      <div className='flex h-[100dvh] bg-gray-50 items-center justify-center'>
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
        {messages.map((chat) => (
          <ChatMessage
            key={chat.id}
            chat={chat}
            isLoading={chat.role === "AI" && chat.content === "" && isPending}
          />
        ))}
      </ContentsWrapper>

      <BottomButton
        interviewId={interviewId}
        isRecording={voice.isRecording}
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
