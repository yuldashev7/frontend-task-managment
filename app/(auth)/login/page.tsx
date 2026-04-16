import { Link } from 'next-view-transitions';

const LoginPage = () => {
  return (
    <div className="flex flex-col gap-1 justify-center items-center min-h-screen">
      <Link href="/admin/dashboard" className="text-primary font-medium">
        Admin Dashboard
      </Link>
      <Link href="/user/dashboard" className="text-primary font-medium">
        User Dashboard
      </Link>
    </div>
  );
};
export default LoginPage;
