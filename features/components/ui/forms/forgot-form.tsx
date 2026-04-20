'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Mail } from 'lucide-react';
import { CustomInput } from '../custom/custom-input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { LoginFormProps } from '@/app/(auth)/login/page';
import { useForgotPassword } from '@/features/auth/api/use-forgot-password';
import z from 'zod';
import { ForgotSchema } from '@/features/auth/schema/forgot-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { otpCodeT } from '@/features/auth/types/types';
import { useState } from 'react';

const ForgotForm = ({ setActiveTab }: LoginFormProps) => {
  const { mutate: forgotMutate, isPending } = useForgotPassword();
  type forgotSchemaProps = z.infer<typeof ForgotSchema>;
  const form = useForm<forgotSchemaProps>({
    resolver: zodResolver(ForgotSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: forgotSchemaProps) => {
    forgotMutate(data, {
      onSuccess: (res: otpCodeT) => {
        const otpCode = res.code;

        if (otpCode) {
          localStorage.setItem('temp_otp', String(otpCode));
        }
        localStorage.setItem('reset_email', data.email);
        setActiveTab('otp');
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
            'Something went wrong. Please try again.'
        );
      },
    });
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 md:mt-12">
          <label>
            <p className="text-[13px] text-(--text-label-color) mb-1 text-left">
              Email
            </p>
            <FormField
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Mail
                        className={`stroke-primary/50 w-4.5 h-4.5 absolute top-1/2 -translate-y-1/2 left-4 ${fieldState.error && 'stroke-destructive/50!'}`}
                      />
                      <CustomInput
                        placeholder="Enter your email"
                        className={`h-10.5 rounded-[100px] border border-primary/50 pl-10 text-[14px] focus:border-primary! focus:border-2 ${fieldState.error && 'border border-destructive focus:border-destructive! focus:border-2'}`}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-left text-[12px]" />
                </FormItem>
              )}
            />
          </label>

          <Button
            type="submit"
            className="w-full h-12 rounded-[100px] hover:bg-(--text-primary-hover) transition duration-200 mt-8"
          >
            {isPending ? <Spinner /> : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default ForgotForm;
