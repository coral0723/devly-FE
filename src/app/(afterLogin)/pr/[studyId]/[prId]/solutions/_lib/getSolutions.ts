import { QueryFunction } from "@tanstack/react-query";
import { Solution } from "@/model/pr/solutions/Solution";
import axios from "axios";

export const getSolutions: QueryFunction<Solution[], [_1: string, _2: string, string], number>
  = async ({pageParam, queryKey: [, , prId] }) => {
    if (!prId) { // id가 없다면 예외 처리
      throw new Error("id is required");
    };

    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pr/solutions/${prId}?page=${pageParam}`, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });

    return res.data.result.solutions;
  }
