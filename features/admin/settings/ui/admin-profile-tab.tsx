import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import dynamic from 'next/dynamic';

const AdminProfileEdit = dynamic(() => import('./forms/admin-profile-edit'));
const AdminPasswordEdit = dynamic(() => import('./forms/admin-password-edit'));

const AdminProfileTab = () => {
  return (
    <div>
      <Tabs defaultValue="profile">
        <TabsList className="flex items-center w-full gap-4 h-9! bg-(--tab-bg)">
          <TabsTrigger
            value="profile"
            className="flex items-center gap-2 data-[state=active]:bg-primary py-1.5 data-[state=active]:text-(--text-btn) px-4 hover:text-primary h-7.5"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="flex items-center gap-2 data-[state=active]:bg-primary py-1.5 data-[state=active]:text-(--text-btn) px-4 hover:text-primary h-7.5"
          >
            Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div className="mt-2">
            <AdminProfileEdit />
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
