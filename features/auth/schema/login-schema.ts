import z from 'zod';

export const LoginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(6, { message: 'Password is incorrect' }),
});
