import ContentsWrapper from "../ContentsWrapper";
import Header from "./Header";

export default function MockWordStep() {

  return (
    <div className="flex-grow relative w-full h-full bg-gray-50">
      <Header
        currentStep={1}
        endStep={5}
      />

      <ContentsWrapper
        headerMobileHeight={60}
        headerDesktopHeight={68}
      >
        <div className="text-center mt-8 md:mt-10">
          <h1 className="text-sm font-bold mb-2 md:text-2xl">Encapsulation</h1>
          <p className="text-xs text-gray-500 md:text-base">/ɛnˌkæpsjʊˈleɪʃən/</p>
          <button
            className="mx-auto mt-4 w-8 h-8 md:w-18 md:h-18 flex items-center justify-center rounded-full transition-all duration-200 bg-gray-100 disabled:opacity-50"
            disabled
          >
            <svg xmlns="http://www.w3.org/2000/svg" 
              className="w-3 h-3 md:w-6 md:h-6 flex-shrink-0"
              viewBox="0 0 24 24" 
              fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>
              <path d="M16 9a5 5 0 0 1 0 6"/>
              <path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>
            </svg>
          </button>
        </div>
        <div className="text-center text-xs text-gray-600 md:text-base">
          캡슐화
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-white border border-gray-200 z-10">
          <div className='max-w-xl mx-auto'>
            <button
              className=" w-full py-1 bg-green-500 text-white rounded-xl text-xs font-medium md:text-lg md:py-2"
              disabled={true}
            >
              다음
            </button>
          </div>
        </div>
      </ContentsWrapper>
    </div>
  )
}