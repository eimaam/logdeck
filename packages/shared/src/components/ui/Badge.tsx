import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/ui-utils';
import { StatusTypeEnum } from '../../types';

const badgeVariants = cva(
  'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
  {
    variants: {
      variant: {
        default: 'bg-bg-elevated text-text-secondary ring-border-muted',
        [StatusTypeEnum.SUCCESS]: 'bg-state-success-bg text-state-success ring-state-success/20',
        [StatusTypeEnum.ERROR]: 'bg-state-error-bg text-state-error ring-state-error/20',
        [StatusTypeEnum.CRITICAL]: 'bg-state-error-bg text-state-error ring-state-error/40 font-bold',
        [StatusTypeEnum.WARNING]: 'bg-state-warning-bg text-state-warning ring-state-warning/20',
        [StatusTypeEnum.INFO]: 'bg-state-info-bg text-state-info ring-state-info/20',
        [StatusTypeEnum.BRAND]: 'bg-brand-primary-muted text-brand-primary ring-brand-primary/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge: React.FC<BadgeProps> = ({ className, variant, ...props }) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
};
