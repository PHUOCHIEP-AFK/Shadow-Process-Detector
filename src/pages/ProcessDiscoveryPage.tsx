import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Upload, FileText, Cpu, CheckCircle2, AlertCircle,
  FileSpreadsheet, Workflow, ChevronRight, RefreshCw, Sparkles
} from 'lucide-react'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import { useToast } from '@/contexts/ToastContext'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'

const radarData = [
  { subject: 'Compliance', value: 78 },
  { subject: 'Efficiency', value: 65 },
  { subject: 'Risk', value: 42 },
  { subject: 'Transparency', value: 71 },
  { subject: 'Automation', value: 55 },
  { subject: 'Control', value: 83 },
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
    toast('success', 'File uploaded', `${file.name} ready for analysis`)
  }

  const handleDrop = (type: 'csv' | 'bpmn') => (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(null)
    const file = e.dataTransfer.files[0]
    if (file) handleFileUpload(type, file)
  }

  const handleAnalyze = async () => {
    if (!csvFile && !bpmnFile) {
      toast('warning', 'No files uploaded', 'Please upload at least one file to analyze')
      return
    }
    setAnalyzing(true)
    setProgress(0)
    const steps = [
      { p: 15, msg: 'Parsing event logs...' },
      { p: 35, msg: 'Extracting process variants...' },
      { p: 55, msg: 'Comparing with reference model...' },
      { p: 75, msg: 'Detecting shadow activities...' },
      { p: 90, msg: 'Calculating risk scores...' },
      { p: 100, msg: 'Generating insights...' },
    ]
    for (const step of steps) {
      await new Promise(r => setTimeout(r, 600))
      setProgress(step.p)
    }
    setAnalyzing(false)
    setAnalyzed(true)
    toast('success', 'Analysis complete!', 'Process discovery finished with 37 findings')
  }

  const metrics = [
    { label: 'Process Health Score', value: 72, color: 'blue' as const, icon: '🏥' },
    { label: 'Compliance Rate', value: 78, color: 'green' as const, icon: '✅' },
    { label: 'Process Risk Score', value: 68, color: 'red' as const, icon: '⚠️' },
    { label: 'Automation Potential', value: 55, color: 'purple' as const, icon: '🤖' },
  ]

  const findings = [
    { type: 'shadow', count: 37, label: 'Shadow Activities', color: 'danger' as const },
    { type: 'variant', count: 14, label: 'Process Variants', color: 'warning' as const },
    { type: 'loop', count: 6, label: 'Process Loops', color: 'info' as const },
    { type: 'bottleneck', count: 9, label: 'Bottlenecks', color: 'warning' as const },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet size={18} className="text-blue-600" />
                Event Log Upload
              </CardTitle>
              <p className="text-xs text-slate-400 mt-1">Upload CSV or Excel event logs from your process mining tool</p>
            </CardHeader>
            <CardContent>
              <div
                onDragOver={e => { e.preventDefault(); setDragOver('csv') }}
                onDragLeave={() => setDragOver(null)}
                onDrop={handleDrop('csv')}
                onClick={() => csvRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  dragOver === 'csv'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : csvFile
                    ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
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
                      <p className="text-xs text-slate-400">{csvFile.size} • Ready to analyze</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload size={28} className="mx-auto mb-3 text-slate-400" />
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Drop your event log here</p>
                    <p className="text-xs text-slate-400 mt-1">CSV, XLSX supported • Max 100MB</p>
                  </>
                )}
              </div>
              {csvFile && (
                <button
                  onClick={e => { e.stopPropagation(); setCsvFile(null) }}
                  className="mt-2 text-xs text-red-500 hover:text-red-700"
                >
                  Remove file
                </button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Workflow size={18} className="text-blue-600" />
                BPMN Process Model
              </CardTitle>
              <p className="text-xs text-slate-400 mt-1">Upload the official BPMN process model for comparison</p>
            </CardHeader>
            <CardContent>
              <div
                onDragOver={e => { e.preventDefault(); setDragOver('bpmn') }}
                onDragLeave={() => setDragOver(null)}
                onDrop={handleDrop('bpmn')}
                onClick={() => bpmnRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  dragOver === 'bpmn'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : bpmnFile
                    ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
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
                      <p className="text-xs text-slate-400">{bpmnFile.size} • Ready to analyze</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <FileText size={28} className="mx-auto mb-3 text-slate-400" />
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Drop your BPMN model here</p>
                    <p className="text-xs text-slate-400 mt-1">BPMN, XML supported</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick demo load */}
          <button
            onClick={() => {
              setCsvFile({ name: 'invoice_events_Q4_2025.csv', size: '2.4 MB', type: 'csv' })
              setBpmnFile({ name: 'invoice_approval_v3.bpmn', size: '48 KB', type: 'bpmn' })
              toast('info', 'Demo data loaded', 'Sample event log and BPMN model loaded')
            }}
            className="w-full py-2.5 text-sm text-blue-600 dark:text-blue-400 border border-dashed border-blue-300 dark:border-blue-700 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
          >
            ✨ Load demo data instead
          </button>

          {/* Analyze button */}
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            leftIcon={<Sparkles size={16} />}
            loading={analyzing}
            onClick={handleAnalyze}
          >
            {analyzing ? 'Analyzing...' : 'Run AI Analysis'}
          </Button>

          {/* Progress bar */}
          <AnimatePresence>
            {analyzing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5"><Cpu size={12} className="animate-spin" /> Processing...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} color="blue" size="md" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {!analyzed && !analyzing && (
            <Card className="h-80">
              <CardContent className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                  <Cpu size={28} className="text-slate-400" />
                </div>
                <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Analysis Results Will Appear Here</h3>
                <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
                  Upload your event logs and BPMN model, then click "Run AI Analysis" to discover hidden processes and inefficiencies.
                </p>
              </CardContent>
            </Card>
          )}

          <AnimatePresence>
            {analyzed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Findings summary */}
                <div className="grid grid-cols-2 gap-3">
                  {findings.map((f, i) => (
                    <motion.div
                      key={f.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Card className="p-4 text-center">
                        <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">{f.count}</p>
                        <Badge variant={f.color} size="sm">{f.label}</Badge>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Health Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle size={16} className="text-blue-600" />
                      Analysis Scores
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

                {/* Radar chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Process Health Radar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="#1e293b" />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} />
                        <Radar name="Score" dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.2} strokeWidth={2} />
                        <Tooltip formatter={(v: any) => [`${v}%`, 'Score']} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Button
                  variant="outline"
                  size="md"
                  leftIcon={<RefreshCw size={14} />}
                  onClick={() => setAnalyzed(false)}
                  className="w-full"
                >
                  Reset & Analyze New Files
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
