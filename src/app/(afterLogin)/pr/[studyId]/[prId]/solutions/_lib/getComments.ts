import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";
import { Comment } from "@/model/pr/solutions/Comment";

export const getComments: QueryFunction<Comment[], [_1: string, _2: string, string, number], number>
  = async ({pageParam, queryKey: [, , prId, solutionId] }) => {
    try {
      if (!prId) { // id가 없다면 예외 처리
        throw new Error("id is required");
      };

      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pr/solution/comments/${prId}/${solutionId}?page=${pageParam}`, {
        headers: {
          'Cache-Control': 'no-store',
        },
      });
  
      return res.data.result.comments;

    } catch(err) {
      throw new Error('Failed to fetch data', { cause: err });
    }
    
  }
