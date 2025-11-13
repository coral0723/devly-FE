import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileStatsSkeleton() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="grid grid-cols-2 gap-4 p-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4">
            {/* label skeleton */}
            <Skeleton className="h-4 w-20 mb-3" />

            {/* value skeleton */}
            <Skeleton className="h-6 w-16" />
          </div>
        ))}
      </div>
    </div>
  )
}