import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { forgotT } from '../types/types';

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (values: forgotT) => {
      const { data } = await axios.post('/api/auth/forgot-password', values);
      return data;
    },
  });
};
