'use client';
import { usePathname, useRouter } from '@/app/config/navigation';
import { OPTION_LANG } from '@/features/components/header';
import { CustomSelect } from '@/features/components/ui/custom/custom-select';
import { useLocale, useTranslations } from 'next-intl';
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
  const t = useTranslations('login_locales');

  const bgImageDesktop =
    activeTab === 'login'
      ? "bg-[url('/mobile-auth.png')] md:bg-[url('/tablet-auth.png')] lg:bg-[url('/desktop-auth.png')]"
      : "bg-[url('/mobile-forgot.png')] md:bg-[url('/tablet-forgot.png')] lg:bg-[url('/desktop-forgot.png')]";

  function handleLanguageChange(nextLocale: string) {
    if (!pathname) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div className="container min-h-screen overflow-x-hidden relative">
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
      <div className="flex flex-col lg:flex-row items-center justify-between lg:max-w-[92%] mx-auto text-center relative">
        <div
          className={`${bgImageDesktop} bg-cover bg-center bg-no-repeat h-screen max-h-125 md:rounded-b-[120px] lg:rounded-0 lg:max-h-191 w-full lg:max-w-151.5 flex flex-col items-center mx-auto`}
        >
          <h1 className="hidden lg:block text-[40px] max-w-103.5 mx-auto pt-14 font-bold bg-linear-to-b from-white to-white/48 bg-clip-text text-transparent text-start">
            {activeTab === 'login' ? `${t('img_title')}` : null}
          </h1>
          <p className="hidden lg:block text-[14px] mt-auto font-semibold max-w-96 text-center mx-auto bg-linear-to-b pb-10 from-white to-white/48 bg-clip-text text-transparent">
            {activeTab === 'login' ? `${t('img_text')}` : null}
          </p>
        </div>
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
