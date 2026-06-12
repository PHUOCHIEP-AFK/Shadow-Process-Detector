import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, Cpu, CheckCircle2, AlertCircle, FileSpreadsheet, Workflow, RefreshCw, Sparkles } from 'lucide-react'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import { useToast } from '@/contexts/ToastContext'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'

const radarData = [
  { subject: 'Tuân thủ', value: 78 },
  { subject: 'Hiệu quả', value: 65 },
  { subject: 'Rủi ro', value: 42 },
  { subject: 'Minh bạch', value: 71 },
  { subject: 'Tự động hóa', value: 55 },
  { subject: 'Kiểm soát', value: 83 },
]

interface UploadedFile {
  name: string
  size: string
  type: 'csv' | 'bpmn' | 'xlsx'
}

export function ProcessDiscoveryPage() {
  const { toast } = useToast()
  const [csvFile, setCsvFile] = useState<UploadedFile | null>(null)
  const [bpmnFile, setBpmnFile] = useState<UploadedFile | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)
  const [progress, setProgress] = useState(0)
  const [dragOver, setDragOver] = useState<'csv' | 'bpmn' | null>(null)
  const csvRef = useRef<HTMLInputElement>(null)
  const bpmnRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (type: 'csv' | 'bpmn', file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase()
    const mock: UploadedFile = {
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      type: ext === 'bpmn' ? 'bpmn' : ext === 'xlsx' ? 'xlsx' : 'csv',
    }
    if (type === 'csv') setCsvFile(mock)
    else setBpmnFile(mock)
    toast('success', 'Tải lên thành công', `${file.name} sẵn sàng để phân tích`)
  }

  const handleDrop = (type: 'csv' | 'bpmn') => (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(null)
    const file = e.dataTransfer.files[0]
    if (file) handleFileUpload(type, file)
  }

  const handleAnalyze = async () => {
    if (!csvFile && !bpmnFile) {
      toast('warning', 'Chưa có file', 'Vui lòng tải lên ít nhất một file để phân tích')
      return
    }
    setAnalyzing(true)
    setProgress(0)
    const steps = [
      { p: 15, msg: 'Đang phân tích nhật ký sự kiện...' },
      { p: 35, msg: 'Trích xuất biến thể quy trình...' },
      { p: 55, msg: 'So sánh với mô hình tham chiếu...' },
      { p: 75, msg: 'Phát hiện hoạt động ngầm...' },
      { p: 90, msg: 'Tính toán điểm rủi ro...' },
      { p: 100, msg: 'Tạo thông tin chi tiết...' },
    ]
    for (const step of steps) {
      await new Promise(r => setTimeout(r, 600))
      setProgress(step.p)
    }
    setAnalyzing(false)
    setAnalyzed(true)
    toast('success', 'Phân tích hoàn tất!', 'Khám phá quy trình kết thúc với 37 phát hiện')
  }

  const metrics = [
    { label: 'Điểm sức khỏe quy trình', value: 72, color: 'blue' as const, icon: '🏥' },
    { label: 'Tỷ lệ tuân thủ', value: 78, color: 'green' as const, icon: '✅' },
    { label: 'Điểm rủi ro quy trình', value: 68, color: 'red' as const, icon: '⚠️' },
    { label: 'Tiềm năng tự động hóa', value: 55, color: 'purple' as const, icon: '🤖' },
  ]

  const findings = [
    { type: 'shadow', count: 37, label: 'Hoạt động ngầm', color: 'danger' as const },
    { type: 'variant', count: 14, label: 'Biến thể quy trình', color: 'warning' as const },
    { type: 'loop', count: 6, label: 'Vòng lặp quy trình', color: 'info' as const },
    { type: 'bottleneck', count: 9, label: 'Điểm tắc nghẽn', color: 'warning' as const },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Khu vực tải lên */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet size={18} className="text-blue-600" />
                Tải lên nhật ký sự kiện
              </CardTitle>
              <p className="text-xs text-slate-400 mt-1">Tải lên nhật ký sự kiện CSV hoặc Excel từ công cụ khai thác quy trình</p>
            </CardHeader>
            <CardContent>
              <div
                onDragOver={e => { e.preventDefault(); setDragOver('csv') }}
                onDragLeave={() => setDragOver(null)}
                onDrop={handleDrop('csv')}
                onClick={() => csvRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  dragOver === 'csv' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : csvFile ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <input ref={csvRef} type="file" accept=".csv,.xlsx,.xls" className="hidden"
                  onChange={e => e.target.files?.[0] && handleFileUpload('csv', e.target.files[0])} />
                {csvFile ? (
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle2 size={24} className="text-emerald-500" />
                    <div className="text-left">
                      <p className="font-medium text-sm text-slate-800 dark:text-slate-200">{csvFile.name}</p>
                      <p className="text-xs text-slate-400">{csvFile.size} • Sẵn sàng phân tích</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload size={28} className="mx-auto mb-3 text-slate-400" />
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Kéo thả nhật ký sự kiện vào đây</p>
                    <p className="text-xs text-slate-400 mt-1">Hỗ trợ CSV, XLSX • Tối đa 100MB</p>
                  </>
                )}
              </div>
              {csvFile && (
                <button onClick={e => { e.stopPropagation(); setCsvFile(null) }} className="mt-2 text-xs text-red-500 hover:text-red-700">
                  Xóa file
                </button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Workflow size={18} className="text-blue-600" />
                Mô hình quy trình BPMN
              </CardTitle>
              <p className="text-xs text-slate-400 mt-1">Tải lên mô hình quy trình BPMN chính thức để so sánh</p>
            </CardHeader>
            <CardContent>
              <div
                onDragOver={e => { e.preventDefault(); setDragOver('bpmn') }}
                onDragLeave={() => setDragOver(null)}
                onDrop={handleDrop('bpmn')}
                onClick={() => bpmnRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  dragOver === 'bpmn' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : bpmnFile ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <input ref={bpmnRef} type="file" accept=".bpmn,.xml" className="hidden"
                  onChange={e => e.target.files?.[0] && handleFileUpload('bpmn', e.target.files[0])} />
                {bpmnFile ? (
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle2 size={24} className="text-emerald-500" />
                    <div className="text-left">
                      <p className="font-medium text-sm text-slate-800 dark:text-slate-200">{bpmnFile.name}</p>
                      <p className="text-xs text-slate-400">{bpmnFile.size} • Sẵn sàng phân tích</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <FileText size={28} className="mx-auto mb-3 text-slate-400" />
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Kéo thả mô hình BPMN vào đây</p>
                    <p className="text-xs text-slate-400 mt-1">Hỗ trợ BPMN, XML</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <button
            onClick={() => {
              setCsvFile({ name: 'invoice_events_Q4_2025.csv', size: '2.4 MB', type: 'csv' })
              setBpmnFile({ name: 'invoice_approval_v3.bpmn', size: '48 KB', type: 'bpmn' })
              toast('info', 'Đã tải dữ liệu mẫu', 'Nhật ký sự kiện và mô hình BPMN mẫu đã được tải')
            }}
            className="w-full py-2.5 text-sm text-blue-600 dark:text-blue-400 border border-dashed border-blue-300 dark:border-blue-700 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
          >
            ✨ Tải dữ liệu mẫu để thử
          </button>

          <Button variant="primary" size="lg" className="w-full" leftIcon={<Sparkles size={16} />} loading={analyzing} onClick={handleAnalyze}>
            {analyzing ? 'Đang phân tích...' : 'Chạy phân tích AI'}
          </Button>

          <AnimatePresence>
            {analyzing && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5"><Cpu size={12} className="animate-spin" /> Đang xử lý...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} color="blue" size="md" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Khu vực kết quả */}
        <div className="space-y-4">
          {!analyzed && !analyzing && (
            <Card className="h-80">
              <CardContent className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                  <Cpu size={28} className="text-slate-400" />
                </div>
                <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Kết quả phân tích sẽ hiển thị tại đây</h3>
                <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
                  Tải lên nhật ký sự kiện và mô hình BPMN, sau đó nhấn "Chạy phân tích AI" để khám phá quy trình ẩn.
                </p>
              </CardContent>
            </Card>
          )}

          <AnimatePresence>
            {analyzed && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {findings.map((f, i) => (
                    <motion.div key={f.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
                      <Card className="p-4 text-center">
                        <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">{f.count}</p>
                        <Badge variant={f.color} size="sm">{f.label}</Badge>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle size={16} className="text-blue-600" />
                      Điểm phân tích
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {metrics.map(m => (
                      <div key={m.label}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                            <span>{m.icon}</span> {m.label}
                          </span>
                          <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{m.value}%</span>
                        </div>
                        <Progress value={m.value} color={m.color} size="sm" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle>Biểu đồ radar sức khỏe quy trình</CardTitle></CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="#1e293b" />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} />
                        <Radar name="Điểm" dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.2} strokeWidth={2} />
                        <Tooltip formatter={(v: any) => [`${v}%`, 'Điểm']} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Button variant="outline" size="md" leftIcon={<RefreshCw size={14} />} onClick={() => setAnalyzed(false)} className="w-full">
                  Đặt lại & phân tích file mới
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
