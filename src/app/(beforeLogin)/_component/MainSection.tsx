"use client"

import FadeContent from "../_animations/FadeContent";
import SignInBtn from "./SignInBtn";
import SignUpBtn from "./SignUpBtn";

export default function MainSection() {
  return (
    <section className="h-screen w-full snap-start flex flex-col justify-center lg:flex-row items-center px-6 lg:px-16">
      {/* 왼쪽: 로고 + 메시지 */}
      <div className="flex justify-center items-center text-center mb-6 lg:flex-1 lg:mb-0">
        <FadeContent blur={true} duration={2000} easing="ease-out" initialOpacity={0}>
          <svg className="w-56 md:w-80 lg:w-[440px] xl:w-[540px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 -10 88 35">
            <path fill="currentColor" transform="translate(0, 0)"
              d="M11.34,13.8l-0.252-1.484c-0.392,0.392-1.82,1.764-4.228,1.764c-3.92,0-5.74-2.856-5.74-7.476c0-5.264,2.52-8.204,7.644-8.204c0.672,0,1.484,0.14,2.1,0.28l0-3.556l-2.24-0.56l0-2.24l6.44-0.224l0,18.704l2.24,0.56l0,2.24z M10.864,9.124l0-6.944c-0.532-0.252-1.372-0.42-2.184-0.42c-2.38,0-3.22,1.82-3.22,4.62c0,2.828,0.784,4.34,2.688,4.34c1.792,0,2.716-1.596,2.716-1.596z M34.45428,7.164l-9.296,0c0.168,2.24,1.456,3.556,3.388,3.556c2.324,0,4.704-1.316,4.704-1.316l1.204,2.324s-2.8,2.352-6.384,2.352c-4.816,0-7.28-2.8-7.28-7.56c0-4.9,2.772-8.12,7.476-8.12c4.172,0,6.356,2.576,6.356,6.58c0,1.064-0.168,2.1-0.168,2.184z M25.21428,4.56l5.068,0c0-1.596-0.672-2.8-2.296-2.8c-1.568,0-2.548,1.148-2.772,2.8z M46.84456,1.06l0-2.24l7.336-0.14l0,2.38l-1.596,0.364l-4.508,12.376l-4.62,0l-4.424-12.292l-1.344-0.448l0-2.24l7.336-0.14l0,2.38l-1.568,0.28l2.548,8.26l2.464-8.176z M63.29484,10.86l2.52,0.7l0,2.24l-8.988,0l0-2.24l2.24-0.7l0-15.736l-2.24-0.56l0-2.24l6.468-0.224l0,18.76z M68.04112,1.06l0-2.24l7.476-0.14l0,2.38l-1.568,0.28l2.492,7.84l2.38-7.756l-1.624-0.364l0-2.24l7.532-0.14l0,2.38l-1.736,0.364l-4.116,11.48c-1.344,3.696-3.164,7.616-7.616,7.616c-0.952,0-2.716-0.224-2.716-0.224l0.392-2.996l1.82,0c2.24,0,3.276-2.38,3.752-3.472l-4.984-12.32z"/>
          </svg>
        </FadeContent>
      </div>

      {/* 오른쪽: 버튼 + 안내문 */}
      <div className="lg:flex-1 flex flex-col justify-center items-center text-center lg:text-left">
        <div className="space-y-3 mb-6 max-w-xs sm:max-w-sm md:space-y-6 md:max-w-md lg:max-w-xl">
          <div className="flex flex-col justify-center items-center lg:items-start">
            <h1 className="text-2xl font-bold mb-0 sm:text-3xl sm:mb-3 lg:mb-6 lg:text-5xl">
              매일의 성장이 쌓여
            </h1>
            <h1 className="text-2xl font-bold mt-0 sm:text-3xl lg:text-5xl">
              개발자가 되다
            </h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            개발자가 알아야 할 모든 것을 <span className="hidden sm:inline">작은 단위로, 꾸준히 쌓아가는 학습</span>
            <span className="sm:hidden">작게 쌓아가는 개발 학습</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <SignUpBtn/>
            <SignInBtn/>
          </div>
          <div className="text-gray-500 text-xs lg:text-sm mt-2 space-y-1">
            <p>이 사이트는 현재 서버 없이 동작하는 데모 버전입니다.</p>
            <p>구글 로그인 및 회원가입은 실제 인증 없이 체험용으로 구현되어 있습니다.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

