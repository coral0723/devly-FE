import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";
import { authApi } from "@/app/_lib/axios";
import { PrHistory } from "@/model/pr/prHistory";

export const getPrHistory: QueryFunction<PrHistory, [_1: string, _2: string, string, string]>
 = async ({ queryKey: [, , prId, userId] }) => {
  try {
    if (!prId) { // id가 없다면 예외 처리
      throw new Error("id is required");
    };

    // msw 용
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pr/history/${prId}/${userId}`, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });

    return res.data.result;

    // const res = await authApi.get(`/api/pr/${prId}/${userId}`, {
    //   headers: {
    //     'Cache-Control': 'no-store',
    //   }
    // });

    // return res.data.result;
    
  } catch(err) {
    throw new Error('Failed to fetch data', { cause: err});
  }

 }