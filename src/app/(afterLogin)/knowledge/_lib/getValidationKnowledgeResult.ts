import { QueryFunction } from "@tanstack/react-query";
import { ValidationResult } from "@/model/ValidationResult";
import axios from "axios";

export const getValidationKnowledgeResult: QueryFunction<ValidationResult, [_1: string, _2: string, string]>
 = async ({ queryKey: [, , studyId] }) => {
   if (!studyId) { // studyId가 없다면 예외 처리
     throw new Error("studyId is required");
   };

   //msw용
   const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/knowledge/review/studies/${studyId}`, {
     headers: {
       'Cache-Control': 'no-store',
     }
   });

   return res.data.result;
 }