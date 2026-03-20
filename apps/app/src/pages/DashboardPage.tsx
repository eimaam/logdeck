import React, { useState } from 'react';
import { Button, StatCard } from '@logdeck/shared';
import EventsVolumeChart from '../components/EventsVolumeChart';
import ErrorRateChart from '../components/ErrorRateChart';
import RecentAlerts from '../components/RecentAlerts';
import { 
  statData, 
  eventsVolumeData, 
  errorRateData, 
  recentAlertsData 
} from '../data/dashboard-mock';
import { RefreshCw, Plus } from 'lucide-react';
import { cn } from '../lib/utils';

const DashboardPage: React.FC = () => {


  const [isAutoRefreshing, setIsAutoRefreshing] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  

  return (
    <div className="flex flex-col gap-8 max-w-[1600px] mx-auto">
      {/* Page Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-display font-bold text-text-primary tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-sm text-text-muted max-w-md">
            Monitor your application health in real-time.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {
            isAutoRefreshing && (
              <div className="hidden lg:flex items-center gap-2 mr-2 px-3 py-1.5 rounded-lg bg-bg-surface/30 border border-border-muted text-[11px] font-medium text-text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                Auto-refreshing
              </div>
            )
          }
          
          <Button variant="secondary" disabled={isRefreshing} icon={<RefreshCw size={16} className="text-text-muted" />}>
            Refresh
          </Button>
          
          <Button>
            <Plus size={18} />
            New Alert
          </Button>
        </div>
      </div>

      {/* stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statData?.map((stat, i) => (
          <StatCard 
            key={stat.title} 
            {...stat as any} 
            className={cn(
              "animate-in fade-in slide-in-from-bottom-4 duration-500",
              `fill-mode-both`
            )}
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 min-w-0">
          <EventsVolumeChart data={eventsVolumeData} />
        </div>
        <div className="lg:col-span-2 min-w-0">
          <ErrorRateChart data={errorRateData} />
        </div>
      </div>

      {/* Activity / Tables Section */}
      <RecentAlerts data={recentAlertsData} />
    </div>
  );
};

export default DashboardPage;
