import { QueryFunction } from "@tanstack/react-query";
import { authApi } from "@/app/_lib/axios";
import { PrComments } from "@/model/pr/PrComments";
import axios from "axios";

export const getPrComments: QueryFunction<PrComments, [_1: string, _2: string, string]>
 = async ({ queryKey: [, , prId] }) => {
   if (!prId) { // prId가 없다면 예외 처리
     throw new Error("id is required");
   };

   const useMock = process.env.NEXT_PUBLIC_USE_MSW_PR === 'true';
   let response;

   if(useMock) {
     response = await axios.get(`/mock/pr/${prId}/comments`, {
       headers: {
         'Cache-Control': 'no-store',
       },
     });
   } else {
     response = await authApi.get(`/api/pr/${prId}/comments`, {
       headers: {
         'Cache-Control': 'no-store',
       }
     });
   }
   return response.data.result;
 }