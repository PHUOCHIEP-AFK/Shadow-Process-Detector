import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Eye, Filter, Search, Download, RefreshCw,
  ChevronDown, ChevronUp, AlertTriangle, MoreHorizontal,
  TrendingUp, Users
} from 'lucide-react'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Input'
import { shadowProcesses } from '@/data/mockData'
import { getRiskBg, cn } from '@/lib/utils'
import { useToast } from '@/contexts/ToastContext'

type SortField = 'processName' | 'riskScore' | 'frequency' | 'impactLevel'
type SortDir = 'asc' | 'desc'

const impactOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 }

export function ShadowDetectionPage() {
  const { toast } = useToast()
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('All')
  const [riskFilter, setRiskFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortField, setSortField] = useState<SortField>('riskScore')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [expandedRow, setExpandedRow] = useState<number | null>(null)
  const [selected, setSelected] = useState<Set<number>>(new Set())

  const departments = ['All', ...Array.from(new Set(shadowProcesses.map(p => p.department)))]
  const riskLevels = ['All', 'Critical', 'High', 'Medium', 'Low']
  const statuses = ['All', 'Active', 'Under Review', 'Flagged', 'Resolved']

  const filtered = useMemo(() => {
    return shadowProcesses
      .filter(p => {
        if (search && !p.processName.toLowerCase().includes(search.toLowerCase()) &&
          !p.department.toLowerCase().includes(search.toLowerCase()) &&
          !p.hiddenActivity.toLowerCase().includes(search.toLowerCase())) return false
        if (deptFilter !== 'All' && p.department !== deptFilter) return false
        if (riskFilter !== 'All' && p.impactLevel !== riskFilter) return false
        if (statusFilter !== 'All' && p.status !== statusFilter) return false
        return true
      })
      .sort((a, b) => {
        let diff = 0
        if (sortField === 'riskScore') diff = a.riskScore - b.riskScore
        else if (sortField === 'frequency') diff = a.frequency - b.frequency
        else if (sortField === 'impactLevel') diff = (impactOrder[a.impactLevel as keyof typeof impactOrder] || 0) - (impactOrder[b.impactLevel as keyof typeof impactOrder] || 0)
        else diff = a.processName.localeCompare(b.processName)
        return sortDir === 'desc' ? -diff : diff
      })
  }, [search, deptFilter, riskFilter, statusFilter, sortField, sortDir])

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortField(field); setSortDir('desc') }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronDown size={12} className="text-slate-400" />
    return sortDir === 'desc' ? <ChevronDown size={12} className="text-blue-500" /> : <ChevronUp size={12} className="text-blue-500" />
  }

  const statusVariant = (s: string) => {
    if (s === 'Active') return 'danger'
    if (s === 'Under Review') return 'warning'
    if (s === 'Flagged') return 'info'
    if (s === 'Resolved') return 'success'
    return 'default'
  }

  const handleBulkAction = () => {
    if (selected.size === 0) { toast('warning', 'No items selected', 'Select rows first'); return }
    toast('success', `${selected.size} items flagged for review`, 'Status updated successfully')
    setSelected(new Set())
  }

  return (
    <div className="p-6 space-y-5">
      {/* Summary Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Detected', value: shadowProcesses.length, color: 'text-slate-900 dark:text-white' },
          { label: 'Critical Risk', value: shadowProcesses.filter(p => p.impactLevel === 'Critical').length, color: 'text-red-600' },
          { label: 'Active', value: shadowProcesses.filter(p => p.status === 'Active').length, color: 'text-orange-600' },
          { label: 'Resolved', value: shadowProcesses.filter(p => p.status === 'Resolved').length, color: 'text-emerald-600' },
        ].map(s => (
          <Card key={s.label} className="p-3">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex-1 flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search processes, activities..."
                  className="w-full h-9 pl-9 pr-4 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-2">
                <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}
                  className="h-9 px-3 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {departments.map(d => <option key={d}>{d}</option>)}
                </select>
                <select value={riskFilter} onChange={e => setRiskFilter(e.target.value)}
                  className="h-9 px-3 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {riskLevels.map(r => <option key={r}>{r}</option>)}
                </select>
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                  className="h-9 px-3 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {statuses.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {selected.size > 0 && (
                <Button variant="secondary" size="sm" onClick={handleBulkAction}>
                  Flag {selected.size} items
                </Button>
              )}
              <Button variant="outline" size="sm" leftIcon={<Download size={13} />}>Export</Button>
              <Button variant="ghost" size="icon" onClick={() => toast('info', 'Refreshing...', 'Scanning for new processes')}>
                <RefreshCw size={15} />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                  <th className="px-4 py-3 text-left">
                    <input type="checkbox"
                      checked={selected.size === filtered.length && filtered.length > 0}
                      onChange={e => setSelected(e.target.checked ? new Set(filtered.map(p => p.id)) : new Set())}
                      className="rounded border-slate-300 text-blue-600"
                    />
                  </th>
                  {[
                    { label: 'Process Name', field: 'processName' as SortField },
                    { label: 'Department', field: null },
                    { label: 'Hidden Activity', field: null },
                    { label: 'Frequency', field: 'frequency' as SortField },
                    { label: 'Impact Level', field: 'impactLevel' as SortField },
                    { label: 'Risk Score', field: 'riskScore' as SortField },
                    { label: 'Status', field: null },
                    { label: '', field: null },
                  ].map(col => (
                    <th
                      key={col.label}
                      onClick={() => col.field && toggleSort(col.field)}
                      className={cn(
                        'px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-left',
                        col.field && 'cursor-pointer hover:text-slate-700 dark:hover:text-slate-300 select-none'
                      )}
                    >
                      <span className="flex items-center gap-1">
                        {col.label}
                        {col.field && <SortIcon field={col.field} />}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filtered.map((process, i) => (
                    <React.Fragment key={process.id}>
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.04 }}
                        className={cn(
                          'border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors',
                          selected.has(process.id) && 'bg-blue-50 dark:bg-blue-900/10'
                        )}
                      >
                        <td className="px-4 py-3">
                          <input type="checkbox"
                            checked={selected.has(process.id)}
                            onChange={e => {
                              const next = new Set(selected)
                              e.target.checked ? next.add(process.id) : next.delete(process.id)
                              setSelected(next)
                            }}
                            className="rounded border-slate-300 text-blue-600"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{process.processName}</p>
                          <p className="text-xs text-slate-400">{process.lastDetected}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md">
                            {process.department}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-[180px] truncate">{process.hiddenActivity}</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300">
                            <TrendingUp size={12} className="text-slate-400" />
                            {process.frequency.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            variant={process.impactLevel === 'Critical' ? 'danger' : process.impactLevel === 'High' ? 'warning' : 'info'}
                          >
                            {process.impactLevel}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full w-14">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${process.riskScore}%`,
                                  background: process.riskScore >= 80 ? '#ef4444' : process.riskScore >= 60 ? '#f59e0b' : '#10b981'
                                }}
                              />
                            </div>
                            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 w-8">{process.riskScore}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={statusVariant(process.status) as any}>{process.status}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setExpandedRow(expandedRow === process.id ? null : process.id)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            <MoreHorizontal size={15} />
                          </button>
                        </td>
                      </motion.tr>

                      <AnimatePresence>
                        {expandedRow === process.id && (
                          <motion.tr
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <td colSpan={9} className="px-4 py-4 bg-blue-50/50 dark:bg-blue-900/10 border-b border-slate-100 dark:border-slate-800">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Process Details</p>
                                  <p className="text-sm text-slate-700 dark:text-slate-300">
                                    <span className="font-medium">Hidden Activity:</span> {process.hiddenActivity}
                                  </p>
                                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    <span className="font-medium">Affected Users:</span> {process.affectedUsers}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Risk Assessment</p>
                                  <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Risk Score: <span className="font-bold text-red-500">{process.riskScore}/100</span>
                                  </p>
                                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Impact: <span className="font-medium">{process.impactLevel}</span>
                                  </p>
                                </div>
                                <div className="flex items-end gap-2">
                                  <Button variant="outline" size="sm">View Full Report</Button>
                                  <Button variant="primary" size="sm">Flag for Review</Button>
                                </div>
                              </div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <Eye size={32} className="mx-auto mb-3 text-slate-300" />
              <p className="text-slate-500">No shadow processes match your filters</p>
            </div>
          )}

          <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <p className="text-xs text-slate-400">Showing {filtered.length} of {shadowProcesses.length} records</p>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map(p => (
                <button key={p} className={cn('w-7 h-7 rounded-lg text-xs font-medium', p === 1 ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800')}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
