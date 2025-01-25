import { QueryFunction } from "@tanstack/react-query";
import { DiscussionCard } from "@/model/DiscussionCard";
import axios from "axios";

export const getDiscussionCards: QueryFunction<DiscussionCard[], [_1: string, _2: string, string]>
 = async ({ queryKey }) => {
  try {
    const [_1, _2, groupId] = queryKey;

    if (!groupId) { // groupId가 없다면 예외 처리
      throw new Error("groupId is required");
    };

    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/study/discussions/${groupId}`, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });

    return res.data;
  } catch(err) {
    throw new Error('Failed to fetch data');
  }

 }