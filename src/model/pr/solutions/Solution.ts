import { User } from "@/model/User";

export interface Solution {
  id: number;
  text: string
  user: User;
  likeCount: number;
  commentCount: number;
}