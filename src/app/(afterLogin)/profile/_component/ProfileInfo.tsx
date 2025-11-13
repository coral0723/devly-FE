"use client"

import { DeveloperType, User } from "@/model/User"
import { useQuery } from "@tanstack/react-query"
import { getProfileInfo } from "../_lib/getProfileInfo"
import { Avatar } from "antd"
import ProfileInfoSkeleton from "./skeleton/ProfileInfoSkeleton"

export default function ProfileInfo() {
  const {data: user, isLoading} = useQuery<User, object, User, [_1: string, _2: string]>({
    queryKey: ['profile', 'info'],
    queryFn: getProfileInfo,
    staleTime: 0,
  });

  // user가 없는 경우를 대비한 안전한 접근
  const developerTypeText = user?.developerType !== undefined 
    ? DeveloperType[user.developerType] 
    : 'Unknown';

  const firstLetter = user?.nickname ? user.nickname[0] : '';

  if( isLoading || !user ) {
    return <ProfileInfoSkeleton/>
  }

  return (
    <div className="bg-white p-6 flex flex-col items-center">
      {user?.profile !== "" ? (
        <Avatar 
          className="w-20 h-20 mb-4"
          src={user?.profile}
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-4">
          <span className="text-3xl font-bold text-purple-600">{firstLetter}</span>
        </div>
      )}
      <h1 className="text-xl font-semibold">{user?.nickname}</h1>
      <p className="text-gray-500 mt-1">{developerTypeText} Developer</p>
      <div className="mt-4 px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
        Lv. {user?.level || 0}
      </div>
    </div>
  )
}
