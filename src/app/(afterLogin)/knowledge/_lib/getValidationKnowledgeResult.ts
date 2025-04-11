import { QueryFunction } from "@tanstack/react-query";
import { ValidationResult } from "@/model/ValidationResult";
import axios from "axios";
// import { authApi } from "@/app/_lib/axios";

export const getValidationKnowledgeResult: QueryFunction<ValidationResult, [_1: string, _2: string, string]>
 = async ({ queryKey: [, , studyId] }) => {
  try {
    if (!studyId) { // groupId가 없다면 예외 처리
      throw new Error("studyId is required");
    };

    //msw용
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/studies/${studyId}/knowledge/review`, {
      headers: {
        'Cache-Control': 'no-store',
      }
    });

    return res.data.result;
    
  } catch(err) {
    throw new Error('Failed to fetch data', { cause: err});
  }

 }