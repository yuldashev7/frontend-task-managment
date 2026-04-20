import { useTranslations } from 'next-intl';
import z from 'zod';

export const useNewPasswordSchema = () => {
  const t = useTranslations('login_locales');
  return z
    .object({
      new_password: z.string().min(6, { message: `${t('password_min_6')}` }),
      confirm_password: z
        .string()
        .min(1, { message: `${t('confirm_password_required')}` }),
    })
    .refine((data) => data.new_password === data.confirm_password, {
      message: `${t('passwords_not_match')}`,
      path: ['confirm_password'],
    });
};
