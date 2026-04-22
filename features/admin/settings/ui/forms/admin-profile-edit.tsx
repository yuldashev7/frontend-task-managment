import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { CustomInput } from '@/features/components/ui/custom/custom-input';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

const AdminProfileEdit = () => {
  const t = useTranslations('login_locales');
  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      phone_number: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <label className="h-22">
            <p className="text-[12px] text-(--text-label-color) text-left font-medium mb-1">
              {t('user_name_label')}
            </p>
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInput
                      placeholder={t('user_name_plc')}
                      autoComplete="off"
                      className={`h-10.5 rounded-[12px] border border-primary/50 text-[14px] focus:border-primary! focus:border-2`}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </label>

          <label className="h-22">
            <p className="text-[12px] text-(--text-label-color) text-left font-medium mb-1">
              {t('email_label')}
            </p>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInput
                      placeholder={t('email_plc')}
                      autoComplete="off"
                      className={`h-10.5 rounded-[12px] border border-primary/50 text-[14px] focus:border-primary! focus:border-2`}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </label>

          <label className="h-22">
            <p className="text-[12px] text-(--text-label-color) text-left font-medium mb-1">
              {t('phone_number_label')}
            </p>
            <FormField
              name="phone_number"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInput
                      placeholder={t('phone_number_plc')}
                      autoComplete="off"
                      className={`h-10.5 rounded-[12px] border border-primary/50 text-[14px] focus:border-primary! focus:border-2`}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </label>

          <Button
            type="submit"
            className="h-10 hover:bg-(--text-primary-hover) transition duration-200 text-white"
          >
            {t('save')}
          </Button>
        </form>
      </Form>
    </>
  );
};
export default AdminProfileEdit;
