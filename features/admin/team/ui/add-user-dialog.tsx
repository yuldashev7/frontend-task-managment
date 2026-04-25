import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { dialogT } from '@/features/components/types/types';

const AddUserForm = dynamic(() => import('./add-user-form'));

const AddUserDialog = ({ open, onClose }: dialogT) => {
  const t = useTranslations('admin_team_locale');
  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogTrigger asChild />
      <DialogContent className="max-w-120!">
        <DialogHeader>
          <DialogTitle>{t('add_new_user')}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="overflow-auto pr-1">
          <AddUserForm onClose={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AddUserDialog;
