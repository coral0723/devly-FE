import { Skeleton } from "@/components/ui/skeleton";

export default function MainFeaturesSkeleton() {
  return (
    <div className='grid grid-cols-2 gap-4'>
      {[1,2,3,4].map((i) => (
        <div key={i} className='bg-white rounded-2xl border border-gray-200 p-5 space-y-3'>
          <div className="flex items-center justify-between">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="min-w-[40px] max-w-[80px] w-full h-8 rounded-full" />
          </div>
          <Skeleton className="w-24 h-6 rounded-md" />
          <Skeleton className="min-w-[104px] h-5 rounded-md" />
        </div>
      ))}
    </div>
  )
}