'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Eye, EyeOff, LockKeyhole, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { CustomInput } from '../custom-input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UseLogin } from '@/features/auth/api/use-login';
import { LoginRequestT } from '@/features/auth/types/types';
import { Spinner } from '@/components/ui/spinner';
import { LoginFormProps } from '@/app/(auth)/login/page';

const LoginFormWrapper = ({ setActiveTab }: LoginFormProps) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const { mutate: loginMutate, isPending } = UseLogin();
  const form = useForm({
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[13px] text-(--text-label-color)">
                  Email
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="stroke-primary/50 w-4.5 h-4.5 absolute top-1/2 -translate-y-1/2 left-4" />
                    <CustomInput
                      placeholder="Enter your email"
                      className="h-10.5 rounded-[100px] border border-primary/50 pl-10 text-[14px] focus:border-primary! focus:border-2"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[13px] text-(--text-label-color)">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <LockKeyhole className="stroke-primary/50 w-4.5 h-4.5 absolute top-1/2 -translate-y-1/2 left-4" />
                    <CustomInput
                      type={isHidden ? 'password' : 'text'}
                      placeholder="Enter your password"
                      autoComplete="off"
                      className="h-10.5 rounded-[100px] border border-primary/50 pl-10 text-[14px] focus:border-primary! focus:border-2"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setIsHidden(!isHidden)}
                      className="absolute top-1/2 -translate-1/2 right-1"
                    >
                      {isHidden ? (
                        <Eye className="stroke-primary/50 w-4.5 h-4.5 hover:stroke-(--text-primary-hover) transition duration-200" />
                      ) : (
                        <EyeOff className="stroke-primary/50 w-4.5 h-4.5 hover:stroke-(--text-primary-hover) transition duration-200" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
