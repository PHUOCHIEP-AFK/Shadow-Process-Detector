import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, ScatterChart, Scatter, ZAxis
} from 'recharts'
import { Zap, Clock, Users, AlertTriangle, TrendingDown, ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import { StatCard } from '@/components/ui/StatCard'
import { bottleneckData, heatmapData, resourceData } from '@/data/mockData'

const hours = ['8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM']
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

const getHeatColor = (value: number): string => {
  if (value >= 9) return 'bg-red-600 dark:bg-red-500'
  if (value >= 7) return 'bg-orange-500 dark:bg-orange-400'
  if (value >= 5) return 'bg-yellow-400 dark:bg-yellow-400'
  if (value >= 3) return 'bg-blue-300 dark:bg-blue-400'
  return 'bg-slate-200 dark:bg-slate-600'
}

const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 shadow-xl">
        <p className="text-xs text-slate-300 font-semibold mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-xs" style={{ color: p.fill }}>{p.name}: {p.value}{p.name.includes('Delay') ? 'h' : ''}</p>
        ))}
      </div>
    )
  }
  return null
}

export function BottleneckAnalysisPage() {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null)

  const kpis = [
    { title: 'Avg Process Delay', value: '3.7h', subtitle: 'Per bottleneck activity', icon: <Clock size={16} />, color: 'yellow' as const, trend: { value: -5.2 }, index: 0 },
    { title: 'Most Delayed Activity', value: 'Contract Sign-off', subtitle: '6.1h avg delay', icon: <AlertTriangle size={16} />, color: 'red' as const, index: 1 },
    { title: 'Critical Bottlenecks', value: '3', subtitle: 'Immediate action needed', icon: <Zap size={16} />, color: 'red' as const, index: 2 },
    { title: 'Overloaded Resources', value: '4', subtitle: '>80% utilization', icon: <Users size={16} />, color: 'yellow' as const, trend: { value: -12.1 }, index: 3 },
  ]

  const criticalPath = [
    'Submit Request', 'Manager Review', 'Finance Approval', 'Contract Sign-off', 'Legal Review', 'Payment'
  ]

  return (
    <div className="p-6 space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map(k => <StatCard key={k.title} {...k} />)}
      </div>

      {/* Main charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Bottleneck severity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap size={16} className="text-yellow-500" />
              Bottleneck Severity Analysis
            </CardTitle>
            <p className="text-xs text-slate-400 mt-0.5">Average vs max delay by activity</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={bottleneckData} layout="vertical" barGap={3}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#64748b' }} unit="h" axisLine={false} tickLine={false} />
                <YAxis dataKey="activity" type="category" tick={{ fontSize: 10, fill: '#64748b' }} width={130} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar dataKey="avgDelay" name="Avg Delay" radius={[0, 4, 4, 0]} maxBarSize={14}>
                  {bottleneckData.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={entry.severity === 'critical' ? '#ef4444' : entry.severity === 'high' ? '#f97316' : '#f59e0b'}
                      opacity={selectedActivity === entry.activity ? 1 : 0.85}
                      cursor="pointer"
                      onClick={() => setSelectedActivity(selectedActivity === entry.activity ? null : entry.activity)}
                    />
                  ))}
                </Bar>
                <Bar dataKey="maxDelay" name="Max Delay" fill="#1e293b" radius={[0, 4, 4, 0]} maxBarSize={14} opacity={0.5} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bottleneck Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown size={16} className="text-red-500" />
              Activity Bottleneck Heatmap
            </CardTitle>
            <p className="text-xs text-slate-400 mt-0.5">Congestion level by time and day</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              {/* Header */}
              <div className="flex items-center gap-1 mb-2 pl-12">
                {days.map(d => (
                  <div key={d} className="flex-1 text-center text-xs font-medium text-slate-500 dark:text-slate-400">{d}</div>
                ))}
              </div>
              {/* Grid */}
              {heatmapData.map(row => (
                <div key={row.hour} className="flex items-center gap-1 mb-1">
                  <span className="w-10 text-right text-[10px] text-slate-400 pr-2 flex-shrink-0">{row.hour}</span>
                  {days.map(day => {
                    const val = row[day as keyof typeof row] as number
                    return (
                      <div
                        key={day}
                        title={`${row.hour} ${day}: ${val} bottlenecks`}
                        className={`flex-1 h-7 rounded cursor-pointer transition-transform hover:scale-110 ${getHeatColor(val)}`}
                      />
                    )
                  })}
                </div>
              ))}
              {/* Legend */}
              <div className="flex items-center gap-2 mt-3 justify-end">
                <span className="text-[10px] text-slate-400">Low</span>
                {['bg-slate-200', 'bg-blue-300', 'bg-yellow-400', 'bg-orange-500', 'bg-red-600'].map(c => (
                  <div key={c} className={`w-5 h-3 rounded ${c}`} />
                ))}
                <span className="text-[10px] text-slate-400">High</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Resource Utilization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={16} className="text-blue-600" />
              Resource Utilization
            </CardTitle>
            <p className="text-xs text-slate-400 mt-0.5">Capacity usage by team</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {resourceData.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-slate-700 dark:text-slate-300">{r.name}</span>
                  <div className="flex items-center gap-2">
                    {r.utilization >= 90 && <Badge variant="danger" size="sm">Overloaded</Badge>}
                    {r.utilization >= 80 && r.utilization < 90 && <Badge variant="warning" size="sm">High</Badge>}
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{r.utilization}%</span>
                  </div>
                </div>
                <Progress
                  value={r.utilization}
                  color={r.utilization >= 90 ? 'red' : r.utilization >= 80 ? 'yellow' : 'green'}
                  size="md"
                />
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Critical Path */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-orange-500" />
              Critical Path Analysis
            </CardTitle>
            <p className="text-xs text-slate-400 mt-0.5">Invoice Approval Process — Longest execution path</p>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100 dark:bg-slate-800" />
              {criticalPath.map((step, i) => {
                const bottleneck = bottleneckData.find(b => b.activity.includes(step.split(' ')[0]))
                const isCritical = bottleneck?.severity === 'critical'
                return (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative flex items-center gap-4 pb-5 last:pb-0"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 ${
                      isCritical
                        ? 'bg-red-500 border-red-400 text-white'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500'
                    }`}>
                      {isCritical ? <AlertTriangle size={12} /> : <span className="text-xs font-bold">{i + 1}</span>}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${isCritical ? 'text-red-500' : 'text-slate-700 dark:text-slate-300'}`}>{step}</p>
                        {bottleneck && (
                          <span className="text-xs text-slate-400">+{bottleneck.avgDelay}h avg</span>
                        )}
                      </div>
                      {isCritical && (
                        <p className="text-xs text-red-400 mt-0.5">Critical bottleneck — immediate action required</p>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
