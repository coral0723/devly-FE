import { Skeleton } from "@/app/(afterLogin)/_component/Skeleton";

export default function ProfileInfoSkeleton() {
  return (
    <div className="bg-white p-6 flex flex-col items-center">
      {/* 프로필 영역 */}
      <Skeleton className="w-20 h-20 rounded-full mb-4" />

      {/* 닉네임 */}
      <Skeleton className="h-5 w-28 mb-2" />

      {/* Developer 텍스트 */}
      <Skeleton className="h-4 w-40 mb-3" />

      {/* 레벨 배지 */}
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
  )
}