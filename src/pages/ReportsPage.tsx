import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FileText, Download, Eye, Calendar, Filter,
  BarChart2, Shield, AlertTriangle, TrendingUp,
  RefreshCw, FileCheck, ChevronRight
} from 'lucide-react'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/contexts/ToastContext'

interface Report {
  id: string
  name: string
  type: 'executive' | 'compliance' | 'risk' | 'process'
  status: 'ready' | 'generating' | 'scheduled'
  date: string
  size: string
  pages: number
  icon: typeof FileText
}

const reports: Report[] = [
  { id: 'r1', name: 'Executive Summary — Q4 2025', type: 'executive', status: 'ready', date: 'Dec 31, 2025', size: '2.4 MB', pages: 12, icon: TrendingUp },
  { id: 'r2', name: 'Process Risk Report — Dec 2025', type: 'risk', status: 'ready', date: 'Dec 28, 2025', size: '4.1 MB', pages: 28, icon: AlertTriangle },
  { id: 'r3', name: 'Compliance Report — Q4 2025', type: 'compliance', status: 'ready', date: 'Dec 27, 2025', size: '3.8 MB', pages: 22, icon: Shield },
  { id: 'r4', name: 'Invoice Process Analysis', type: 'process', status: 'ready', date: 'Dec 22, 2025', size: '1.9 MB', pages: 15, icon: BarChart2 },
  { id: 'r5', name: 'Shadow Process Detection — Nov 2025', type: 'risk', status: 'ready', date: 'Nov 30, 2025', size: '5.2 MB', pages: 34, icon: AlertTriangle },
  { id: 'r6', name: 'Monthly Compliance — Nov 2025', type: 'compliance', status: 'ready', date: 'Nov 28, 2025', size: '3.2 MB', pages: 20, icon: Shield },
  { id: 'r7', name: 'Q1 2026 Report (Scheduled)', type: 'executive', status: 'scheduled', date: 'Mar 31, 2026', size: '—', pages: 0, icon: Calendar },
]

const typeConfig = {
  executive: { label: 'Executive', variant: 'info' as const, color: 'bg-blue-50 dark:bg-blue-900/20' },
  compliance: { label: 'Compliance', variant: 'success' as const, color: 'bg-emerald-50 dark:bg-emerald-900/20' },
  risk: { label: 'Risk', variant: 'danger' as const, color: 'bg-red-50 dark:bg-red-900/20' },
  process: { label: 'Process', variant: 'warning' as const, color: 'bg-yellow-50 dark:bg-yellow-900/20' },
}

const generateTemplates = [
  {
    id: 'exec', name: 'Executive Summary', desc: 'High-level KPIs, shadow process count, compliance scores and trends',
    icon: TrendingUp, color: 'blue', pages: '~12 pages',
  },
  {
    id: 'compliance', name: 'Compliance Report', desc: 'Detailed compliance analysis, deviations, regulatory alignment',
    icon: Shield, color: 'green', pages: '~22 pages',
  },
  {
    id: 'risk', name: 'Process Risk Report', desc: 'Shadow processes, risk scores, bottlenecks, and mitigation steps',
    icon: AlertTriangle, color: 'red', pages: '~28 pages',
  },
  {
    id: 'full', name: 'Full Analysis Report', desc: 'Complete analysis including all metrics, AI recommendations and action plan',
    icon: FileCheck, color: 'purple', pages: '~45 pages',
  },
]

export function ReportsPage() {
  const { toast } = useToast()
  const [typeFilter, setTypeFilter] = useState('all')
  const [generating, setGenerating] = useState<string | null>(null)

  const handleGenerate = async (templateId: string, name: string) => {
    setGenerating(templateId)
    await new Promise(r => setTimeout(r, 2000))
    setGenerating(null)
    toast('success', 'Report generated!', `${name} is ready to download`)
  }

  const handleDownload = (name: string) => {
    toast('info', 'Downloading...', name)
  }

  const filtered = typeFilter === 'all' ? reports : reports.filter(r => r.type === typeFilter)

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600',
    green: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600',
    red: 'bg-red-50 dark:bg-red-900/20 text-red-600',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600',
  }

  return (
    <div className="p-6 space-y-6">
      {/* Generate New Report */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText size={18} className="text-blue-600" />
            Generate New Report
          </CardTitle>
          <p className="text-xs text-slate-400 mt-0.5">Select a report template to generate a new PDF report</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {generateTemplates.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all group cursor-pointer">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colorMap[t.color]}`}>
                    <t.icon size={18} />
                  </div>
                  <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200 mb-1">{t.name}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{t.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{t.pages}</span>
                    <Button
                      variant="primary"
                      size="sm"
                      loading={generating === t.id}
                      onClick={() => handleGenerate(t.id, t.name)}
                    >
                      {generating === t.id ? 'Generating...' : 'Generate'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Library */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Report Library</CardTitle>
              <p className="text-xs text-slate-400 mt-0.5">{reports.length} reports available</p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value)}
                className="h-9 px-3 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 focus:outline-none"
              >
                <option value="all">All Types</option>
                <option value="executive">Executive</option>
                <option value="compliance">Compliance</option>
                <option value="risk">Risk</option>
                <option value="process">Process</option>
              </select>
              <Button variant="ghost" size="icon" onClick={() => toast('info', 'Refreshing report list...')}>
                <RefreshCw size={14} />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y divide-slate-50 dark:divide-slate-800">
            {filtered.map((report, i) => {
              const config = typeConfig[report.type]
              return (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${config.color}`}>
                    <report.icon size={16} className={config.variant === 'info' ? 'text-blue-600' : config.variant === 'success' ? 'text-emerald-600' : 'text-red-600'} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{report.name}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Calendar size={10} />
                        {report.date}
                      </span>
                      {report.pages > 0 && (
                        <span className="text-xs text-slate-400">{report.pages} pages</span>
                      )}
                      <span className="text-xs text-slate-400">{report.size}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <Badge variant={config.variant} size="sm">{config.label}</Badge>
                    {report.status === 'ready' ? (
                      <Badge variant="success" size="sm">Ready</Badge>
                    ) : report.status === 'scheduled' ? (
                      <Badge variant="default" size="sm">Scheduled</Badge>
                    ) : (
                      <Badge variant="warning" size="sm">Generating</Badge>
                    )}

                    <div className="flex items-center gap-1">
                      {report.status === 'ready' && (
                        <>
                          <Button variant="ghost" size="icon" onClick={() => toast('info', 'Opening preview...', report.name)}>
                            <Eye size={14} />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDownload(report.name)}>
                            <Download size={14} />
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="icon">
                        <ChevronRight size={14} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
