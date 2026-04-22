import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { dialogT } from '@/features/components/types/types';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

const AdminProfileTab = dynamic(() => import('./admin-profile-tab'));

const AdminProfileEditDialog = ({ open, onClose }: dialogT) => {
  const t = useTranslations('admin_profile_locales');
  return (
    <div>
      <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
        <DialogTrigger asChild />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('edit_profile')}</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div>
            <AdminProfileTab />
          </div>
          <DialogFooter className="border-none bg-transparent" />
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AdminProfileEditDialog;
