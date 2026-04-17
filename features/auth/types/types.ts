export interface UserLoginT {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  avatar_url: string;
  role: string;
  profession: string;
  is_active: boolean;
}

export interface LoginResponseT {
  user: UserLoginT;
  access_token: string;
  refresh_token: string;
}

export interface LoginRequestT {
  username: string;
  password: string;
}
