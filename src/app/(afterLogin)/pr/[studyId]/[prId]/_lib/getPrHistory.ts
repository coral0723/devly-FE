import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";
import { PrHistory } from "@/model/pr/prHistory";

export const getPrHistory: QueryFunction<PrHistory, [_1: string, _2: string, string, string]>
 = async ({ queryKey: [, , prId, userId] }) => {
   if (!prId) { // prId가 없다면 예외 처리
     throw new Error("id is required");
   };

   const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pr/history/${prId}/${userId}`, {
     headers: {
       'Cache-Control': 'no-store',
     },
   });

   return res.data.result;    
 }