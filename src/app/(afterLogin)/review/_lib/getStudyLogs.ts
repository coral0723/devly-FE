import { QueryFunction } from "@tanstack/react-query";
import { StudyLog } from "@/model/StudyLog";
import axios from "axios";

export const getStudyLogs: QueryFunction<StudyLog[], [_1: string], number>
  = async ({ pageParam }) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/review?page=${pageParam}`, {
      headers: {
        'Cache-control': 'no-store',
      },
    });
  
    return res.data.result;
  }
