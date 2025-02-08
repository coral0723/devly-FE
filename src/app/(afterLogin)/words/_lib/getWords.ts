import { QueryFunction } from "@tanstack/react-query";
import { Word } from "@/model/Word";
import axios from "axios";
import { authApi } from "@/app/_lib/axios";

export const getWords: QueryFunction<Word[], [_1: string, _2: string, string]>
 = async ({ queryKey }) => {
  try {
    const [_1, _2, studyId] = queryKey;

    if (!studyId) { // groupId가 없다면 예외 처리
      throw new Error("studyId is required");
    };

    // msw용
    // const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/study/words/${studyId}`, {
    //   headers: {
    //     'Cache-Control': 'no-store',
    //   },
    // });

    // return res.data;

    const res = await authApi.get(`/api/words/${studyId}`, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });

    console.log('words 데이터: ',res.data.result.words);

    return res.data.result.words;
    
  } catch(err) {
    throw new Error('Failed to fetch data');
  }

 }