'use client';

import { CustomInput } from './ui/custom/custom-input';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { BellIcon, CircleQuestionMark, Menu, Search } from 'lucide-react';
import { CustomSelect } from './ui/custom/custom-select';
import { useState } from 'react';
import MobileHeader from './ui/mobile-header';

const OPTION_LANG = [
  {
    id: 1,
    label: 'UZ',
    value: 'uz',
  },
  {
    id: 2,
    label: 'RU',
    value: 'ru',
  },
  {
    id: 3,
    label: 'EN',
    value: 'en',
  },
];

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getTitle = (path: string | null) => {
    if (!path || path === '/admin/dashboard') return 'Dashboard';
    if (path.startsWith('/admin/team')) return 'Team';
    if (path.startsWith('/admin/projects')) return 'Projects';
    if (path.startsWith('/admin/chat')) return 'Chat';
    if (path.startsWith('/admin/kanban')) return 'Kanban';
    if (path.startsWith('/admin/settings')) return 'Settings';
    return 'Admin';
  };

  const currentTitle = getTitle(pathname);

  return (
    <div className="bg-white/90 w-full px-2 md:px-4 py-4">
      <div className="flex items-center justify-between">
        {/* left */}
        <div className="flex items-center gap-2 md:gap-6">
          <h1 className="font-medium text-[24px] hidden lg:block">
            {currentTitle}
          </h1>

          <Button
            onClick={() => setIsOpen(true)}
            className="w-10 h-10 hover:bg-(--text-primary-hover) transition duration-200 lg:hidden"
          >
            <Menu className="w-4! h-4! md:w-5! md:h-5!" />
          </Button>

          <label className="relative">
            <Search className="w-4 h-4 md:w-5 md:h-5 stroke-(--text-color) absolute top-1/2 -translate-1/2 left-4 cursor-text" />
            <CustomInput
              placeholder="Type here..."
              className="placeholder:text-[12px] md:text-[13px] placeholder:text-(--text-color) pl-7 md:pl-8 h-9 text-[13px]"
            />
          </label>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <Button className="w-10 h-10 hover:bg-(--text-primary-hover) transition duration-200 hidden md:block">
            <CircleQuestionMark className="w-4! h-4! md:w-5! md:h-5!" />
          </Button>

          <Button className="w-10 h-10 hover:bg-(--text-primary-hover) transition duration-200 ml-2 md:ml-0">
            <BellIcon className="w-4! h-4! md:w-5! md:h-5!" />
          </Button>

          <div>
            <CustomSelect
              placeholder="UZ"
              defaultValue="uz"
              options={OPTION_LANG}
              className="w-17 md:w-18 h-10! rounded-lg"
            />
          </div>
        </div>
      </div>
      <MobileHeader open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
export default Header;
