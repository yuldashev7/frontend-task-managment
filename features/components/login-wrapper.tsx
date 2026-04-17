'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AuthPageProps } from '@/features/components/types/types';
import { ArrowLeft, LockKeyholeIcon, Mail } from 'lucide-react';
import LoginFormWrapper from './ui/forms/login-form';
import ForgotForm from './ui/forms/forgot-form';
import OtpForm from './ui/forms/otp-form';

const LoginWrapper = ({ activeTab, setActiveTab }: AuthPageProps) => {
  return (
    <div className="w-full max-w-120! mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="hidden">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="forgot">Forgot</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <div className="mb-12">
            <h1 className="text-(--text-title) font-semibold text-[32px] max-w-120 mx-auto text-start">
              Welcome Back
            </h1>
            <p className="text-primary text-[14px] font-medium mt-2 max-w-120 mx-auto text-start">
              Sign in to your account
            </p>
          </div>
          <LoginFormWrapper setActiveTab={setActiveTab} />
        </TabsContent>

        <TabsContent value="forgot">
          <button className="flex items-start justify-start -mt-20">
            <ArrowLeft
              onClick={() => setActiveTab('login')}
              className="stroke-primary/80 hover:stroke-primary transition duration-200"
            />
          </button>

          <p className="bg-primary/20 w-15 h-15 rounded-full flex items-center justify-center mt-10 mb-6">
            <LockKeyholeIcon className="w-8 h-8 stroke-primary" />
          </p>

          <h2 className="text-(--text-title) font-semibold text-[32px] max-w-120 mx-auto text-start">
            Forgot Password?
          </h2>
          <p className="text-primary text-[14px] font-medium max-w-120 mx-auto text-start mt-2">
            Enter your email to reset your password
          </p>
          <ForgotForm setActiveTab={setActiveTab} />
        </TabsContent>

        <TabsContent value="otp">
          <button className="flex items-start justify-start -mt-20">
            <ArrowLeft
              onClick={() => setActiveTab('forgot')}
              className="stroke-primary/80 hover:stroke-primary transition duration-200"
            />
          </button>

          <p className="bg-primary/20 w-15 h-15 rounded-full flex items-center justify-center mt-10 mb-6">
            <Mail className="w-8 h-8 stroke-primary" />
          </p>

          <h2 className="text-(--text-title) font-semibold text-[32px] max-w-120 mx-auto text-start">
            OTP Verification
          </h2>
          <p className="text-primary text-[14px] font-medium max-w-120 mx-auto text-start ">
            Check your email to see the verification code
          </p>
          <OtpForm setActiveTab={setActiveTab} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginWrapper;
