import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users, Shield, Building2, Plug, ScrollText,
  Plus, Edit2, Trash2, Eye, EyeOff, Check, X,
  ChevronRight, Search
} from 'lucide-react'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/contexts/ToastContext'

const users = [
  { id: 1, name: 'Nguyễn Văn An', email: 'an.nguyen@congty.com', role: 'Quản trị viên', dept: 'CNTT', status: 'Hoạt động', avatar: 'AN' },
  { id: 2, name: 'Trần Thị Bích', email: 't.bich@congty.com', role: 'Quản lý quy trình', dept: 'Vận hành', status: 'Hoạt động', avatar: 'TB' },
  { id: 3, name: 'Lê Minh Cường', email: 'm.cuong@congty.com', role: 'Phân tích viên', dept: 'Tài chính', status: 'Hoạt động', avatar: 'MC' },
  { id: 4, name: 'Phạm Thu Hà', email: 't.ha@congty.com', role: 'Giám đốc điều hành', dept: 'Ban lãnh đạo', status: 'Hoạt động', avatar: 'TH' },
  { id: 5, name: 'Hoàng Đức Dũng', email: 'd.dung@congty.com', role: 'Trưởng phòng', dept: 'Mua sắm', status: 'Không hoạt động', avatar: 'DD' },
]

const roles = [
  { name: 'Quản trị viên', permissions: ['Toàn quyền', 'Quản lý người dùng', 'Báo cáo', 'Cài đặt'], count: 2, color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
  { name: 'Quản lý quy trình', permissions: ['Khám phá quy trình', 'So sánh', 'Báo cáo'], count: 5, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  { name: 'Phân tích viên', permissions: ['Xem tất cả', 'Phát hiện ngầm', 'Đề xuất AI'], count: 12, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  { name: 'Trưởng phòng', permissions: ['Xem báo cáo phòng', 'Thông tin'], count: 8, color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
  { name: 'Giám đốc', permissions: ['Bảng điều khiển', 'Báo cáo lãnh đạo'], count: 4, color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  { name: 'Chỉ xem', permissions: ['Xem bảng điều khiển', 'Xem báo cáo'], count: 18, color: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' },
]

const integrations = [
  { name: 'SAP ERP', status: 'connected', icon: '🟢', lastSync: '2 phút trước', type: 'ERP' },
  { name: 'Celonis Process Mining', status: 'connected', icon: '🟢', lastSync: '5 phút trước', type: 'Khai thác quy trình' },
  { name: 'Microsoft 365', status: 'connected', icon: '🟢', lastSync: '1 giờ trước', type: 'Năng suất' },
  { name: 'Salesforce', status: 'disconnected', icon: '🔴', lastSync: 'Chưa kết nối', type: 'CRM' },
  { name: 'Jira', status: 'connected', icon: '🟢', lastSync: '30 phút trước', type: 'Quản lý dự án' },
  { name: 'Slack', status: 'connected', icon: '🟢', lastSync: 'Thời gian thực', type: 'Giao tiếp' },
  { name: 'ServiceNow', status: 'disconnected', icon: '🔴', lastSync: 'Chưa kết nối', type: 'ITSM' },
]

const auditLogs = [
  { user: 'Nguyễn Văn An', action: 'Xuất báo cáo tuân thủ', time: '2 phút trước', severity: 'info' },
  { user: 'Trần Thị Bích', action: 'Thay đổi cài đặt so sánh quy trình', time: '15 phút trước', severity: 'warning' },
  { user: 'Hệ thống', action: 'Quét tự động hoàn tất — 37 phát hiện', time: '2 giờ trước', severity: 'info' },
  { user: 'Lê Minh Cường', action: 'Truy cập dữ liệu phát hiện ngầm', time: '3 giờ trước', severity: 'info' },
  { user: 'Phạm Thu Hà', action: 'Tạo báo cáo lãnh đạo', time: '5 giờ trước', severity: 'info' },
  { user: 'Hệ thống', action: 'Người dùng Hoàng Đức Dũng bị vô hiệu hóa', time: '1 ngày trước', severity: 'warning' },
  { user: 'Nguyễn Văn An', action: 'Cập nhật quyền vai trò cho Phân tích viên', time: '2 ngày trước', severity: 'critical' },
]

const severityLabel: Record<string, string> = {
  critical: 'Nghiêm trọng',
  warning: 'Cảnh báo',
  info: 'Thông tin',
}

const tabs = [
  { id: 'users', label: 'Người dùng', icon: Users },
  { id: 'roles', label: 'Vai trò & Quyền', icon: Shield },
  { id: 'departments', label: 'Phòng ban', icon: Building2 },
  { id: 'integrations', label: 'Tích hợp', icon: Plug },
  { id: 'audit', label: 'Nhật ký kiểm tra', icon: ScrollText },
]

export function SettingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState('users')
  const [searchUser, setSearchUser] = useState('')
  const [showApiKey, setShowApiKey] = useState(false)

  const filteredUsers = users.filter(u =>
    !searchUser || u.name.toLowerCase().includes(searchUser.toLowerCase()) || u.email.includes(searchUser)
  )

  const departments = ['Tài chính', 'Mua sắm', 'Nhân sự', 'CNTT', 'Vận hành', 'Kinh doanh', 'Pháp lý', 'Ban lãnh đạo']

  return (
    <div className="p-6 space-y-5">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Tab bên trái */}
        <div className="lg:w-56 flex-shrink-0">
          <Card>
            <CardContent className="p-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <tab.icon size={15} />
                  {tab.label}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Nội dung */}
        <div className="flex-1 min-w-0">

          {/* Tab Người dùng */}
          {activeTab === 'users' && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Quản lý người dùng</CardTitle>
                    <p className="text-xs text-slate-400 mt-0.5">{users.length} thành viên</p>
                  </div>
                  <Button variant="primary" size="sm" leftIcon={<Plus size={13} />} onClick={() => toast('info', 'Đang mở form mời người dùng...')}>
                    Mời người dùng
                  </Button>
                </div>
                <div className="mt-3 relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={searchUser}
                    onChange={e => setSearchUser(e.target.value)}
                    placeholder="Tìm kiếm người dùng..."
                    className="w-full h-9 pl-9 pr-4 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                      {['Người dùng', 'Vai trò', 'Phòng ban', 'Trạng thái', 'Thao tác'].map(h => (
                        <th key={h} className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-left">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, i) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                              {user.avatar}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{user.name}</p>
                              <p className="text-xs text-slate-400">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-slate-600 dark:text-slate-400">{user.role}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md">{user.dept}</span>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={user.status === 'Hoạt động' ? 'success' : 'default'} size="sm">
                            {user.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" onClick={() => toast('info', `Đang chỉnh sửa ${user.name}`)}>
                              <Edit2 size={13} />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => toast('warning', `Xóa ${user.name}`, 'Hành động này cần xác nhận')}>
                              <Trash2 size={13} className="text-red-400" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}

          {/* Tab Vai trò */}
          {activeTab === 'roles' && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Vai trò & Quyền hạn</CardTitle>
                  <Button variant="primary" size="sm" leftIcon={<Plus size={13} />} onClick={() => toast('info', 'Tạo vai trò mới...')}>
                    Vai trò mới
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {roles.map((role, i) => (
                  <motion.div
                    key={role.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${role.color}`}>{role.name}</span>
                          <span className="text-xs text-slate-400">{role.count} người dùng</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {role.permissions.map(p => (
                            <span key={p} className="flex items-center gap-1 text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                              <Check size={9} className="text-emerald-500" />
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" leftIcon={<Edit2 size={12} />} onClick={() => toast('info', `Đang chỉnh sửa vai trò ${role.name}`)}>
                        Chỉnh sửa
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Tab Phòng ban */}
          {activeTab === 'departments' && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Quản lý phòng ban</CardTitle>
                  <Button variant="primary" size="sm" leftIcon={<Plus size={13} />}>Thêm phòng ban</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {departments.map((dept, i) => (
                    <motion.div
                      key={dept}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                          <Building2 size={14} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{dept}</p>
                          <p className="text-xs text-slate-400">{Math.floor(Math.random() * 50 + 10)} thành viên</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon"><Edit2 size={13} /></Button>
                        <Button variant="ghost" size="icon"><ChevronRight size={13} /></Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tab Tích hợp */}
          {activeTab === 'integrations' && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Cài đặt tích hợp</CardTitle>
                      <p className="text-xs text-slate-400 mt-0.5">{integrations.filter(i => i.status === 'connected').length}/{integrations.length} đã kết nối</p>
                    </div>
                    <Button variant="primary" size="sm" leftIcon={<Plus size={13} />}>Thêm tích hợp</Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {integrations.map((integ, i) => (
                    <motion.div
                      key={integ.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:shadow-sm"
                    >
                      <span className="text-xl">{integ.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{integ.name}</p>
                        <p className="text-xs text-slate-400">Đồng bộ lần cuối: {integ.lastSync} • {integ.type}</p>
                      </div>
                      <Badge variant={integ.status === 'connected' ? 'success' : 'danger'} size="sm">
                        {integ.status === 'connected' ? 'Đã kết nối' : 'Chưa kết nối'}
                      </Badge>
                      <Button
                        variant={integ.status === 'connected' ? 'outline' : 'primary'}
                        size="sm"
                        onClick={() => toast(
                          integ.status === 'connected' ? 'warning' : 'success',
                          integ.status === 'connected' ? `Đang ngắt kết nối ${integ.name}...` : `Đang kết nối ${integ.name}...`
                        )}
                      >
                        {integ.status === 'connected' ? 'Cấu hình' : 'Kết nối'}
                      </Button>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Khóa API</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 px-3 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg font-mono text-sm text-slate-600 dark:text-slate-400">
                      {showApiKey ? 'spd_live_aBcDeFgHiJkLmNoPqRsTuVwXyZ123456' : '••••••••••••••••••••••••••••••••••••'}
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setShowApiKey(!showApiKey)}>
                      {showApiKey ? <EyeOff size={15} /> : <Eye size={15} />}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => toast('success', 'Đã sao chép khóa API!')}>Sao chép</Button>
                    <Button variant="danger" size="sm" onClick={() => toast('warning', 'Bạn có chắc không? Điều này sẽ vô hiệu hóa khóa hiện tại.')}>Tạo lại</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Tab Nhật ký kiểm tra */}
          {activeTab === 'audit' && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Nhật ký kiểm tra</CardTitle>
                  <Button variant="outline" size="sm" leftIcon={<X size={13} />}>Xuất nhật ký</Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                      {['Người dùng', 'Hành động', 'Thời gian', 'Mức độ'].map(h => (
                        <th key={h} className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-left">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.map((log, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.04 }}
                        className="border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      >
                        <td className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300">{log.user}</td>
                        <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{log.action}</td>
                        <td className="px-4 py-3 text-xs text-slate-400">{log.time}</td>
                        <td className="px-4 py-3">
                          <Badge
                            variant={log.severity === 'critical' ? 'danger' : log.severity === 'warning' ? 'warning' : 'info'}
                            size="sm"
                          >
                            {severityLabel[log.severity] || log.severity}
                          </Badge>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
