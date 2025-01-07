import BottomNavigation from '../_component/BottomNavigation';
import Header from './_component/Header';

export default function Profile() {
  const stats = [
      { label: "학습일수", value: "32일" },
      { label: "총 경험치", value: "2,840" },
      { label: "학습한 단어", value: "45개" },
      { label: "학습한 지식", value: "24개" },
      { label: "완료한 PR", value: "15개" },
      { label: "참여 토론", value: "8회" },
  ];

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-50 pb-20">
      <Header/>

      {/* Profile Info */}
      <div className="bg-white p-6 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-4">
          <span className="text-3xl font-bold text-purple-600">나</span>
        </div>
        <h1 className="text-xl font-semibold">김데블리</h1>
        <p className="text-gray-500 mt-1">Frontend Developer</p>
        <div className="mt-4 px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
          Lv. 5
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-gray-500 text-sm">{stat.label}</div>
            <div className="text-xl font-semibold mt-1">{stat.value}</div>
          </div>
        ))}
      </div>

      <BottomNavigation/>
    </div>
  );
}
