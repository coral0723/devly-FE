"use client"

import { DiscussionCard as IDiscussionCard } from "@/model/DiscussionCard";
import { useRouter } from "next/navigation"
import { ChevronRight } from "lucide-react";

type Props = {
  discussion: IDiscussionCard;
}

export default function DisscussionCard({discussion}: Props) {
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
    </div>
  )
}