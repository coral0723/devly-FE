"use client"

import React, { useState, useEffect, useRef } from 'react';
import ExitConfirmModal from './_component/ExitConfirmModal';
import TimeoutModal from './_component/TimeoutModal';
import BottomButton from './_component/BottomButton';
import ChatMessage from './_component/ChatMessage';
import Header from './_component/Header';
import { useQuery } from '@tanstack/react-query';
import { Chat } from '@/model/Chat';
import { useParams } from 'next/navigation';
import { getDiscussion } from './_lib/getDiscussion';
import { SpeechRecognition as ISpeechRecognition } from '@/model/Speech';

declare global {
  interface Window {
    SpeechRecognition: new () => ISpeechRecognition;
    webkitSpeechRecognition: new () => ISpeechRecognition;
  }
}

export default function DiscussionLearnPage() {
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5분
  const [showTimeoutModal, setShowTimeoutModal] = useState<boolean>(false);
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [transcript, setTranscript] = useState<string>('');
  const recognition = useRef<ISpeechRecognition | null>(null);

  const params = useParams();
  const id = params.id as string;

  const {data: discussion, isLoading} = useQuery<Chat, object, Chat, [_1: string, _2: string, string]>({
    queryKey: ['discussion', 'learn', id],
    queryFn: getDiscussion,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  // 남은 시간
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setShowTimeoutModal(true);
    }
  }, [timeLeft]);

  // 채팅 저장
  useEffect(() => {
    if(discussion){
      // discussion에 id가 없거나 이미 있는 메시지인지 확인
      const exists = chats.some(chat => chat.id === discussion.id);
      if (!exists) {
        setChats([{
          ...discussion,
          id: discussion.id ?? Date.now() // discussion에 id가 없을 경우를 대비
        }]);
      }
    }
  }, [discussion]);

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


  // 음성 인식 코드
  const handleRecord = () => {
    try {
      if (!isRecording) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
          console.error('Speech Recognition is not supported in this browser');
          return;
        }
        
        recognition.current = new SpeechRecognition();
        if (!recognition.current) {
          console.error('Failed to initialize Speech Recognition');
          return;
        }
  
        recognition.current.lang = 'ko-KR';
        recognition.current.continuous = true;
        recognition.current.interimResults = true;
    
        recognition.current.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
          
          setTranscript(transcript);
          console.log('변환된 텍스트:', transcript);
        };
    
        recognition.current.start();
      } else {
        if (recognition.current) {
          recognition.current.stop();
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
   };

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-50">

      {/* Progress Header */}
      <Header
        timeLeft={timeLeft}
        setShowExitConfirm={setShowExitConfirm}
        formatTime={formatTime}
      />

      {/* Chat Messages */}
      <div ref={containerRef} className="p-4 pb-24 overflow-y-auto scrollbar-hide" style={{ height: 'calc(100vh - 40px)' }}>
        {discussion && chats.map((chat, index) => (
          <ChatMessage
            key={index}
            chat={chat}
            isLoading={isLoading}
          />
        ))}
        </div>

      {/* Recording Button */}
      <BottomButton
        isRecording={isRecording}
        handleRecord={handleRecord}
      />

      {/* Timeout Modal */}
      {showTimeoutModal && (
        <TimeoutModal/>
      )}

      {showExitConfirm && (
        <ExitConfirmModal onClose={() => {
          setShowExitConfirm(false);
          setChats([]);
        } }/> //query clear하는 코드 필요
      )}
  </div>
  );
}