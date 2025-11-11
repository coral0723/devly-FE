import FloatingIcons from "./_component/FloatingIcons";
import MainSection from "./_component/section/MainSection";
import ProblemSection from "./_component/section/ProblemSection";
import SolutionSection from "./_component/section/SolutionSection";
import WordSection from "./_component/section/WordSection";
import KnowledgeSection from "./_component/section/KnowledgeSection";
import PrSection from "./_component/section/PrSection";
import InterviewSection from "./_component/section/InterviewSection";
import LastSection from "./_component/section/LastSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full">
      <FloatingIcons />
      <MainSection />
      <ProblemSection/>
      <SolutionSection/>
      <WordSection/>
      <KnowledgeSection/>
      <PrSection/>
      <InterviewSection/>
      <LastSection/>
    </div>
  );
}
