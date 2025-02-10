import FloatingIcons from './_component/FloatingIcons';
import BottomButton from './_component/BottomButton';
import BackButton from '../_component/BackButton';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getWords } from './_lib/getWords';
import { getValidationResult } from './_lib/getValidationResult';

type Props = {
  searchParams: {
    studyId: string;
  }
}

export default async function WordsPage({searchParams}: Props) {
  const {studyId} = await searchParams;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({queryKey: ['words', 'learn', studyId], queryFn: getWords});
  await queryClient.prefetchQuery({queryKey: ['words', 'validation', studyId], queryFn: getValidationResult});
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-50 relative overflow-hidden">
      <HydrationBoundary state={dehydratedState}>
      <FloatingIcons/>

      {/* Main Content */}
      <div className="relative z-10 px-6 pb-24">
        <BackButton/>
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-green-100 rounded-2xl mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
          </svg>
          </div>
          <h1 className="text-2xl font-bold mb-3">
            오늘의 개발 영단어
          </h1>
          <p className="text-gray-600 mb-2">
            개발 문서에서 자주 사용되는
          </p>
          <p className="text-gray-600">
            필수 영단어를 학습해보세요
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855ed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>
              <path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>
            </svg>
            <h3 className="font-medium mb-1">발음 학습</h3>
            <p className="text-sm text-gray-500">AI를 통해 정확한 발음을 익혀보세요</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>
            </svg>
            <h3 className="font-medium mb-1">실제 예문</h3>
            <p className="text-sm text-gray-500">개발 문서의 실제 예시로 학습하세요</p>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
              </svg>
            </div>
            <div>
              <h3 className="font-medium">오늘의 학습</h3>
              <p className="text-sm text-gray-500">5개의 새로운 단어</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
              학습을 완료하면 100 XP를 획득할 수 있어요!
          </div>
        </div>
      </div>
      <BottomButton
        groupId={studyId}
      />
      </HydrationBoundary>
    </div>
  )
}