import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import BottomNavigation from '../_component/BottomNavigation';
import { getRankings } from './_lib/getRankings';
import RankingContents from './_component/RankingContents';


export default async function RankingPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({queryKey: ['rankings'], queryFn: getRankings});
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-50 pb-16">
      <HydrationBoundary state={dehydratedState}>
        <RankingContents/>
      </HydrationBoundary>
      <BottomNavigation/>
    </div>
  );
};
