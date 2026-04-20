'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AuthPageProps } from '@/features/components/types/types';
import { ArrowLeft, CheckIcon, LockKeyholeIcon, Mail } from 'lucide-react';
import LoginFormWrapper from './ui/forms/login-form';
import ForgotForm from './ui/forms/forgot-form';
import OtpForm from './ui/forms/otp-form';
import NewPasswordForm from './ui/forms/new-password-form';
import SuccessChangePassword from './ui/forms/success-change-password';
import { useTranslations } from 'next-intl';

const LoginWrapper = ({ activeTab, setActiveTab }: AuthPageProps) => {
  const t = useTranslations('login_locales');
  return (
    <div className="w-full max-w-120! mx-auto min-h-fit">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="hidden">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="forgot">Forgot</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <div className="mb-8 md:mb-12">
            <h1 className="text-(--text-title) font-semibold text-[24px] md:text-[32px] max-w-[320px] md:max-w-120 mx-auto text-start">
              {t('welcome')}
            </h1>
            <p className="text-primary text-[14px] mt-2 max-w-120 mx-auto text-start">
              {t('sign_in')}
            </p>
          </div>
          <LoginFormWrapper setActiveTab={setActiveTab} />
        </TabsContent>

        <TabsContent value="forgot">
          <button className="flex items-start justify-start -mt-34 md:-mt-20">
            <ArrowLeft
              onClick={() => setActiveTab('login')}
              className="stroke-primary/80 hover:stroke-primary transition duration-200"
            />
          </button>

          <p className="bg-primary/20 w-13.5 md:w-15 h-13.5 md:h-15 rounded-full flex items-center justify-center mt-34 md:mt-10 mb-6">
            <LockKeyholeIcon className="w-7 h-7 md:w-8 md:h-8 stroke-primary" />
          </p>

          <h2 className="text-(--text-title) font-semibold text-[24px] md:text-[32px] max-w-120 mx-auto text-start">
            {t('forgot_password')}
          </h2>
          <p className="text-primary text-[14px] max-w-120 mx-auto text-start mt-2">
            {t('enter_your_reset')}
          </p>
          <ForgotForm setActiveTab={setActiveTab} />
        </TabsContent>

        <TabsContent value="otp">
          <button className="flex items-start justify-start -mt-34 md:-mt-20">
            <ArrowLeft
              onClick={() => setActiveTab('forgot')}
              className="stroke-primary/80 hover:stroke-primary transition duration-200"
            />
          </button>

          <p className="bg-primary/20 w-13.5 h-13.5 md:w-15 md:h-15 rounded-full flex items-center justify-center mt-34 md:mt-10 mb-6">
            <Mail className="w-7 h-7 md:w-8 md:h-8 stroke-primary" />
          </p>

          <h2 className="text-(--text-title) font-semibold text-[24px] md:text-[32px] max-w-120 mx-auto text-start">
            {t('otp_verification')}
          </h2>
          <p className="text-primary text-[13px] md:text-[14px] max-w-120 mx-auto text-start ">
            {t('check_your_email_verification')}
          </p>
          <OtpForm setActiveTab={setActiveTab} />
        </TabsContent>

        <TabsContent value="new_password">
          <button className="flex items-start justify-start -mt-34 md:-mt-20">
            <ArrowLeft
              onClick={() => setActiveTab('otp')}
              className="stroke-primary/80 hover:stroke-primary transition duration-200"
            />
          </button>

          <p className="bg-primary/20 w-13.5 h-13.5 md:w-15 md:h-15 rounded-full flex items-center justify-center mt-34 md:mt-10 mb-6">
            <LockKeyholeIcon className="w-7 h-7 md:w-8 md:h-8 stroke-primary" />
          </p>

          <h2 className="text-(--text-title) font-semibold text-[24px] md:text-[32px] max-w-120 mx-auto text-start">
            {t('set_new_password')}
          </h2>
          <p className="text-primary text-[13px] md:text-[14px] max-w-120 mx-auto text-start ">
            {t('enter_your_new_password')}
          </p>
          <NewPasswordForm setActiveTab={setActiveTab} />
        </TabsContent>

        <TabsContent value="success">
          <p className="bg-[#17a31a] w-13.5 h-13.5 md:w-15 md:h-15 rounded-full flex items-center justify-center mt-14 md:mt-10 mb-6">
            <CheckIcon className="w-7 h-7 md:w-8 md:h-8 stroke-white" />
          </p>

          <h2 className="text-(--text-title) font-semibold text-[24px] md:text-[32px] max-w-100 text-start leading-[120%] mb-1">
            {t('secces_password_change')}
          </h2>
          <p className="text-primary text-[13px] md:text-[14px] max-w-120 mx-auto text-start ">
            {t('sign_in_new_password')}
          </p>
          <SuccessChangePassword setActiveTab={setActiveTab} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginWrapper;
