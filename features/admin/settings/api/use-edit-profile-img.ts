import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface editProfileImgT {
  avatar: string;
}

export const useEditProfileImg = () => {
  const queryClient = useQueryClient();
  return useMutation<editProfileImgT, Error, FormData>({
    mutationFn: async (res: FormData) => {
      const { data } = await axios.patch('/api/admin/admin-profile-img', res);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-profile'] });
    },
  });
};
