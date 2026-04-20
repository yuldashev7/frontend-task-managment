import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { AlertCircle, Eye, EyeOff, LockKeyhole } from 'lucide-react';
import { CustomInput } from '../custom/custom-input';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { LoginFormProps } from '@/app/(auth)/login/page';
import { Button } from '@/components/ui/button';
import z from 'zod';
import { NewPasswordSchema } from '@/features/auth/schema/new-password-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNewPassword } from '@/features/auth/api/use-new-password';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

const NewPasswordForm = ({ setActiveTab }: LoginFormProps) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [isHidden2, setIsHidden2] = useState<boolean>(true);
  const { mutate: newPasswordMutate, isPending } = useNewPassword();

  type NewPasswordForm = z.infer<typeof NewPasswordSchema>;
  const form = useForm<NewPasswordForm>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      new_password: '',
      confirm_password: '',
    },
  });
  const onSubmit = (data: NewPasswordForm) => {
    const email = localStorage.getItem('reset_email');
    const code = localStorage.getItem('temp_otp');

    const payload = {
      ...data,
      email: email || '',
      code: code || '',
    };

    newPasswordMutate(payload, {
      onSuccess: () => {
        localStorage.removeItem('reset_email');
        localStorage.removeItem('temp_otp');
        toast.success('Password changed successfully');
        setActiveTab('success');
      },
      onError: () => {
        toast.error('Error in password reset');
      },
    });
  };
  return (
    <div className="mt-8 md:mt-12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-1"
        >
          <label className="h-22">
            <p className="text-[12px] text-(--text-label-color) text-left font-medium mb-1">
              New Password
            </p>
            <FormField
              name="new_password"
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
                        placeholder="Enter your new password"
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

          <label className="h-22">
            <p className="text-[12px] text-(--text-label-color) text-left font-medium mb-1">
              Confirm New Password
            </p>
            <FormField
              name="confirm_password"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <LockKeyhole
                        className={`stroke-primary/50 w-4.5 h-4.5 absolute top-1/2 -translate-y-1/2 left-4 ${fieldState.error && 'stroke-destructive/50!'}`}
                      />
                      <CustomInput
                        type={isHidden2 ? 'password' : 'text'}
                        placeholder="Confirm new password"
                        autoComplete="off"
                        className={`h-10.5 rounded-[100px] border border-primary/50 pl-10 text-[14px] focus:border-primary! focus:border-2 ${fieldState.error && 'border-destructive focus:border-destructive! focus:border-2'}`}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setIsHidden2(!isHidden2)}
                        className="absolute top-1/2 -translate-1/2 right-1"
                      >
                        {isHidden2 ? (
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

                  <FormMessage className="text-[12px] text-start" />
                </FormItem>
              )}
            />
          </label>

          <Button
            type="submit"
            className="w-full h-12 rounded-[100px] mt-4 hover:bg-(--text-primary-hover) transition duration-200"
          >
            {isPending ? <Spinner /> : <p>Save New Password</p>}
          </Button>

          <div className="flex items-center gap-1 mt-6 justify-center">
            <p className="text-[14px] text-(--text-color) ">
              Remember old password?
            </p>

            <button
              onClick={() => setActiveTab('login')}
              className="text-primary text-[14px] hover:underline transition duration-100 hover:text-(--text-primary-hover)"
            >
              Sign in
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default NewPasswordForm;
