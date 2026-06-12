import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Lightbulb, Clock, DollarSign, ChevronDown, ChevronUp,
  Zap, Target, TrendingUp, Star, Filter
} from 'lucide-react'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { aiRecommendations } from '@/data/mockData'
import { formatCurrency } from '@/lib/utils'
import { useToast } from '@/contexts/ToastContext'

const difficultyConfig = {
  Low: { color: 'success' as const, icon: '🟢' },
  Medium: { color: 'warning' as const, icon: '🟡' },
  High: { color: 'danger' as const, icon: '🔴' },
}

const categoryColors: Record<string, string> = {
  'Process Optimization': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Automation': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'Process Simplification': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  'Standardization': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  'Governance': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

export function AIRecommendationsPage() {
  const { toast } = useToast()
  const [expanded, setExpanded] = useState<number | null>(null)
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [difficultyFilter, setDifficultyFilter] = useState('All')
  const [sortBy, setSortBy] = useState<'roi' | 'cost' | 'time'>('roi')
  const [implemented, setImplemented] = useState<Set<number>>(new Set())

  const categories = ['All', ...Array.from(new Set(aiRecommendations.map(r => r.category)))]
  const difficulties = ['All', 'Low', 'Medium', 'High']

  const filtered = aiRecommendations
    .filter(r => {
      if (categoryFilter !== 'All' && r.category !== categoryFilter) return false
      if (difficultyFilter !== 'All' && r.difficulty !== difficultyFilter) return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'roi') return b.roi - a.roi
      if (sortBy === 'cost') return b.costSaving - a.costSaving
      return b.timeSaving - a.timeSaving
    })

  const totalTimeSaving = aiRecommendations.reduce((s, r) => s + r.timeSaving, 0)
  const totalCostSaving = aiRecommendations.reduce((s, r) => s + r.costSaving, 0)
  const avgROI = Math.round(aiRecommendations.reduce((s, r) => s + r.roi, 0) / aiRecommendations.length)

  const handleImplement = (id: number, title: string) => {
    const next = new Set(implemented)
    if (next.has(id)) {
      next.delete(id)
      toast('info', 'Marked as pending', title)
    } else {
      next.add(id)
      toast('success', 'Implementation started!', title)
    }
    setImplemented(next)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-5 text-white"
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-blue-200" />
            <p className="text-sm text-blue-100">Total Time Savings</p>
          </div>
          <p className="text-4xl font-bold">{totalTimeSaving.toFixed(1)}h</p>
          <p className="text-xs text-blue-200 mt-1">Per week across all recommendations</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl p-5 text-white"
        >
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={16} className="text-emerald-200" />
            <p className="text-sm text-emerald-100">Annual Cost Savings</p>
          </div>
          <p className="text-4xl font-bold">{formatCurrency(totalCostSaving)}</p>
          <p className="text-xs text-emerald-200 mt-1">Combined potential savings</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-600 to-violet-700 rounded-xl p-5 text-white"
        >
          <div className="flex items-center gap-2 mb-2">
            <Star size={16} className="text-purple-200" />
            <p className="text-sm text-purple-100">Average ROI Score</p>
          </div>
          <p className="text-4xl font-bold">{avgROI}</p>
          <p className="text-xs text-purple-200 mt-1">Weighted across all recommendations</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Filter size={14} />
          <span>Filter:</span>
        </div>
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
          className="h-9 px-3 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={difficultyFilter} onChange={e => setDifficultyFilter(e.target.value)}
          className="h-9 px-3 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {difficulties.map(d => <option key={d}>{d}</option>)}
        </select>
        <div className="flex items-center gap-1 ml-auto text-sm text-slate-500">
          <span>Sort by:</span>
          {['roi', 'cost', 'time'].map(s => (
            <button
              key={s}
              onClick={() => setSortBy(s as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                sortBy === s ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700'
              }`}
            >
              {s === 'roi' ? 'ROI' : s === 'cost' ? 'Cost Saving' : 'Time Saving'}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filtered.map((rec, i) => {
            const diff = difficultyConfig[rec.difficulty as keyof typeof difficultyConfig]
            const isExpanded = expanded === rec.id
            const isImplemented = implemented.has(rec.id)

            return (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className={isImplemented ? 'border-emerald-300 dark:border-emerald-700 opacity-75' : ''}>
                  <div
                    className="p-5 cursor-pointer"
                    onClick={() => setExpanded(isExpanded ? null : rec.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Lightbulb size={18} className="text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <h3 className="font-semibold text-slate-900 dark:text-slate-100">{rec.title}</h3>
                              {isImplemented && <Badge variant="success" size="sm">✓ Implementing</Badge>}
                            </div>
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[rec.category] || 'bg-slate-100 text-slate-600'}`}>
                              {rec.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              onClick={e => { e.stopPropagation(); handleImplement(rec.id, rec.title) }}
                              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                                isImplemented
                                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                  : 'bg-blue-600 text-white hover:bg-blue-700'
                              }`}
                            >
                              {isImplemented ? '✓ Started' : 'Implement'}
                            </button>
                            {isExpanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                          </div>
                        </div>

                        {/* Key Metrics Row */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                          <div className="flex items-center gap-2">
                            <Clock size={13} className="text-slate-400 flex-shrink-0" />
                            <div>
                              <p className="text-xs text-slate-400">Time Saving</p>
                              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{rec.timeSaving}h/week</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign size={13} className="text-slate-400 flex-shrink-0" />
                            <div>
                              <p className="text-xs text-slate-400">Cost Saving</p>
                              <p className="text-sm font-semibold text-emerald-600">{formatCurrency(rec.costSaving)}/yr</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Zap size={13} className="text-slate-400 flex-shrink-0" />
                            <div>
                              <p className="text-xs text-slate-400">Difficulty</p>
                              <Badge variant={diff.color} size="sm">{diff.icon} {rec.difficulty}</Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Target size={13} className="text-slate-400 flex-shrink-0" />
                            <div>
                              <p className="text-xs text-slate-400">ROI Score</p>
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{rec.roi}</span>
                                <div className="w-12 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${rec.roi}%` }} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 border-t border-slate-100 dark:border-slate-800 pt-4 space-y-4">
                          <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Description</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{rec.description}</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Affected Processes</p>
                              <div className="flex flex-wrap gap-2">
                                {rec.processes.map(p => (
                                  <span key={p} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg">{p}</span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tags</p>
                              <div className="flex flex-wrap gap-2">
                                {rec.tags.map(t => (
                                  <span key={t} className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg border border-blue-200 dark:border-blue-800">{t}</span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">ROI Breakdown</p>
                            <div className="grid grid-cols-3 gap-3">
                              {[
                                { label: 'Time ROI', value: rec.roi - 5, color: 'blue' as const },
                                { label: 'Cost ROI', value: rec.roi + 3, color: 'green' as const },
                                { label: 'Risk ROI', value: rec.roi - 8, color: 'purple' as const },
                              ].map(m => (
                                <div key={m.label} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                                  <p className="text-xs text-slate-400 mb-1">{m.label}</p>
                                  <p className="text-lg font-bold text-slate-800 dark:text-slate-200">{m.value}</p>
                                  <Progress value={m.value} color={m.color} size="sm" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
