'use client';
import { usePathname, useRouter } from '@/app/config/navigation';
import { OPTION_LANG } from '@/features/components/header';
import { CustomSelect } from '@/features/components/ui/custom/custom-select';
import { useLocale } from 'next-intl';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useTransition } from 'react';

const LoginWrapper = dynamic(
  () => import('@/features/components/login-wrapper')
);

type AuthTab = 'login' | 'forgot' | 'otp' | 'new_password' | 'success';

export interface LoginFormProps {
  activeTab?: AuthTab;
  setActiveTab: (tab: AuthTab) => void;
}

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  function handleLanguageChange(nextLocale: string) {
    if (!pathname) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div className="container h-[calc(100vh-70px)] overflow-hidden relative">
      <div className="absolute top-4 right-14 z-50">
        <CustomSelect
          placeholder="UZ"
          defaultValue={locale}
          value={locale}
          options={OPTION_LANG}
          onValueChange={handleLanguageChange}
          disabled={isPending}
          className="w-17 md:w-18 h-9! rounded-lg"
        />
      </div>
      <div className="flex items-center justify-center min-h-screen overflow-hidden">
        <div className="w-full md:max-w-170 absolute lg:sticky mt-40 md:mt-40 bg-white lg:bg-transparent rounded-[24px] py-8 px-5 md:py-16 md:px-12">
          <LoginWrapper
            activeTab={activeTab}
            setActiveTab={setActiveTab as (tab: string) => void}
          />
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
