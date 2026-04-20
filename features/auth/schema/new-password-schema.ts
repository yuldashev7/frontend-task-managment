import z from 'zod';

export const NewPasswordSchema = z
  .object({
    new_password: z
      .string()
      .min(6, { message: "Parol kamida 6 ta belgi bo'lishi kerak" }),
    confirm_password: z
      .string()
      .min(1, { message: 'Parolni tasdiqlash shart' }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: 'Parollar bir-biriga mos kelmadi',
    path: ['confirm_password'],
  });
