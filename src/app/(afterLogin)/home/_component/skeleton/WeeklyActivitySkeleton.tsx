import { Skeleton } from "@/components/ui/skeleton";

export default function WeeklyActivitySkeleton() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-5">
        <Skeleton className="h-7 w-24" />
        <div className="flex items-center gap-1">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-5 w-20" />
        </div>
      </div>

      <div className="flex justify-between">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  )
}