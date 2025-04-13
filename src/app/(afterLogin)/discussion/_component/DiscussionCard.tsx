"use client"

import { DiscussionCard as IDiscussionCard } from "@/model/discussion/DiscussionCard";
import { useRouter } from "next/navigation"
import { ChevronRight } from "lucide-react";

type Props = {
  discussion: IDiscussionCard;
}

export default function DisscussionCard({ discussion }: Props) {
  const router = useRouter();

  return (
    <div
      key={discussion.id}
      onClick={() => router.replace(`/discussion/${discussion.id}`)}
      className="bg-white rounded-xl border border-gray-200 p-4 space-y-3 hover:border-orange-200 cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-900">{discussion.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{discussion.description}</p>
        </div>
        <ChevronRight className="text-gray-400" />
      </div>

      {/* <div className="flex items-center gap-3 text-sm">
        <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full">
          {discussion.difficulty}
        </span>
        <div className="flex items-center gap-1 text-gray-500">
          <Clock size={14} />
          <span>{discussion.estimatedTime}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {discussion.tags.map((tag) => (
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