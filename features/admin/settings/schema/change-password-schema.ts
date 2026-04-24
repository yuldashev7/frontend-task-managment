import { useTranslations } from 'next-intl';
import z from 'zod';

export const useChangePasswordSchema = () => {
  const t = useTranslations('login_locales');
  return z
    .object({
      old_password: z.string().min(1, `${t('required_old_password')}`),
      new_password: z
        .string()
        .min(6, `${t("new_password_max_length")}`),
      confirm_password: z.string().min(1, 'Parolni tasdiqlang'),
    })
    .refine((data) => data.new_password === data.confirm_password, {
      message: `${t("new_password_not_match")}`,
      path: ['confirm_password'],
    });
};
