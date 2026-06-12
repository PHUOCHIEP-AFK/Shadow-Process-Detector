import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie, Legend
} from 'recharts'
import { Brain, Tool, Network, GitBranch, Users2, Layers } from 'lucide-react'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { toolUsageData } from '@/data/mockData'

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#F97316', '#EC4899']

const workflowVariations = [
  { name: 'Standard Flow', count: 312, percentage: 45, color: '#3B82F6' },
  { name: 'Email Shortcut', count: 187, percentage: 27, color: '#10B981' },
  { name: 'Manager Bypass', count: 98, percentage: 14, color: '#F59E0B' },
  { name: 'Multi-Approval', count: 67, percentage: 10, color: '#EF4444' },
  { name: 'Self-Approved', count: 28, percentage: 4, color: '#8B5CF6' },
]

const collaborationData = [
  { dept: 'Finance↔Procurement', strength: 87, interactions: 342 },
  { dept: 'HR↔Operations', strength: 64, interactions: 218 },
  { dept: 'IT↔All Depts', strength: 91, interactions: 567 },
  { dept: 'Legal↔Finance', strength: 72, interactions: 189 },
  { dept: 'Sales↔Operations', strength: 58, interactions: 143 },
  { dept: 'Procurement↔Legal', strength: 45, interactions: 98 },
]

const sankeyLike = [
  { from: 'Request Submitted', to: 'Official Approval', value: 312, color: '#3B82F6' },
  { from: 'Request Submitted', to: 'Email Chain', value: 189, color: '#F59E0B' },
  { from: 'Request Submitted', to: 'WhatsApp Group', value: 98, color: '#EF4444' },
  { from: 'Official Approval', to: 'Payment', value: 298, color: '#3B82F6' },
  { from: 'Email Chain', to: 'Payment', value: 156, color: '#F59E0B' },
  { from: 'WhatsApp Group', to: 'Payment', value: 84, color: '#EF4444' },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 shadow-xl">
        <p className="text-xs text-slate-400 mb-1.5 font-medium">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-xs font-semibold" style={{ color: p.fill || p.color }}>{p.name}: {p.value}</p>
        ))}
      </div>
    )
  }
  return null
}

export function WorkflowInsightsPage() {
  const [activeTab, setActiveTab] = useState<'tools' | 'variations' | 'collaboration'>('tools')

  const officialTools = toolUsageData.filter(t => t.official)
  const shadowTools = toolUsageData.filter(t => !t.official)

  const toolChartData = toolUsageData.sort((a, b) => b.users - a.users).slice(0, 8)

  return (
    <div className="p-6 space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Tools in Use', value: toolUsageData.length, sub: `${officialTools.length} official`, icon: '🔧' },
          { label: 'Shadow Tools', value: shadowTools.length, sub: 'Unofficial usage', icon: '🔴' },
          { label: 'Workflow Variants', value: 5, sub: 'Unique patterns', icon: '🔀' },
          { label: 'Active Teams', value: 7, sub: 'With shadow activity', icon: '👥' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
                <span className="text-lg">{s.icon}</span>
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{s.value}</p>
              <p className="text-xs text-slate-400 mt-1">{s.sub}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tab selector */}
      <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit">
        {[
          { id: 'tools' as const, label: '🔧 Tool Usage' },
          { id: 'variations' as const, label: '🔀 Workflow Variants' },
          { id: 'collaboration' as const, label: '🤝 Collaboration' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tool Usage Tab */}
      {activeTab === 'tools' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain size={16} className="text-blue-600" />
                Tool Usage by Employees
              </CardTitle>
              <p className="text-xs text-slate-400 mt-0.5">Official vs shadow tool comparison</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={toolChartData} layout="vertical" barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="tool" type="category" tick={{ fontSize: 10, fill: '#64748b' }} width={120} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="users" name="Users" radius={[0, 6, 6, 0]} maxBarSize={16}>
                    {toolChartData.map((entry, i) => (
                      <Cell key={i} fill={entry.official ? '#3B82F6' : '#EF4444'} opacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-500"><div className="w-3 h-3 rounded bg-blue-500" /> Official Tool</div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500"><div className="w-3 h-3 rounded bg-red-500" /> Shadow Tool</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shadow Tool Details</CardTitle>
              <p className="text-xs text-slate-400 mt-0.5">Unofficial tools detected in use</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {shadowTools.sort((a, b) => b.users - a.users).map((tool, i) => (
                <motion.div
                  key={tool.tool}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">
                      {tool.category === 'Communication' ? '💬' : tool.category === 'Data Tracking' ? '📊' : tool.category === 'Documentation' ? '📝' : '🔧'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{tool.tool}</p>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{tool.users} users</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="default" size="sm">{tool.category}</Badge>
                      <div className="flex-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full">
                        <div className="h-full bg-red-400 rounded-full" style={{ width: `${(tool.users / 312) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Workflow Variations Tab */}
      {activeTab === 'variations' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch size={16} className="text-purple-600" />
                Workflow Variation Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={workflowVariations}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={55}
                    dataKey="count"
                    nameKey="name"
                    label={({ name, percentage }) => `${percentage}%`}
                    labelLine={false}
                  >
                    {workflowVariations.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: any, name: any) => [`${v} occurrences`, name]} />
                  <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-xs text-slate-600 dark:text-slate-400">{v}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Process Flow Breakdown</CardTitle>
              <p className="text-xs text-slate-400 mt-0.5">How requests actually flow through the organization</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Simple Sankey-like visualization */}
              <div className="space-y-2 py-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Flow Paths</p>
                {sankeyLike.slice(0, 3).map((flow, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 w-28 truncate">{flow.from}</span>
                    <div className="flex-1 h-6 rounded-full flex items-center px-2" style={{ background: flow.color + '25', borderLeft: `3px solid ${flow.color}` }}>
                      <div className="h-2 rounded-full transition-all duration-700" style={{ width: `${(flow.value / 312) * 100}%`, background: flow.color }} />
                    </div>
                    <span className="text-xs text-slate-500 w-28 truncate text-right">{flow.to}</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 w-8 text-right">{flow.value}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3 pt-2">
                {workflowVariations.map((v, i) => (
                  <div key={v.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-600 dark:text-slate-400">{v.name}</span>
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{v.count} <span className="text-xs text-slate-400">({v.percentage}%)</span></span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${v.percentage}%` }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                        className="h-full rounded-full"
                        style={{ background: v.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Collaboration Tab */}
      {activeTab === 'collaboration' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network size={16} className="text-indigo-600" />
                Cross-Department Collaboration
              </CardTitle>
              <p className="text-xs text-slate-400 mt-0.5">Interaction strength between departments</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={collaborationData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[0, 100]} unit="%" />
                  <YAxis dataKey="dept" type="category" tick={{ fontSize: 10, fill: '#64748b' }} width={130} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="strength" name="Strength %" radius={[0, 6, 6, 0]} maxBarSize={16} fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users2 size={16} className="text-blue-600" />
                Collaboration Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {collaborationData.map((c, i) => (
                  <motion.div
                    key={c.dept}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="p-3 rounded-lg border border-slate-100 dark:border-slate-800"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{c.dept}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">{c.interactions} interactions</span>
                        <Badge
                          variant={c.strength >= 85 ? 'success' : c.strength >= 65 ? 'info' : 'default'}
                          size="sm"
                        >
                          {c.strength}%
                        </Badge>
                      </div>
                    </div>
                    <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${c.strength}%`, background: c.strength >= 85 ? '#10b981' : c.strength >= 65 ? '#3b82f6' : '#6366f1' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
