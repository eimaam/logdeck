import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from './Card';
import { cn } from '../../utils/ui-utils';
import { StatusTypeEnum } from '../../types';

export interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  type?: StatusTypeEnum;
  icon?: React.ReactNode;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  type = StatusTypeEnum.INFO,
  icon,
  className,
}) => {
  const isPositive = trend?.startsWith('+');
  const isNegative = trend?.startsWith('-');

  const trendColor = cn(
    'text-xs font-medium flex items-center gap-1',
    isPositive && 'text-state-success',
    isNegative && 'text-state-error',
    !isPositive && !isNegative && 'text-text-muted'
  );

  const indicatorColor = cn(
    'w-1.5 h-1.5 rounded-full',
    type === StatusTypeEnum.SUCCESS && 'bg-state-success',
    type === StatusTypeEnum.ERROR && 'bg-state-error',
    type === StatusTypeEnum.WARNING && 'bg-state-warning',
    type === StatusTypeEnum.INFO && 'bg-state-info',
    type === StatusTypeEnum.BRAND && 'bg-brand-primary'
  );

  return (
    <Card className={cn('p-6 relative overflow-hidden group hover:!border-brand-primary/50 transition-all duration-300', className)}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-display font-medium tracking-wider text-text-muted uppercase">
            {title}
          </span>
          {icon || <div className={indicatorColor} />}
        </div>

        <div className="flex items-end justify-between mt-2">
          <h3 className="text-3xl font-display font-bold text-text-primary tracking-tight">
            {value}
          </h3>

          {trend && (
            <div className={trendColor}>
              {isPositive && <TrendingUp size={14} />}
              {isNegative && <TrendingDown size={14} />}
              {!isPositive && !isNegative && <Minus size={14} />}
              <span>{trend}</span>
            </div>
          )}
        </div>
      </div>

      {/* hover animation */}
      <div className={cn(
        "absolute -right-4 -bottom-4 w-24 h-24 blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full",
        type === StatusTypeEnum.SUCCESS && 'bg-state-success',
        type === StatusTypeEnum.ERROR && 'bg-state-error',
        type === StatusTypeEnum.WARNING && 'bg-state-warning',
        type === StatusTypeEnum.INFO && 'bg-state-info',
        type === StatusTypeEnum.BRAND && 'bg-brand-primary'
      )} />
    </Card>
  );
};
