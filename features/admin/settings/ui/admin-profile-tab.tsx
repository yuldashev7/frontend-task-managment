import dynamic from 'next/dynamic';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { editProfileT } from '../types/types';
import { useTranslations } from 'next-intl';

const AdminProfileEdit = dynamic(() => import('./forms/admin-profile-edit'));
const AdminPasswordEdit = dynamic(() => import('./forms/admin-password-edit'));

const AdminProfileTab = ({
  initialData,
  onClose,
}: {
  initialData?: editProfileT;
  onClose: () => void;
}) => {
  const t = useTranslations('sidebar_locales');
  return (
    <div>
      <Tabs defaultValue="profile">
        <TabsList className="flex items-center w-full gap-4 h-9! bg-(--tab-bg)">
          <TabsTrigger
            value="profile"
            className="flex items-center gap-2 data-[state=active]:bg-primary py-1.5 data-[state=active]:text-(--text-btn) px-4 hover:text-primary h-7.5"
          >
            {t('profile')}
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="flex items-center gap-2 data-[state=active]:bg-primary py-1.5 data-[state=active]:text-(--text-btn) px-4 hover:text-primary h-7.5"
          >
            {t('password')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div className="mt-2">
            <AdminProfileEdit initialData={initialData} onClose={onClose} />
          </div>
        </TabsContent>
        <TabsContent value="password">
          <div className="mt-2">
            <AdminPasswordEdit />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default AdminProfileTab;
