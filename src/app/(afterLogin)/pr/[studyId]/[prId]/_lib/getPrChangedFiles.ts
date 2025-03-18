import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";
import { PrChangedFiles } from "@/model/pr/PrChangedFiles";
import { authApi } from "@/app/_lib/axios";

export const getPrChangedFiles: QueryFunction<PrChangedFiles, [_1: string, _2: string, string]>
 = async ({ queryKey: [, , prId] }) => {
  try {
    if (!prId) { // id가 없다면 예외 처리
      throw new Error("id is required");
    };

    // msw 용
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pr/changed-files/${prId}`, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });

    return res.data.result;

    // const res = await authApi.get(`/api/pr/changed-files/${prId}`, {
    //   headers: {
    //     'Cache-Control': 'no-store',
    //   }
    // });

    // return res.data.result;
    
  } catch(err) {
    throw new Error('Failed to fetch data', { cause: err});
  }

 }