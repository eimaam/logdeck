import React from 'react';
import { Bell, Search, LogOut, Settings, User } from 'lucide-react';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import UserAvatar from './ui/UserAvatar';
import { useAuthActions, useUser } from '../features/auth/hooks/useAuth';

export interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => {
  const user = useUser();
  const { logout } = useAuthActions();

  const profileMenuItems: MenuProps['items'] = [
    {
      key: '1',
      label: 'My Profile',
      icon: <User size={16} />,
    },
    {
      key: '2',
      label: 'Account Settings',
      icon: <Settings size={16} />,
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      label: <span className="text-state-error">Sign Out</span>,
      icon: <LogOut size={16} className="text-state-error" />,
      onClick: () => logout(),
    },
  ];

  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-border-muted bg-bg-base/60 backdrop-blur-md sticky top-0 z-40">
      {/* breadcrumbs.../page title */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-text-muted hover:text-text-primary transition-colors cursor-pointer font-medium font-display">
          Production API
        </span>
        <span className="text-text-disabled">/</span>
        <span className="text-text-primary font-semibold font-display tracking-wide">
          {title}
        </span>
      </div>

      <div className="flex items-center gap-6">
        <Dropdown 
          menu={{ items: profileMenuItems }} 
          trigger={['click', 'hover']}
          placement="bottomRight"
          overlayClassName="logdeck-dropdown"
          className='bg-elevated!'
        >
          <button className="flex items-center p-0.5 rounded-full hover:ring-2 hover:ring-brand-primary/20 transition-all duration-300 active:scale-95 group">
            <UserAvatar user={user as any} showOnlineStatus />
          </button>
        </Dropdown>
      </div>
    </header>
  );
};

export default DashboardHeader;
