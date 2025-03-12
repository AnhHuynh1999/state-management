export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface IBlog {
  id: number;
  title: string;
  author: string;
  content: string;
}

export interface ILogin {
  email: string;
  password: string;
}
