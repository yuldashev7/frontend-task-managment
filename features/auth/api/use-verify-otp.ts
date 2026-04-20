import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { VerifyOtpT } from '../types/types';

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async (value: VerifyOtpT) => {
      const { data } = await axios.post('/api/auth/verify-otp', value);
      return data;
    },
  });
};
