import { QueryFunction } from "@tanstack/react-query";
import { User } from "@/model/User";
import axios from "axios";

export const getProfileInfo: QueryFunction<User, [_1: string, _2: string]>
 = async () => {
   const res = await axios.get(`/mock/profile`, {
     headers: {
       'Cache-Control': 'no-store',
     },
   });

   return res.data.result;
 }