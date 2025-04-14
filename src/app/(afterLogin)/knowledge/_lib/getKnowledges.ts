import { QueryFunction } from "@tanstack/react-query";
import { Knowledge } from "@/model/knowledge/Knowledge";
import axios from "axios";

export const getKnowledges: QueryFunction<Knowledge[], [_1: string, _2: string, string]>
 = async ({ queryKey: [, , studyId] }) => {
  try {
    if (!studyId) { // studyId가 없다면 예외 처리
      throw new Error("studyId is required");
    };

    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/study/knowledges/${studyId}`, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });

    return res.data.result;
  } catch(err) {
    throw err;
  }
 }