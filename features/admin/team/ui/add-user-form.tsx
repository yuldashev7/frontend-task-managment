import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { CustomInput } from '@/features/components/ui/custom/custom-input';
import { Camera, Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAddUserSchema } from '../schema/use-add-user-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddUser } from '../api/use-add-user';
import { postUserT } from '../types/types';
import { toast } from 'sonner';
import z from 'zod';
import Image from 'next/image';
import { Spinner } from '@/components/ui/spinner';

const AddUserForm = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations('admin_team_locale');
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const { mutate: mutateUser, isPending } = useAddUser();
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const schema = useAddUserSchema();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      profession: '',
      phone_number: '',
      avatar: undefined,
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    mutateUser(data as postUserT, {
      onSuccess: () => {
        toast.success('Succes add');
        form.reset();
        setPreviewImg(null);
        onClose();
      },
      onError: () => {
        toast.error('Error Add user');
      },
    });
  };

  const onError = (errors: any) => {
    console.log('Zod Validatsiya xatolari:', errors);
  };

  const handleAvatarClick = () => {
    imgRef.current?.click();
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex flex-col px-1.5"
        >
          <label className="cursor-pointer w-fit mx-auto h-22">
            <FormField
              name="avatar"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <input
                        ref={imgRef}
                        accept="image/*"
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.onChange(file);
                            setPreviewImg(URL.createObjectURL(file));
                          }
                        }}
                        className="hidden"
                      />

                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          handleAvatarClick();
                        }}
                        className="h-24 w-24 border-2 border-(--text-color) flex items-center justify-center rounded-full hover:bg-gray-50 transition duration-200 cursor-pointer overflow-hidden relative group"
                      >
                        {previewImg ? (
                          <>
                            <Image
                              src={previewImg}
                              alt="Avatar"
                              fill
                              className="object-cover w-24 h-24"
                            />
                            <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center">
                              <Camera className="stroke-white" />
                            </div>
                          </>
                        ) : (
                          <Camera className="stroke-(--text-color)" />
                        )}
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </label>

          <label className="h-22 mt-4">
            <p className="text-[12px] text-(--text-label-color) text-left font-medium mb-1">
              User Name
            </p>
            <FormField
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <CustomInput
                      placeholder={t('user_name_plc')}
                      autoComplete="off"
                      className={`h-10.5 rounded-[12px] border border-primary/50 text-[14px]! focus:border-primary! focus:border-2 focus-visible:ring-0! focus-visible:ring-offset-0! ${
                        fieldState.error &&
                        'border-destructive! focus:border-destructive! focus:border-2! focus-visible:ring-0! focus-visible:ring-offset-0!'
                      }`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] text-start pb-1" />
                </FormItem>
              )}
            />
          </label>

          <div className="flex items-center gap-3.75">
            <label className="w-full h-22">
              <p className="text-[12px] text-(--text-label-color) text-left font-medium mb-1">
                First Name
              </p>
              <FormField
                name="first_name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomInput
                        placeholder={t('first_name_plc')}
                        autoComplete="off"
                        className={`h-10.5 rounded-[12px] border border-primary/50 text-[14px]! focus:border-primary! focus:border-2`}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </label>

            <label className="w-full h-22">
              <p className="text-[12px] text-(--text-label-color) text-left font-medium mb-1">
                Last Name
              </p>
              <FormField
                name="last_name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomInput
                        autoComplete="off"
                        placeholder={t('last_name_plc')}
                        className={`h-10.5 rounded-[12px] border border-primary/50 text-[14px]! focus:border-primary! focus:border-2`}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </label>
          </div>

          <div className="flex items-center gap-3.75">
            <label className="w-full h-22">
              <p className="text-[12px] text-(--text-label-color) text-left font-medium mb-1">
                Email
              </p>
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomInput
                        placeholder="example@mail.com"
                        className={`h-10.5 rounded-[12px] border border-primary/50 text-[14px]! focus:border-primary! focus:border-2`}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </label>

            <label className="w-full h-22">
              <p className="text-[12px] text-(--text-label-color) text-left font-medium mb-1">
                Profession
              </p>
              <FormField
                name="profession"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomInput
                        placeholder={t('profession_plc')}
                        className={`h-10.5 rounded-[12px] border border-primary/50 text-[14px]! focus:border-primary! focus:border-2`}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </label>
          </div>

          <div className="flex items-center gap-3.75">
            <label className="w-full h-22">
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
                        <CustomInput
                          type={isHidden ? 'text' : 'password'}
                          placeholder="••••••••"
                          autoComplete="off"
                          className={`h-10.5 rounded-[12px] border border-primary/50 text-[14px]! focus:border-primary! focus:border-2 ${fieldState.error && 'border-destructive! focus:border-destructive! focus:border-2!'}`}
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
                    <FormMessage className="text-[12px] text-start" />
                  </FormItem>
                )}
              />
            </label>

            <label className="w-full h-22">
              <p className="text-[12px] text-(--text-label-color) text-left font-medium mb-1">
                Phone Number
              </p>
              <FormField
                name="phone_number"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <CustomInput
                          placeholder="901234567"
                          className={`h-10.5 rounded-[12px] placeholder:text-[14px]! border border-primary/50 pl-10.5 text-[14px]! focus:border-primary! focus:border-2`}
                          {...field}
                        />
                        <p className=" absolute top-[51.6%] -translate-1/2 left-6 text-[14px]!">
                          +998
                        </p>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </label>
          </div>

          <Button
            type="submit"
            className="w-full h-11 hover:bg-(--text-primary-hover) transition duration-200 my-3"
          >
            {isPending ? <Spinner /> : <p>{t('add_user')}</p>}
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default AddUserForm;
