import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { LoginRequestT } from '../types/types';

export const UseLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: LoginRequestT) => {
      const { data } = await axios.post('/api/auth/login/', values);
      return data;
    },
    onSuccess: (data) => {
      toast.success('Success');
      if (data.role === 'PM') {
        router.push('/admin/dashboard');
      } else {
        router.push('/user/dashboard');
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Login yoki parol xato!';
      toast.error(message);
    },
  });
};
