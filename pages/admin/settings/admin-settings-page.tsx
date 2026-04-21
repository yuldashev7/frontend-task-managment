'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  CameraIcon,
  CodeXml,
  Edit2,
  LogOut,
  Monitor,
  Moon,
  Sun,
  User,
} from 'lucide-react';
import { useGetProfile } from '@/features/admin/settings/api/use-get-profile';
import AdminSettingsSkeleton from '@/features/loadings/admin-settings-loading';

const AdminSettingsPage = () => {
  const { data: item, isLoading } = useGetProfile();

  if (isLoading) {
    return <AdminSettingsSkeleton />;
  }

  return (
    <div className="pb-10">
      <section className="bg-white rounded-[12px]">
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
          <Button className="h-9.5 absolute right-8 bottom-4 inline-flex items-center gap-2 hover:bg-(--text-primary-hover) transition duration-200">
            <CameraIcon />
            Update Cover
          </Button>

          <div className="absolute left-[46%] -bottom-12">
            <div className="relative w-fit">
              <Image
                src={item?.avatar || ''}
                alt="profile-img"
                width={100}
                height={100}
                unoptimized={true}
                loading="eager"
                className="w-25 h-25 object-cover rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="mt-17 pb-6">
          <div className="flex items-center justify-center gap-1 text-[20px] font-semibold text-[#090037]">
            <h2>{item?.last_name}</h2>
            <h1>{item?.first_name}</h1>
          </div>
          <div className="text-(--text-label-color) text-[14px] flex items-center justify-center gap-4 mt-2 font-medium">
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

      <section className="bg-white mt-6 p-4 rounded-[12px] border border-primary/40">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-[14px] text-(--text-title)">
            Edit your account information:
          </h1>

          <Button className="flex items-center gap-2 h-10.5 text-[14px] w-40 hover:bg-(--text-primary-hover) transition duration-200">
            <Edit2 className="w-4 h-4 stroke-white" />
            Edit profile
          </Button>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <div className="w-full">
            <p className="text-[13px] text-(--text-label-color) text-left font-medium mb-1">
              Email
            </p>
            <p className="py-2 px-4 border border-(--text-color) rounded-[12px] bg-background text-(--text-title) text-[14px]">
              {item?.email}
            </p>
          </div>

          <div className="w-full">
            <p className="text-[13px] text-(--text-label-color) text-left font-medium mb-1">
              Phone number
            </p>
            <p className="py-2 px-4 border border-(--text-color) rounded-[12px] bg-background text-(--text-title) text-[14px]">
              +998{item?.phone_number}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <div className="w-full">
            <p className="text-[13px] text-(--text-label-color) text-left font-medium mb-1">
              Phone number
            </p>
            <p className="py-2 px-4 border border-(--text-color) rounded-[12px] bg-background text-(--text-title) text-[14px] w-[58%]">
              ********
            </p>
          </div>

          <div className="mt-5.75">
            <Button className="h-10.5 hover:bg-(--text-primary-hover) transition duration-200 w-40">
              Change password
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white mt-6 p-4 rounded-[12px] border border-primary/40">
        <div className="flex items-center justify-between gap-4">
          <div className="w-full">
            <p className="text-[14px] text-(--text-label-color) mr-8 font-medium mb-2">
              System theme
            </p>
            <Tabs defaultValue="system" className="w-100">
              <TabsList className="flex items-center gap-4 h-11.5!">
                <TabsTrigger
                  value="light"
                  className="flex items-center gap-2 data-[state=active]:bg-primary py-1.5 data-[state=active]:text-white px-4 hover:text-primary h-10"
                >
                  <Sun className="h-4 w-4" />
                  <span>Light</span>
                </TabsTrigger>
                <TabsTrigger
                  value="dark"
                  className="flex items-center gap-2 data-[state=active]:bg-primary py-1.5 data-[state=active]:text-white px-4 hover:text-primary h-10"
                >
                  <Moon className="h-4 w-4" />
                  <span>Dark</span>
                </TabsTrigger>
                <TabsTrigger
                  value="system"
                  className="flex items-center gap-2 data-[state=active]:bg-primary py-1.5 data-[state=active]:text-white px-4 hover:text-primary h-10"
                >
                  <Monitor className="h-4 w-4" />
                  <span>System</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className=" ml-2">
            <p className="opacity-0 text-[14px] text-(--text-label-color) font-medium">
              asd
            </p>
            <Button className="flex items-center gap-2 h-10.5 text-[14px] w-40 hover:bg-(--text-primary-hover) transition duration-200">
              <LogOut className="w-5 h-5" />
              LogOut
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default AdminSettingsPage;
