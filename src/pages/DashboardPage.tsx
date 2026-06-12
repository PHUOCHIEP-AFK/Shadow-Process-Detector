import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import {
  Layers, AlertTriangle, CheckCircle, Zap, TrendingUp,
  Activity, ArrowRight, Clock
} from 'lucide-react'
import { StatCard } from '@/components/ui/StatCard'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import {
  kpiData, complianceTrendData, departmentRiskData,
  shadowGrowthData, recentActivity
} from '@/data/mockData'
import { useNavigate } from 'react-router-dom'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 shadow-xl">
        <p className="text-xs text-slate-400 mb-1.5 font-medium">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-xs font-semibold" style={{ color: p.color }}>
            {p.name}: {p.value}%
          </p>
        ))}
      </div>
    )
  }
  return null
}

const activityColors: Record<string, string> = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  warning: 'bg-yellow-500',
  info: 'bg-blue-500',
  success: 'bg-emerald-500',
}

const activityBadge: Record<string, 'danger' | 'warning' | 'info' | 'success'> = {
  critical: 'danger',
  high: 'warning',
  warning: 'warning',
  info: 'info',
  success: 'success',
}

const severityLabel: Record<string, string> = {
  critical: 'Nghiêm trọng',
  high: 'Cao',
  warning: 'Cảnh báo',
  info: 'Thông tin',
  success: 'Thành công',
}

export function DashboardPage() {
  const navigate = useNavigate()
  const [timeRange, setTimeRange] = useState('12m')

  const stats = [
    { title: 'Tổng quy trình', value: kpiData.totalProcesses, subtitle: '+12 tháng này', icon: <Layers size={16} />, color: 'blue' as const, trend: { value: 5.1 }, index: 0 },
    { title: 'Quy trình ngầm', value: kpiData.shadowProcesses, subtitle: '+4 tuần này', icon: <AlertTriangle size={16} />, color: 'red' as const, trend: { value: 12.1 }, index: 1 },
    { title: 'Điểm tuân thủ', value: `${kpiData.complianceScore}%`, subtitle: 'so với 74,2% tháng trước', icon: <CheckCircle size={16} />, color: 'green' as const, trend: { value: 4.2 }, index: 2 },
    { title: 'Điểm tắc nghẽn', value: kpiData.bottlenecks, subtitle: '3 nghiêm trọng, 6 cao', icon: <Zap size={16} />, color: 'yellow' as const, trend: { value: -8.3 }, index: 3 },
    { title: 'Quy trình rủi ro cao', value: kpiData.highRiskProcesses, subtitle: 'Cần xem xét ngay', icon: <Activity size={16} />, color: 'red' as const, trend: { value: 2.5 }, index: 4 },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Tiêu đề */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Thứ Sáu, 12 tháng 6 năm 2026 • Lần quét cuối: <span className="text-blue-600">2 phút trước</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          {['7d', '30d', '12m'].map(r => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                timeRange === r
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-500 hover:text-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {r}
            </button>
          ))}
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Activity size={13} />}
            onClick={() => navigate('/process-discovery')}
          >
            Quét mới
          </Button>
        </div>
      </div>

      {/* Thẻ KPI */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map(s => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      {/* Hàng biểu đồ 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Xu hướng tuân thủ */}
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Xu Hướng Tuân Thủ Quy Trình</CardTitle>
              <p className="text-xs text-slate-400 mt-0.5">Quy trình chính thức so với thực tế theo thời gian</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-blue-500 inline-block rounded" /> Chính thức</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-emerald-500 inline-block rounded" /> Thực tế</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-slate-400 border-dashed border-t border-slate-400 inline-block" /> Mục tiêu</span>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={complianceTrendData}>
                <defs>
                  <linearGradient id="colorOfficial" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[50, 100]} unit="%" />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="official" stroke="#3B82F6" strokeWidth={2} fill="url(#colorOfficial)" name="Chính thức" />
                <Area type="monotone" dataKey="actual" stroke="#10B981" strokeWidth={2} fill="url(#colorActual)" name="Thực tế" />
                <Line type="monotone" dataKey="target" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Mục tiêu" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Xếp hạng rủi ro phòng ban */}
        <Card>
          <CardHeader>
            <CardTitle>Xếp Hạng Rủi Ro Phòng Ban</CardTitle>
            <p className="text-xs text-slate-400 mt-0.5">Theo điểm rủi ro</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {departmentRiskData.sort((a, b) => b.riskScore - a.riskScore).map((d, i) => (
              <div key={d.dept} className="flex items-center gap-3">
                <span className="text-xs text-slate-400 w-4">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">{d.dept}</span>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{d.riskScore}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${d.riskScore}%`,
                        background: d.riskScore > 80 ? '#ef4444' : d.riskScore > 65 ? '#f59e0b' : '#10b981'
                      }}
                    />
                  </div>
                </div>
                <span className="text-xs text-slate-400 w-10 text-right">{d.shadowCount} 👥</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Hàng biểu đồ 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Tăng trưởng quy trình ngầm */}
        <Card>
          <CardHeader>
            <CardTitle>Tăng Trưởng Quy Trình Ngầm</CardTitle>
            <p className="text-xs text-slate-400 mt-0.5">Phát hiện so với đã giải quyết mỗi tuần</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={shadowGrowthData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="detected" fill="#ef4444" radius={[4, 4, 0, 0]} name="Phát hiện" maxBarSize={20} />
                <Bar dataKey="resolved" fill="#10b981" radius={[4, 4, 0, 0]} name="Đã giải quyết" maxBarSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Hoạt động gần đây */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Hoạt Động Gần Đây</CardTitle>
              <p className="text-xs text-slate-400 mt-0.5">Các phát hiện và cập nhật mới nhất</p>
            </div>
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight size={12} />} onClick={() => navigate('/shadow-detection')}>
              Xem tất cả
            </Button>
          </CardHeader>
          <CardContent className="space-y-1">
            {recentActivity.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 py-2.5 border-b border-slate-50 dark:border-slate-800 last:border-0"
              >
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${activityColors[item.severity]}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-snug">{item.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock size={10} className="text-slate-400" />
                    <span className="text-xs text-slate-400">{item.time}</span>
                  </div>
                </div>
                <Badge variant={activityBadge[item.severity] || 'default'} size="sm">
                  {severityLabel[item.severity] || item.severity}
                </Badge>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Thao tác nhanh */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Phân tích quy trình mới', icon: TrendingUp, path: '/process-discovery' },
          { label: 'So sánh quy trình', icon: Activity, path: '/process-comparison' },
          { label: 'Xem tắc nghẽn', icon: Zap, path: '/bottleneck-analysis' },
          { label: 'Đề xuất AI', icon: CheckCircle, path: '/ai-recommendations' },
        ].map(a => (
          <button
            key={a.label}
            onClick={() => navigate(a.path)}
            className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all group text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <a.icon size={15} className="text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
