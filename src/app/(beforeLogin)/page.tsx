"use client";

import { useRef } from "react";
import FloatingIcons from "./_component/FloatingIcons";
import MainSection from "./_component/section/MainSection";
import ProblemSection from "./_component/section/ProblemSection";
import SolutionSection from "./_component/section/SolutionSection";
import WordSection from "./_component/section/WordSection";
import KnowledgeSection from "./_component/section/KnowledgeSection";
import PrSection from "./_component/section/PrSection";
import InterviewSection from "./_component/section/InterviewSection";
import LastSection from "./_component/section/LastSection";

export default function LoginPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollContainerRef}
      className="h-screen w-full overflow-y-scroll"
    >
      <FloatingIcons />
      <MainSection />
      <ProblemSection scrollContainerRef={scrollContainerRef}/>
      <SolutionSection scrollContainerRef={scrollContainerRef}/>
      <WordSection scrollContainerRef={scrollContainerRef}/>
      <KnowledgeSection scrollContainerRef={scrollContainerRef}/>
      <PrSection scrollContainerRef={scrollContainerRef}/>
      <InterviewSection scrollContainerRef={scrollContainerRef}/>
      <LastSection scrollContainerRef={scrollContainerRef} />
    </div>
  );
}
