import {faker} from "@faker-js/faker";

export const samplePosts = [
  {
    id: 1,
    title: "GPT-4 프롬프트 엔지니어링 팁 공유합니다",
    content: "최근 GPT-4로 작업하면서 발견한 유용한 프롬프트 패턴들을 공유합니다...",
    thumbnail: faker.image.avatar(),
    author: "ai_dev_kim",
    likes: 24,
    comments: 8,
    createdAt: "2023-11-15T09:30:00Z"
  },
  {
    id: 2,
    title: "TensorFlow vs PyTorch 어떤 것을 배워야 할까요?",
    content: "AI 학습을 시작하는데 어떤 프레임워크부터 시작해야 할지 고민입니다...",
    thumbnail: faker.image.avatar(),
    author: "newbie_coder",
    likes: 15,
    comments: 32,
    createdAt: "2023-11-14T14:45:00Z"
  },
  {
    id: 3,
    title: "최신 LLM 파인튜닝 기법 정리",
    content: "최근 논문들에서 발표된 LLM 파인튜닝 기법들을 정리해봤습니다...",
    thumbnail: faker.image.avatar(),
    author: "ml_engineer",
    likes: 47,
    comments: 12,
    createdAt: "2023-11-13T18:20:00Z"
  },
  {
    id: 4,
    title: "RLHF 구현 중 발생한 문제 해결 방법",
    content: "강화학습을 통한 인간 피드백 구현 중 발생한 이슈와 해결 방법을 공유합니다...",
    thumbnail: faker.image.avatar(),
    author: "rl_master",
    likes: 31,
    comments: 5,
    createdAt: "2023-11-12T11:15:00Z"
  },
  {
    id: 5,
    title: "AI 프로젝트를 위한 데이터셋 구축 경험담",
    content: "직접 데이터셋을 구축하면서 경험한 팁과 주의사항들을 공유합니다...",
    thumbnail: faker.image.avatar(),
    author: "data_scientist",
    likes: 19,
    comments: 7,
    createdAt: "2023-11-11T16:30:00Z"
  },
  {
    id: 6,
    title: "AI 프로젝트를 위한 데이터셋 구축 경험담",
    content: "직접 데이터셋을 구축하면서 경험한 팁과 주의사항들을 공유합니다...",
    thumbnail: faker.image.avatar(),
    author: "data_scientist",
    likes: 19,
    comments: 7,
    createdAt: "2023-11-11T16:30:00Z"
  },
  {
    id: 7,
    title: "AI 프로젝트를 위한 데이터셋 구축 경험담",
    content: "직접 데이터셋을 구축하면서 경험한 팁과 주의사항들을 공유합니다...",
    thumbnail: faker.image.avatar(),
    author: "data_scientist",
    likes: 19,
    comments: 7,
    createdAt: "2023-11-11T16:30:00Z"
  },
];