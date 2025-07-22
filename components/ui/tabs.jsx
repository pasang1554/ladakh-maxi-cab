import * as React from 'react'

const TabsContext = React.createContext({ current: '', setCurrent: () => {} })

export function Tabs({ defaultValue, value, onValueChange, children, className = '', ...props }) {
  const [current, setCurrent] = React.useState(value || defaultValue || '')

  React.useEffect(() => {
    if (value !== undefined) setCurrent(value)
  }, [value])

  const handleChange = (val) => {
    setCurrent(val)
    onValueChange?.(val)
  }

  return (
    <TabsContext.Provider value={{ current, setCurrent: handleChange }}>
      <div className={className} {...props}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children, className = '', ...props }) {
  return (
    <div className={`flex gap-2 ${className}`} {...props}>{children}</div>
  )
}

export function TabsTrigger({ value, children, className = '', ...props }) {
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

export function TabsContent({ value, children, className = '', ...props }) {
  const { current } = React.useContext(TabsContext)
  if (current !== value) return null
  return (
    <div className={className} {...props}>{children}</div>
  )
} 