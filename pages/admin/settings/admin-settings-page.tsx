'use client';

import {
  Eye,
  Sun,
  Edit2,
  Moon,
  User,
  CodeXml,
  LogOut,
  EyeOff,
  Monitor,
  Edit2Icon,
  CameraIcon,
} from 'lucide-react';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useLogOut } from '@/features/auth/api/use-logout';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetProfile } from '@/features/admin/settings/api/use-get-profile';
import AdminSettingsSkeleton from '@/features/loadings/admin-settings-loading';
import { useEditBgImage } from '@/features/admin/settings/api/use-edit-bg-img';
import { useEditProfileImg } from '@/features/admin/settings/api/use-edit-profile-img';

const AdminProfileEditDialog = dynamic(
  () => import('@/features/admin/settings/ui/admin-profile-edit-dialog')
);

const AdminSettingsPage = () => {
  const { data: item, isLoading } = useGetProfile();
  const { mutate: imageMutate, isPending } = useEditBgImage();
  const { mutate: profileImgMutate, isPending: profileImgPending } =
    useEditProfileImg();
  const { isLoading: logoutLoading, logout } = useLogOut();

  const { setTheme, theme } = useTheme();
  const t = useTranslations('admin_profile_locales');

  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (isLoading) {
    return <AdminSettingsSkeleton />;
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    document.cookie = `theme=${newTheme}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('bg_image', file);
      imageMutate(formData);
    }
  };

  const handleProfileImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      profileImgMutate(formData);
    }
  };

  return (
    <div className="pb-10 max-w-full overflow-x-hidden px-2 md:px-0">
      <section className="bg-(--card-bg) rounded-[12px]">
        <div className="relative">
          <Image
            src={item?.bg_image || '/default-bg-img.png'}
            alt="bg-image"
            width={400}
            height={300}
            unoptimized={true}
            loading="eager"
            className="w-full h-50 object-cover rounded-t-[12px]"
          />
          <label className="bg-primary absolute right-4 md:right-8 bottom-4 hover:bg-(--text-primary-hover) transition duration-200 text-[14px] p-2 rounded-[10px] text-white cursor-pointer">
            <Input type="file" className="hidden" onChange={handleFileChange} />
            <div className="flex items-center gap-2">
              {isPending ? (
                <p>{t('downloading')}</p>
              ) : (
                <>
                  <CameraIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">{t('update_cover')}</span>
                </>
              )}
            </div>
          </label>

          <div className="absolute left-1/2 -translate-x-1/2 -bottom-12">
            <div className="relative w-fit">
              <Image
                src={item?.avatar || ''}
                alt="profile-img"
                width={100}
                height={100}
                unoptimized={true}
                loading="eager"
                className="w-25 h-25 object-cover rounded-full border-4 border-(--card-bg)"
              />
              <label className="bg-primary p-1.5 rounded-full border-2 border-(--text-color) absolute -bottom-3 right-0 cursor-pointer hover:bg-(--text-primary-hover) transition duration-200">
                <Input
                  type="file"
                  className="hidden"
                  onChange={handleProfileImgChange}
                />
                {profileImgPending ? (
                  <Spinner className="stroke-white" />
                ) : (
                  <Edit2Icon className="w-5 h-5 stroke-white" />
                )}
              </label>
            </div>
          </div>
        </div>
        <div className="mt-17 pb-6">
          <div className="flex items-center justify-center gap-1 text-[20px] font-semibold text-(--name-color)">
            <h2>{item?.last_name}</h2>
            <h1>{item?.first_name}</h1>
          </div>
          <div className="text-(--text-label-color) text-[14px] flex flex-wrap items-center justify-center gap-4 mt-2 font-medium">
            <p className="flex items-center gap-2">
              <CodeXml className="w-5 h-5" />
              {item?.profession}
            </p>
            <p className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {item?.role}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-(--card-bg) mt-6 p-4 rounded-[12px] border border-primary/40">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="font-medium text-[14px] text-(--text-title)">
            {t('edit_account_info')}
          </h1>

          <Button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 h-10.5 text-[14px] w-full sm:w-42 hover:bg-(--text-primary-hover) text-white transition duration-200"
          >
            <Edit2 className="w-4 h-4 stroke-white" />
            {t('edit_profile')}
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full">
            <p className="text-[13px] text-(--text-label-color) text-left font-medium mb-1">
              {t('email_label')}
            </p>
            <p className="py-2 px-4 border border-(--text-color) rounded-[12px] bg-background text-(--text-title) text-[14px] truncate">
              {item?.email}
            </p>
          </div>

          <div className="w-full">
            <p className="text-[13px] text-(--text-label-color) text-left font-medium mb-1">
              {t('phone_number')}
            </p>
            <p className="py-2 px-4 border border-(--text-color) rounded-[12px] bg-background text-(--text-title) text-[14px]">
              +998{item?.phone_number}
            </p>
          </div>

          <div className="w-full">
            <p className="text-[13px] text-(--text-label-color) text-left font-medium mb-1">
              {t('password')}
            </p>
            <p className="py-2 px-4 border border-(--text-color) rounded-[12px] bg-background text-(--text-title) text-[14px]">
              ••••••••
            </p>
          </div>

          <div className="w-full relative">
            <p className="text-[13px] text-(--text-label-color) text-left font-medium mb-1">
              {t('user_name_label')}
            </p>
            <div className="relative group">
              <p
                className="py-2 pl-4 pr-10 border border-(--text-color) rounded-[12px] bg-background text-(--text-title) text-[14px] cursor-pointer min-h-9.5 flex items-center"
                onClick={() => setIsHidden(!isHidden)}
              >
                {isHidden ? '••••••••' : item?.username}
              </p>
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-(--text-label-color) hover:text-(--text-title) transition-colors"
                onClick={() => setIsHidden(!isHidden)}
              >
                {isHidden ? <Eye size={18} /> : <EyeOff size={18} />}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-(--card-bg) mt-6 p-4 rounded-[12px] border border-primary/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="w-full md:w-auto">
            <p className="text-[14px] text-(--text-label-color) font-medium mb-2">
              {t('system_theme')}
            </p>
            <Tabs defaultValue={theme} className="w-full max-w-100">
              <TabsList className="flex items-center justify-start gap-2 h-10.5! p-1 bg-(--tab-bg) flex-wrap sm:flex-nowrap">
                <TabsTrigger
                  onClick={() => handleThemeChange('light')}
                  value="light"
                  className="flex items-center gap-2 data-[state=active]:bg-primary py-1.5 data-[state=active]:text-white px-4 hover:text-primary h-9 flex-1 sm:flex-none"
                >
                  <Sun className="h-4 w-4" />
                  <span className="text-[13px]">{t('light')}</span>
                </TabsTrigger>
                <TabsTrigger
                  onClick={() => handleThemeChange('dark')}
                  value="dark"
                  className="flex items-center gap-2 data-[state=active]:bg-primary py-1.5 data-[state=active]:text-white px-4 hover:text-primary h-9 flex-1 sm:flex-none"
                >
                  <Moon className="h-4 w-4" />
                  <span className="text-[13px]">{t('dark')}</span>
                </TabsTrigger>
                <TabsTrigger
                  onClick={() => handleThemeChange('system')}
                  value="system"
                  className="flex items-center gap-2 data-[state=active]:bg-primary py-1.5 data-[state=active]:text-white px-4 hover:text-primary h-9 flex-1 sm:flex-none"
                >
                  <Monitor className="h-4 w-4" />
                  <span className="text-[13px]">{t('system')}</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="w-full md:w-auto self-end">
            <Button
              onClick={logout}
              className="flex items-center justify-center text-white gap-2 h-10.5 text-[14px] w-full sm:w-42 hover:bg-(--text-primary-hover) transition duration-200"
            >
              {logoutLoading ? (
                <Spinner />
              ) : (
                <>
                  <LogOut className="w-5 h-5" />
                  {t('LogOut')}
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      <AdminProfileEditDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        initialData={item}
      />
    </div>
  );
};

export default AdminSettingsPage;
