import { QueryFunction } from "@tanstack/react-query";
import { authApi } from "@/app/_lib/axios";
import { ValidationResult } from "@/model/ValidationResult";

export const getValidationResult: QueryFunction<ValidationResult, [_1: string, _2: string, string]>
 = async ({ queryKey }) => {
  try {
    const [_1, _2, studyId] = queryKey;

    if (!studyId) { // groupId가 없다면 예외 처리
      throw new Error("studyId is required");
    };

    const res = await authApi.get(`/api/studies/${studyId}/words/review`, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });

    return res.data.result;
    
  } catch(err) {
    throw new Error('Failed to fetch data');
  }

 }