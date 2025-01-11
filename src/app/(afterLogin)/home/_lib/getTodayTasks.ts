import { QueryFunction } from "@tanstack/react-query";
import { Tasks } from "@/model/Tasks";
import axios from "axios";

export const getTodayTasks: QueryFunction<Tasks, [_1: string]>
 = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/study/today-tasks`, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });

    return res.data;
  } catch(err) {
    throw new Error('Failed to fetch data');
  }

 }