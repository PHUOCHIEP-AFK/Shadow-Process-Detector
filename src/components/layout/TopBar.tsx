import React, { useState } from 'react'
import { Bell, Sun, Moon, Search, ChevronDown, Settings } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

interface TopBarProps {
  title: string
  subtitle?: string
}

const notifications = [
  { id: 1, title: 'New shadow process detected', desc: 'Finance dept — 2 min ago', unread: true },
  { id: 2, title: 'Analysis complete', desc: 'Q4 Procurement scan finished — 15 min ago', unread: true },
  { id: 3, title: 'Report ready', desc: 'Monthly compliance report — 1h ago', unread: false },
]

export function TopBar({ title, subtitle }: TopBarProps) {
  const { theme, toggleTheme } = useTheme()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700/60 flex items-center px-6 gap-4 flex-shrink-0">
      {/* Title */}
      <div className="flex-1">
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">{title}</h1>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>

      {/* Search */}
      <div className="relative hidden md:block">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search processes, reports..."
          className="w-64 h-9 pl-9 pr-4 text-sm rounded-lg bg-slate-100 dark:bg-slate-800 border-0 text-slate-700 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {/* Theme toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-slate-500">
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </Button>

        {/* Notifications */}
        <div className="relative">
          <Button variant="ghost" size="icon" onClick={() => setShowNotifications(!showNotifications)} className="text-slate-500 relative">
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
            )}
          </Button>
          {showNotifications && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50">
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Notifications</span>
                  <span className="text-xs text-blue-600 cursor-pointer hover:underline">Mark all read</span>
                </div>
                {notifications.map(n => (
                  <div key={n.id} className={cn('px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer border-b border-slate-50 dark:border-slate-800 last:border-0', n.unread && 'bg-blue-50/50 dark:bg-blue-900/10')}>
                    <div className="flex items-start gap-3">
                      {n.unread && <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />}
                      {!n.unread && <div className="w-2 h-2 mt-1.5 flex-shrink-0" />}
                      <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{n.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{n.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Settings */}
        <Button variant="ghost" size="icon" className="text-slate-500">
          <Settings size={16} />
        </Button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
              JD
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">John Doe</p>
              <p className="text-[10px] text-slate-400">Admin</p>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </button>
          {showProfile && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)} />
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 py-1">
                {['Profile', 'Team Settings', 'Billing', 'Sign Out'].map(item => (
                  <button key={item} className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    {item}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
