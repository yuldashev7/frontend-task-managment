import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postUserT } from '../types/types';
import axios from 'axios';

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (value: postUserT) => {
      const formData = new FormData();

      Object.entries(value).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '')
          formData.append(key, value);
      });
      const { data } = await axios.post('/api/admin/team/post-user', formData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
};
