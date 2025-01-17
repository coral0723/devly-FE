import "next-auth";
import { DeveloperType } from "./User";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    developerType?: DeveloperType;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    developerType?: DeveloperType;
  }
}