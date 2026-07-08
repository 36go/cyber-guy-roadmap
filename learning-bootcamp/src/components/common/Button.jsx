import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-gradient-accent text-white hover:opacity-90 shadow-lg shadow-accent/20',
  secondary: 'bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/20',
  outline: 'border border-dark-border text-light-text hover:bg-dark-card hover:border-accent/30',
  ghost: 'text-muted-text hover:text-light-text hover:bg-dark-card',
  danger: 'bg-danger text-white hover:bg-danger/90 shadow-lg shadow-danger/20',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading = false,
  disabled = false,
  children,
  className = '',
  href,
  ...props
}) {
  const classes = `
    inline-flex items-center justify-center gap-2 font-medium rounded-lg
    transition-all duration-200 active:scale-95
    disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
    ${variants[variant] || variants.primary}
    ${sizes[size] || sizes.md}
    ${className}
  `.trim();

  const content = (
    <>
      {loading ? (
        <Loader2 size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} className="animate-spin" />
      ) : Icon ? (
        <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
      ) : null}
      {children && <span>{children}</span>}
    </>
  );

  if (href && !disabled) {
    return (
      <Link to={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {content}
    </button>
  );
}
