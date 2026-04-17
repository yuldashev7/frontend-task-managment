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

  const bgImage =
    activeTab === 'login'
      ? "bg-[url('/desktop-auth.png')]"
      : "bg-[url('/desktop-forgot.png')]";
  return (
    <div className="container">
      <div className="flex items-center justify-between max-w-[92%] mx-auto text-center">
        <div
          className={`${bgImage} bg-cover bg-center bg-no-repeat h-screen max-h-191 w-full max-w-151.5 flex flex-col items-center mx-auto`}
        >
          <h1 className="text-[46px] max-w-103.5 mx-auto pt-14 font-bold bg-linear-to-b from-white to-white/48 bg-clip-text text-transparent text-start">
            {activeTab === 'login'
              ? 'Master your workflow in one organized place.'
              : null}
          </h1>
          <p className="text-[14px] mt-auto font-semibold max-w-96 text-center mx-auto bg-linear-to-b pb-10 from-white to-white/48 bg-clip-text text-transparent">
            {activeTab === 'login'
              ? "Plan, track, and deliver your team's best work without the chaos."
              : null}
          </p>
        </div>
        <div className="w-full max-w-170">
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
