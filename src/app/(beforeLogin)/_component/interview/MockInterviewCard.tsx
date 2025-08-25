import { InterviewCard } from "@/model/interview/InterviewCard"
import { ChevronRight } from "lucide-react";

type Props = {
  interview: InterviewCard;
}

export default function MockInterviewCard({ interview }: Props) {
  return (
    <div
      key={interview.id}
      className="bg-white rounded-xl border border-gray-200 p-4 space-y-3 hover:border-purple-200 cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-900 text-sm md:text-base">{interview.title}</h3>
          <p className="text-xs text-gray-500 mt-1 md:text-sm">{interview.description}</p>
        </div>
        <ChevronRight className="text-gray-400" />
      </div>
    </div>
  )
}