import ChatIcon from '@/icons/sidebar/chat';
import DashboardIcon from '@/icons/sidebar/dashboard';
import FeedbackIcon from '@/icons/sidebar/feedback';
import ProfileIcon from '@/icons/sidebar/profile';
import ProjectsIcon from '@/icons/sidebar/projects';
import SettingsIcon from '@/icons/sidebar/settings';
import TeamIcon from '@/icons/sidebar/team';
import { KanbanIcon } from 'lucide-react';

interface NavConfigProps {
  id: number;
  key: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
}

export const AdminNavItems: NavConfigProps[] = [
  {
    id: 1,
    key: 'dashboard',
    label: 'dashboard',
    href: '/admin/dashboard',
    icon: DashboardIcon,
  },
  {
    id: 2,
    key: 'team',
    label: 'team',
    href: '/admin/team',
    icon: TeamIcon,
  },
  {
    id: 3,
    key: 'projects',
    label: 'projects',
    href: '/admin/projects',
    icon: ProjectsIcon,
  },
  {
    id: 4,
    key: 'chat',
    label: 'chat',
    href: '/admin/chat',
    icon: ChatIcon,
  },
  {
    id: 5,
    key: 'kanban',
    label: 'kanban',
    href: '/admin/kanban',
    icon: KanbanIcon,
  },
  {
    id: 6,
    key: 'settings',
    label: 'settings',
    href: '/admin/settings',
    icon: SettingsIcon,
  },
  {
    id: 7,
    key: 'documents',
    label: 'documents',
    href: '/admin/documents',
    icon: SettingsIcon,
  },
];

export const UserNavItems: NavConfigProps[] = [
  {
    id: 1,
    key: 'dashboard',
    label: 'dashboard',
    href: '/user/dashboard',
    icon: DashboardIcon,
  },
  {
    id: 2,
    key: 'projects',
    label: 'projects',
    href: '/user/projects',
    icon: ProjectsIcon,
  },
  {
    id: 3,
    key: 'chat',
    label: 'chat',
    href: '/user/chat',
    icon: ProjectsIcon,
  },
  {
    id: 4,
    key: 'kanban',
    label: 'kanban',
    href: '/user/kanban',
    icon: KanbanIcon,
  },
  {
    id: 5,
    key: 'feedback',
    label: 'feedback',
    href: '/user/feedback',
    icon: FeedbackIcon,
  },
  {
    id: 6,
    key: 'profile',
    label: 'profile',
    href: '/user/profile',
    icon: ProfileIcon,
  },
];
