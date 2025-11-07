"use client"

import { InterviewCard as IInterviewCard } from "@/model/interview/InterviewCard";
import { useRouter } from "nextjs-toploader/app";
import { useParams } from "next/navigation"
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
    if (!studyId) return;
    await queryClient.prefetchQuery({
      queryKey: ["interview", "learn", String(interview.id)],
      queryFn: getInterview,
      staleTime: msUntilNextMidnight(),
    })
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
    </div>
  )
}