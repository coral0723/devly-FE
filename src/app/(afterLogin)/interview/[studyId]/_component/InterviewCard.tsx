"use client"

import { InterviewCard as IInterviewCard } from "@/model/interview/InterviewCard";
import { useRouter } from "nextjs-toploader/app";
import { useParams } from "next/navigation"
import { ChevronRight } from "lucide-react";

type Props = {
  interview: IInterviewCard;
}

export default function InterviewCard({ interview }: Props) {
  const router = useRouter();
  const studyId = useParams().studyId;

  const handleClick = async () => {
    if (interview) {
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