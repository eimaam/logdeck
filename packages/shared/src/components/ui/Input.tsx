import React from 'react';
import { Input as AntInput } from 'antd';
import type { InputProps as AntInputProps, InputRef } from 'antd';
import type { TextAreaProps } from 'antd/es/input/TextArea';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/ui-utils';


const { TextArea, Password, Search } = AntInput;

type InputVariant = 'default' | 'filled' | 'borderless';
type InputSize = 'sm' | 'md' | 'lg';

const inputVariants = cva(
  'w-full transition-all !border !text-text-primary !rounded-lg placeholder:!text-text-muted',
  {
    variants: {
      variant: {
        default: '!bg-bg-surface !border-border-muted hover:!border-brand-primary focus:!border-brand-primary focus:!ring-1 focus:!ring-brand-primary/20',
        filled: '!bg-bg-muted !border-transparent focus:!bg-bg-surface focus:!border-brand-primary',
        borderless: '!border-transparent !bg-transparent !shadow-none',
      },
      size: {
        sm: '!min-h-8 !text-xs px-2',
        md: 'min-h-10! !text-sm px-3',
        lg: '!min-h-12 !text-base px-4',
      },
      status: {
        error: '!border-state-error hover:!border-state-error focus:!border-state-error !text-state-error',
        warning: '!border-state-warning hover:!border-state-warning',
        success: '!border-state-success hover:!border-state-success',
      },
      disabled: {
        true: '!opacity-50 !cursor-not-allowed !bg-bg-muted',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

interface BaseInputProps {
  variant?: InputVariant;
  size?: InputSize;
  status?: 'error' | 'warning' | 'success';
  fullWidth?: boolean;
  className?: string;
}

export const Input = React.forwardRef<InputRef, BaseInputProps & Omit<AntInputProps, 'size'>>(({
  className,
  variant,
  status,
  disabled,
  size,
  ...props
}, ref) => {
  const antStatus = status as AntInputProps['status'];

  return (
    <AntInput
      className={cn(inputVariants({ variant, status, disabled, size }), className)}
      status={antStatus}
      disabled={disabled}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export const Textarea = React.forwardRef<InputRef, BaseInputProps & Omit<TextAreaProps, 'size'>>(({
  className,
  variant,
  status,
  disabled,
  size,
  rows = 4,
  ...props
}, ref) => {
  const antStatus = status as AntInputProps['status'];

  return (
    <TextArea
      className={cn(inputVariants({ variant, status, disabled, size }), className)}
      status={antStatus}
      disabled={disabled}
      rows={rows}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export const PasswordInput = React.forwardRef<InputRef, BaseInputProps & Omit<AntInputProps, 'size'>>(({
  className,
  variant,
  status,
  disabled,
  size,
  ...props
}, ref) => {
  const antStatus = status as AntInputProps['status'];

  return (
    <Password
      className={cn(inputVariants({ variant, status, disabled, size }), className)}
      status={antStatus}
      disabled={disabled}
      ref={ref}
      {...props}
    />
  );
});

PasswordInput.displayName = 'PasswordInput';

export const SearchInput = React.forwardRef<InputRef, BaseInputProps & Omit<AntInputProps, 'size'> & { onSearch?: (value: string) => void }>(({
  className,
  variant,
  status,
  disabled,
  size,
  onSearch,
  ...props
}, ref) => {
  const antStatus = status as AntInputProps['status'];

  return (
    <Search
      className={cn(inputVariants({ variant, status, disabled, size }), className)}
      status={antStatus}
      disabled={disabled}
      onSearch={onSearch}
      ref={ref}
      {...props}
    />
  );
});

SearchInput.displayName = 'SearchInput';