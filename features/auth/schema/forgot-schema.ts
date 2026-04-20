import z from 'zod';

export const ForgotSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email kiritish shart' })
    .email('Email formatida xatolik bor')
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/, {
      message: "Email formatida xatolik bor",
    }),
});
