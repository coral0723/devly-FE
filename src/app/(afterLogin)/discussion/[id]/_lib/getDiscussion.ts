import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";
import { Chat } from "@/model/Chat";

export const getDiscussion: QueryFunction<Chat[], [_1: string, _2: string, string]>
 = async ({ queryKey: [, , id] }) => {
  try {
    if (!id) { // id가 없다면 예외 처리
      throw new Error("id is required");
    };

    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/study/discussion/${id}`, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });

    return res.data;
  } catch(err) {
    throw new Error('Failed to fetch data', { cause: err});
  }

 }