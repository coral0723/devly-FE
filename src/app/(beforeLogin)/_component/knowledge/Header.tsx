type Props = {
  currentStep: number;
  endStep: number;
}

export default function Header({ currentStep, endStep }: Props) {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 bg-white border-b border-gray-200">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between mb-2">
          <button
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" 
              className="w-4 h-4 md:w-6 md:h-6"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>
          <span className="text-xs text-gray-500 md:text-base">
            {currentStep} / {endStep}
          </span>
        </div>
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${currentStep / endStep * 100}%`}}
          />
        </div>
      </div>
    </div>
  )
}