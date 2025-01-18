import { ReactNode } from "react"

type Props = {
  children: ReactNode;
} 

export default async function AfterLoginLayout({ children }: Props) {
  return (
    <>
      {children}
    </>
  )
}