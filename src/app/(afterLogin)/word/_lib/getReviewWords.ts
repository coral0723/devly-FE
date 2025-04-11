import { QueryFunction } from "@tanstack/react-query";
import { Word } from "@/model/word/Word";
import axios from "axios";
// import { authApi } from "@/app/_lib/axios";

export const getReviewWords: QueryFunction<Word[], [_1: string, _2: string, string]>
 = async ({ queryKey: [,, studyId] }) => { //앞의 두 파라미터는 생략
  try {
    if (!studyId) { // groupId가 없다면 예외 처리
      throw new Error("studyId is required");
    };

    // msw용
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/words/${studyId}/review`, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });

    return res.data.result.words;

    // const res = await authApi.get(`/api/studies/${studyId}/words/review`, {
    //   headers: {
    //     'Cache-Control': 'no-store',
    //   },
    // });

    // console.log('words 데이터: ',res.data.result.words);

    // return res.data.result.words;
    
  } catch(err) {
    throw new Error('Failed to fetch data', { cause: err});
  }

 }