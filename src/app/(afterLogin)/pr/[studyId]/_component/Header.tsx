export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white p-4 border-b border-gray-200">
      <div className="max-w-xl mx-auto">
        <h1 className="md:text-xl font-semibold text-gray-900">모의 PR</h1>
        <p className="text-xs md:text-sm text-gray-500 mt-1">
          실제 상황에서 발생할 수 있는 PR을 연습해보세요
        </p>
      </div>
    </div>
  )
}