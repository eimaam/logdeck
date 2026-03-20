import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Layout, 
  Menu, 
  ConfigProvider, 
  theme as AntdTheme 
} from 'antd';
import type { MenuProps } from 'antd';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Zap, 
  BarChart3, 
  Settings, 
  FileText, 
  LifeBuoy, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Logo } from '@logdeck/shared';
import { cn } from '@/lib/utils';
import ConfirmationModal from './ConfirmationModal';
import { useAuthActions } from '../features/auth/hooks/useAuth';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { logout } = useAuthActions();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    setIsLogoutModalOpen(false);
    navigate('/auth');
  };

  const mainItems: MenuItem[] = [
    getItem('Overview', '/', <LayoutDashboard size={20} />),
    getItem('Projects', '/projects', <FolderOpen size={20} />),
    getItem('Events', '/events', <Zap size={20} />),
    getItem('Analytics', '/analytics', <BarChart3 size={20} />),
    getItem('Settings', '/settings', <Settings size={20} />),
  ];

  const footerItems: MenuItem[] = [
    getItem('Docs', '/docs', <FileText size={20} />),
    getItem('Support', '/support', <LifeBuoy size={20} />),
  ];

  const onMenuClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: AntdTheme.darkAlgorithm,
        token: {
          colorBgContainer: 'var(--color-bg-base)',
          colorBorderSecondary: 'var(--color-border-muted)',
          borderRadius: 12,
        },
        components: {
          Menu: {
            itemBg: 'transparent',
            itemColor: 'var(--color-text-muted)',
            itemSelectedColor: 'var(--color-brand-primary)',
            itemSelectedBg: 'var(--color-bg-surface)',
            itemHoverBg: 'rgba(255, 255, 255, 0.05)',
            itemActiveBg: 'var(--color-bg-surface)',
            itemHoverColor: 'var(--color-text-primary)',
          },
        },
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={260}
        collapsedWidth={80}
        className="h-screen sticky left-0 top-0 border-r border-border-muted bg-bg-base! z-50 flex flex-col"
        trigger={
          <div className="flex bg-bg-base items-center justify-center h-12 border-t border-border-muted hover:text-brand-primary transition-colors">
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </div>
        }
      >
        <div className="flex flex-col h-full py-6">
          {/* Header/Logo */}
          <div className={cn("px-6 mb-8 flex items-center overflow-hidden transition-all duration-300", collapsed ? "justify-center px-0" : "justify-start")}>
            <Logo className="h-8 min-w-[32px]" withTitle={!collapsed} />
          </div>

          {/* Main Navigation */}
          <div className="flex-1 px-1 overflow-y-auto no-scrollbar">
            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
              items={mainItems}
              onClick={onMenuClick}
              className="border-none! font-code!"
            />
          </div>

          {/* Footer Navigation */}
          <div className={cn("px-1 pt-4 mt-4 border-t border-border-muted flex flex-col gap-1 transition-all duration-300", collapsed ? "items-center" : "")}>
            <Menu
              mode="inline"
              selectable={false}
              items={footerItems}
              onClick={onMenuClick}
              className="border-none! font-code!"
            />
            
            {/* Logout Button */}
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className={cn(
                "flex items-center gap-3 pl-7 pr-3 py-2.5 rounded-lg text-state-error/80 hover:text-state-error hover:bg-state-error-bg/30 transition-all duration-200 text-sm font-medium mt-2 w-full text-left",
                collapsed ? "justify-center px-0 w-10 mx-auto" : ""
              )}
              title={collapsed ? "Sign Out" : ""}
            >
              <LogOut size={20} className={collapsed ? "" : "min-w-[20px]"} />
              {!collapsed && <span>Sign Out</span>}
            </button>
          </div>
        </div>
      </Sider>

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        icon={LogOut}
        title="Confirm Sign Out"
        notes="Are you sure you want to sign out of your account? You will need to login again to access your dashboard."
        okText="Sign Out"
        cancelText="Cancel"
        handleOk={handleLogout}
        handleCancel={() => setIsLogoutModalOpen(false)}
        className="text-state-error"
      />
      
      <style dangerouslySetInnerHTML={{ __html: `
        .ant-layout-sider-children {
          display: flex;
          flex-direction: column;
        }
        .ant-menu-item {
          margin-bottom: 4px !important;
          height: 44px !important;
          line-height: 44px !important;
        }
        .ant-menu-inline-collapsed .ant-menu-item {
          padding-inline: calc(50% - 10px) !important;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </ConfigProvider>
  );
};

export default Sidebar;
