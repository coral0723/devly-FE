import { ReactNode } from "react"
import ToastProvider from "./_component/ToastProvider"

type Props = {
  children: ReactNode;
} 

export default function AfterLoginLayout({ children }: Props) {

  return (
    <>
      {children}
      <ToastProvider/>
    </>
  )
}