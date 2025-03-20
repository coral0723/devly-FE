import { User } from "@/model/User";

export interface Solution {
  id: number;
  text: "메인 페이지에 보이는 뉴스 피드 부분의 UI를 업데이트했습니다. 사용자가 더 편하게 뉴스를 볼 수 있도록 레이아웃을 수정하고, 뉴스 카드에 좋아요와 댓글 수를 보여주는 기능을 추가했습니다. 좋아요 버튼을 누를 때 애니메이션 효과도 추가했습니다."
  user: User;
  likeCount: number;
  commentCount: number;
}