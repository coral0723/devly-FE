import DevSelectionArea from './_component/DevSelectionArea';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getDevTypes } from './_lib/getDevTypes';

export default function SelectDevPage() {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({ queryKey: ['dev-types'], queryFn: getDevTypes});
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className='min-h-screen bg-white-50 to-white relative overflow-hidden flex items-center justify-center'>
      {/* Floating Background Icons */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-16 left-7 animate-float-slow opacity-20'>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
          </svg>
        </div>
        <div className="absolute top-24 right-5 animate-float-medium opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>
          </svg>
        </div>
        <div className="absolute bottom-40 left-20 animate-float-fast opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 12.5 8 15l2 2.5"/><path d="m14 12.5 2 2.5-2 2.5"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/>
          </svg>
        </div>
        <div className="absolute bottom-40 right-20 animate-float-medium opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" x2="6" y1="9" y2="21"/>
          </svg>
        </div>
      </div>

      <div className='max-w-lg mx-auto px-6 relative z-10'>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">개발자 유형을 선택해주세요</h1>
          <p className="text-gray-600">선택하신 개발자 유형에 맞는 학습 콘텐츠를 제공해드립니다</p>
        </div>
        <HydrationBoundary state={dehydratedState}>
          <DevSelectionArea/>
        </HydrationBoundary>
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            선택하신 개발자 유형은 나중에 변경하실 수 있습니다
          </p>
        </div>
      </div>
    </div>
  );
}