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
  { id: 1, name: 'John Doe', email: 'john.doe@company.com', role: 'Admin', dept: 'IT', status: 'Active', avatar: 'JD' },
  { id: 2, name: 'Sarah Chen', email: 's.chen@company.com', role: 'Process Manager', dept: 'Operations', status: 'Active', avatar: 'SC' },
  { id: 3, name: 'Michael Park', email: 'm.park@company.com', role: 'Business Analyst', dept: 'Finance', status: 'Active', avatar: 'MP' },
  { id: 4, name: 'Emily Rodriguez', email: 'e.rodriguez@company.com', role: 'Executive', dept: 'C-Suite', status: 'Active', avatar: 'ER' },
  { id: 5, name: 'David Kim', email: 'd.kim@company.com', role: 'Department Head', dept: 'Procurement', status: 'Inactive', avatar: 'DK' },
]

const roles = [
  { name: 'Admin', permissions: ['All Access', 'User Management', 'Reports', 'Settings'], count: 2, color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
  { name: 'Process Manager', permissions: ['Process Discovery', 'Comparison', 'Reports'], count: 5, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  { name: 'Business Analyst', permissions: ['View All', 'Shadow Detection', 'AI Recs'], count: 12, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  { name: 'Department Head', permissions: ['View Dept Reports', 'Insights'], count: 8, color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
  { name: 'Executive', permissions: ['Dashboard', 'Executive Reports'], count: 4, color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  { name: 'View Only', permissions: ['Dashboard View', 'Reports View'], count: 18, color: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' },
]

const integrations = [
  { name: 'SAP ERP', status: 'connected', icon: '🟢', lastSync: '2 min ago', type: 'ERP' },
  { name: 'Celonis Process Mining', status: 'connected', icon: '🟢', lastSync: '5 min ago', type: 'Process Mining' },
  { name: 'Microsoft 365', status: 'connected', icon: '🟢', lastSync: '1h ago', type: 'Productivity' },
  { name: 'Salesforce', status: 'disconnected', icon: '🔴', lastSync: 'Never', type: 'CRM' },
  { name: 'Jira', status: 'connected', icon: '🟢', lastSync: '30 min ago', type: 'Project Mgmt' },
  { name: 'Slack', status: 'connected', icon: '🟢', lastSync: 'Real-time', type: 'Communication' },
  { name: 'ServiceNow', status: 'disconnected', icon: '🔴', lastSync: 'Never', type: 'ITSM' },
]

const auditLogs = [
  { user: 'John Doe', action: 'Exported compliance report', time: '2 min ago', severity: 'info' },
  { user: 'Sarah Chen', action: 'Modified process comparison settings', time: '15 min ago', severity: 'warning' },
  { user: 'System', action: 'Automated scan completed — 37 findings', time: '2h ago', severity: 'info' },
  { user: 'Michael Park', action: 'Accessed shadow detection data', time: '3h ago', severity: 'info' },
  { user: 'Emily Rodriguez', action: 'Generated executive report', time: '5h ago', severity: 'info' },
  { user: 'System', action: 'User David Kim deactivated', time: '1d ago', severity: 'warning' },
  { user: 'John Doe', action: 'Updated role permissions for Analyst', time: '2d ago', severity: 'critical' },
]

const tabs = [
  { id: 'users', label: 'Users', icon: Users },
  { id: 'roles', label: 'Roles & Permissions', icon: Shield },
  { id: 'departments', label: 'Departments', icon: Building2 },
  { id: 'integrations', label: 'Integrations', icon: Plug },
  { id: 'audit', label: 'Audit Logs', icon: ScrollText },
]

export function SettingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState('users')
  const [searchUser, setSearchUser] = useState('')
  const [showApiKey, setShowApiKey] = useState(false)

  const filteredUsers = users.filter(u =>
    !searchUser || u.name.toLowerCase().includes(searchUser.toLowerCase()) || u.email.includes(searchUser)
  )

  const departments = ['Finance', 'Procurement', 'HR', 'IT', 'Operations', 'Sales', 'Legal', 'C-Suite']

  return (
    <div className="p-6 space-y-5">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Sidebar Tabs */}
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

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Users Tab */}
          {activeTab === 'users' && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <p className="text-xs text-slate-400 mt-0.5">{users.length} team members</p>
                  </div>
                  <Button variant="primary" size="sm" leftIcon={<Plus size={13} />} onClick={() => toast('info', 'Opening invite modal...')}>
                    Invite User
                  </Button>
                </div>
                <div className="mt-3 relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={searchUser}
                    onChange={e => setSearchUser(e.target.value)}
                    placeholder="Search users..."
                    className="w-full h-9 pl-9 pr-4 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                      {['User', 'Role', 'Department', 'Status', 'Actions'].map(h => (
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
                          <Badge variant={user.status === 'Active' ? 'success' : 'default'} size="sm">
                            {user.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" onClick={() => toast('info', `Editing ${user.name}`)}>
                              <Edit2 size={13} />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => toast('warning', `Removing ${user.name}`, 'This action requires confirmation')}>
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

          {/* Roles Tab */}
          {activeTab === 'roles' && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Roles & Permissions</CardTitle>
                  <Button variant="primary" size="sm" leftIcon={<Plus size={13} />} onClick={() => toast('info', 'Create new role...')}>
                    New Role
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
                          <span className="text-xs text-slate-400">{role.count} users</span>
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
                      <Button variant="ghost" size="sm" leftIcon={<Edit2 size={12} />} onClick={() => toast('info', `Editing ${role.name} role`)}>
                        Edit
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Departments Tab */}
          {activeTab === 'departments' && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Department Management</CardTitle>
                  <Button variant="primary" size="sm" leftIcon={<Plus size={13} />}>Add Department</Button>
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
                          <p className="text-xs text-slate-400">{Math.floor(Math.random() * 50 + 10)} members</p>
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

          {/* Integrations Tab */}
          {activeTab === 'integrations' && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Integration Settings</CardTitle>
                      <p className="text-xs text-slate-400 mt-0.5">{integrations.filter(i => i.status === 'connected').length}/{integrations.length} connected</p>
                    </div>
                    <Button variant="primary" size="sm" leftIcon={<Plus size={13} />}>Add Integration</Button>
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
                        <p className="text-xs text-slate-400">Last sync: {integ.lastSync} • {integ.type}</p>
                      </div>
                      <Badge variant={integ.status === 'connected' ? 'success' : 'danger'} size="sm">
                        {integ.status === 'connected' ? 'Connected' : 'Disconnected'}
                      </Badge>
                      <Button
                        variant={integ.status === 'connected' ? 'outline' : 'primary'}
                        size="sm"
                        onClick={() => toast(integ.status === 'connected' ? 'warning' : 'success', integ.status === 'connected' ? `Disconnecting ${integ.name}...` : `Connecting to ${integ.name}...`)}
                      >
                        {integ.status === 'connected' ? 'Configure' : 'Connect'}
                      </Button>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>API Key</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 px-3 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg font-mono text-sm text-slate-600 dark:text-slate-400">
                      {showApiKey ? 'spd_live_aBcDeFgHiJkLmNoPqRsTuVwXyZ123456' : '••••••••••••••••••••••••••••••••••••'}
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setShowApiKey(!showApiKey)}>
                      {showApiKey ? <EyeOff size={15} /> : <Eye size={15} />}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => toast('success', 'API key copied!')}>Copy</Button>
                    <Button variant="danger" size="sm" onClick={() => toast('warning', 'Are you sure? This will invalidate the current key.')}>Regenerate</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Audit Logs Tab */}
          {activeTab === 'audit' && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Audit Logs</CardTitle>
                  <Button variant="outline" size="sm" leftIcon={<X size={13} />}>Export Logs</Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                      {['User', 'Action', 'Time', 'Severity'].map(h => (
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
                            {log.severity}
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
