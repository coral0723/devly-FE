export enum DeveloperType {
  BACKEND = 1,
  FRONTEND = 2
}

export interface User{
  id: string;
  email: string;
  nickname: string;
  profile: string;
  developer_type: DeveloperType;
}