'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { AlertCircle, Eye, EyeOff, LockKeyhole, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { CustomInput } from '../custom/custom-input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UseLogin } from '@/features/auth/api/use-login';
import { LoginRequestT } from '@/features/auth/types/types';
import { Spinner } from '@/components/ui/spinner';
import { LoginFormProps } from '@/app/(auth)/login/page';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/features/auth/schema/login-schema';

const LoginFormWrapper = ({ setActiveTab }: LoginFormProps) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const { mutate: loginMutate, isPending } = UseLogin();

  type LoginFormValues = z.infer<typeof LoginSchema>;
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginRequestT) => {
    loginMutate(data);
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-1"
        >
          <label className="h-22 mb-1">
            <p className="text-[12px] text-(--text-label-color) text-left font-medium mb-1">
              Username
            </p>
            <FormField
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <User
                        className={`stroke-primary/50 w-4.5 h-4.5 absolute top-1/2 -translate-y-1/2 left-4 ${fieldState.error && 'stroke-destructive/50!'}`}
                      />
                      <CustomInput
                        placeholder="Enter your user name"
                        className={`h-10.5 rounded-[100px] border border-primary/50 pl-10 text-[14px] focus:border-primary! focus:border-2 ${fieldState.error && 'border-destructive! focus:border-destructive! focus:border-2!'}`}
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage className="text-[12px] text-start" />
                </FormItem>
              )}
            />
          </label>

          <label className="h-22">
            <p className="text-[12px] text-(--text-label-color) text-left font-medium mb-1">
              Password
            </p>
            <FormField
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <LockKeyhole
                        className={`stroke-primary/50 w-4.5 h-4.5 absolute top-1/2 -translate-y-1/2 left-4 ${fieldState.error && 'stroke-destructive/50!'}`}
                      />
                      <CustomInput
                        type={isHidden ? 'password' : 'text'}
                        placeholder="Enter your password"
                        autoComplete="off"
                        className={`h-10.5 rounded-[100px] border border-primary/50 pl-10 text-[14px] focus:border-primary! focus:border-2 ${fieldState.error && 'border-destructive focus:border-destructive! focus:border-2'}`}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setIsHidden(!isHidden)}
                        className="absolute top-1/2 -translate-1/2 right-1"
                      >
                        {isHidden ? (
                          <Eye
                            className={`stroke-primary/50 w-4.5 h-4.5 hover:stroke-(--text-primary-hover) transition duration-200 ${fieldState.error && 'stroke-destructive/50!'}`}
                          />
                        ) : (
                          <EyeOff
                            className={`stroke-primary/50 w-4.5 h-4.5 hover:stroke-(--text-primary-hover) transition duration-200 ${fieldState.error && 'stroke-destructive/50!'}`}
                          />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  {fieldState.error && (
                    <div className="flex items-center gap-1">
                      <p>
                        <AlertCircle className="fill-destructive stroke-white w-3.75 h-3.75" />
                      </p>
                      <FormMessage className="text-[12px] text-start" />
                    </div>
                  )}
                </FormItem>
              )}
            />
          </label>

          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={() => setActiveTab('forgot')}
              className="text-primary font-medium text-[14px] cursor-pointer transition duration-100 hover:text-(--text-primary-hover) hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <Button
            type="submit"
            className="w-full h-12 rounded-[100px] mt-4 hover:bg-(--text-primary-hover) transition duration-200"
          >
            {isPending ? <Spinner /> : <p>Sign In</p>}
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default LoginFormWrapper;
