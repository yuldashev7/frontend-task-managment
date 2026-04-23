export interface adminProfileT {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  avatar: string;
  bg_image: string | null;
  role: string;
  profession: string;
  gender: string;
  is_active: boolean;
}

export interface editProfileT {
  username: string;
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
}
