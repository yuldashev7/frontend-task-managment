'use client';
import { LoginFormProps } from '@/app/(auth)/login/page';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const OtpForm = ({ setActiveTab }: LoginFormProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResent = async () => {
    if (!canResend || isResending) return;
    setIsResending(true);

    try {
      console.log('lorem');
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Verification code sent again!');
      setTimeLeft(60);
      setCanResend(false);
    } catch (error) {
      toast.error('Failed to resend code');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="mt-12 flex flex-col items-center">
      <InputOTP maxLength={6}>
        <InputOTPGroup className="rounded-full flex gap-5.5">
          {[0, 1, 2, 3, 4, 5].map((idx) => (
            <InputOTPSlot
              key={idx}
              index={idx}
              className="w-12 h-12 border border-primary rounded-full!"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>

      <Button
        onClick={() => setActiveTab('new_password')}
        type="submit"
        className="w-full mt-8 h-12 rounded-[100px] hover:bg-(--text-primary-hover) transition duration-200"
      >
        Verify
      </Button>

      <div className="flex items-center gap-1 mt-6 justify-center">
        <p className="text-[14px] text-(--text-color) font-medium">
          Didn’t receive the code?
        </p>
        {canResend ? (
          <button
            onClick={handleResent}
            disabled={isResending}
            className="text-primary font-medium text-[14px] hover:underline transition duration-100 hover:text-(--text-primary-hover)"
          >
            Resend code
          </button>
        ) : (
          <span className="text-primary font-medium text-[14px] w-12">
            00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
          </span>
        )}
      </div>
    </div>
  );
};
export default OtpForm;
