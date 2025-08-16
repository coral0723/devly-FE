# 개발자 AI 교육 서비스 devly

<div align="center">
  <img width="280" height="180" alt="Image" src="https://github.com/user-attachments/assets/e93df2b5-585b-4075-84ef-92f5070ef2e6" />
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

<div align="center">

| <h3>Frontend</h3> | <h3>Backend</h3> |
| :---------------: | :---------------: |
| <img src="https://github.com/coral0723.png" height=150 width=150> <br/> **김산호** <br/> [@coral0723](https://github.com/coral0723) | <img src="https://github.com/Hwasowl.png" height=150 width=150> <br/> **박정수** <br/> [@Hwasowl](https://github.com/Hwasowl) |

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

### [🏠 메인 페이지]

<p align="center">
  <img src="https://github.com/user-attachments/assets/2104bcec-0726-4f02-a16d-5531979f9769" width="350"/>
</p>

메인 페이지에서는 학습 현황과 활동 기록을 한눈에 확인할 수 있습니다.  

- **학습 선택**  
  - 개발 용어, 개발/CS 지식, 모의 PR, 모의 면접을 클릭하여 학습 가능  
  - 각 학습별 **진행 개수**와 **완료 여부**가 표시됨  

- **주간 활동**  
  - 이번 주 학습 기록과 연속 학습 일수를 확인할 수 있음  
  - 학습 완료 시 **획득 XP**가 표시됨  

- **네비게이션 바**  
  - 하단 탭을 통해 **복습 · 커뮤니티 · 랭킹 페이지**로 이동 가능  

- **프로필**  
  - 우측 상단 프로필 아이콘 클릭 시 **프로필 페이지**로 이동 가능

 <br>
 
### [📘 개발 영어 용어 학습]

<div align="center">

| 용어 학습 | 용어 퀴즈 |
|----------|----------|
| <img src="https://github.com/user-attachments/assets/bb96258d-b5e2-4ff3-8ecb-09ccfcc50bdd" width="350"> | <img src="https://github.com/user-attachments/assets/e059b431-4e96-4a4f-8702-4dfd9105583d" width="350"> |

</div>

개발 영어 용어 학습 페이지에서는 영어 용어의 스펠링, 발음, 뜻, 예문을 확인하고, 학습 후 퀴즈를 통해 내용을 점검할 수 있습니다.  

- **학습 소개**  
  - 메인 페이지에서 '용어 학습' 클릭 시 학습 소개 페이지가 나타남  
  - '학습 시작하기' 버튼을 누르면 학습 진행 가능  

- **용어 학습**  
  - 영어 용어의 **스펠링**과 **발음 기호**, **뜻**, **예문**을 확인 가능  
  - 가운데 **스피커 버튼** 클릭 시 TTS로 발음을 듣고 연습 가능  

- **용어 퀴즈**  
  - 학습을 마친 후 퀴즈를 풀어 배운 내용을 점검 가능
 
<br>

 ### [💻 개발/CS 지식 학습]

<p align="center">
  <img src="https://github.com/user-attachments/assets/5b0951c1-fed2-485d-8bbf-6588f0c9acb7" width="350"/>
</p>

개발/CS 지식 학습 페이지에서는 주요 개념을 학습하고, 예시 코드를 통해 이해를 돕고, 학습 후 퀴즈로 내용을 점검할 수 있습니다.  

- **학습 소개**  
  - 메인 페이지에서 '개발/CS 지식' 클릭 시 학습 소개 페이지가 나타남  
  - '학습 시작하기' 버튼을 누르면 학습 진행 가능  

- **지식 학습**  
  - 개발/CS 관련 **개념**과 **예시 코드**를 확인 가능  
  - 코드와 개념을 바로 확인하며 학습 가능  

- **지식 퀴즈**  
  - 학습을 마친 후 퀴즈를 풀어 배운 내용을 점검 가능
 
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
