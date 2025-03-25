import { User } from "@/model/User";

export interface Solution {
  id: number;
  text: string
  user: User;
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
}