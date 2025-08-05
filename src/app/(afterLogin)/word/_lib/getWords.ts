import { QueryFunction } from "@tanstack/react-query";
import { Word } from "@/model/word/Word";
import { authApi } from "@/app/_lib/axios";
import axios from "axios";

export const getWords: QueryFunction<Word[], [_1: string, _2: string, string]>
 = async ({ queryKey: [,, studyId] }) => { //앞의 두 파라미터는 생략
  if (!studyId) { //studyId가 없다면 예외 처리
    throw new Error("studyId is required");
  };

  const useMock = process.env.NEXT_PUBLIC_USE_MSW_WORD === 'true';
  let response;
  
  if(useMock) {
    response = await axios.get(`/mock/words/${studyId}`, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } else {
    response = await authApi.get(`/api/words/${studyId}`, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  }
  
  return response.data.result.words;
 }