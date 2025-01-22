import { QueryFunction } from "@tanstack/react-query";
import { User } from "@/model/User";
import axios from "axios";

export const getProfileInfo: QueryFunction<User, [_1: string, _2: string]>
 = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/profile`, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });

    return res.data;
  } catch(err) {
    throw new Error('Failed to fetch data');
  }

 }