import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import { FadeIn } from '@logdeck/shared';

const { Content } = Layout;

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  
  // Map routes to display titles
  const routeTitles: Record<string, string> = {
    '/': 'Overview',
    '/projects': 'Projects',
    '/events': 'Events Flow',
    '/analytics': 'Advanced Analytics',
    '/settings': 'System Settings',
  };

  const title = routeTitles[location.pathname] || 'Overview';

  return (
    <Layout className="min-h-screen bg-bg-base transition-colors duration-500 overflow-hidden">
      <Sidebar />

      {/* main content */}
      <Layout className="flex flex-col min-w-0 h-screen bg-bg-base">
        <DashboardHeader title={title} />
        
        {/* scrollable page content */}
        <Content className="flex-1 overflow-y-auto overflow-x-hidden p-8">
          <FadeIn key={location.pathname} duration={0.4}>
            <Outlet />
          </FadeIn>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
