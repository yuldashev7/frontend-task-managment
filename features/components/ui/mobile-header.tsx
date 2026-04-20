'use client';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { drawerT } from '../types/types';
import { Divide, Layers2, XIcon } from 'lucide-react';
import { AdminNavItems } from '@/widgets/model/nav.config';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  return pathname === href || pathname.startsWith(href + '/');
}

const MobileHeader = ({ open, onClose }: drawerT) => {
  const pathName = usePathname();
  return (
    <div>
      <Drawer open={open} onClose={onClose} direction="left">
        <DrawerTrigger asChild />
        <DrawerContent className="border-none">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader className="mb-8">
              <DrawerTitle className="relative">
                <span className="text-(--text-title) text-center font-semibold cursor-pointer flex items-center gap-3 absolute left-0">
                  UI DASHBOARD
                </span>
                <XIcon
                  onClick={onClose}
                  className="stroke-(--text-title) absolute right-0 -mt-px"
                />
              </DrawerTitle>
              <DrawerDescription />
            </DrawerHeader>
            <div>
              {AdminNavItems.map((item) => {
                const active = isActive(pathName, item.href);
                return (
                  <div key={item.key}>
                    <Link
                      onClick={onClose}
                      href={item.href}
                      className={[
                        'flex items-center transition duration-300 pr-14 w-full text-[16px] gap-2 rounded-[15px] pl-5 h-12 text-sm',
                        active ? 'text-primary' : '',
                      ].join(' ')}
                    >
                      <span
                        className={`font-semibold text-sm transition duration-300 ${active ? 'text-(--title-color)' : 'text-(--text-color)'}`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </div>
                );
              })}
            </div>
            <DrawerFooter />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
export default MobileHeader;
