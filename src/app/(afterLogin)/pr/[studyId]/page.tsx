import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import BottomNavigation from "../../_component/BottomNavigation";
import { getPrCards } from "./_lib/getPrCards";
import PrCardsArea from "./_component/PrCardsArea";

export default async function PRPage({
  params,
}: {
  params: Promise<{ studyId: string }>
}) {
  const {studyId} = await params;
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({queryKey: ['pr', 'cards', studyId], queryFn: getPrCards});
  const dehydratedState = dehydrate(queryClient);
  
  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-50 pb-20">
      <HydrationBoundary state={dehydratedState}>
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">모의 PR</h1>
        <p className="text-sm text-gray-500 mt-1">
          실제 상황에서 발생할 수 있는 PR을 연습해보세요
        </p>
      </div>

      {/* Recommended PRs */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-gray-900">추천 PR</h2>
          <div className="text-sm text-purple-600">
            매일 새로운 PR이 업데이트됩니다
          </div>
        </div>
        <PrCardsArea studyId={studyId}/>
      </div>
      <BottomNavigation />
      </HydrationBoundary>
    </div>
  );
};
