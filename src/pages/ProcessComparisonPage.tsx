import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ReactFlow, { Node, Edge, Background, Controls, MiniMap, NodeTypes, Handle, Position } from 'reactflow'
import 'reactflow/dist/style.css'
import { RefreshCw } from 'lucide-react'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const ProcessNode = ({ data }: { data: any }) => {
  const styles: Record<string, string> = {
    normal: 'bg-slate-800 border-slate-600 text-slate-200',
    added: 'bg-emerald-900/60 border-emerald-500 text-emerald-200',
    missing: 'bg-red-900/60 border-red-500 text-red-200',
    delayed: 'bg-yellow-900/60 border-yellow-500 text-yellow-200',
    loop: 'bg-purple-900/60 border-purple-500 text-purple-200',
    repeated: 'bg-orange-900/60 border-orange-500 text-orange-200',
  }
  const style = styles[data.variant || 'normal']
  return (
    <div className={`px-4 py-2.5 rounded-xl border-2 min-w-[140px] text-center text-xs font-medium shadow-lg ${style}`}>
      <Handle type="target" position={Position.Top} style={{ background: '#475569', width: 8, height: 8 }} />
      <div className="flex items-center justify-center gap-1.5">
        {data.icon && <span>{data.icon}</span>}
        <span>{data.label}</span>
      </div>
      {data.variant && data.variant !== 'normal' && (
        <div className="mt-1">
          {data.variant === 'added' && <span className="text-[9px] bg-emerald-600/30 px-1.5 py-0.5 rounded-full">+ Thêm vào</span>}
          {data.variant === 'missing' && <span className="text-[9px] bg-red-600/30 px-1.5 py-0.5 rounded-full">✗ Thiếu</span>}
          {data.variant === 'delayed' && <span className="text-[9px] bg-yellow-600/30 px-1.5 py-0.5 rounded-full">⏱ {data.delay}</span>}
          {data.variant === 'loop' && <span className="text-[9px] bg-purple-600/30 px-1.5 py-0.5 rounded-full">↻ Vòng lặp</span>}
          {data.variant === 'repeated' && <span className="text-[9px] bg-orange-600/30 px-1.5 py-0.5 rounded-full">⟳ Lặp lại</span>}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} style={{ background: '#475569', width: 8, height: 8 }} />
    </div>
  )
}

const nodeTypes: NodeTypes = { processNode: ProcessNode }

const officialNodes: Node[] = [
  { id: 'o1', type: 'processNode', position: { x: 80, y: 20 }, data: { label: 'Gửi yêu cầu', icon: '📝' } },
  { id: 'o2', type: 'processNode', position: { x: 80, y: 110 }, data: { label: 'Quản lý xem xét', icon: '👤' } },
  { id: 'o3', type: 'processNode', position: { x: 80, y: 200 }, data: { label: 'Phê duyệt tài chính', icon: '💰' } },
  { id: 'o4', type: 'processNode', position: { x: 80, y: 290 }, data: { label: 'Xử lý thanh toán', icon: '🏦' } },
  { id: 'o5', type: 'processNode', position: { x: 80, y: 380 }, data: { label: 'Lưu trữ & Đóng', icon: '📁' } },
]

const officialEdges: Edge[] = [
  { id: 'oe1', source: 'o1', target: 'o2', style: { stroke: '#475569', strokeWidth: 2 } },
  { id: 'oe2', source: 'o2', target: 'o3', style: { stroke: '#475569', strokeWidth: 2 } },
  { id: 'oe3', source: 'o3', target: 'o4', style: { stroke: '#475569', strokeWidth: 2 } },
  { id: 'oe4', source: 'o4', target: 'o5', style: { stroke: '#475569', strokeWidth: 2 } },
]

const actualNodes: Node[] = [
  { id: 'a1', type: 'processNode', position: { x: 80, y: 20 }, data: { label: 'Gửi yêu cầu', icon: '📝' } },
  { id: 'a2', type: 'processNode', position: { x: 80, y: 110 }, data: { label: 'Kiểm tra email', icon: '📧', variant: 'added' } },
  { id: 'a3', type: 'processNode', position: { x: 80, y: 200 }, data: { label: 'Quản lý xem xét', icon: '👤', variant: 'delayed', delay: '+2.4d' } },
  { id: 'a4', type: 'processNode', position: { x: 80, y: 290 }, data: { label: 'Gửi lại (Lặp)', icon: '🔄', variant: 'repeated' } },
  { id: 'a5', type: 'processNode', position: { x: 80, y: 380 }, data: { label: 'Phê duyệt tài chính', icon: '💰', variant: 'delayed', delay: '+1.8d' } },
  { id: 'a6', type: 'processNode', position: { x: 80, y: 470 }, data: { label: 'Xác nhận WhatsApp', icon: '💬', variant: 'added' } },
  { id: 'a7', type: 'processNode', position: { x: 80, y: 560 }, data: { label: 'Xử lý thanh toán', icon: '🏦' } },
]

const actualEdges: Edge[] = [
  { id: 'ae1', source: 'a1', target: 'a2', style: { stroke: '#10b981', strokeWidth: 2 } },
  { id: 'ae2', source: 'a2', target: 'a3', style: { stroke: '#475569', strokeWidth: 2 } },
  { id: 'ae3', source: 'a3', target: 'a4', style: { stroke: '#f97316', strokeWidth: 2, strokeDasharray: '4 2' } },
  { id: 'ae4', source: 'a4', target: 'a5', style: { stroke: '#475569', strokeWidth: 2 } },
  { id: 'ae5', source: 'a5', target: 'a6', style: { stroke: '#10b981', strokeWidth: 2 } },
  { id: 'ae6', source: 'a6', target: 'a7', style: { stroke: '#475569', strokeWidth: 2 } },
  { id: 'ae7', source: 'a3', target: 'a3', type: 'smoothstep', style: { stroke: '#a855f7', strokeWidth: 2 }, label: 'Vòng lặp', labelStyle: { fill: '#a855f7', fontSize: 10 } },
]

export function ProcessComparisonPage() {
  const [selectedProcess, setSelectedProcess] = useState('Phê duyệt hóa đơn')

  const deviations = [
    { type: 'added', count: 2, label: 'Bước thêm', color: 'success' as const, desc: 'Kiểm tra email, Xác nhận WhatsApp' },
    { type: 'missing', count: 1, label: 'Bước thiếu', color: 'danger' as const, desc: 'Lưu trữ & Đóng' },
    { type: 'repeated', count: 1, label: 'Hoạt động lặp', color: 'warning' as const, desc: 'Gửi lại' },
    { type: 'loop', count: 1, label: 'Vòng lặp', color: 'info' as const, desc: 'Vòng lặp quản lý' },
    { type: 'delayed', count: 2, label: 'Bước chậm trễ', color: 'warning' as const, desc: 'Tb. +4,2 ngày thêm' },
  ]

  return (
    <div className="p-6 space-y-4">
      {/* Chọn quy trình */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <select
            value={selectedProcess}
            onChange={e => setSelectedProcess(e.target.value)}
            className="h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {['Phê duyệt hóa đơn', 'Onboarding nhà cung cấp', 'Offboarding nhân viên', 'Xem xét hợp đồng'].map(p => (
              <option key={p}>{p}</option>
            ))}
          </select>
          <Badge variant="warning" size="md">5 sai lệch phát hiện</Badge>
        </div>
        <Button variant="outline" size="sm" leftIcon={<RefreshCw size={13} />}>
          Làm mới phân tích
        </Button>
      </div>

      {/* Tóm tắt sai lệch */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {deviations.map(d => (
          <Card key={d.type} className="p-3 text-center">
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">{d.count}</p>
            <Badge variant={d.color} size="sm">{d.label}</Badge>
            <p className="text-[10px] text-slate-400 mt-1 leading-tight">{d.desc}</p>
          </Card>
        ))}
      </div>

      {/* Sơ đồ song song */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <CardTitle className="text-sm">Quy trình chính thức</CardTitle>
            </div>
            <Badge variant="success" size="sm">Mô hình tham chiếu</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[520px] bg-slate-950 rounded-b-xl">
              <ReactFlow nodes={officialNodes} edges={officialEdges} nodeTypes={nodeTypes} fitView nodesDraggable={false} nodesConnectable={false} elementsSelectable={false} panOnScroll>
                <Background color="#1e293b" gap={20} size={1} />
                <Controls showInteractive={false} className="bg-slate-800 border-slate-700" />
              </ReactFlow>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <CardTitle className="text-sm">Quy trình thực tế của nhân viên</CardTitle>
            </div>
            <Badge variant="danger" size="sm">5 sai lệch</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[520px] bg-slate-950 rounded-b-xl">
              <ReactFlow nodes={actualNodes} edges={actualEdges} nodeTypes={nodeTypes} fitView nodesDraggable={false} nodesConnectable={false} elementsSelectable={false} panOnScroll>
                <Background color="#1e293b" gap={20} size={1} />
                <Controls showInteractive={false} className="bg-slate-800 border-slate-700" />
                <MiniMap nodeColor={(n) => {
                  const v = n.data?.variant
                  if (v === 'added') return '#10b981'
                  if (v === 'missing') return '#ef4444'
                  if (v === 'delayed') return '#f59e0b'
                  if (v === 'loop') return '#a855f7'
                  return '#475569'
                }} className="bg-slate-900 border-slate-700" />
              </ReactFlow>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chú thích */}
      <Card>
        <CardContent className="py-3">
          <div className="flex flex-wrap items-center gap-6">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Chú thích:</span>
            {[
              { color: 'bg-emerald-500', label: 'Bước thêm vào' },
              { color: 'bg-red-500', label: 'Bước bị thiếu' },
              { color: 'bg-yellow-500', label: 'Bị chậm trễ' },
              { color: 'bg-purple-500', label: 'Vòng lặp quy trình' },
              { color: 'bg-orange-500', label: 'Hoạt động lặp lại' },
              { color: 'bg-slate-600', label: 'Luồng bình thường' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className={`w-3 h-3 rounded ${l.color}`} />
                {l.label}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
