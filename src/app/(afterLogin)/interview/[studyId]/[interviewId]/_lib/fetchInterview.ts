import axios from "axios";
import { Chat } from "@/model/interview/Chat";

export async function fetchInterview(id: string): Promise<Chat[]> {
  if (!id) {
    throw new Error("id is required");
  }

  const res = await axios.get(`/mock/study/interview/${id}`, {
    headers: {
      "Cache-Control": "no-store",
    },
  });

  return res.data.result;
}
