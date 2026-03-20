import { Table as AntTable, ConfigProvider, theme } from 'antd';
import type { TableProps as AntTableProps } from 'antd';
import { cn } from '../../utils/ui-utils';

export interface TableProps<T> extends AntTableProps<T> {
  containerClassName?: string;
}

export const Table = <T extends object>({
  className,
  containerClassName,
  ...props
}: TableProps<T>) => {
  const { token } = theme.useToken();

  return (
    <div className={cn("logdeck-table-container", containerClassName)}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          components: {
            Table: {
              colorBgContainer: 'transparent',
              colorFillAlter: 'transparent',
              colorBorderSecondary: 'var(--color-border-muted)',
              colorTextHeader: 'var(--color-text-muted)',
              fontSizeHeader: 12,
              fontWeightStrong: 500,
              padding: 16,
              borderRadius: 12,
            },
          },
        }}
      >
        <AntTable
          {...props}
          className={cn(
            "logdeck-table",
            "!bg-transparent",
            className
          )}
          pagination={props.pagination === false ? false : {
            ...props.pagination as any,
            className: cn("!mt-4 !mb-0", (props.pagination as any)?.className),
          }}
        />
      </ConfigProvider>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .logdeck-table .ant-table {
          background: transparent !important;
        }
        .logdeck-table .ant-table-thead > tr > th {
          background: transparent !important;
          border-bottom: 1px solid var(--color-border-muted) !important;
          text-transform: uppercase;
          color: var(--color-text-muted);
          font: var(--font-display) !important;
          letter-spacing: 0.05em;
        }
        .logdeck-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid var(--color-border-muted) !important;
          transition: background 0.2s;
        }
        .logdeck-table .ant-table-tbody > tr:last-child > td {
          border-bottom: none !important;
        }
        .logdeck-table .ant-table-tbody > tr:hover > td {
          background: var(--color-bg-surface-hover) !important;
        }
        .logdeck-table .ant-pagination-item-active {
          border-color: var(--color-brand-primary) !important;
          background: transparent !important;
        }
        .logdeck-table .ant-pagination-item-active a {
          color: var(--color-brand-primary) !important;
        }
      `}} />
    </div>
  );
};
