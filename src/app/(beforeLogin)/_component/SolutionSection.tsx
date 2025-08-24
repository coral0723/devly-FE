"use client";

import { BookOpen, Lightbulb, GitPullRequest, MessageSquare } from "lucide-react";
import LogoLoop from "../_animations/LogoLoop";

const techLogos = [
  {
    node: (
      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
        <BookOpen className="w-8 h-8 text-emerald-500" />
      </div>
    ),
    title: "개발 용어",
  },
  {
    node: (
      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
        <Lightbulb className="w-8 h-8 text-blue-500" />
      </div>
    ),
    title: "CS 지식",
  },
  {
    node: (
      <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
        <GitPullRequest className="w-8 h-8 text-purple-500" />
      </div>
    ),
    title: "모의 PR",
  },
  {
    node: (
      <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
        <MessageSquare className="w-8 h-8 text-orange-500" />
      </div>
    ),
    title: "모의 면접",
  },
];

export default function SolutionSection() {

  return (
    <section className="w-full h-screen snap-start flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-5xl">
        <h2 className="text-center font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6">
          devly가 해결합니다
        </h2>

        <p className="mt-2 text-center text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl">
          개발자가 놓치기 쉬운 공부를 AI와 함께, 작은 단위로, 매일 쌓아가세요
        </p>

        <div className="mt-12" style={{ height: '200px', position: 'relative', overflow: 'hidden'}}>
          <LogoLoop
            logos={techLogos}
            speed={120}
            direction="left"
            logoHeight={48}
            gap={40}
            pauseOnHover={false}
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Technology partners"
          />
        </div>
      </div>
    </section>
  );
}
