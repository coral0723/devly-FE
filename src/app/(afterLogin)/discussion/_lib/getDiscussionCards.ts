import { QueryFunction } from "@tanstack/react-query";
import { DiscussionCard } from "@/model/discussion/DiscussionCard";
import axios from "axios";

export const getDiscussionCards: QueryFunction<DiscussionCard[], [_1: string, _2: string, string]>
 = async ({ queryKey: [, , studyId] }) => {
   if (!studyId) { // studyId가 없다면 예외 처리
     throw new Error("studyId is required");
   };

   const res = await axios.get(`/mock/study/discussions/${studyId}`, {
     headers: {
       'Cache-Control': 'no-store',
     },
   });

   return res.data.result;
 }