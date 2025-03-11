import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";
import { Pr } from "@/model/pr/Pr";

export const getPr: QueryFunction<Pr, [_1: string, _2: string, string]>
 = async ({ queryKey: [, , id] }) => {
  try {
    if (!id) { // id가 없다면 예외 처리
      throw new Error("id is required");
    };

    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/study/pr/${id}`, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });

    return res.data;
  } catch(err) {
    throw new Error('Failed to fetch data', { cause: err});
  }

 }