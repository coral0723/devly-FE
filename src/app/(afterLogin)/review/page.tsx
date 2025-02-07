import BottomNavigation from "../_component/BottomNavigation";

export default function ReviewPage() {
  return (
    <div className="max-w-lg mx-auto h-[100dvh] bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200">
        <div className="p-4">
          <h1 className="text-xl font-semibold text-gray-900">복습</h1>
            <p className="text-sm text-gray-500 mt-1">
              매일 배운 내용을 복습하며 실력을 쌓아보세요!
            </p>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white safe-area-bottom"> {/* iOS safe area 고려 */}
        <div className="max-w-lg mx-auto border-t border-gray-200">
            <BottomNavigation/>
        </div>
      </div>
    </div>
  )
}