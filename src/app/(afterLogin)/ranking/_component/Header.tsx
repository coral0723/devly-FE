"use client"

type Props = {
  totalUsers: number;
}

export default function Header({totalUsers}: Props) {
  return (
    <div className="bg-white border-b border-gray-200">
    <div className="p-4">
      <h1 className="text-xl font-semibold text-gray-900">랭킹</h1>
        <p className="text-sm text-gray-500 mt-1">
          전체 {totalUsers}명의 개발자가 함께 공부하고 있어요!
        </p>
    </div>
  </div>
  )  
}