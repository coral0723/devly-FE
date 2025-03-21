"use client"

type Props = {
  onClose: () => void;
}

export default function TimeoutModal({onClose}: Props) {
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white rounded-lg p-6 w-80">
        <h2 className="text-xl font-bold mb-4">시간 초과</h2>
        <p className="mb-6">면접 시간이 종료되었습니다.</p>
        <button 
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </div>
  )
}