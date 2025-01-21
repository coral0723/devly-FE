'use client'

import React, {useMemo, useState} from 'react';
import { useParams } from 'next/navigation';
import { PR_DETAILED_DATA } from './PrDatas';
import Header from './_component/Header';
import { Pr } from '@/model/Pr';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getPr } from './_lib/getPr';
import CommitModal from './_component/CommitModal';
import LoadingSpinner from '@/app/_component/LoadingSpinner';
import ChangedFilesModal from './_component/ChangedFilesModal';
import FinalScoreModal from './_component/FinalScoreModal';
import { FinalFeedback } from '@/model/FinalFeedback';
import { api } from '@/app/_lib/axios';
import { Feedback } from '@/model/Feedback';
import FirstFeedback from './_component/FirstFeedback';

export default function PRLearnPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showFiles, setShowFiles] = useState<boolean>(false); //"커밋 내역" Modal
  const [showCommits, setShowCommits] = useState<boolean>(false); //"변경된 파일" Modal
  const [showFinalScore, setShowFinalScore] = useState<boolean>(false); //"최종 결과" Modal
  const [prDescription, setPrDescription] = useState(''); //첫 번째 답안 저장용
	const [firstFeedback, setFirstFeedback] = useState<Feedback>(); 
  const [finalFeedback, setFinalFeedback] = useState<FinalFeedback>(); // finalFeedback 저장

  const [replies, setReplies] = useState({});
  const [submittedReplies, setSubmittedReplies] = useState({}); // 답변 제출 여부만 체크

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
			return await api.post(`/study/pr/${id}/feedback`, {
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

  const { mutate: finishLearning, isPending: isFinalLoading } = useMutation({
    mutationFn: async () => {
			return await api.get(`/study/pr/${id}/finalFeedback`);
    },
    onSuccess: (response) => {
			setFinalFeedback(response.data);
			setShowFinalScore(true);
    },
    onError: (error) => {
			console.log('에러 상세:', error);
    }
  });

  const handleReplySubmit = (commentId) => {
      if (!replies[commentId]) return;
      setSubmittedReplies(prev => ({
          ...prev,
          [commentId]: true
      }));
  };

  const allRepliesSubmitted = useMemo(() => {
      return PR_DETAILED_DATA.reviewComments.every(
          comment => submittedReplies[comment.id]
      );
  }, [submittedReplies]);



  if(isLoading) {
    return (
			<div>
				<LoadingSpinner size={"lg"} />
			</div>
    )
  }

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-50">
      <Header
        title={pr!.title}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        setShowCommits={setShowCommits}
        setShowFiles={setShowFiles}/>

      {/* Main Content */}
      <div className="p-4 overflow-y-auto" style={{ height: 'calc(100vh - 140px)' }}>
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
						<div className="flex flex-col gap-2">
							{firstFeedback ? (
								<button
									className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
									onClick={() => setCurrentStep(2)}
								>
									다음 단계
								</button>
							) : (
								<button
									className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
									onClick={() => firstLearning()}
								>
									{isFirstLoading ? (<LoadingSpinner size={'xs'}/>) : "검사하기"}
								</button>
							)}
						</div>
						{firstFeedback && <FirstFeedback feedback={firstFeedback}/>}
					</div>
				) : ( //리뷰어 답변 Step
              <div className="space-y-4 pb-20">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                      <h3 className="font-medium mb-2">리뷰어 답변</h3>
                      <p className="text-sm text-gray-600">
                          리뷰어의 코멘트에 영어로 답변해주세요.
                      </p>
                  </div>
                  {PR_DETAILED_DATA.reviewComments.map((review) => (
                      <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="bg-gray-50 p-3 rounded-lg mb-3">
                              <p className="text-sm text-gray-700">{review.comment}</p>
                          </div>
                          <textarea
                              className="w-full h-24 p-3 border border-gray-300 rounded-lg text-sm"
                              placeholder="답변을 영어로 작성해주세요..."
                              value={replies[review.id] || ''}
                              onChange={(e) => setReplies({...replies, [review.id]: e.target.value})}
                              disabled={submittedReplies[review.id]}
                          />
                          <div className="mt-3">
                              {!submittedReplies[review.id] ? (
                                  <button
                                      onClick={() => handleReplySubmit(review.id)}
                                      className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                      disabled={!replies[review.id]?.trim()}
                                  >
                                      답변 제출하기
                                  </button>
                              ) : (
                                  <div className="bg-gray-50 p-4 rounded-lg">
                                      <div className="text-center mb-4">
                                          <span className="font-medium">점수: </span>
                                          <span className="text-green-600 font-bold">85/100</span>
                                      </div>
                                      <div className="space-y-4">
                                          <div className="text-sm">
                                              <h4 className="font-medium mb-2">문법 검토</h4>
                                              <ul className="list-disc pl-4 space-y-1 text-gray-600">
                                                  <li>시제 사용: "I will implementing" → "I will implement" 또는 "I am
                                                      implementing"
                                                  </li>
                                                  <li>관사 사용: "implement singleton pattern" → "implement the
                                                      Singleton pattern"
                                                  </li>
                                              </ul>
                                          </div>
                                          <div className="text-sm">
                                              <h4 className="font-medium mb-2">기술적 설명</h4>
                                              <ul className="list-disc pl-4 space-y-1 text-gray-600">
                                                  <li>Singleton 패턴의 장점을 더 구체적으로 설명하면 좋을 것 같습니다.</li>
                                                  <li>Thread-safety 관련 구현 방식에 대한 설명이 필요합니다.</li>
                                              </ul>
                                          </div>
                                          <div className="text-sm">
                                              <h4 className="font-medium mb-2">전문 용어</h4>
                                              <ul className="list-disc pl-4 space-y-1 text-gray-600">
                                                  <li>"double-checked locking"은 전문 용어로 하이픈 사용이 필요합니다.</li>
                                                  <li>"lazy initialization"은 기술 용어로 대문자 없이 사용합니다.</li>
                                              </ul>
                                          </div>
                                          <div className="text-sm">
                                              <h4 className="font-medium mb-2">개선된 답변 예시</h4>
                                              <div className="bg-white p-3 rounded border border-gray-200 text-gray-600">
                                                  I have implemented the Singleton pattern with thread-safety in mind.
                                                  The implementation uses double-checked locking to ensure both lazy initialization
                                                  and thread safety while maintaining good performance.
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              )}
                          </div>
                      </div>
                  ))}
              </div>
          )}
      </div>

			{/* 마무리 버튼 - 모든 답변이 제출되었을 때만 표시 */}
			{currentStep === 2 && allRepliesSubmitted && (
				<div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
					<div className="max-w-lg mx-auto">
						<button
							className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
					pr={pr!}
					onClose={() => setShowCommits(false)}
				/>
			): <></>}
			
			{showFiles ? (
				<ChangedFilesModal
					pr={pr!}
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
