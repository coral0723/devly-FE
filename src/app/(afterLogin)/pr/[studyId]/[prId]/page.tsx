import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import PrLearningContainer from './_component/PrLearningContainer';
import { getPrCards } from "../_lib/getPrCards";
import { getPrChangedFiles } from "./_lib/getPrChangedFiles";
import { getPrComments } from "./_lib/getPrComments";

export default async function PRLearnPage({params}: {params: {studyId: string, prId: string}}) {
  const { studyId, prId } = await params;
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({queryKey: ['pr', 'cards', studyId], queryFn: getPrCards});
  queryClient.prefetchQuery({queryKey: ['pr', 'ChangedFiles', prId], queryFn: getPrChangedFiles});
  queryClient.prefetchQuery({queryKey: ['pr', 'comments', prId], queryFn: getPrComments});
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-50">
      <HydrationBoundary state={dehydratedState}>
        <PrLearningContainer />
      </HydrationBoundary>
    </div>
  );
};
