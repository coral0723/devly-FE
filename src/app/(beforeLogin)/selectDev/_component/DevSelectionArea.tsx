"use client"

import { DeveloperType } from "@/model/User"
import { useQuery } from "@tanstack/react-query";
import { getDevTypes } from "../_lib/getDevTypes";

export default function DevSelectionArea() {
  const {data: devTypes} = useQuery<number[], object, number[], [_1: string]>({
    queryKey: ['dev-types'],
    queryFn: getDevTypes,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  }); 

  const handleDevTypeSelect = async () => {
    try {
      window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/google`;
    } catch (error) {
      console.error('Failed to select developer type:', error)
    }
  }

  return (
    <div className="space-y-4">
      {devTypes?.map((devType) => (
        <button
          key={devType}
          className="w-full py-4 bg-white border border-gray-300 rounded-xl font-medium hover:bg-gray-50 active:scale-[0.98] transition-all"
          onClick={() => handleDevTypeSelect()}
        >
          {DeveloperType[devType]} Developer
        </button>
      ))}
    </div>
  )
}