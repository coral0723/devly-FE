import FloatingIcons from "./_component/FloatingIcons";
import KnowledgeSection from "./_component/KnowledgeSection";
import MainSection from "./_component/MainSection";
import PrSection from "./_component/PrSection";
import WordSection from "./_component/WordSection";

export default function LoginPage() {
  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
      <FloatingIcons/>
      <MainSection/>
      <WordSection/>
      <KnowledgeSection/>
      <PrSection/>
    </div>
  )
}