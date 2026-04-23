import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editProfileT } from '../types/types';
import axios from 'axios';

export const useEditProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (value: editProfileT) => {
      const { data } = await axios.patch('/api/proxy/auth/me', value);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-profile'] });
    },
  });
};
