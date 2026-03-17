import React from 'react';
import { Modal as AntModal } from 'antd';
import type { ModalProps as AntModalProps } from 'antd';
import { motion, AnimatePresence } from 'motion/react';
import type { Variants, Transition } from 'motion/react';
import { X } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../../utils/ui-utils';

type ModalVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

interface ModalProps extends Omit<AntModalProps, 'open' | 'onCancel' | 'footer' | 'closable' | 'centered' | 'width' | 'maskClosable' | 'mask' | 'destroyOnClose'> {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  children: React.ReactNode;
  width?: number | string;
  showCloseButton?: boolean;
  className?: string;
  footer?: React.ReactNode;
  centered?: boolean;
  variant?: ModalVariant;
  maskClosable?: boolean;
  destroyOnHidden?: boolean;
}
const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 400,
    } as Transition,
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.15,
      ease: 'easeOut',
    } as Transition,
  },
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  subTitle,
  children,
  width = 500,
  showCloseButton = true,
  className,
  footer,
  centered = true,
  variant = 'default',
  maskClosable = true,
  ...antModalProps
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'border-status-online';
      case 'warning':
        return 'border-orange-400';
      case 'danger':
        return 'border-status-danger';
      case 'info':
        return 'border-secondary-dark';
      default:
        return 'border-secondary';
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <AntModal
          {...antModalProps}
          open={isOpen}
          onCancel={onClose}
          footer={null}
          closable={false}
          centered={centered}
          width={width}
          maskClosable={maskClosable}
          mask={true}
          styles={{ mask: { backdropFilter: 'blur(2px)' } }}
          wrapClassName="bg-transparent!"
          className="[&_.ant-modal-content]:p-0.5! md:p-0!"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            className={cn(
              'bg-surface-base py-4! p-2 rounded-2xl shadow-xl',
              'border',
              getVariantStyles(),
              className
            )}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className={cn('border-b border-secondary', title ? "px-3 md:px-4 py-2" : "py-0!")}>

                <div className={cn("flex items-center justify-between")}>
                  <div>

                    {title && (
                      <h3 className="text-lg font-display font-semibold text-content-heading">
                        {title}
                      </h3>

                    )}

                  </div>
                  {showCloseButton && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClose}
                      className="ml-auto text-content-muted hover:text-content-body p-1"
                    >
                      <X size={20} />
                    </Button>
                  )}
                </div>
                {
                  subTitle &&
                  <p className='w-[85%] text-sm text-content-muted'>
                    {subTitle}
                  </p>
                }
              </div>
            )}

            {/* Content */}
            <div className="px-2 md:px-4 py-4 text-content-body">
              {children}
            </div>

            {/* Footer */}
            {(footer !== null) && (
              <footer
                className="mt-4 flex md:flex-row flex-col gap-3 md:justify-end px-3 md:px-4 pt-2 border-t-2 border-secondary"
              >
                {footer ? footer : (
                  <>
                    {
                      !showCloseButton ? null :
                        <Button
                          variant="outline"
                          className='mt-2'
                          onClick={() => {
                            onClose();
                          }}
                          {...(antModalProps.cancelButtonProps as any)}
                        >
                          {antModalProps.cancelText || 'Cancel'}
                        </Button>
                    }
                    <Button
                      className={cn("mt-2", !showCloseButton && `w-full`)}
                      onClick={(e) => {
                        onConfirm?.(e)
                        antModalProps.onOk?.(e as any)
                      }
                      }
                      {...(antModalProps.okButtonProps as any)}
                    >
                      {antModalProps.okText || 'OK'}
                    </Button>
                  </>
                )}
              </footer>
            )}
          </motion.div>
        </AntModal>
      )}
    </AnimatePresence>
  );
}; 