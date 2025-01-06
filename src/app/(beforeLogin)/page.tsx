// import {auth} from "@/auth";
// import {redirect} from "next/navigation";
import Main from "./_component/Main";

export default async function LoginPage() {
  // auth 설정 후 적용할 코드
  // const session = await auth();
  // if (session?.user) {
  //   redirect('/home');
  //   return null;
  // }
  return (
    <Main />
  )
}