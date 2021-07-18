export {};

declare global {
  interface IUser {
    email: string;
    uid: string;
    token: string;
    name: string;
    lastLogin: string;
  }
  interface IRESTResponse {
    data: any;
  }
}
