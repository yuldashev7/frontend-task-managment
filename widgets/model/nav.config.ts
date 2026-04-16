import ChatIcon from '@/icons/sidebar/chat';
import DashboardIcon from '@/icons/sidebar/dashboard';
import FeedbackIcon from '@/icons/sidebar/feedback';
import ProfileIcon from '@/icons/sidebar/profile';
import ProjectsIcon from '@/icons/sidebar/projects';
import TeamIcon from '@/icons/sidebar/team';
import { KanbanIcon } from 'lucide-react';

interface NavConfigProps {
  key: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
}

export const AdminNavItems: NavConfigProps[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: DashboardIcon,
  },
  {
    key: 'team',
    label: 'Team',
    href: '/admin/team',
    icon: TeamIcon,
  },
  {
    key: 'projects',
    label: 'Projects',
    href: '/admin/projects',
    icon: ProjectsIcon,
  },
  {
    key: 'chat',
    label: 'Chat',
    href: '/admin/chat',
    icon: ChatIcon,
  },
  {
    key: 'kanban',
    label: 'Kanban',
    href: '/admin/kanban',
    icon: KanbanIcon,
  },
  //   {
  //     key: 'settings',
  //     label: 'Settings',
  //     href: '/admin/settings',
  //     icon: KanbanIcon,
  //   },
];

export const UserNavItems: NavConfigProps[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    href: '/user/dashboard',
    icon: DashboardIcon,
  },
  {
    key: 'projects',
    label: 'Projects',
    href: '/user/projects',
    icon: ProjectsIcon,
  },
  {
    key: 'chat',
    label: 'Chat',
    href: '/user/chat',
    icon: ProjectsIcon,
  },
  {
    key: 'kanban',
    label: 'Kanban',
    href: '/user/kanban',
    icon: KanbanIcon,
  },
  {
    key: 'feedback',
    label: 'Feedback',
    href: '/user/feedback',
    icon: FeedbackIcon,
  },
  {
    key: 'profile',
    label: 'Profile',
    href: '/user/profile',
    icon: ProfileIcon,
  },
];
