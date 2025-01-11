import { ReactNode } from "react"
import RQProvider from "./_component/RQProvider";

type Props = {
  children: ReactNode;
} 

export default async function AfterLoginLayout({ children }: Props) {
  return (
    <RQProvider>
      {children}
    </RQProvider>
  )
}