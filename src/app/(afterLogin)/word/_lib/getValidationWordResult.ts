import { QueryFunction } from "@tanstack/react-query";
import { authApi } from "@/app/_lib/axios";
import { ValidationResult } from "@/model/ValidationResult";
import axios from "axios";

export const getValidationWordResult: QueryFunction<ValidationResult, [_1: string, _2: string, string]>
 = async ({ queryKey: [, , studyId] }) => {
   if (!studyId) { //studyId가 없다면 예외 처리
     throw new Error("studyId is required");
   };

   const useMock = process.env.NEXT_PUBLIC_USE_MSW_WORD === 'true';
   let response;

   if(useMock) {
     response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/studies/${studyId}/words/review`, {
       headers: {
         'Cache-Control': 'no-store',
       }
     });
   } else {
     response = await authApi.get(`/api/words/review/study/${studyId}`, {
       headers: {
         'Cache-Control': 'no-store',
       },
     });
   }
   
   return response.data.result;
 }