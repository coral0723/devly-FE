"use client"

import { InterviewCard as IInterviewCard } from "@/model/interview/InterviewCard";
import { useRouter, useParams } from "next/navigation"
import { ChevronRight } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { getInterview } from "../[interviewId]/_lib/getInterview";
import { msUntilNextMidnight } from "../../../_utils/msUntilNextMidnight";

type Props = {
  interview: IInterviewCard;
}

export default function InterviewCard({ interview }: Props) {
  const router = useRouter();
  const studyId = useParams().studyId;
  const queryClient = useQueryClient();

  const prefetch = async () => {
    const freshFor = msUntilNextMidnight();
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ["interview", "learn", String(interview.id)],
        queryFn: getInterview,
        staleTime: freshFor,
      }),
    ]);
  };

  const handleClick = async () => {
    if (interview) {
      // 모바일에서는 hover가 없으니 클릭 직전에라도 prefetch
      await prefetch();
      router.replace(`/interview/${studyId}/${interview.id}/learn`);
    } else {
      router.replace("/home");
    }
  };

  return (
    <div
      key={interview.id}
      onClick={handleClick}
      className="bg-white rounded-xl border border-gray-200 p-4 space-y-3 hover:border-orange-200 cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-900">{interview.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{interview.description}</p>
        </div>
        <ChevronRight className="text-gray-400" />
      </div>

      {/* <div className="flex items-center gap-3 text-sm">
        <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full">
          {interview.difficulty}
        </span>
        <div className="flex items-center gap-1 text-gray-500">
          <Clock size={14} />
          <span>{interview.estimatedTime}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {interview.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
          >
            {tag}
          </span>
        ))}
      </div> */}
    </div>
  )
}