import { cn } from '@/lib/utils'

export function Badge({
  children,
  className = '',
  variant = 'default',
  ...props
}) {
  let base =
    'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
  let variants = {
    default: 'bg-primary text-primary-foreground border-transparent',
    secondary: 'bg-secondary text-secondary-foreground border-transparent',
    outline: 'border border-gray-300 text-gray-700 bg-transparent',
  }
  return (
    <span className={cn(base, variants[variant], className)} {...props}>
      {children}
    </span>
  )
} 