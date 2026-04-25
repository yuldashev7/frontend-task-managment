import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

const ActiveUsersTabPage = dynamic(
  () => import('@/features/admin/team/components/active-tab-page')
);

const InActiveTabPage = dynamic(
  () => import('@/features/admin/team/components/in-active-tab-page')
);

const AdminTeamPage = () => {
  const t = useTranslations('admin_team_locale');
  return (
    <Tabs defaultValue="active_page">
      <TabsList className="flex items-center gap-4 h-11! bg-(--tab-bg)">
        <TabsTrigger
          value="active_page"
          className="flex items-center gap-2 data-[state=active]:bg-primary py-1.5 data-[state=active]:text-(--text-btn) px-4 hover:text-primary h-9"
        >
          {t('active_users')}
        </TabsTrigger>
        <TabsTrigger
          value="in_active_page"
          className="flex items-center gap-2 data-[state=active]:bg-primary py-1.5 data-[state=active]:text-(--text-btn) px-4 hover:text-primary h-9"
        >
          {t('in_active_users')}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="active_page">
        <div className="mt-2">
          <ActiveUsersTabPage />
        </div>
      </TabsContent>
      <TabsContent value="in_active_page">
        <div className="mt-2">
          <InActiveTabPage />
        </div>
      </TabsContent>
    </Tabs>
  );
};
export default AdminTeamPage;
