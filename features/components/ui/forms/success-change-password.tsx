import { LoginFormProps } from '@/app/[locale]/(auth)/login/page';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

const SuccessChangePassword = ({ setActiveTab }: LoginFormProps) => {
  const t = useTranslations('login_locales');
  return (
    <div>
      <Button
        onClick={() => setActiveTab('login')}
        type="submit"
        className="w-full mt-8 h-12 rounded-[100px] hover:bg-(--text-primary-hover) transition duration-200"
      >
        {t('Sign_In')}
      </Button>
    </div>
  );
};
export default SuccessChangePassword;
