import React from 'react';
import { Select as AntSelect } from 'antd';
import type { SelectProps as AntSelectProps, RefSelectProps } from 'antd';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/ui-utils';

type SelectVariant = 'default' | 'filled' | 'borderless';
type SelectSize = 'sm' | 'md' | 'lg';

const selectVariants = cva(
  'w-full transition-all !border !text-sm !rounded-xl',
  {
    variants: {
      variant: {
        default: '!bg-surface-base !border-secondary-dark/40 focus:!border-primary hover:!border-primary',
        filled: '!bg-secondary !border-transparent focus:!bg-surface-base focus:!border-primary',
        borderless: '!border-transparent !bg-transparent hover:!border-transparent',
      },
      size: {
        sm: 'h-8 !text-xs',
        md: 'h-10 md:!text-sm',
        lg: 'h-12 md:!text-base',
      },
      status: {
        error: '!border-status-danger hover:!border-status-danger focus:!border-status-danger',
        warning: '!border-orange-400 hover:!border-orange-400',
        success: '!border-status-online hover:!border-status-online',
      },
      disabled: {
        true: '!opacity-50 !cursor-not-allowed !bg-secondary/50',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

interface BaseSelectProps {
  variant?: SelectVariant;
  size?: SelectSize;
  status?: 'error' | 'warning' | 'success';
  fullWidth?: boolean;
  className?: string;
}

export const Select = React.forwardRef<RefSelectProps, BaseSelectProps & Omit<AntSelectProps, 'size'>>(({
  className,
  variant,
  status,
  disabled,
  size,
  ...props
}, ref) => {
  const antStatus = status as AntSelectProps['status'];

  return (
    <AntSelect
      className={cn(selectVariants({ variant, status, disabled, size }), className)}
      status={antStatus}
      disabled={disabled}
      ref={ref}
      {...props}
    />
  );
});

Select.displayName = 'Select';


export const { Option, OptGroup } = AntSelect;