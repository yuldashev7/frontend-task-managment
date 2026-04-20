'use client';
import { LoginFormProps } from '@/app/[locale]/(auth)/login/page';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Spinner } from '@/components/ui/spinner';
import { useForgotPassword } from '@/features/auth/api/use-forgot-password';
import { useVerifyOtp } from '@/features/auth/api/use-verify-otp';
import { useOtpSchema } from '@/features/auth/schema/otp-schema';
import { otpCodeT } from '@/features/auth/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const OtpForm = ({ setActiveTab }: LoginFormProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [displayOtp, setDisplayOtp] = useState<string | null>(null);
  const schema = useOtpSchema()

  const { mutate: forgotMutate, isPending } = useForgotPassword();
  const { mutate: verifyMutate, isPending: verifyPending } = useVerifyOtp();
  const t = useTranslations('login_locales');

  type OtpFormValue = z.infer<typeof schema>;

  const form = useForm<OtpFormValue>({
    resolver: zodResolver(schema),
    defaultValues: {
      otp_code: '',
    },
  });

  useEffect(() => {
    const savedOtp = localStorage.getItem('temp_otp');
    if (savedOtp) setDisplayOtp(savedOtp);

    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const onSubmit = (data: OtpFormValue) => {
    const userEmail = localStorage.getItem('reset_email') || '';

    verifyMutate(
      {
        email: userEmail,
        code: data.otp_code,
      },
      {
        onSuccess: () => {
          localStorage.setItem('reset_code', data.otp_code);
          setActiveTab('new_password');
        },
        onError: (err: any) => {
          form.setError('otp_code', {
            type: 'manual',
            message:
              err.response?.data?.code?.[0] ||
              'Invalid OTP. Please enter a valid OTP',
          });
        },
      }
    );
  };

  const handleResent = async () => {
    if (!canResend || isPending) return;

    const userEmail = localStorage.getItem('reset_email') || '';

    forgotMutate(
      { email: userEmail },
      {
        onSuccess: (data: otpCodeT) => {
          setCanResend(false);
          setTimeLeft(60);
          const newOtp = data.code;

          if (newOtp) {
            localStorage.setItem('temp_otp', String(newOtp));
            setDisplayOtp(String(newOtp));
          }
        },
        onError: () => {
          toast.error('Kod yuborishda xatolik yuz berdi');
        },
      }
    );
  };

  return (
    <div className="mt-8 md:mt-12 flex flex-col items-center">
      {displayOtp && (
        <div className="mb-6 p-2 md:p-3 bg-primary/5 border border-primary/20 rounded-xl w-full text-center">
          <p className="text-[14px] text-(--text-color) font-medium">
            {t('otp_code')}
            <span className="text-primary font-bold ml-2 tracking-[4px] text-2x; md:text-lg">
              {displayOtp}
            </span>
          </p>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center"
        >
          <FormField
            control={form.control}
            name="otp_code"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col items-center">
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="rounded-full flex gap-1.5 md:gap-5.5">
                      {[0, 1, 2, 3, 4, 5].map((idx) => (
                        <InputOTPSlot
                          key={idx}
                          index={idx}
                          className={`w-12 h-12 border border-primary rounded-full! ${fieldState.error && 'data-[active=true]:border-destructive! border-destructive data-[active=true]:ring-1! data-[active=true]:ring-destructive!'}`}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                {fieldState.error && (
                  <div className="flex items-center w-full gap-1 text-start!">
                    <p>
                      <AlertCircle className="fill-destructive stroke-white w-3.75 h-3.75" />
                    </p>
                    <FormMessage className="text-[12px] text-start" />
                  </div>
                )}
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isPending}
            className="w-full mt-8 h-12 rounded-[100px] hover:bg-(--text-primary-hover) transition duration-200"
          >
            {verifyPending ? <Spinner /> : `${t('verify')}`}
          </Button>
        </form>
      </Form>

      <div className="flex items-center gap-1 mt-6 justify-center">
        <p className="text-[14px] text-(--text-color) font-medium">
          {t('didnt_recived_code')}
        </p>
        {canResend ? (
          <button
            onClick={handleResent}
            disabled={isPending}
            className="text-primary font-medium text-[14px] hover:underline transition duration-100 hover:text-(--text-primary-hover)"
          >
            {t('resend_code')}
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
