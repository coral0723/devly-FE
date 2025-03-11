import { QueryFunction } from "@tanstack/react-query";
import { PrCard } from "@/model/pr/PrCard";
import axios from "axios";
import { authApi } from "@/app/_lib/axios";

export const getPrCards: QueryFunction<PrCard, [_1: string, _2: string, string]>
 = async ({ queryKey: [, , studyId] }) => {
  try {
    if (!studyId) { // studyId가 없다면 예외 처리
      throw new Error("studyId is required");
    };

    //msw 용
    // const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/study/prs/${studyId}`, {
    //   headers: {
    //     'Cache-Control': 'no-store',
    //   },
    // });

    // return res.data;

    const res = await authApi.get(`/api/pr/${studyId}`, {
      headers: {
        'Cache-Control': 'no-store',
      }
    });

    return res.data.result;

  } catch(err) {
    throw new Error('Failed to fetch data', { cause: err});
  }

 }