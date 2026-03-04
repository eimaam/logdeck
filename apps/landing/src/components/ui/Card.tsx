import React from 'react';
import { Card as AntCard } from 'antd';
import type { CardProps as AntCardProps } from 'antd';
import { cva } from 'class-variance-authority';
import { MotionDiv } from './MotionComponents';
import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'outlined' | 'elevated';
type CardRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl';
type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

const cardVariants = cva(
  'overflow-hidden transition-all duration-200',
  {
    variants: {
      variant: {
        default: "!bg-bg-surface !border !border-border-muted",
        outlined: "!bg-transparent !border !border-border-muted",
        elevated: "!bg-bg-elevated !border-none !shadow-xl",
      },
      rounded: {
        none: '!rounded-none',
        sm: '!rounded-sm',
        md: '!rounded-md',
        lg: '!rounded-xl',
        xl: '!rounded-2xl',
      },
      padding: {
        none: '!p-0',
        sm: '!p-3',
        md: '!p-5',
        lg: '!p-6',
        xl: '!p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      rounded: 'xl',
      padding: 'none',
    },
  }
);

export interface CardProps extends Omit<AntCardProps, 'type' | 'variant'> {
  variant?: CardVariant;
  rounded?: CardRounded;
  padding?: CardPadding;
  animate?: boolean;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export const Card = ({
  className,
  children,
  animate = false,
  variant = 'default',
  rounded,
  padding,
  title,
  extra,
  bordered,
  hoverable = false,
  cover,
  actions,
  ref,
  ...props
}: CardProps) => {
  const cardStyles = cardVariants({
    variant: variant as any,
    rounded: rounded as any,
    padding: padding as any,
    className
  });

  const cardContent = (
    // @ts-ignore
    <AntCard
      className={cn(cardStyles)}
      title={title &&
        <span className="text-lg font-display font-medium text-content-heading">{title}</span>
      }
      extra={extra}
      bordered={bordered}
      hoverable={hoverable}
      cover={cover}
      actions={actions}
      ref={ref}
      {...props}
    >
      {children}
    </AntCard>
  );

  if (animate) {
    return (
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {cardContent}
      </MotionDiv>
    );
  }

  return cardContent;
};

export const { Meta: CardMeta } = AntCard;

type CardSpacing = 'none' | 'sm' | 'md' | 'lg';

const cardContentVariants = cva(
  'card-content',
  {
    variants: {
      spacing: {
        none: 'mt-0',
        sm: 'mt-2',
        md: 'mt-4',
        lg: 'mt-6',
      },
    },
    defaultVariants: {
      spacing: 'md',
    },
  }
);

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: CardSpacing;
  className?: string;
  children?: React.ReactNode;
}

export const CardContent = ({
  className,
  children,
  spacing = 'md',
  ...props
}: CardContentProps) => {
  const contentStyles = cardContentVariants({
    spacing: spacing as any,
    className
  });

  return (
    <div
      className={cn(contentStyles)}
      {...props}
    >
      {children}
    </div>
  );
}; 