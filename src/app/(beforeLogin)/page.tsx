"use client";

import { useRef } from "react";
import FloatingIcons from "./_component/FloatingIcons";
import InterviewSection from "./_component/InterviewSection";
import KnowledgeSection from "./_component/KnowledgeSection";
import LastSection from "./_component/LastSection";
import MainSection from "./_component/MainSection";
import PrSection from "./_component/PrSection";
import WordSection from "./_component/WordSection";

export default function LoginPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollContainerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory"
    >
      <FloatingIcons />
      <MainSection />
      <WordSection />
      <KnowledgeSection />
      <PrSection />
      <InterviewSection />
      <LastSection scrollContainerRef={scrollContainerRef} />
    </div>
  );
}
