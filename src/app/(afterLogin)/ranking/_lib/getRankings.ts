import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";
import { Rankings } from "@/model/Rankings";

export const getRankings: QueryFunction<Rankings, [_1: string]>
 = async ({ }) => {
   const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/rankings`, {
     headers: {
       'Cache-Control': 'no-store',
     },
   });

   return res.data.result;
 }