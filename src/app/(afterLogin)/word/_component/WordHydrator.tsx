import { ReactNode } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getWords } from "../_lib/getWords";
import { getValidationWordResult } from "../_lib/getValidationWordResult";

export default async function WordHydrator({
  studyId,
  children,
}: {
  studyId: string;
  children: ReactNode;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["word", "learn", studyId],
    queryFn: getWords,
  });

  await queryClient.prefetchQuery({
    queryKey: ["word", "validation", studyId],
    queryFn: getValidationWordResult,
  });

  const dehydratedState = dehydrate(queryClient);

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
}
