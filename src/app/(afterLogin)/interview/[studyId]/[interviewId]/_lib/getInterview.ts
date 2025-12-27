import axios from "axios";
import { Chat } from "@/model/interview/Chat";

export async function getInterview(id: string, pageParam: number): Promise<Chat[]> {
  if (!id) {
    throw new Error("id is required");
  }

  const res = await axios.get(`/mock/study/interview/${id}?page=${pageParam}`, {
    headers: {
      "Cache-Control": "no-store",
    },
  });

  return res.data.result;
}
