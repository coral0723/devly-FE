import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import BackButton from '../_component/BackButton';
import BottomButton from './_component/BottomButton';
import { getKnowledges } from './_lib/getKnowledges'

type Props = {
  searchParams: {
    studyId: string;
  }
}

export default async function KnowledgePage({searchParams}: Props) {
  const {studyId} = await searchParams;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({queryKey: ['knowledge', 'learn', studyId], queryFn: getKnowledges});
  const dehydratedState = dehydrate(queryClient);

    return (
        <div className="max-w-lg mx-auto min-h-screen bg-gray-50 relative overflow-hidden">
            <HydrationBoundary state={dehydratedState}>
            {/* Floating Icons */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 animate-float-slow opacity-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>
                    </svg>
                </div>
                <div className="absolute top-40 right-10 animate-float-medium opacity-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                    </svg>
                </div>
                <div className="absolute bottom-40 left-10 animate-float-fast opacity-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/>
                      <path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/>
                    </svg>
                </div>
                <div className="absolute bottom-40 right-10 animate-float-medium opacity-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 12.5 8 15l2 2.5"/><path d="m14 12.5 2 2.5-2 2.5"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/>
                    </svg>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 px-6 pb-24">
                <BackButton/>

                <div className="text-center mb-8">
                    <div className="inline-block p-3 bg-blue-100 rounded-2xl mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold mb-3">
                        오늘의 CS/개발 지식
                    </h1>
                    <p className="text-gray-600 mb-2">
                        실무에 필요한 CS/개발 지식을
                    </p>
                    <p className="text-gray-600">
                        쉽게 이해하고 학습하세요
                    </p>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
                        </svg>
                        <h3 className="font-medium mb-1">쉬운 설명</h3>
                        <p className="text-sm text-gray-500">복잡한 개념을 쉽게 이해해보세요</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>
                        </svg>
                        <h3 className="font-medium mb-1">실무 연계</h3>
                        <p className="text-sm text-gray-500">현업에서 어떻게 쓰이는지 알아보세요</p>
                    </div>
                </div>

                {/* Additional Info Section */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-medium">오늘의 학습</h3>
                            <p className="text-sm text-gray-500">3개의 새로운 지식</p>
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
                        학습을 완료하면 150 XP를 획득할 수 있어요!
                    </div>
                </div>
            </div>
            <BottomButton studyId={studyId}/>
            </HydrationBoundary>
        </div>
    );
}
