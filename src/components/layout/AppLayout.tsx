import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Overview of process health and shadow activities' },
  '/process-discovery': { title: 'Process Discovery', subtitle: 'Upload and analyze event logs and process models' },
  '/process-comparison': { title: 'Process Comparison', subtitle: 'Compare official vs actual employee workflows' },
  '/shadow-detection': { title: 'Shadow Process Detection', subtitle: 'Identify hidden and unofficial processes' },
  '/bottleneck-analysis': { title: 'Bottleneck Analysis', subtitle: 'Diagnose delays and resource constraints' },
  '/workflow-insights': { title: 'Employee Workflow Insights', subtitle: 'Understand how employees actually work' },
  '/ai-recommendations': { title: 'AI Recommendations', subtitle: 'Intelligent process improvement suggestions' },
  '/reports': { title: 'Reports', subtitle: 'Generate and export comprehensive process reports' },
  '/settings': { title: 'Settings', subtitle: 'Manage users, roles, and system configuration' },
}

export function AppLayout() {
  const location = useLocation()
  const meta = pageTitles[location.pathname] || { title: 'Shadow Process Detector', subtitle: '' }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar title={meta.title} subtitle={meta.subtitle} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
