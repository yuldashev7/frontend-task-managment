import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { LoginRequestT } from '../types/types';
import { useRouter } from '@/app/config/navigation';
import { useTranslations } from 'next-intl';

export const UseLogin = () => {
  const router = useRouter();
  const t = useTranslations('login_locales');

  return useMutation({
    mutationFn: async (values: LoginRequestT) => {
      const { data } = await axios.post('/api/auth/login/', values);
      return data;
    },
    onSuccess: (data) => {
      toast.success(t('success_sign'));

      if (data.role === 'PM') {
        router.push('/admin/dashboard');
      } else {
        router.push('/user/dashboard');
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || t('error_login');
      toast.error(message);
    },
  });
};
