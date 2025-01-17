export enum DeveloperType {
  Backend = 1,
  Frontend = 2
}

export interface User{
  id: string;
  email: string;
  nickname: string;
  profile: string;
  developer_type: DeveloperType;
}