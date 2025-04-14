import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";
import { DailyActivity } from "@/model/DailyActivity";

export const getWeeklyActivity: QueryFunction<DailyActivity[], [_1: string]>
 = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/weeklyActivity`, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });

    return res.data.result;
  } catch(err) {
    throw err;
  }
 }