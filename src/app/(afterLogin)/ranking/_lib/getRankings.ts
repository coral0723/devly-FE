import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";
import { Rankings } from "@/model/Rankings";

export const getRankings: QueryFunction<Rankings, [_1: string]>
 = async ({ }) => {
   const res = await axios.get(`/mock/rankings`, {
     headers: {
       'Cache-Control': 'no-store',
     },
   });

   return res.data.result;
 }