import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { CustomInput } from '@/features/components/ui/custom/custom-input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useChangePassword } from '../../api/use-change-password';
import { changePasswordT } from '../../types/types';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useChangePasswordSchema } from '../../schema/change-password-schema';

const AdminPasswordEdit = () => {
  const { mutate: changeMutate, isPending } = useChangePassword();
  const t = useTranslations('login_locales');
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [isHidden2, setIsHidden2] = useState<boolean>(true);
  const [isHidden3, setIsHidden3] = useState<boolean>(true);

  const schema = useChangePasswordSchema();

  const form = useForm<changePasswordT>({
    resolver: zodResolver(schema),
    defaultValues: {
      old_password: '',
      new_password: '',
      confirm_password: '',
    },
  });

  const onSubmit = (data: changePasswordT) => {
    changeMutate(data, {
      onSuccess: () => {
        (toast.success(t('update_password')), form.reset());
      },
      onError: (error: any) => {
        if (
          error.response?.status === 400 ||
          error.response?.data.message === 'Wrong password'
        ) {
          form.setError('old_password', {
            type: 'manual',
            message: `${t('error_old_password')}`,
          });
          toast.error(t('error_password_'));
        } else {
          toast.error(t('error_change_password'));
        }
      },
    });
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <label className="h-22">
            <p className="text-[12px] text-(--text-label-color) text-left font-medium mb-1">
              {t('old_password')}
            </p>
            <FormField
              name="old_password"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <CustomInput
                        type={isHidden ? 'password' : 'text'}
                        placeholder={t('password_plc')}
                        autoComplete="off"
                        className={`h-10.5 rounded-[12px] border border-primary/50 text-[14px] focus:border-primary! focus:border-2 ${fieldState.error && 'border-destructive focus:border-destructive! focus:border-2'}`}
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
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />
          </label>
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
                      <CustomInput
                        type={isHidden2 ? 'password' : 'text'}
                        placeholder={t('enter_new_password')}
                        autoComplete="off"
                        className={`h-10.5 rounded-[12px] border border-primary/50 text-[14px] focus:border-primary! focus:border-2 ${fieldState.error && 'border-destructive focus:border-destructive! focus:border-2'}`}
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
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />
          </label>
          <label className="h-22">
            <p className="text-[12px] text-(--text-label-color) text-left font-medium mb-1">
              {t('new_password')}
            </p>
            <FormField
              name="confirm_password"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <CustomInput
                        type={isHidden3 ? 'password' : 'text'}
                        placeholder={t('confirm_new_password')}
                        autoComplete="off"
                        className={`h-10.5 rounded-[12px] border border-primary/50 text-[14px] focus:border-primary! focus:border-2 ${fieldState.error && 'border-destructive focus:border-destructive! focus:border-2'}`}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setIsHidden3(!isHidden3)}
                        className="absolute top-1/2 -translate-1/2 right-1"
                      >
                        {isHidden3 ? (
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
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />
          </label>

          <Button
            type="submit"
            className="h-10 hover:bg-(--text-primary-hover) transition duration-200 text-white mt-2"
          >
            {isPending ? <Spinner /> : <p>{t('reset_password')}</p>}
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default AdminPasswordEdit;
