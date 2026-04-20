'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';

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

  const bgImageDesktop =
    activeTab === 'login'
      ? "bg-[url('/mobile-auth.png')] md:bg-[url('/tablet-auth.png')] lg:bg-[url('/desktop-auth.png')]"
      : "bg-[url('/mobile-forgot.png')] md:bg-[url('/tablet-forgot.png')] lg:bg-[url('/desktop-forgot.png')]";

  return (
    <div className="container min-h-screen overflow-x-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between lg:max-w-[92%] mx-auto text-center relative">
        <div
          className={`${bgImageDesktop} bg-cover bg-center bg-no-repeat h-screen max-h-125 md:rounded-b-[120px] lg:rounded-0 lg:max-h-191 w-full lg:max-w-151.5 flex flex-col items-center mx-auto`}
        >
          <h1 className="hidden lg:block text-[46px] max-w-103.5 mx-auto pt-14 font-bold bg-linear-to-b from-white to-white/48 bg-clip-text text-transparent text-start">
            {activeTab === 'login'
              ? 'Master your workflow in one organized place.'
              : null}
          </h1>
          <p className="hidden lg:block text-[14px] mt-auto font-semibold max-w-96 text-center mx-auto bg-linear-to-b pb-10 from-white to-white/48 bg-clip-text text-transparent">
            {activeTab === 'login'
              ? "Plan, track, and deliver your team's best work without the chaos."
              : null}
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
