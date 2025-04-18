import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";
import { Comment } from "@/model/pr/solutions/Comment";

export const getComments: QueryFunction<Comment[], [_1: string, _2: string, number], number>
  = async ({pageParam, queryKey: [, , solutionId] }) => {
    if (!solutionId) { // id가 없다면 예외 처리
      throw new Error("id is required");
    };

    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pr/solution/comments/${solutionId}?page=${pageParam}`, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });

    return res.data.result.comments;
  }
