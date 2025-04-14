import { QueryFunction } from "@tanstack/react-query";
import { Stats } from "@/model/Stats";
import axios from "axios";

export const getProfileStats: QueryFunction<Stats, [_1: string, _2: string]>
 = async () => {
   const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/stats`, {
     headers: {
       'Cache-Control': 'no-store',
     },
   });

   return res.data.result;
 }