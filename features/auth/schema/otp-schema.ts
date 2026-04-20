import z from 'zod';

export const OtpSchema = z.object({
  otp_code: z
    .string()
    .min(6, { message: 'Invalid OTP. Please enter a valid OTP.' })
    .max(6, { message: 'You can insert only 6 numbers' }),
});
