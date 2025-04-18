"use client"

import LoadingSpinner from "@/app/_component/LoadingSpinner"
import Header from "./Header"
import ChangedFilesModal from "./ChangedFilesModal"
import { useState } from "react"
import { Feedback } from "@/model/pr/Feedback"
import { PrChangedFiles } from "@/model/pr/PrChangedFiles"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { getPrCards } from "../../_lib/getPrCards"
import { PrCard } from "@/model/pr/PrCard"
import { getPrChangedFiles } from "../_lib/getPrChangedFiles"
import { PrComments } from "@/model/pr/PrComments"
import { getPrComments } from "../_lib/getPrComments"
import { PrHistory } from "@/model/pr/prHistory"
import { getPrHistory } from "../_lib/getPrHistory"
import { useRouter } from "next/navigation"
import { authApi } from "@/app/_lib/axios"
import { Answer } from "@/model/pr/Answer"
import { CompletionModal } from "./CompletionModal"
import PrMainContent from "./PrMainContent"
import axios from "axios"
// import { FinalFeedback } from "@/model/pr/FinalFeedback"
// import FinalScoreModal from "./FinalScoreModal"

type Props = {
  isReview: boolean;
  userId?: string;
}

export default function PrLearningContainer({ isReview, userId = undefined }: Props) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [replies, setReplies] = useState<string[]>([]); //답안들 저장용
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [showFiles, setShowFiles] = useState<boolean>(false); //"커밋 내역" Modal
  const [showCompletion, setShowCompletion] = useState<boolean>(false);
  const { studyId, prId } = useParams();
  const router = useRouter();
  // const [showFinalScore, setShowFinalScore] = useState<boolean>(false); //"점수 포함된 최종 결과" Modal
  // const [finalFeedback, setFinalFeedback] = useState<FinalFeedback>(); 

  const {data: prCards, isLoading: isCardsLoading} = useQuery<PrCard, object, PrCard, [_1: string, _2: string, string]>({
    queryKey: ['pr', 'cards', studyId as string],
    queryFn: getPrCards,
    staleTime: 0,
    refetchOnMount: 'always',
  });

  const {data: prChangedFiles, isLoading: isChangedFilesLoading} = useQuery<PrChangedFiles, object, PrChangedFiles, [_1: string, _2: string, string]>({
    queryKey: ['pr', 'changedFiles', prId as string],
    queryFn: getPrChangedFiles,
    staleTime: 0,
    refetchOnMount: 'always',
  });

  const {data: prComments, isLoading: isCommentsLoading} = useQuery<PrComments, object, PrComments, [_1: string, _2: string, string]>({
    queryKey: ['pr', 'comments', prId as string],
    queryFn: getPrComments,
    staleTime: 0,
    refetchOnMount: 'always',
  });

  const {data: prHistory, isLoading: isPrHistoryLoading} = useQuery<PrHistory, object, PrHistory, [_1: string, _2: string, string, string]>({
    queryKey: ['pr', 'history', prId as string, userId as string],
    queryFn: getPrHistory,
    staleTime: 0,
    refetchOnMount: 'always',
    enabled: !!userId,
  });

  const { mutate: postAnswer, isPending: isPostAnswerLoading } = useMutation<
    Feedback,
    Error,
    Answer
  >({
		mutationFn: async (params) => {
      const useMock = process.env.NEXT_PUBLIC_USE_MSW_PR === 'true';
      let response;

      if(useMock) {
        response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pr/review/comment/${params.commentId}`, {
          answer: params.answer,
          studyId: Number(studyId),
        });
      } else {
        response = await authApi.post(`/api/pr/review/comment/${params.commentId}`, {
          answer: params.answer,
          studyId: Number(studyId),
        });
      }
      return response.data.result;
		},
    //feedbackData: response.data.result, variables: 함수 호출할 때 사용한 파라미터
		onSuccess: (feedbackData, variables) => { 
      const commentIndex = prComments?.comments.findIndex((comment) => comment.id === variables.commentId);

      if (commentIndex !== undefined && commentIndex !== -1) {
        const updatedFeedbacks = [...feedbacks];
        updatedFeedbacks[commentIndex] = feedbackData;
        setFeedbacks(updatedFeedbacks);
      }
		},
		onError: (error) => {
			console.log('에러 상세:', error);
		}
	});

  // 추후 점수 추가 된 Feedback 개발 되면 사용 예정
  // const { mutate: getFinalFeedback, isPending: isFinalLoading } = useMutation({
  //   mutationFn: async () => {
	// 		return await authApi.post(`${process.env.NEXT_PUBLIC_BASE_URL}/study/pr/${prId}/finalFeedback`);
  //   },
  //   onSuccess: (response) => {
	// 		setFinalFeedback(response.data);
	// 		setShowFinalScore(true);
  //   },
  //   onError: (error) => {
	// 		console.log('에러 상세:', error);
  //   }
  // });

  const { mutate: completeStudy, isPending: isCompleteLoading } = useMutation({
    mutationFn: async () => {
			return await authApi.post(isReview ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/pr/${prId}/study/${studyId}/done` : `/api/pr/${prId}/study/${studyId}/done`);
    },
    onSuccess: () => {
			setShowCompletion(true);
    },
    onError: (error) => {
			console.log('에러 상세:', error);
    }
  });

  if(isCardsLoading || isChangedFilesLoading || isCommentsLoading || isPrHistoryLoading || !prCards || !prChangedFiles || !prComments || (userId && !prHistory)) {
    return (
			<div className='flex max-w-lg mx-auto min-h-screen bg-gray-50 items-center justify-center'>
				<LoadingSpinner size={"md"} />
			</div>
    )
  }
  
  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-50">
      <Header
        title={prCards.title}
        currentStep={currentStep}
        stepLength={prComments.comments.length}
        setCurrentStep={setCurrentStep}
        setShowFiles={setShowFiles}
      />

      <PrMainContent
        currentStep={currentStep}
        prComments={prComments}
        prHistory={prHistory}
        replies={replies}
        feedbacks={feedbacks}
        isPostAnswerLoading={isPostAnswerLoading}
        setReplies={setReplies}
        setCurrentStep={setCurrentStep}
        postAnswer={postAnswer}
      />

			{/* 마무리 버튼 - 모든 답변이 제출되었을 때만 표시 */}
			{currentStep === prComments.comments.length && feedbacks[currentStep-1] && (
        <div className="fixed w-full max-w-lg bottom-0 left-1/2 transform -translate-x-1/2 p-2 bg-white border border-gray-200 z-10">
					<div className="max-w-lg mx-auto">
						<button
							className="w-full py-3 bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white text-lg font-medium rounded-lg"
							onClick={() => {
                if(prHistory) {
                  router.back();
                } else {
                  completeStudy();
                }
              }}
              disabled={isCompleteLoading}
						>
							{isCompleteLoading
                ? (<LoadingSpinner size={'xs'}/>)
                : isReview 
                  ? "복습 마무리하기"
                  : "학습 마무리하기"
                }
						</button>
					</div>
				</div>
			)}

			{/* Modals */}
			{showFiles ? (
				<ChangedFilesModal
					prChangedFiles={prChangedFiles}
					onClose={() => setShowFiles(false)}
				/>

			): <></>}

			{/* {showFinalScore && finalFeedback ? (
				<FinalScoreModal
          isReview={isReview}
          studyId={studyId as string}
          prId={prId as string}
					finalFeedback={finalFeedback}
				/>
			): <></>} */}

      {showCompletion ? (
        <CompletionModal
          isReview={isReview}
          onClose={() => router.replace('/home')}
        />
      ): <></>}
    </div>
  )
}