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
import { Button } from '@/components/ui/button';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNewPassword } from '@/features/auth/api/use-new-password';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { LoginFormProps } from '@/app/[locale]/(auth)/login/page';
import { useTranslations } from 'next-intl';
import { useNewPasswordSchema } from '@/features/auth/schema/new-password-schema';

const NewPasswordForm = ({ setActiveTab }: LoginFormProps) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [isHidden2, setIsHidden2] = useState<boolean>(true);
  const { mutate: newPasswordMutate, isPending } = useNewPassword();
  const t = useTranslations('login_locales');
  const schema = useNewPasswordSchema();

  type NewPasswordForm = z.infer<typeof schema>;
  const form = useForm<NewPasswordForm>({
    resolver: zodResolver(schema),
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
        toast.success(t('succes_password_change'));
        setActiveTab('success');
      },
      onError: () => {
        toast.error(t('error_password_res'));
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
              {t('new_password')}
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
                        placeholder={t('enter_your_new_password')}
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
              {t('confirm_new_password')}
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
                        placeholder={t('confirm_new_password')}
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
            {isPending ? <Spinner /> : <p>{t('save_new_password')}</p>}
          </Button>

          <div className="flex items-center gap-1 mt-6 justify-center">
            <p className="text-[14px] text-(--text-color) ">
              {t('remember_old_password')}
            </p>

            <button
              onClick={() => setActiveTab('login')}
              className="text-primary text-[14px] hover:underline transition duration-100 hover:text-(--text-primary-hover)"
            >
              {t('Sign_In')}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default NewPasswordForm;
