import React from 'react'
import { cn } from '@/lib/utils'

interface ProgressProps {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple'
  className?: string
  showLabel?: boolean
}

const colors = {
  blue: 'bg-blue-500',
  green: 'bg-emerald-500',
  yellow: 'bg-yellow-500',
  red: 'bg-red-500',
  purple: 'bg-purple-500',
}

const sizes = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-3.5',
}

export function Progress({ value, max = 100, size = 'md', color = 'blue', className, showLabel }: ProgressProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className={cn('flex-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden', sizes[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-500', colors[color])}
          style={{ width: `${percent}%` }}
        />
      </div>
      {showLabel && <span className="text-xs text-slate-500 dark:text-slate-400 w-8 text-right">{Math.round(percent)}%</span>}
    </div>
  )
}
