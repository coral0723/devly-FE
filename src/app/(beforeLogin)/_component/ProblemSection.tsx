"use client";

export default function ProblemSection() {
  return (
    <section className="h-dvh md:h-screen w-full snap-start flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        {/* 제목: 굵게 + 반응형 */}
        <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6">
          개발자들이 놓치기 쉬운 공부들
        </h2>

        {/* 본문: 줄바꿈 유지 + 반응형 */}
        <p className="text-gray-700 whitespace-pre-line leading-relaxed text-base sm:text-lg md:text-xl lg:text-2xl">
          {`코딩 실력만으로는 부족합니다
          영어 문서 읽기, CS 기초, 협업과 커뮤니케이션, 면접 준비까지
          하지만 이런 것들을 꾸준히 공부하기 쉽지 않죠`}
        </p>
      </div>
    </section>
  );
}
