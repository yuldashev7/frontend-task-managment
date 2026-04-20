import { LoginFormProps } from '@/app/(auth)/login/page';
import { Button } from '@/components/ui/button';

const SuccessChangePassword = ({ setActiveTab }: LoginFormProps) => {
  return (
    <div>
      <Button
        onClick={() => setActiveTab('login')}
        type="submit"
        className="w-full mt-8 h-12 rounded-[100px] hover:bg-(--text-primary-hover) transition duration-200"
      >
        Sign in
      </Button>
    </div>
  );
};
export default SuccessChangePassword;
