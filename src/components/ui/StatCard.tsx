import React from 'react'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { motion } from 'framer-motion'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  trend?: {
    value: number
    label?: string
  }
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo'
  className?: string
  index?: number
}

const colors = {
  blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', icon: 'text-blue-600 dark:text-blue-400', accent: 'bg-blue-600' },
  green: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', icon: 'text-emerald-600 dark:text-emerald-400', accent: 'bg-emerald-600' },
  yellow: { bg: 'bg-yellow-50 dark:bg-yellow-900/20', icon: 'text-yellow-600 dark:text-yellow-400', accent: 'bg-yellow-600' },
  red: { bg: 'bg-red-50 dark:bg-red-900/20', icon: 'text-red-600 dark:text-red-400', accent: 'bg-red-600' },
  purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', icon: 'text-purple-600 dark:text-purple-400', accent: 'bg-purple-600' },
  indigo: { bg: 'bg-indigo-50 dark:bg-indigo-900/20', icon: 'text-indigo-600 dark:text-indigo-400', accent: 'bg-indigo-600' },
}

export function StatCard({ title, value, subtitle, icon, trend, color = 'blue', className, index = 0 }: StatCardProps) {
  const c = colors[color]
  const TrendIcon = trend ? (trend.value > 0 ? TrendingUp : trend.value < 0 ? TrendingDown : Minus) : null
  const trendColor = trend ? (trend.value > 0 ? 'text-emerald-500' : trend.value < 0 ? 'text-red-500' : 'text-slate-400') : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className={cn(
        'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 group',
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        {icon && (
          <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200', c.bg)}>
            <span className={c.icon}>{icon}</span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">{value}</p>
        {(subtitle || trend) && (
          <div className="flex items-center gap-2">
            {trend && TrendIcon && (
              <span className={cn('flex items-center gap-1 text-xs font-medium', trendColor)}>
                <TrendIcon size={12} />
                {Math.abs(trend.value)}%
              </span>
            )}
            {subtitle && <span className="text-xs text-slate-400 dark:text-slate-500">{subtitle}</span>}
          </div>
        )}
      </div>
    </motion.div>
  )
}
