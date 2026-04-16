'use client';
import { usePathname } from 'next/navigation';
import { AdminNavItems } from '../model/nav.config';
import Link from 'next/link';
import { Layers2 } from 'lucide-react';

function isActive(pathname: string | null, href: String) {
  if (!pathname) return false;
  return pathname === href || pathname.startsWith(href + '/');
}

const AdminSidebar = () => {
  const pathName = usePathname();
  return (
    <aside style={{ scrollbarWidth: 'none' }} className="w-full h-full pb-5">
      <nav className="h-full flex flex-col justify-between">
        <div
          style={{ scrollbarWidth: 'none' }}
          className="flex-1 overflow-y-auto px-1 mt-8"
        >
          <span className="text-(--text-title) text-center font-semibold cursor-pointer flex items-center gap-3">
            <Layers2 />
            PURITY UI DASHBOARD
          </span>
          <p className="h-px w-full bg-(image:--border-top-color) my-8" />

          <ul className="space-y-2">
            {AdminNavItems.map((item) => {
              const active = isActive(pathName, item.href);
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className={[
                      'flex items-center duration-300 pr-14 w-full text-[16px] gap-2 rounded-[15px] pl-5 h-12 text-sm',
                      active ? 'bg-white' : '',
                    ].join(' ')}
                  >
                    <span
                      className={`p-1.5 rounded-[11px] flex items-center justify-center ${active ? 'bg-primary' : 'bg-white'}`}
                    >
                      <item.icon
                        className={`${active ? 'stroke-white' : 'stroke-primary'} duration-300 h-5 w-5`}
                      />
                    </span>
                    <span
                      className={`font-semibold text-sm ${active ? 'text-(--title-color)' : 'text-(--text-color)'}`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </aside>
  );
};
export default AdminSidebar;
