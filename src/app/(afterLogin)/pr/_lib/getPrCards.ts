import { QueryFunction } from "@tanstack/react-query";
import { PrCard } from "@/model/PrCard";
import axios from "axios";

export const getPrCards: QueryFunction<PrCard[], [_1: string, _2: string, string]>
 = async ({ queryKey: [, , studyId] }) => {
  try {
    if (!studyId) { // studyId가 없다면 예외 처리
      throw new Error("studyId is required");
    };

    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/study/prs/${studyId}`, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });

    return res.data;
  } catch(err) {
    throw new Error('Failed to fetch data', { cause: err});
  }

 }