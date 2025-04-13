import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";

export const getDevTypes: QueryFunction<number[], [_1: string]>
 = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/developerType`, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });

    return res.data;
  } catch(err) {
    throw new Error('Failed to fetch data', { cause: err});
  }

 }