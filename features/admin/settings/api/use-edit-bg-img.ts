import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface useEditBgImageT {
  bg_image: string;
}

export const useEditBgImage = () => {
  const queryClient = useQueryClient();
  return useMutation<useEditBgImageT, Error, FormData>({
    mutationFn: async (res: FormData) => {
      const { data } = await axios.patch('/api/proxy/auth/me', res);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-profile'] });
    },
  });
};
