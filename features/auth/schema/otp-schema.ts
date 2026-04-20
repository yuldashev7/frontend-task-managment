import { useTranslations } from 'next-intl';
import z from 'zod';

export const useOtpSchema = () => {
  const t = useTranslations('login_locales');
  return z.object({
    otp_code: z
      .string()
      .min(6, { message: `${t('invalit_otp')}` })
      .max(6, { message: `${t('otp_max_length')}` }),
  });
};
