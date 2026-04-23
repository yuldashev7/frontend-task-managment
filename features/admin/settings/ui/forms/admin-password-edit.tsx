import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { CustomInput } from '@/features/components/ui/custom/custom-input';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

const AdminPasswordEdit = () => {
  const t = useTranslations('login_locales');
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const form = useForm({
    defaultValues: {
      old_password: '',
      new_password: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
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
                </FormItem>
              )}
            />
          </label>

          <Button
            type="submit"
            className="h-10 hover:bg-(--text-primary-hover) transition duration-200 text-white"
          >
            {t('reset_password')}
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default AdminPasswordEdit;
