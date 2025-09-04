import { ReactNode } from "react"

type Props = {
  children: ReactNode;
} 

export default function BeforeLoginLayout({ children }: Props) {

  return (
    <>
      {children}
    </>
  )
}