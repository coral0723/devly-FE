import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";
import { Chat } from "@/model/discussion/Chat";

export const getDiscussion: QueryFunction<Chat[], [_1: string, _2: string, string]>
 = async ({ queryKey: [, , id] }) => {
   if (!id) { // id가 없다면 예외 처리
     throw new Error("id is required");
   };

   const res = await axios.get(`/mock/study/discussion/${id}`, {
     headers: {
       'Cache-Control': 'no-store',
     },
   });

   return res.data.result;
 }