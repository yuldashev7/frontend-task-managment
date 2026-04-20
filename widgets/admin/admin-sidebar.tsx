'use client';
import { AdminNavItems } from '../model/nav.config';
import { Layers2 } from 'lucide-react';
import { Link } from 'next-view-transitions';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/app/config/navigation';

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  return pathname === href || pathname.startsWith(href + '/');
}

const AdminSidebar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const t = useTranslations('sidebar_locales');
  return (
    <aside
      style={{ scrollbarWidth: 'none' }}
      className="w-full pb-5 bg-white/90 h-screen px-2 hidden lg:block"
    >
      <nav className="h-full flex flex-col justify-between">
        <div
          style={{ scrollbarWidth: 'none' }}
          className="flex-1 overflow-y-auto px-1 mt-5.5"
        >
          <span
            onClick={() => router.push('/admin/dashboard')}
            className="text-(--text-title) pl-4 text-center font-semibold cursor-pointer flex items-center gap-3"
          >
            <Layers2 />
            UI DASHBOARD
          </span>
          <p className="h-px w-full bg-(image:--border-top-color) mt-6.5 mb-8" />

          <ul className="space-y-2">
            {AdminNavItems.map((item) => {
              const active = isActive(pathName, item.href);
              return (
                <li key={item.key}>
                  {item.id !== 7 && (
                    <Link
                      href={item.href}
                      className={[
                        'flex items-center transition duration-300 pr-14 w-full text-[16px] gap-2 rounded-[15px] pl-5 h-12 text-sm',
                        active ? 'bg-gray-100' : '',
                      ].join(' ')}
                    >
                      <span
                        className={`p-1.5 rounded-[11px] transition duration-300 flex items-center justify-center ${active ? 'bg-primary' : 'bg-background'}`}
                      >
                        <item.icon
                          className={`${active ? 'stroke-white' : 'stroke-primary'} duration-300 h-5 w-5`}
                        />
                      </span>
                      <span
                        className={`font-semibold text-sm transition duration-300 ${active ? 'text-(--title-color)' : 'text-(--text-color)'}`}
                      >
                        {t(item.label)}
                      </span>
                    </Link>
                  )}
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
