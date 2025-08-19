import WordContext from "./word/WordContext";

export default function WordSection() {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center snap-start px-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-full bg-emerald-100 border-2 border-emerald-600 flex items-center justify-center shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 stroke-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 7v14" />
            <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold">개발 용어</h1>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-base leading-relaxed text-center max-w-xs mb-6">
        자주 쓰이는 개발 영어 용어를 학습하고<br/>
        기술 문서 이해력을 높이세요
      </p>

      {/* 예시 컴포넌트 */}
      <div className="flex flex-col items-center justify-center h-[70vh] w-full overflow-auto">
        <WordContext/>
      </div>
    </section>
  )
}