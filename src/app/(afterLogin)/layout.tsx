"use client"

import { ReactNode } from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

type Props = {
  children: ReactNode;
} 

export default function AfterLoginLayout({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if(!accessToken) {
      router.push('/');
    }
  }, [router]);

  return (
    <>
      {children}
    </>
  )
}