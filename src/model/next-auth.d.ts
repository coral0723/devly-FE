import "next-auth";
import { DeveloperType } from "./User";

export declare module 'next-auth' {
  interface User {
    accessToken: string;
    refreshToken: string;
    isNewUser: boolean;
    developerType: string;
  }
  interface Session {
    accessToken: string;
    refreshToken: string;
  }
}
export declare module '@auth/core/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
  }
}