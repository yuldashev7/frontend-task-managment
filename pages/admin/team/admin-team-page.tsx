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
import { useGetUsers } from '@/features/admin/team/api/use-get-users';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const AdminTeamPage = () => {
  const { data: userData, isLoading } = useGetUsers();

  return (
    <div className="bg-(--card-bg) rounded-[12px]">
      <div className="pb-6 pt-4 pr-5 flex items-end justify-end">
        <Button className="h-10 w-30 hover:bg-(--text-primary-hover) transition duration-200">
          <Plus />
          <p>Add User</p>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-(--text-color)/20 px-4 h-12!">
            <TableHead className="font-medium! px-4">ID</TableHead>
            <TableHead className="font-medium! px-4">First Name</TableHead>
            <TableHead className="font-medium! px-4">Phone Number</TableHead>
            <TableHead className="font-medium! px-4">Email</TableHead>
            <TableHead className="font-medium! px-4">Profession</TableHead>
            <TableHead className="font-medium! px-4">Is Active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData?.map((item, index) => (
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
                <div>
                  <Select
                    defaultValue={item.is_active ? 'is_active' : 'in_active'}
                    onValueChange={(value) => {
                      console.log(value);
                    }}
                  >
                    <SelectTrigger
                      className={`w-full max-w-30 transition-colors border ${item.is_active ? 'text-green-500 border-green-500 focus:ring-green-500' : 'text-red-500 border-red-500 focus:ring-red-500'} [&>svg]:stroke-current [&>svg]:opacity-100`}
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
                          Is Active
                        </SelectItem>
                        <SelectItem
                          value="in_active"
                          className="text-red-500! focus:text-red-500! focus:bg-transparent! cursor-pointer data-[state=checked]:text-red-500!"
                        >
                          In Active
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default AdminTeamPage;
