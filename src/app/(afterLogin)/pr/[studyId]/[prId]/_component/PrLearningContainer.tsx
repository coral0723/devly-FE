"use client"

import LoadingSpinner from "@/app/_component/LoadingSpinner"
import Header from "./Header"
import ChangedFilesModal from "./ChangedFilesModal"
import { useEffect, useState } from "react"
import { Feedback } from "@/model/pr/Feedback"
import { PrChangedFiles } from "@/model/pr/PrChangedFiles"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getPrCards } from "../../_lib/getPrCards"
import { PrCard } from "@/model/pr/PrCard"
import { getPrChangedFiles } from "../_lib/getPrChangedFiles"
import { PrComments } from "@/model/pr/PrComments"
import { getPrComments } from "../_lib/getPrComments"
import { PrHistory } from "@/model/pr/prHistory"
import { getPrHistory } from "../_lib/getPrHistory"
import { useRouter } from "nextjs-toploader/app"
import { authApi } from "@/app/_lib/axios"
import { Answer } from "@/model/pr/Answer"
import { CompletionModal } from "./CompletionModal"
import PrMainContent from "./PrMainContent"
import axios from "axios"
import ExitConfirmModal from "./ExitConfirmModal"
import ContentsWrapper from "@/app/_component/ContentsWrapper"
import { msUntilNextMidnight } from "@/app/(afterLogin)/_utils/msUntilNextMidnight"
import { useQueryClient } from "@tanstack/react-query"
// import { FinalFeedback } from "@/model/pr/FinalFeedback"
// import FinalScoreModal from "./FinalScoreModal"

type Props = {
  studyId: string;
  prId: string;
  isReview: boolean;
  userId?: string;
}

export default function PrLearningContainer({ studyId, prId, isReview, userId = undefined }: Props) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);
  const [showCompletion, setShowCompletion] = useState<boolean>(false);
  const [replies, setReplies] = useState<string[]>([]); //답안들 저장용
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [showFiles, setShowFiles] = useState<boolean>(false); //"커밋 내역" Modal
  const router = useRouter();
  const queryClient = useQueryClient();
  // const [showFinalScore, setShowFinalScore] = useState<boolean>(false); //"점수 포함된 최종 결과" Modal
  // const [finalFeedback, setFinalFeedback] = useState<FinalFeedback>(); 

  const {data: prCards, isLoading: isCardsLoading} = useQuery<PrCard, object, PrCard, [_1: string, _2: string, string]>({
    queryKey: ['pr', 'cards', studyId as string],
    queryFn: getPrCards,
    staleTime: msUntilNextMidnight(),
  });

  const {data: prChangedFiles, isLoading: isChangedFilesLoading} = useQuery<PrChangedFiles, object, PrChangedFiles, [_1: string, _2: string, string]>({
    queryKey: ['pr', 'changedFiles', prId as string],
    queryFn: getPrChangedFiles,
    staleTime: msUntilNextMidnight(),
  });

  const {data: prComments, isLoading: isCommentsLoading} = useQuery<PrComments, object, PrComments, [_1: string, _2: string, string]>({
    queryKey: ['pr', 'comments', prId as string],
    queryFn: getPrComments,
    staleTime: msUntilNextMidnight(),
  });

  const {data: prHistory, isLoading: isPrHistoryLoading} = useQuery<PrHistory, object, PrHistory, [_1: string, _2: string, string, string]>({
    queryKey: ['pr', 'history', prId as string, userId as string],
    queryFn: getPrHistory,
    staleTime: 60 * 1000,
    enabled: !!userId,
  });

  // prComments가 로드되면 replies 배열 초기화
  useEffect(() => {
    if (prComments) {
      if (prHistory) {
        // prHistory가 있으면 history에서 답변 가져오기
        setReplies(prHistory.answers);
      } else {
        // prHistory가 없으면 빈 문자열로 초기화된 배열 생성
        setReplies(Array(prComments.comments.length).fill(''));
      }
    }
  }, [prComments, prHistory]);

  const { mutate: postAnswer, isPending: isPostAnswerLoading } = useMutation<
    Feedback,
    Error,
    Answer
  >({
		mutationFn: async (params) => {
      const useMock = process.env.NEXT_PUBLIC_USE_MSW_PR === 'true';
      let response;

      if(useMock) {
        response = await axios.post(`/mock/pr/review/comment/${params.commentId}`, {
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
      if (isReview) { // 복습 페이지에서는 학습 완료 요청 안 보내게끔
        setShowCompletion(true);
        return; // API 요청 건너뛰기
      }

      const useMock = process.env.NEXT_PUBLIC_USE_MSW_PR === 'true';

      if(useMock) {
        return await axios.post(`/mock/pr/${prId}/study/${studyId}/done`)
      } else {
        return await authApi.post(`/api/pr/${prId}/study/${studyId}/done`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['pr', 'cards', studyId],
      });
      
      // isReview일 때도 setShowCompletion을 위에서 이미 호출하므로
      // 여기서는 API 요청 후의 경우에만 의미 있음
      if (!isReview) {
        setShowCompletion(true);
      }
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
    <div className="min-h-screen bg-gray-50">
      <Header
        title={prCards.title}
        currentStep={currentStep}
        stepLength={prComments.comments.length}
        setCurrentStep={setCurrentStep}
        setShowFiles={setShowFiles}
        onExit={() => setShowExitConfirm(true)}
      />

      <ContentsWrapper
        headerMobileHeight={129}
        headerDesktopHeight={113}
        className="overflow-y-auto h-[calc(100vh-70px)] md:h-[100vh] pb-2 md:pb-4"
      >
        <PrMainContent
          currentStep={currentStep}
          prComments={prComments}
          prHistory={prHistory}
          replies={replies}
          feedbacks={feedbacks}
          isPostAnswerLoading={isPostAnswerLoading}
          prChangedFiles={prChangedFiles}
          setReplies={setReplies}
          setCurrentStep={setCurrentStep}
          postAnswer={postAnswer}
        />
      </ContentsWrapper>

			{/* 마무리 버튼 - 모든 답변이 제출되었을 때만 표시 */}
			{currentStep === prComments.comments.length && feedbacks[currentStep-1] && (
        <div className="fixed bottom-0 left-0 right-0 p-2 bg-white border border-gray-200 z-10">
					<div className="max-w-lg mx-auto">
						<button
							className="w-full py-3 bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white md:text-lg font-medium rounded-lg"
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

      {showExitConfirm && (
        <ExitConfirmModal 
          isReview={isReview}
          onClose={() => setShowExitConfirm(false)}
        />
      )}

      {showCompletion ? (
        <CompletionModal
          isReview={isReview}
          onClose={() => {
            router.replace(isReview ? '/review' : '/home')
          }}
        />
      ): <></>}
    </div>
  )
}