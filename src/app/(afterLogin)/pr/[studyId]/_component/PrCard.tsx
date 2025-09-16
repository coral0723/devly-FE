"use client"

import { PrCard as IPrCard } from "@/model/pr/PrCard";
import { useRouter } from "nextjs-toploader/app";
import { useParams } from "next/navigation"
import { ChevronRight } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { getPrChangedFiles } from "../[prId]/_lib/getPrChangedFiles";
import { getPrComments } from "../[prId]/_lib/getPrComments";
import { msUntilNextMidnight } from "@/app/(afterLogin)/_utils/msUntilNextMidnight";

type Props = {
  pr: IPrCard;
}

export default function PrCard({ pr }: Props) {
  const router = useRouter();
  const studyId = useParams().studyId;
  const queryClient = useQueryClient();

  const prefetch = async () => {
    const freshFor = msUntilNextMidnight();
    if (!studyId) return;
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ["pr", "changedFiles", String(pr.id)],
        queryFn: getPrChangedFiles,
        staleTime: freshFor,
      }),
      queryClient.prefetchQuery({
        queryKey: ["pr", "comments", String(pr.id)],
        queryFn: getPrComments,
        staleTime: freshFor,
      }),
    ]);
  };

  const handleClick = async () => {
    if (studyId && pr) {
      // 모바일에서는 hover가 없으니 클릭 직전에라도 prefetch
      await prefetch();
      router.replace(`/pr/${studyId}/${pr.id}/learn`);
    } else {
      router.replace("/home");
    }
  };

  return (
    <div
      key={pr.id}
      onClick={handleClick}
      className="bg-white rounded-xl border border-gray-200 p-4 space-y-3 hover:border-purple-200 cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm md:text-base font-medium text-gray-900">{pr.title}</h3>
          <p className="text-xs md:text-sm text-gray-500 mt-1">{pr.description}</p>
        </div>
        <ChevronRight className="text-gray-400" />
      </div>

      <div className="flex flex-wrap gap-2">
        {pr.labels.map((label) => (
          <span
            key={label}
            className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] md:text-xs"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}