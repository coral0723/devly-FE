import SignInBtn from "./_component/SignInBtn";
import SignUpBtn from "./_component/SignUpBtn";

export default async function LoginPage() {
  return (
    <div className="min-h-screen bg-white-50 to-white relative overflow-hidden">
      {/* Floating Background Icons */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-16 left-7 animate-float-slow opacity-20'>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
          </svg>
        </div>
        <div className="absolute top-24 right-5 animate-float-medium opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>
          </svg>
        </div>
        <div className="absolute bottom-40 left-20 animate-float-fast opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 12.5 8 15l2 2.5"/><path d="m14 12.5 2 2.5-2 2.5"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/>
          </svg>
        </div>
        <div className="absolute bottom-40 right-20 animate-float-medium opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" x2="6" y1="9" y2="21"/>
          </svg>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-0 relative z-10">
        {/* Logo & Title */}
        <div className="text-center mb-12">
          <div className="inline-block mb-1 mt-8">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="222px" height="96px" viewBox="0 0 88 45">
              <path fill="currentColor" transform="translate(0, -16)"
                d="M11.34,45.8l-0.252-1.484c-0.392,0.392-1.82,1.764-4.228,1.764c-3.92,0-5.74-2.856-5.74-7.476c0-5.264,2.52-8.204,7.644-8.204c0.672,0,1.484,0.14,2.1,0.28l0-3.556l-2.24-0.56l0-2.24l6.44-0.224l0,18.704l2.24,0.56l0,2.24z M10.864,41.124l0-6.944c-0.532-0.252-1.372-0.42-2.184-0.42c-2.38,0-3.22,1.82-3.22,4.62c0,2.828,0.784,4.34,2.688,4.34c1.792,0,2.716-1.596,2.716-1.596z M34.45428,39.164l-9.296,0c0.168,2.24,1.456,3.556,3.388,3.556c2.324,0,4.704-1.316,4.704-1.316l1.204,2.324s-2.8,2.352-6.384,2.352c-4.816,0-7.28-2.8-7.28-7.56c0-4.9,2.772-8.12,7.476-8.12c4.172,0,6.356,2.576,6.356,6.58c0,1.064-0.168,2.1-0.168,2.184z M25.21428,36.56l5.068,0c0-1.596-0.672-2.8-2.296-2.8c-1.568,0-2.548,1.148-2.772,2.8z M46.84456,33.06l0-2.24l7.336-0.14l0,2.38l-1.596,0.364l-4.508,12.376l-4.62,0l-4.424-12.292l-1.344-0.448l0-2.24l7.336-0.14l0,2.38l-1.568,0.28l2.548,8.26l2.464-8.176z M63.29484,42.86l2.52,0.7l0,2.24l-8.988,0l0-2.24l2.24-0.7l0-15.736l-2.24-0.56l0-2.24l6.468-0.224l0,18.76z M68.04112,33.06l0-2.24l7.476-0.14l0,2.38l-1.568,0.28l2.492,7.84l2.38-7.756l-1.624-0.364l0-2.24l7.532-0.14l0,2.38l-1.736,0.364l-4.116,11.48c-1.344,3.696-3.164,7.616-7.616,7.616c-0.952,0-2.716-0.224-2.716-0.224l0.392-2.996l1.82,0c2.24,0,3.276-2.38,3.752-3.472l-4.984-12.32z"/>
            </svg>
          </div>
          <p className="text-gray-600 mb-2 font-medium">개발자를 위한 학습 플랫폼</p>
        </div>

        {/* Feature Cards */}
        <div className="space-y-4 mb-7">
          <div
            className="bg-white rounded-xl p-4 border border-gray-200 flex items-start gap-4 transform hover:scale-[1.02] transition-all">
            <div
              className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
              </svg>
            </div>
            <div>
              <h3 className="font-medium mb-1">실무 중심 영어 단어</h3>
              <p className="text-sm text-gray-600">
                문서에서 자주 사용되는 단어와 표현을 효과적으로 학습하세요
              </p>
            </div>
          </div>

          <div
            className="bg-white rounded-xl p-4 border border-gray-200 flex items-start gap-4 transform hover:scale-[1.02] transition-all">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>
              </svg>
            </div>
            <div>
              <h3 className="font-medium mb-1">AI 영어 발음 교정</h3>
              <p className="text-sm text-gray-600">
                AI에게 발음을 교정받고 정확한 발음을 익히세요
              </p>
            </div>
          </div>

          <div
            className="bg-white rounded-xl p-4 border border-gray-200 flex items-start gap-4 transform hover:scale-[1.02] transition-all">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" x2="6" y1="9" y2="21"/>
              </svg>
            </div>
            <div>
              <h3 className="font-medium mb-1">모의 영어 PR</h3>
              <p className="text-sm text-gray-600">
                실제 상황과 유사한 PR 작성 및 리뷰 연습을 해보세요
              </p>
            </div>
          </div>

            {/*<div*/}
            {/*    className="bg-white rounded-xl p-4 border border-gray-200 flex items-start gap-4 transform hover:scale-[1.02] transition-all">*/}
            {/*    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">*/}
            {/*        <MessageSquare className="w-6 h-6 text-orange-600"/>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <h3 className="font-medium mb-1">개발 토론 스피킹</h3>*/}
            {/*        <p className="text-sm text-gray-600">*/}
            {/*            실제 개발 토론 상황에서 사용되는 영어 표현을 연습하세요*/}
            {/*        </p>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>

        {/* Login Button */}
        <div className="space-y-4 mb-6">
          <SignUpBtn/>
          <SignInBtn/>
          <div className="text-center">
            <p className="text-xs text-gray-500">
              시작하기를 클릭하면 서비스 이용약관에 동의하게 됩니다
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}