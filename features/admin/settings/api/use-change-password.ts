import axios from 'axios';
import { changePasswordT } from '../types/types';
import { useMutation } from '@tanstack/react-query';

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (values: changePasswordT) => {
      const { data } = await axios.post(
        '/api/admin/admin-change-password/',
        values
      );
      return data;
    },
  });
};
