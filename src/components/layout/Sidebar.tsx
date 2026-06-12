import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Search, GitCompare, Eye, BarChart3,
  Brain, Lightbulb, FileText, Settings, ChevronLeft,
  ChevronRight, Zap, Activity
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, group: 'main' },
  { path: '/process-discovery', label: 'Process Discovery', icon: Search, group: 'analysis' },
  { path: '/process-comparison', label: 'Process Comparison', icon: GitCompare, group: 'analysis' },
  { path: '/shadow-detection', label: 'Shadow Detection', icon: Eye, group: 'analysis' },
  { path: '/bottleneck-analysis', label: 'Bottleneck Analysis', icon: BarChart3, group: 'analysis' },
  { path: '/workflow-insights', label: 'Workflow Insights', icon: Brain, group: 'analysis' },
  { path: '/ai-recommendations', label: 'AI Recommendations', icon: Lightbulb, group: 'insights' },
  { path: '/reports', label: 'Reports', icon: FileText, group: 'insights' },
  { path: '/settings', label: 'Settings', icon: Settings, group: 'admin' },
]

const groups = {
  main: '',
  analysis: 'ANALYSIS',
  insights: 'INSIGHTS',
  admin: 'ADMIN',
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  const groupedItems = navItems.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = []
    acc[item.group].push(item)
    return acc
  }, {} as Record<string, typeof navItems>)

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="relative flex flex-col bg-slate-900 text-white h-full overflow-hidden border-r border-slate-700/50 flex-shrink-0"
    >
      {/* Logo */}
      <div className={cn('flex items-center h-16 px-4 border-b border-slate-700/50 flex-shrink-0', collapsed ? 'justify-center' : 'gap-3')}>
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
          <Activity size={16} className="text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-hidden">
              <p className="font-bold text-sm text-white whitespace-nowrap">Shadow Process</p>
              <p className="text-xs text-slate-400 whitespace-nowrap">Detector</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
        {Object.entries(groupedItems).map(([group, items]) => (
          <div key={group} className="mb-2">
            {!collapsed && groups[group as keyof typeof groups] && (
              <p className="px-4 py-1.5 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                {groups[group as keyof typeof groups]}
              </p>
            )}
            {items.map(item => {
              const isActive = location.pathname === item.path
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    'flex items-center gap-3 mx-2 px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 group relative',
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white',
                    collapsed && 'justify-center px-2'
                  )}
                >
                  <item.icon size={16} className={cn('flex-shrink-0', isActive ? 'text-white' : 'text-slate-400 group-hover:text-white')} />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white/70"
                    />
                  )}
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Upgrade Banner */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-3 mb-4 p-3 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap size={14} className="text-yellow-300" />
              <span className="text-xs font-semibold text-white">Pro Plan</span>
            </div>
            <p className="text-xs text-blue-100 mb-2 leading-relaxed">Unlock AI analysis and advanced reports</p>
            <button className="w-full py-1.5 text-xs font-semibold bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              Upgrade Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center hover:bg-slate-600 transition-colors z-10 text-slate-300"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </motion.aside>
  )
}
