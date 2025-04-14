import { QueryFunction } from "@tanstack/react-query";
import { Word } from "@/model/word/Word";
import axios from "axios";

export const getReviewWords: QueryFunction<Word[], [_1: string, _2: string, string]>
 = async ({ queryKey: [,, studyId] }) => { //앞의 두 파라미터는 생략
  if (!studyId) { // studyId가 없다면 예외 처리
    throw new Error("studyId is required");
  };

  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/words/${studyId}/review`, {
    headers: {
      'Cache-Control': 'no-store',
    },
  });

  return res.data.result.words;    
 }