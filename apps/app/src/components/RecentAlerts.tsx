import React from 'react';
import { Table, Badge, StatusTypeEnum } from '@logdeck/shared';
import { ChevronRight } from 'lucide-react';
import type { ColumnsType } from 'antd/es/table';

interface AlertRecord {
  key: string;
  status: StatusTypeEnum;
  eventName: string;
  error: string;
  project: string;
  time: string;
}

interface RecentAlertsProps {
  data: AlertRecord[];
}

const RecentAlerts: React.FC<RecentAlertsProps> = ({ data }) => {
  const columns: ColumnsType<AlertRecord> = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: StatusTypeEnum) => (
        <Badge variant={status}>
          {status.toUpperCase()}
        </Badge>
      ),
      width: 120,
    },
    {
      title: 'Event Name',
      dataIndex: 'eventName',
      key: 'eventName',
      render: (text: string, record: AlertRecord) => (
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-text-primary">{text}</span>
          <span className="text-xs text-text-muted font-mono">{record.error}</span>
        </div>
      ),
    },
    {
      title: 'Project',
      dataIndex: 'project',
      key: 'project',
      className: 'text-text-secondary text-sm',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      className: 'text-text-muted text-xs',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'right',
      render: () => (
        <button className="p-1 rounded-lg hover:bg-bg-surface-active text-text-disabled hover:text-text-primary transition-all">
          <ChevronRight size={18} />
        </button>
      ),
      width: 80,
    },
  ];

  return (
    <div className="mt-8 flex flex-col gap-4">
      <div className="flex items-center justify-between px-2">
        <h4 className="text-lg font-display font-semibold text-text-primary">
          Recent Alerts
        </h4>
        <button className="text-xs font-medium text-brand-primary hover:text-brand-primary-hover px-3 py-1.5 rounded-lg border border-brand-primary/10 bg-brand-primary/5 transition-all">
          View All
        </button>
      </div>
      
      <div >
        <Table 
          // @ts-ignore
          columns={columns} 
          dataSource={data} 
          pagination={false} 
        />
      </div>
    </div>
  );
};

export default RecentAlerts;
