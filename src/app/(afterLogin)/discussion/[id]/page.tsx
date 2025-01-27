"use client"

import React, { useState, useEffect } from 'react';
import ExitConfirmModal from './_component/ExitConfirmModal';
import TimeoutModal from './_component/TimeoutModal';
import BottomButton from './_component/BottomButton';
import ChatMessage from './_component/ChatMessage';
import Header from './_component/Header';
import { useQuery } from '@tanstack/react-query';
import { Chat } from '@/model/Chat';
import { useParams } from 'next/navigation';
import { getDiscussion } from './_lib/getDiscussion';

export default function DiscussionLearnPage() {
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5분
  const [showTimeoutModal, setShowTimeoutModal] = useState<boolean>(false);
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setShowTimeoutModal(true);
    }
  }, [timeLeft]);

  const {data: discussion, isLoading} = useQuery<Chat, object, Chat, [_1: string, _2: string, string]>({
    queryKey: ['discussion', 'learn', id],
    queryFn: getDiscussion,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  useEffect(() => {
    if(discussion)
      setChats(prev => [...prev, discussion])
  }, [discussion]);


  const handleRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setChats(prev => [...prev, 
          { role: 'user', content: '가상 DOM은 실제 DOM의 복사본으로...' },
          { role: 'ai', content: '좋은 설명입니다. 그렇다면 Virtual DOM이 성능 최적화에 어떤 도움을 주나요?' }
        ]);
        setIsRecording(false);
      }, 2000);
    }
  };

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
    <div className="p-4 pb-24">
      {discussion && chats.map((chat, index) => (
        <ChatMessage
          key={index}
          chat={chat}
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
      <ExitConfirmModal onClose={() => setShowExitConfirm(false)}/>
    )}
  </div>
  );
}