"use client"

import { PrCard as IPrCard } from "@/model/PrCard";
import { useRouter } from "next/navigation"
import { ChevronRight, Clock } from "lucide-react";

type Props = {
  pr: IPrCard;
}

export default function DisscussionCard({pr}: Props) {
  const router = useRouter();

  return (
    <div
      key={pr.id}
      onClick={() => router.replace(`/discussion/${pr.id}`)}
      className="bg-white rounded-xl border border-gray-200 p-4 space-y-3 hover:border-purple-200 cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-900">{pr.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{pr.description}</p>
        </div>
        <ChevronRight className="text-gray-400" />
      </div>

      <div className="flex items-center gap-3 text-sm">
        <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full">
          {pr.difficulty}
        </span>
        <div className="flex items-center gap-1 text-gray-500">
          <Clock size={14} />
          <span>{pr.estimatedTime}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {pr.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}