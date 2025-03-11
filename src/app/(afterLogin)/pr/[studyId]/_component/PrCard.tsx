"use client"

import { PrCard as IPrCard } from "@/model/pr/PrCard";
import { useRouter, useParams } from "next/navigation"
import { ChevronRight } from "lucide-react";

type Props = {
  pr: IPrCard;
}

export default function PrCard({pr}: Props) {
  const router = useRouter();
  const studyId = useParams().studyId;

  return (
    <div
      key={pr.id}
      onClick={() => router.replace(`/pr/${studyId}/${pr.id}`)}
      className="bg-white rounded-xl border border-gray-200 p-4 space-y-3 hover:border-purple-200 cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-900">{pr.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{pr.description}</p>
        </div>
        <ChevronRight className="text-gray-400" />
      </div>

      <div className="flex flex-wrap gap-2">
        {pr.labels.map((label) => (
          <span
            key={label}
            className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}