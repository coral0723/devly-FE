import { QueryFunction } from "@tanstack/react-query";
import { Tasks } from "@/model/Tasks";
import axios from "axios";
import { authApi } from "@/app/_lib/axios";

export const getTodayTasks: QueryFunction<Tasks, [_1: string]>
 = async () => {
  try {
    //msw 용
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/studies/tasks`, { 
      headers: {
        'Cache-Control': 'no-store',
      },
    });
    return res.data.result;

    // const res = await authApi.get(`/api/studies/tasks`, {
    //   headers: {
    //     'Cache-Control': 'no-store',
    //   },
    // });
    // return res.data.result;

  } catch(err) {
    throw new Error('Failed to fetch data');
  }

 }