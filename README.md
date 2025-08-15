# 개발자 AI 교육 서비스 Devly

<div align="center">
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="280px" height="180px" viewBox="0 0 88 45">
      <path fill="currentColor" transform="translate(0, -16)"
        d="M11.34,45.8l-0.252-1.484c-0.392,0.392-1.82,1.764-4.228,1.764c-3.92,0-5.74-2.856-5.74-7.476c0-5.264,2.52-8.204,7.644-8.204c0.672,0,1.484,0.14,2.1,0.28l0-3.556l-2.24-0.56l0-2.24l6.44-0.224l0,18.704l2.24,0.56l0,2.24z M10.864,41.124l0-6.944c-0.532-0.252-1.372-0.42-2.184-0.42c-2.38,0-3.22,1.82-3.22,4.62c0,2.828,0.784,4.34,2.688,4.34c1.792,0,2.716-1.596,2.716-1.596z M34.45428,39.164l-9.296,0c0.168,2.24,1.456,3.556,3.388,3.556c2.324,0,4.704-1.316,4.704-1.316l1.204,2.324s-2.8,2.352-6.384,2.352c-4.816,0-7.28-2.8-7.28-7.56c0-4.9,2.772-8.12,7.476-8.12c4.172,0,6.356,2.576,6.356,6.58c0,1.064-0.168,2.1-0.168,2.184z M25.21428,36.56l5.068,0c0-1.596-0.672-2.8-2.296-2.8c-1.568,0-2.548,1.148-2.772,2.8z M46.84456,33.06l0-2.24l7.336-0.14l0,2.38l-1.596,0.364l-4.508,12.376l-4.62,0l-4.424-12.292l-1.344-0.448l0-2.24l7.336-0.14l0,2.38l-1.568,0.28l2.548,8.26l2.464-8.176z M63.29484,42.86l2.52,0.7l0,2.24l-8.988,0l0-2.24l2.24-0.7l0-15.736l-2.24-0.56l0-2.24l6.468-0.224l0,18.76z M68.04112,33.06l0-2.24l7.476-0.14l0,2.38l-1.568,0.28l2.492,7.84l2.38-7.756l-1.624-0.364l0-2.24l7.532-0.14l0,2.38l-1.736,0.364l-4.116,11.48c-1.344,3.696-3.164,7.616-7.616,7.616c-0.952,0-2.716-0.224-2.716-0.224l0.392-2.996l1.82,0c2.24,0,3.276-2.38,3.752-3.472l-4.984-12.32z">
      </path>
    </svg>
</div>

- 배포 URL : https://devly-ten.vercel.app

⚠️ 현재 이 프로젝트는 백엔드 서버 없이 MSW(Mock Service Worker)로 구동되는 데모 버전입니다.  
로그인 및 회원가입 버튼은 실제 OAuth 인증 없이 체험용으로 동작하며,  
전체 기능 흐름(개발 용어, CS 지식, 모의 PR, 모의 면접 등)을 확인하실 수 있습니다.

<br>

## 프로젝트 소개

Devly는 AI를 활용하여 매일 양질의 개발 학습 콘텐츠를 제공하고,
사용자 개개인에게 1:1 맞춤형 학습 관리 기능을 제공하는 개발자 교육 서비스입니다.

- 매일 새로운 개발 용어, CS 지식, 모의 PR, 모의 면접 학습 제공

- 문서 분석을 통한 용어 추출, 실무에 필요한 지식 추천, PR 코드·질문 생성, 면접 질문 및 피드백 제공

- 주간 활동, 랭킹, 복습 기능으로 꾸준한 학습 동기 부여

- Google OAuth 기반 로그인/회원가입

<br>

## 팀원 구성

<h3 align="center">Frontend</h3>

<div align="center">

| **김산호** |
| :------:|
| [<img src="https://github.com/coral0723.png" height=150 width=150> <br/> @coral0723](https://github.com/coral0723) | [<img src="https://github.com/iamseoyoung.png" height=150 width=150> <br/> @iamseoyoung](https://github.com/iamseoyoung) | 
</div>

<h3 align="center">Backend</h3>

<div align="center">

| **박정수** |
| :------: |
| [<img src="https://github.com/Hwasowl.png" height=150 width=150> <br/> @Hwasowl](https://github.com/Hwasowl) | 

</div>

<br>

## 1. 개발 스택

<br>
<div align="center">
  <img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white" alt="TanStack Query" />
  <img src="https://img.shields.io/badge/MSW-84A3FD?style=for-the-badge&logo=mock-service-worker&logoColor=white" alt="Mock Service Worker" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Ant%20Design-0170FE?style=for-the-badge&logo=ant-design&logoColor=white" alt="Ant Design" />
  <img src="https://img.shields.io/badge/Faker.js-FB7A24?style=for-the-badge&logo=faker&logoColor=white" alt="Faker.js" />
  <img src="https://img.shields.io/badge/Day.js-FF5F5F?style=for-the-badge&logo=day.js&logoColor=white" alt="Day.js" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</div>
<br>

## 2. 브랜치 전략

- master: 배포 전용 브랜치

- develop: 개발 메인 브랜치 (프론트엔드는 단일 개발자 체제로 develop 브랜치에서 직접 작업)

- 커밋 시 feat, fix, style, refactor, chore 태그 사용

<br>

## 3. 주요 기능




<br>

## 4. 프로젝트 구조


```
src/
├── app/
│ ├── afterlogin/ # 로그인 후 사용자 화면
│ │ ├── _component/ # afterlogin 전용 UI 컴포넌트
│ │ ├── home/ # 홈 페이지
│ │ ├── interview/ # 면접 페이지
│ │ ├── knowledge/ # 지식 페이지
│ │ ├── pr/ # PR 페이지
│ │ ├── profile/ # 프로필 페이지
│ │ ├── ranking/ # 랭킹 페이지
│ │ ├── review/ # 복습 페이지
│ │ ├── word/ # 단어 페이지
│ │ └── layout.tsx # afterlogin 전용 레이아웃
│ │
│ ├── beforelogin/ # 로그인 전 화면
│ │ ├── _component/ # beforelogin 전용 UI 컴포넌트
│ │ ├── layout.tsx # beforelogin 전용 레이아웃
│ │ └── page.tsx # 기본 페이지
│ │
│ ├── _component/ # 앱 전체 공통 UI 컴포넌트
│ ├── _lib/ # API 요청 함수 및 유틸 함수
│ ├── auth/ # 인증 관련 기능
│ ├── globals.css # 전역 CSS
│ ├── layout.tsx # 앱 전체 공통 레이아웃
│ └── not-found.tsx # 404 페이지
│
├── components/ # Skeleton UI만 포함
├── mocks/ # MSW(Mock Service Worker) 관련 파일
│ ├── browser.ts
│ ├── handler.ts
│ └── http.ts
└── model/ # 타입 및 데이터 모델
```

<br>