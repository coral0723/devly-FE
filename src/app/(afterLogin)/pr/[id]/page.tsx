'use client'

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Header from './_component/Header';
import { Pr } from '@/model/Pr';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getPr } from './_lib/getPr';
import CommitModal from './_component/CommitModal';
import LoadingSpinner from '@/app/_component/LoadingSpinner';
import ChangedFilesModal from './_component/ChangedFilesModal';
import FinalScoreModal from './_component/FinalScoreModal';
import { FinalFeedback } from '@/model/FinalFeedback';
import { Feedback } from '@/model/Feedback';
import ReviewAssessment from './_component/ReviewAssessment';
import axios from 'axios';

export default function PRLearnPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [prDescription, setPrDescription] = useState<string>(''); //첫 번째 답안 저장용
  const [firstFeedback, setFirstFeedback] = useState<Feedback>(); 
  const [replies, setReplies] = useState<string>(''); //두 번째 답안 저장용용
  const [secondFeedback, setSecondFeedback] = useState<Feedback>();
  const [finalFeedback, setFinalFeedback] = useState<FinalFeedback>(); 
  const [showFiles, setShowFiles] = useState<boolean>(false); //"커밋 내역" Modal
  const [showCommits, setShowCommits] = useState<boolean>(false); //"변경된 파일" Modal
  const [showFinalScore, setShowFinalScore] = useState<boolean>(false); //"최종 결과" Modal

  const params = useParams();
  const id = params.id as string;

  const {data: pr, isLoading} = useQuery<Pr, object, Pr, [_1: string, _2: string, string]>({
    queryKey: ['pr', 'learn', id],
    queryFn: getPr,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

	const { mutate: firstLearning, isPending: isFirstLoading } = useMutation({
		mutationFn: async () => {
			return await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/study/pr/${id}/feedback`, {
				prDescription: prDescription
			});
		},
		onSuccess: (response) => {
			setFirstFeedback(response.data);
		},
		onError: (error) => {
			console.log('에러 상세:', error);
		}
	});

  const { mutate: secondLearning, isPending: isSecondLoading } = useMutation({
		mutationFn: async () => {
			return await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/study/pr/${id}/feedback`, {
				prDescription: prDescription
			});
		},
		onSuccess: (response) => {
			setSecondFeedback(response.data);
		},
		onError: (error) => {
			console.log('에러 상세:', error);
		}
	});

  const { mutate: finishLearning, isPending: isFinalLoading } = useMutation({
    mutationFn: async () => {
			return await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/study/pr/${id}/finalFeedback`);
    },
    onSuccess: (response) => {
			setFinalFeedback(response.data);
			setShowFinalScore(true);
    },
    onError: (error) => {
			console.log('에러 상세:', error);
    }
  });

  if(isLoading || !pr) {
    return (
			<div className='flex max-w-lg mx-auto min-h-screen bg-gray-50 items-center justify-center'>
				<LoadingSpinner size={"md"} />
			</div>
    )
  }

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-50">
      <Header
        title={pr.title}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        setShowCommits={setShowCommits}
        setShowFiles={setShowFiles}/>

      {/* Main Content */}
      <div className="p-4 overflow-y-auto scrollbar-hide" style={{ height: 'calc(100vh - 176px)' }}>
				{currentStep === 1 ? ( // PR 설명 작성 Step
					<div className="space-y-4">
						<div className="bg-white p-4 rounded-lg border border-gray-200">
							<h3 className="font-medium mb-2">PR 설명 작성</h3>
							<p className="text-sm text-gray-600">
								커밋 로그와 변경된 파일을 확인해 어떤 부분을 반영하고 개선한 PR인지 설명해주세요!
							</p>
						</div>
						<textarea
							className="w-full h-32 p-3 border border-gray-300 rounded-lg text-sm bg-white"
							placeholder="PR 설명을 작성해주세요..."
							value={prDescription}
							onChange={(e) => setPrDescription(e.target.value)}
						/>
						{firstFeedback && <ReviewAssessment feedback={firstFeedback}/>}
						<div className="fixed w-full max-w-lg bottom-0 left-1/2 transform -translate-x-1/2 p-2 bg-white border border-gray-200 z-10">
							{firstFeedback ? (
								<button
									className="w-full py-3 bg-purple-600 text-white rounded-lg text-lg font-medium hover:bg-purple-700"
									onClick={() => setCurrentStep(2)}
								>
									다음 단계
								</button>
							) : (
								<button
									className="w-full py-3 bg-purple-600 text-white rounded-lg text-lg font-medium hover:bg-purple-700"
									onClick={() => firstLearning()}
								>
									{isFirstLoading ? (<LoadingSpinner size={'xs'}/>) : "검사하기"}
								</button>
							)}
						</div>
					</div>
				) : ( //리뷰어 답변 Step
              <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium mb-2">리뷰어 답변</h3>
                    <p className="text-sm text-gray-600">
                        리뷰어의 코멘트에 영어로 답변해주세요.
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="bg-gray-50 p-3 rounded-lg mb-3">
                      <p className="text-sm text-gray-700">{pr.reviewComment.comment}</p>
                    </div>
                    <textarea
                      className="w-full h-32 p-3 border border-gray-300 rounded-lg text-sm bg-white"
                      placeholder="답변을 영어로 작성해주세요..."
                      value={replies}
                      onChange={(e) => setReplies(e.target.value)}
                    />
                  </div>
                  {secondFeedback && <ReviewAssessment feedback={secondFeedback}/>}
                  <div className="fixed w-full max-w-lg bottom-0 left-1/2 transform -translate-x-1/2 p-2 bg-white border border-gray-200 z-10">
                    {secondFeedback ? (
                      <></>
                    ) : (
                      <button
                        className="w-full py-3 bg-purple-600 text-white text-lg font-medium rounded-lg hover:bg-purple-700"
                        onClick={() => secondLearning()}
                      >
                        {isSecondLoading ? (<LoadingSpinner size={'xs'}/>) : "검사하기"}
                      </button>
                    )}
                  </div>
              </div>
          )}
      </div>

			{/* 마무리 버튼 - 모든 답변이 제출되었을 때만 표시 */}
			{currentStep === 2 && secondFeedback && (
				// <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <div className="fixed w-full max-w-lg bottom-0 left-1/2 transform -translate-x-1/2 p-2 bg-white border border-gray-200 z-10">
					<div className="max-w-lg mx-auto">
						<button
							className="w-full py-3 bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white text-lg font-medium rounded-lg"
							onClick={() => finishLearning()}
						>
							{isFinalLoading ? (<LoadingSpinner size={'xs'}/>): "학습 마무리하기"}
						</button>
					</div>
				</div>
			)}

			{/* Modals */}
			{showCommits ? (
				<CommitModal
					pr={pr}
					onClose={() => setShowCommits(false)}
				/>
			): <></>}
			
			{showFiles ? (
				<ChangedFilesModal
					pr={pr}
					onClose={() => setShowFiles(false)}
				/>
			): <></>}

			{showFinalScore && finalFeedback ? (
				<FinalScoreModal
					finalFeedback={finalFeedback}
				/>
			): <></>}

    </div>
  );
};
