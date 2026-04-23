import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { dialogT } from '@/features/components/types/types';
import { editProfileT } from '../types/types';

const AdminProfileTab = dynamic(() => import('./admin-profile-tab'));

const AdminProfileEditDialog = ({
  open,
  onClose,
  initialData,
}: dialogT & { initialData?: editProfileT }) => {
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
            <AdminProfileTab initialData={initialData} onClose={onClose} />
          </div>
          <DialogFooter className="border-none bg-transparent" />
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AdminProfileEditDialog;
