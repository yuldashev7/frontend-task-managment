import { useTranslations } from 'next-intl';
import z from 'zod';

export const useAddUserSchema = () => {
  const t = useTranslations('');
  return z.object({
    username: z
      .string()
      .min(4, { message: 'Min length 4' })
      .max(32, { message: 'Max lenght 32' }),
    password: z
      .string()
      .min(6, { message: 'Min length 6' })
      .max(32, { message: 'Max length 32' }),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    email: z
      .string()
      .email({ message: 'Invalid Email' })
      .optional()
      .or(z.literal('')),
    profession: z.string().optional(),
    phone_number: z.string().optional(),
    avatar: z.any().optional(),
  });
};
