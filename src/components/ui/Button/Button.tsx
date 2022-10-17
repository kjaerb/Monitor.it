import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { forwardRef } from 'react';

import Loading from '@/components/ui/Loading/Loading';

export const buttonColors = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-500 hover:bg-gray-700 text-white',
  ternary: 'bg-blue-700 hover:bg-blue-800 text-white',
  transparent:
    'bg-transparent border-none shadow-none hover:shadow-md hover:border text-gray-700',
  danger: 'bg-red-500 hover:bg-red-700 text-white',
  warning: 'bg-yellow-500 hover:bg-yellow-700 text-white',
  success: 'bg-green-500 hover:bg-green-700 text-white',
  info: 'bg-blue-500 hover:bg-blue-700 text-white',
  light: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  dark: 'bg-gray-800 hover:bg-gray-900 text-white',
  disabled: 'bg-gray-300 text-gray-800 cursor-not-allowed',
};

export type ButtonProps = {
  children?: React.ReactNode;
  isLoading?: boolean;
  variant?: keyof typeof buttonColors;
  className?: string;
  onClick?: () => void;
  href?: string;
} & React.ComponentPropsWithoutRef<'button'>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      isLoading,
      onClick,
      className,
      href,
      ...rest
    },
    ref
  ) => {
    return (
      <>
        {href ? (
          <Link href={href}>
            <button
              {...rest}
              disabled={isLoading}
              ref={ref}
              onClick={onClick}
              className={clsx([
                'shadow-md rounded-md px-4 py-2 transition-colors duration-200',
                buttonColors[variant],
                isLoading && buttonColors['disabled'],
                className,
              ])}
            >
              {children}
            </button>
          </Link>
        ) : (
          <button
            {...rest}
            disabled={isLoading}
            ref={ref}
            onClick={onClick}
            className={clsx([
              'shadow-md rounded-md px-4 py-2',
              buttonColors[variant],
              isLoading && buttonColors['disabled'],
              className,
            ])}
          >
            {isLoading && <Loading />}
            {children}
          </button>
        )}
      </>
    );
  }
);

Button.displayName = 'Button';

export default Button;
