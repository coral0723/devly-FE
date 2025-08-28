type Props = {
  currentTab: "개념" | "코드" | "문제";
};

export default function NavigationTabs({ currentTab }: Props) {
  const isActive = (tab: Props["currentTab"]) => currentTab === tab;

  return (
    <div className="flex border-b" role="tablist" aria-label="학습 탭">
      {/* 개념 */}
      <div
        className={[
          "flex-1 flex justify-center rounded-t-lg border-b-2",
          isActive("개념") ? "bg-blue-50 border-blue-500" : "border-transparent",
        ].join(" ")}
      >
        <button
          role="tab"
          aria-selected={isActive("개념")}
          className={[
            "flex items-center py-1 space-x-1 text-[9px] font-medium transition-colors md:px-2 md:py-3 md:text-sm md:space-x-2",
            isActive("개념") ? "text-blue-600" : "text-gray-500 hover:text-gray-700",
          ].join(" ")}
          disabled={isActive("개념")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3 md:w-4 md:h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
            <path d="M9 18h6"/>
            <path d="M10 22h4"/>
          </svg>
          <span>개념</span>
        </button>
      </div>

      {/* 코드 */}
      <div
        className={[
          "flex-1 flex justify-center rounded-t-lg border-b-2",
          isActive("코드") ? "bg-blue-50 border-blue-500" : "border-transparent",
        ].join(" ")}
      >
        <button
          role="tab"
          aria-selected={isActive("코드")}
          className={[
            "flex items-center py-1 space-x-1 text-[9px] font-medium rounded-t-lg transition-colors md:p-2 md:text-sm md:space-x-2",
            isActive("코드") ? "text-blue-600" : "text-gray-500 hover:text-gray-700",
          ].join(" ")}
          disabled={isActive("코드")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3 md:w-4 md:h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/>
            <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
            <path d="m5 12-3 3 3 3"/>
            <path d="m9 18 3-3-3-3"/>
          </svg>
          <span>코드</span>
        </button>
      </div>

      {/* 문제 */}
      <div
        className={[
          "flex-1 flex justify-center rounded-t-lg border-b-2",
          isActive("문제") ? "bg-blue-50 border-blue-500" : "border-transparent",
        ].join(" ")}
      >
        <button
          role="tab"
          aria-selected={isActive("문제")}
          className={[
            "flex items-center py-1 space-x-1 text-[9px] font-medium rounded-t-lg transition-colors md:p-2 md:text-sm md:space-x-2",
            isActive("문제") ? "text-blue-600" : "text-gray-500 hover:text-gray-700",
          ].join(" ")}
          disabled={isActive("문제")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3 md:w-4 md:h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 7v14"/>
            <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
          </svg>
          <span>문제</span>
        </button>
      </div>
    </div>
  );
}
