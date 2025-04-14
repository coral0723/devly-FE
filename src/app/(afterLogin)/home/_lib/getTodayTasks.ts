import { QueryFunction } from "@tanstack/react-query";
import { Tasks } from "@/model/Tasks";
import { authApi } from "@/app/_lib/axios";
import axios from "axios";

export const getTodayTasks: QueryFunction<Tasks, [_1: string]>
 = async () => {
  const useMock = process.env.NEXT_PUBLIC_USE_MSW_HOME === 'true';
  let response;

  if(useMock) {
    response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/studies/tasks`, { 
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } else {
    response = await authApi.get(`/api/studies/tasks`, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  }
  
  return response.data.result;
 }