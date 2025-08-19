import FloatingIcons from "./_component/FloatingIcons";
import MainSection from "./_component/MainSection";

export default function LoginPage() {
  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
      <FloatingIcons/>
      <MainSection/>
      <section className="h-screen w-full flex items-center justify-center snap-start bg-gray-100">
        <h1 className="text-4xl">첫 번째 섹션</h1>
      </section>
      <section className="h-screen w-full flex items-center justify-center snap-start bg-gray-100">
        <h1 className="text-4xl">두 번째 섹션</h1>
      </section>
      <section className="h-screen w-full flex items-center justify-center snap-start bg-gray-100">
        <h1 className="text-4xl">세 번째 섹션</h1>
      </section>
    </div>
  )
}