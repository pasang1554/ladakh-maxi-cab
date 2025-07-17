import * as React from 'react'

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  className?: string
}

export function Tabs({ defaultValue, value, onValueChange, children, className = '', ...props }: TabsProps) {
  const [current, setCurrent] = React.useState(value || defaultValue || '')

  React.useEffect(() => {
    if (value !== undefined) setCurrent(value)
  }, [value])

  const handleChange = (val: string) => {
    setCurrent(val)
    onValueChange?.(val)
  }

  // Provide context for triggers and content
  return (
    <TabsContext.Provider value={{ current, setCurrent: handleChange }}>
      <div className={className} {...props}>{children}</div>
    </TabsContext.Provider>
  )
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}
export function TabsList({ children, className = '', ...props }: TabsListProps) {
  return (
    <div className={`flex gap-2 ${className}`} {...props}>{children}</div>
  )
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}
export function TabsTrigger({ value, children, className = '', ...props }: TabsTriggerProps) {
  const { current, setCurrent } = React.useContext(TabsContext)
  const isActive = current === value
  return (
    <button
      type="button"
      className={`px-4 py-2 rounded transition-colors font-medium ${isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-primary/10'} ${className}`}
      aria-selected={isActive}
      onClick={() => setCurrent(value)}
      {...props}
    >
      {children}
    </button>
  )
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}
export function TabsContent({ value, children, className = '', ...props }: TabsContentProps) {
  const { current } = React.useContext(TabsContext)
  if (current !== value) return null
  return (
    <div className={className} {...props}>{children}</div>
  )
}

// Context for Tabs
const TabsContext = React.createContext<{
  current: string
  setCurrent: (val: string) => void
}>({ current: '', setCurrent: () => {} }) 