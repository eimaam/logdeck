import { Button as AntButton } from "antd";
import type { ButtonProps as AntButtonProps } from "antd";
import { cva, type VariantProps } from "class-variance-authority";
import React from 'react';
import { forwardRef } from "react";
import { motion } from 'motion/react';
import { cn } from "../../lib/utils";

const MotionAntButton = motion(AntButton) as any;

const buttonStyles = cva(
  "!bg-transparent font-display! !text-black !shadow-none !flex !items-center rounded-none! !justify-center !gap-2 !font-medium !transition-colors focus:!outline-none focus:!ring-2 focus:ring-ring focus-visible:outline-hidden focus:ring-offset-2 disabled:pointer-events-none disabled:!cursor-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border !bg-brand-primary !text-text-on-primary hover:!bg-brand-primary-hover",
        destructive: "!bg-state-error !text-white hover:!bg-state-error/80",
        outline:
          "!border !border-border-strong !bg-transparent !text-text-secondary hover:!bg-interactive-hover hover:!text-text-primary",
        secondary: "!bg-bg-muted !text-text-primary hover:!bg-bg-elevated",
        ghost: "focus:ring-0! focus:outline-none! focus:border-0! border-none! hover:!bg-interactive-hover !text-text-secondary",
        link: "focus:ring-0! !text-brand-primary !border-none !shadow-none underline-offset-4 hover:underline",
        filled: "!bg-bg-surface !text-text-primary hover:!bg-bg-surface-hover",
      },
      size: {
        default: "!min-h-8.5 !px-4 !py-2",
        sm: "!h-8 !px-3 !text-xs",
        lg: "h-10! px-6 md:!h-12 md:!px-8 text-sm! md:text-base!",
        icon: "!h-10 !w-10",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  },
);

interface ButtonProps
  extends Omit<AntButtonProps, 'size' | 'variant'>,
  VariantProps<typeof buttonStyles> {
  className?: string;
  icon?: React.ReactNode;
  htmlType?: "button" | "submit" | "reset";
  animate?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      icon,
      htmlType = "button",
      children,
      animate = true,
      ...props
    },
    ref,
  ) => {
    const antSize = size === "sm" ? "small" : size === "lg" ? "large" : "middle";

    // Only animate if enabled and not disabled
    const shouldAnimate = animate && !props.disabled && !props.loading;

    return (
      <MotionAntButton
        className={cn(
          buttonStyles({ variant, size, fullWidth, className }),
        )}
        size={antSize}
        icon={icon}
        htmlType={htmlType}
        ref={ref}
        {...props}
        whileHover={shouldAnimate ? "hover" : undefined}
        whileTap={shouldAnimate ? "tap" : undefined}
        style={variant === 'default' && shouldAnimate ? { position: 'relative', overflow: 'hidden' } : {}}
      >
        {children}
      </MotionAntButton>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonStyles as buttonVariants };