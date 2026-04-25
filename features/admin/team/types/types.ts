export interface getUsersT {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  phone_number: string;
  avatar: string;
  bg_image: string;
  role: string;
  profession: string;
  gender: string;
}

export interface postUserT {
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  profession?: string;
  phone_number?: string;
  avatar?: string | undefined;
  password: string;
}
