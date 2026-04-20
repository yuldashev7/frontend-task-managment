import { useTranslations } from 'next-intl';
import z from 'zod';

export const useLoginSchema = () => {
  const t = useTranslations('login_locales');

  return z.object({
    username: z.string().min(1, { message: `${t('user_name_required')}` }),
    password: z.string().min(6, { message: `${t('password_required')}` }),
  });
};
