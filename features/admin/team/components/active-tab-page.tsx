'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import Image from 'next/image';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import AddUserDialog from '../ui/add-user-dialog';
import { Spinner } from '@/components/ui/spinner';
import { useGetUsers } from '../api/use-get-users';
import { useDeleteUser } from '../api/use-delete-user';
import { TeamTableSkeleton } from '../loading/team-table-skeleton';
import { useEditStatus } from '../api/use-edit-status';

const ActiveUsersTabPage = () => {
  const { data: userData, isLoading } = useGetUsers();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutate: deleteMutate, variables } = useDeleteUser();
  const { mutate: editStatus, variables: editVariables } = useEditStatus();
  const t = useTranslations('admin_team_locale');

  const handleDelete = (id: string | number) => {
    deleteMutate(id);
  };
  return (
    <div className="bg-(--card-bg) rounded-[12px]">
      <div className="pb-6 pt-4 pr-5 flex items-end justify-end">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-10 w-auto hover:bg-(--text-primary-hover) transition duration-200"
        >
          <Plus />
          <p>{t('add_user')}</p>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-(--text-color)/20 px-4 h-12!">
            <TableHead className="font-medium! px-4">№</TableHead>
            <TableHead className="font-medium! px-4">
              {t('full_name')}
            </TableHead>
            <TableHead className="font-medium! px-4">
              {t('phone_number')}
            </TableHead>
            <TableHead className="font-medium! px-4">{t('email')}</TableHead>
            <TableHead className="font-medium! px-4">
              {t('profession')}
            </TableHead>
            <TableHead className="font-medium! px-4">{t('action')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TeamTableSkeleton rowCount={5} />
          ) : (
            userData?.map((item, index) => (
              <TableRow
                key={item.id}
                className="border-b border-(--text-color)/40"
              >
                <TableCell className="p-4">{index + 1}</TableCell>
                <TableCell className="p-4">
                  <div className="flex items-center gap-1">
                    <Image
                      src={item.avatar || '/no-image.png'}
                      alt="user-img"
                      width={50}
                      height={50}
                      unoptimized={true}
                      className="rounded-full w-8 h-8 object-cover"
                    />
                    <div className="flex item gap-1">
                      <p>{item.last_name}</p>
                      <p>{item.first_name}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="p-4">+998{item.phone_number}</TableCell>
                <TableCell className="p-4">{item.email}</TableCell>
                <TableCell className="p-4">{item.profession}</TableCell>
                <TableCell className="p-4">
                  <div className="flex items-center gap-4">
                    <Select
                      disabled={editVariables?.id === item.id}
                      value={item.is_active ? 'is_active' : 'in_active'}
                      onValueChange={(value) => {
                        editStatus({
                          id: item.id,
                          isActive: value === 'is_active',
                        });
                      }}
                    >
                      <SelectTrigger
                        className={`w-full max-w-30 transition-all duration-200 border-2! ${
                          item.is_active
                            ? 'border-green-500! text-green-500! bg-green-50/10'
                            : 'border-red-500! text-red-500! bg-red-50/10'
                        } [&>svg]:stroke-current! [&>svg]:opacity-100!`}
                      >
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>

                      <SelectContent
                        side="bottom"
                        position="popper"
                        align="center"
                        className="min-w-30"
                      >
                        <SelectGroup>
                          <SelectItem
                            value="is_active"
                            className="text-green-500! focus:text-green-500! focus:bg-transparent! cursor-pointer data-[state=checked]:text-green-500!"
                          >
                            {t('is_active')}
                          </SelectItem>
                          <SelectItem
                            value="in_active"
                            className="text-red-500! focus:text-red-500! focus:bg-transparent! cursor-pointer data-[state=checked]:text-red-500!"
                          >
                            {t('in_active')}
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <Button
                      onClick={() => handleDelete(item.id)}
                      disabled={variables === item.id}
                      className="bg-destructive hover:bg-destructive/80"
                    >
                      {variables === item.id ? (
                        <Spinner />
                      ) : (
                        <p>{t('delete')}</p>
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <AddUserDialog open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
export default ActiveUsersTabPage;
