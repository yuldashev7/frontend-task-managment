'use client';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { CustomInput } from '@/features/components/ui/custom/custom-input';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useEditProfile } from '../../api/use-edit-profile';
import { useEffect } from 'react';
import { editProfileT } from '../../types/types';
import { toast } from 'sonner';

interface AdminProfileEditProps {
  initialData?: editProfileT;
  onClose: () => void;
}

const AdminProfileEdit = ({ initialData, onClose }: AdminProfileEditProps) => {
  const t = useTranslations('login_locales');
  const { mutate: profileMutate, isPending } = useEditProfile();
  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      phone_number: '',
      first_name: '',
      last_name: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        username: initialData?.username || '',
        email: initialData?.email || '',
        phone_number: initialData?.phone_number || '',
        first_name: initialData.first_name || '',
        last_name: initialData.last_name || '',
      });
    }
  }, [initialData, form]);

  const onSubmit = (data: editProfileT) => {
    profileMutate(data, {
      onSuccess: () => {
        if (onClose) onClose();
        toast.success(t('update_profile'));
      },
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3.75"
        >
          <div className="flex items-center gap-3">
            <label>
              <p className="text-[12px] text-(--text-label-color) text-left font-medium mb-1">
                {t('first_name')}
              </p>
              <FormField
                name="first_name"
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

            <label>
              <p className="text-[12px] text-(--text-label-color) text-left font-medium mb-1">
                {t('last_name')}
              </p>
              <FormField
                name="last_name"
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
          </div>

          <label>
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

          <label>
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

          <label>
            <p className="text-[12px] text-(--text-label-color) text-left font-medium mb-1">
              {t('phone_number_label')}
            </p>
            <FormField
              name="phone_number"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <CustomInput
                        placeholder={t('phone_number_plc')}
                        autoComplete="off"
                        className={`h-10.5 rounded-[12px] pl-11 border border-primary/50 text-[14px] focus:border-primary! focus:border-2`}
                        {...field}
                      />
                      <span className="text-[14px] absolute top-3 left-2">
                        +998
                      </span>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </label>

          <Button
            disabled={isPending}
            type="submit"
            className="h-10 hover:bg-(--text-primary-hover) transition duration-200 text-white"
          >
            {isPending ? 'Saqlanmoqda...' : t('save')}
          </Button>
        </form>
      </Form>
    </>
  );
};
export default AdminProfileEdit;
