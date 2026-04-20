import { useTranslations } from 'next-intl';
import z from 'zod';

export const useForgotSchema = () => {
  const t = useTranslations('login_locales');
  return z.object({
    email: z
      .string()
      .min(1, { message: `${t('email_required')}` })
      .email(`${'email_invalid'}`)
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/, {
        message: `${'email_invalid'}`,
      }),
  });
};
