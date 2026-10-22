import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'default' | 'full';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.ComponentPropsWithoutRef<typeof Link>, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-orange text-white can-hover:hover:bg-lightOrange focus-visible:outline-orange',
  secondary:
    'bg-black text-white can-hover:hover:bg-graphite focus-visible:outline-black',
  outline:
    'bg-transparent text-black border border-black can-hover:hover:bg-black can-hover:hover:text-white focus-visible:outline-black',
};

const sizeStyles: Record<ButtonSize, string> = {
  default: 'px-8',
  full: 'w-full',
};

export function Button({
  variant = 'primary',
  size = 'default',
  disabled = false,
  loading = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const baseStyles =
    'inline-flex h-12 items-center justify-center text-[13px] font-bold tracking-[1px] uppercase transition-colors duration-500 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2';

  const classes = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    isDisabled ? 'opacity-50 pointer-events-none cursor-not-allowed' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Link variant
  if ('href' in props && props.href) {
    const { href, ...linkProps } = props;

    if (isDisabled) {
      return (
        <button type='button' disabled className={classes}>
          {children}
        </button>
      );
    }

    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  // Button variant
  const buttonProps = props as ButtonAsButton;
  return (
    <button
      type={buttonProps.type ?? 'button'}
      disabled={isDisabled}
      aria-busy={loading}
      className={classes}
      {...buttonProps}
    >
      {loading ? (
        <>
          <span
            className='size-5 animate-spin rounded-full border-2 border-white border-t-transparent'
            aria-hidden='true'
          />
          <span className='sr-only'>{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
