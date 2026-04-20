import { useMutation } from '@tanstack/react-query';
import { NewPasswordT } from '../types/types';
import axios from 'axios';

export const useNewPassword = () => {
  return useMutation({
    mutationFn: async (values: NewPasswordT) => {
      const { data } = await axios.post('/api/auth/reset-password', values);
      return data;
    },
  });
};
