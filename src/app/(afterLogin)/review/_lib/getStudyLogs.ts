import { QueryFunction } from "@tanstack/react-query";
import { StudyLog } from "@/model/StudyLog";

export const getStudyLogs: QueryFunction<StudyLog[], [_1: string], number>
  = async ({pageParam}) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/review?page=${pageParam}`, {
      next: {
        tags: ['review'],
      },
      cache: 'no-store',
    });

    if(!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  }
