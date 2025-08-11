"use client"

import React, { useState, useEffect, useRef } from 'react';
import ExitConfirmModal from './_component/ExitConfirmModal';
import TimeoutModal from './_component/TimeoutModal';
import BottomButton from './_component/BottomButton';
import ChatMessage from './_component/ChatMessage';
import Header from './_component/Header';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Chat } from '@/model/interview/Chat';
import { useParams } from 'next/navigation';
import { getInterview } from './_lib/getInterview';
import { SpeechRecognition as ISpeechRecognition } from '@/model/Speech';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { CompletionModal } from './_component/CompletionModal';

declare global {
  interface Window {
    SpeechRecognition: new () => ISpeechRecognition;
    webkitSpeechRecognition: new () => ISpeechRecognition;
  }
}

export default function InterviewLearnPage() {
  const [timeLeft, setTimeLeft] = useState<number>(30); // 30초
  const [showTimeoutModal, setShowTimeoutModal] = useState<boolean>(false);
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);
  const [showCompletion, setShowCompletion] = useState<boolean>(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [transcript, setTranscript] = useState<string>('');
  const recognition = useRef<ISpeechRecognition | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const temporaryMessageId = useRef<number | null>(null);
  const params = useParams();
  const id = params.id as string;

  const {data: interview, isLoading} = useQuery<Chat[], object, Chat[], [_1: string, _2: string, string]>({
    queryKey: ['interview', 'learn', id],
    queryFn: getInterview,
    staleTime: 0,
    refetchOnMount: 'always',
  });

  //쿼리와 채팅 상태를 동시에 업데이트 하는 함수
  const updateQueryAndChats = (newChats: Chat[]) => {
    const queryCache = queryClient.getQueryCache();
    const queryKeys = queryCache.getAll().map(cache => cache.queryKey);
    queryKeys.forEach((queryKey) => {
      if (queryKey[0] === "interview" && queryKey[1] === "learn") {
        queryClient.setQueryData(queryKey, newChats);
        setChats(newChats);
      }
    });
  };

  // 남은 시간
useEffect(() => {
  if (timeLeft > 0 && !isEnd) {
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  } else if (timeLeft <= 0) {
    setShowTimeoutModal(true);
  }
}, [timeLeft, isEnd]);

  //초기 채팅 저장
  // discussion이 undefined일 때도 chats를 빈 배열로 설정하도록 변경
  useEffect(() => {
    if (!isLoading) {
      setChats(interview ? [...interview] : []);
    }
  }, [isLoading, interview]);

  // 채팅 추가될 때마다 스크롤 다운
  useEffect(() => {
    if (chats.length > 0) {
      const scrollToBottom = () => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      };
  
      // 즉시 한 번 실행
      scrollToBottom();
      
      // 약간의 지연 후 한 번 더 실행 (컨텐츠가 완전히 렌더링된 후)
      const timeoutId = setTimeout(scrollToBottom, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [chats]);

  const postChat = useMutation({
    mutationFn: () => {
      return axios.post(`/mock/study/interview/recomment/${chats[chats.length-1].id}`, {
        id: temporaryMessageId.current,
        role: 'user',
        content: transcript,
      })
    },
    onMutate() {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map(cache => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if(queryKey[0] === "interview" && queryKey[1] === "learn") {
          const value: Chat[] = queryClient.getQueryData(queryKey) ?? []; //undefined라면 빈 배열 추가
          const shallow = [...value];
          if (temporaryMessageId.current) {
            const messageIndex = shallow.findIndex(chat => chat.id === temporaryMessageId.current);
            if (messageIndex !== -1) {
              shallow[messageIndex].content = transcript;
            }
          };
          shallow.push({
            id: Date.now() + 1,
            role: 'ai',
            content: '', // 빈 content로 시작
            end: false,
          });
          updateQueryAndChats(shallow);
        }
      })
    },
    onSuccess: (response) => {
      const recomment = response.data;

      // 쿼리 캐시 업데이트
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map(cache => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if(queryKey[0] === "interview" && queryKey[1] === "learn") {
          const value: Chat[] = queryClient.getQueryData(queryKey) ?? [];
          const shallow = [...value];
          // 마지막 메시지(빈 AI 응답)를 실제 응답으로 교체
          shallow[shallow.length - 1] = recomment;
          queryClient.setQueryData(queryKey, shallow);
          setChats(shallow);
        }
      });

      if(recomment.end === true) {
        setIsEnd(true);
      }
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    },
   });

  // 음성 인식 코드
  const handleRecord = () => {
    try {
      if (!isRecording) { // 녹음 시작
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
          console.error('이 브라우저에서는 음성 인식을 지원하지 않습니다.');
          return;
        }
  
        // 녹음 시작 시 빈 메시지 추가
        temporaryMessageId.current = Date.now();
        const newMessage: Chat = {
          id: temporaryMessageId.current,
          role: 'user',
          content: '',
          end: false,
        };
  
        // 새 메시지를 쿼리와 상태에 추가
        const queryCache = queryClient.getQueryCache();
        const queryKeys = queryCache.getAll().map(cache => cache.queryKey);
        queryKeys.forEach((queryKey) => {
          if (queryKey[0] === "interview" && queryKey[1] === "learn") {
            const value: Chat[] = queryClient.getQueryData(queryKey) ?? [];
            const newChats = [...value, newMessage];
            queryClient.setQueryData(queryKey, newChats);
            setChats(newChats);
          }
        });
        
        recognition.current = new SpeechRecognition();
        if (!recognition.current) {
          console.error('음성 인식에 실패했습니다.');
          return;
        }
  
        recognition.current.lang = 'ko-KR';
        recognition.current.continuous = true;
        recognition.current.interimResults = true;
    
        recognition.current.onresult = (event) => {
          const newTranscript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
          
          setTranscript(newTranscript);
  
          // 쿼리와 채팅 상태를 직접 업데이트
          const queryCache = queryClient.getQueryCache();
          const queryKeys = queryCache.getAll().map(cache => cache.queryKey);
          queryKeys.forEach((queryKey) => {
            if (queryKey[0] === "interview" && queryKey[1] === "learn") {
              const value: Chat[] = queryClient.getQueryData(queryKey) ?? [];
              const shallow = [...value];
              const messageIndex = shallow.findIndex(chat => chat.id === temporaryMessageId.current);
              if (messageIndex !== -1) {
                shallow[messageIndex].content = newTranscript;
                queryClient.setQueryData(queryKey, shallow);
                setChats(shallow);
              }
            }
          });
  
          console.log('Updated transcript:', newTranscript); // 디버깅용
        };
  
        recognition.current.start();
      } else { // 녹음 중단
        if (recognition.current) {
          recognition.current.stop();
          setTimeLeft(30);
          postChat.mutate();
        }
      }
      
      setIsRecording(!isRecording);
    } catch (error) {
      console.error('Speech Recognition error:', error);
      setIsRecording(false);
    }
  };

  // 컴포넌트가 언마운트될 때 정리
  useEffect(() => {
    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
    };
  }, []);

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-50">

      {/* Progress Header */}
      <Header
        timeLeft={timeLeft}
        setShowExitConfirm={setShowExitConfirm}
      />

      {/* Chat Messages */}
      <div ref={containerRef} className="p-4 pb-24 overflow-y-auto scrollbar-hide" style={{ height: 'calc(100vh - 40px)' }}>
        {interview && chats.map((chat) => (
          <ChatMessage
            key={chat.id}
            chat={chat}
            isLoading={chat.role === 'ai' && chat.content === '' && postChat.isPending}
          />
        ))}
        </div>

      {/* Recording Button */}
      <BottomButton
        isRecording={isRecording}
        isEnd={isEnd}
        setShowCompletion={setShowCompletion}
        handleRecord={handleRecord}
      />

      {/* Timeout Modal */}
      {showTimeoutModal && (
        <TimeoutModal
          onClose={() => {
            queryClient.removeQueries({
              queryKey: ["interview", "learn", id],
              exact: true
            });
            setChats([]);
            router.replace('/home');
          }}/>
      )}

      {showCompletion && (
        <CompletionModal
          onClose={() => {
            router.replace('/home');
          }}
        />
      )}

      {showExitConfirm && (
        <ExitConfirmModal 
          onClose={() => {
            setShowExitConfirm(false);
          }}
          onExit={() => {
            queryClient.removeQueries({
              queryKey: ["interview", "learn", id],
              exact: true
            });
            setChats([]);
            router.replace('/home');
          }}/> //query clear하는 코드 필요
      )}
    </div>
  );
}