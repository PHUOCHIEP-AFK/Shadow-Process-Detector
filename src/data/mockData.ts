// Mock data for all pages

export const kpiData = {
  totalProcesses: 248,
  shadowProcesses: 37,
  complianceScore: 78.4,
  bottlenecks: 14,
  highRiskProcesses: 9,
}

export const complianceTrendData = [
  { month: 'Jan', official: 85, actual: 62, target: 90 },
  { month: 'Feb', official: 83, actual: 65, target: 90 },
  { month: 'Mar', official: 87, actual: 61, target: 90 },
  { month: 'Apr', official: 82, actual: 68, target: 90 },
  { month: 'May', official: 88, actual: 72, target: 90 },
  { month: 'Jun', official: 86, actual: 74, target: 90 },
  { month: 'Jul', official: 84, actual: 70, target: 90 },
  { month: 'Aug', official: 90, actual: 76, target: 90 },
  { month: 'Sep', official: 89, actual: 78, target: 90 },
  { month: 'Oct', official: 92, actual: 80, target: 90 },
  { month: 'Nov', official: 91, actual: 82, target: 90 },
  { month: 'Dec', official: 93, actual: 78, target: 90 },
]

export const departmentRiskData = [
  { dept: 'Finance', riskScore: 87, shadowCount: 12, processes: 42 },
  { dept: 'Procurement', riskScore: 74, shadowCount: 9, processes: 35 },
  { dept: 'HR', riskScore: 58, shadowCount: 6, processes: 28 },
  { dept: 'Operations', riskScore: 65, shadowCount: 7, processes: 51 },
  { dept: 'IT', riskScore: 42, shadowCount: 3, processes: 38 },
  { dept: 'Sales', riskScore: 71, shadowCount: 8, processes: 29 },
  { dept: 'Legal', riskScore: 35, shadowCount: 2, processes: 25 },
]

export const shadowGrowthData = [
  { week: 'W1', detected: 28, resolved: 5 },
  { week: 'W2', detected: 32, resolved: 8 },
  { week: 'W3', detected: 29, resolved: 12 },
  { week: 'W4', detected: 35, resolved: 10 },
  { week: 'W5', detected: 41, resolved: 15 },
  { week: 'W6', detected: 37, resolved: 18 },
  { week: 'W7', detected: 33, resolved: 20 },
  { week: 'W8', detected: 38, resolved: 22 },
]

export const efficiencyData = [
  { process: 'Invoice Processing', score: 62 },
  { process: 'Employee Onboarding', score: 78 },
  { process: 'Vendor Approval', score: 45 },
  { process: 'IT Procurement', score: 83 },
  { process: 'Expense Reporting', score: 55 },
  { process: 'Contract Review', score: 71 },
]

export const shadowProcesses = [
  {
    id: 1, processName: 'Invoice Pre-Approval', department: 'Finance',
    hiddenActivity: 'Email-based approval chain', frequency: 847,
    impactLevel: 'Critical', riskScore: 94, status: 'Active',
    lastDetected: '2h ago', affectedUsers: 24,
  },
  {
    id: 2, processName: 'Vendor Shortlisting', department: 'Procurement',
    hiddenActivity: 'Shared Google Sheet tracking', frequency: 523,
    impactLevel: 'High', riskScore: 78, status: 'Under Review',
    lastDetected: '5h ago', affectedUsers: 12,
  },
  {
    id: 3, processName: 'Expense Validation', department: 'Finance',
    hiddenActivity: 'WhatsApp approval group', frequency: 412,
    impactLevel: 'High', riskScore: 72, status: 'Active',
    lastDetected: '1d ago', affectedUsers: 18,
  },
  {
    id: 4, processName: 'New Hire Onboarding', department: 'HR',
    hiddenActivity: 'Unofficial Notion workspace', frequency: 289,
    impactLevel: 'Medium', riskScore: 56, status: 'Flagged',
    lastDetected: '2d ago', affectedUsers: 9,
  },
  {
    id: 5, processName: 'Software Procurement', department: 'IT',
    hiddenActivity: 'Personal credit card purchases', frequency: 164,
    impactLevel: 'Critical', riskScore: 91, status: 'Active',
    lastDetected: '30m ago', affectedUsers: 31,
  },
  {
    id: 6, processName: 'Contractor Hiring', department: 'HR',
    hiddenActivity: 'LinkedIn direct messaging', frequency: 98,
    impactLevel: 'Medium', riskScore: 48, status: 'Resolved',
    lastDetected: '5d ago', affectedUsers: 6,
  },
  {
    id: 7, processName: 'Sales Quote Approval', department: 'Sales',
    hiddenActivity: 'Slack channel bypass', frequency: 671,
    impactLevel: 'High', riskScore: 69, status: 'Under Review',
    lastDetected: '3h ago', affectedUsers: 22,
  },
  {
    id: 8, processName: 'Legal Document Review', department: 'Legal',
    hiddenActivity: 'External email forwarding', frequency: 134,
    impactLevel: 'Critical', riskScore: 88, status: 'Active',
    lastDetected: '6h ago', affectedUsers: 8,
  },
]

export const bottleneckData = [
  { activity: 'Invoice Approval', avgDelay: 4.2, maxDelay: 18, frequency: 342, severity: 'critical' },
  { activity: 'Vendor Verification', avgDelay: 2.8, maxDelay: 12, frequency: 198, severity: 'high' },
  { activity: 'Contract Sign-off', avgDelay: 6.1, maxDelay: 24, frequency: 87, severity: 'critical' },
  { activity: 'Budget Clearance', avgDelay: 3.4, maxDelay: 10, frequency: 264, severity: 'high' },
  { activity: 'IT Access Provisioning', avgDelay: 1.9, maxDelay: 7, frequency: 421, severity: 'medium' },
  { activity: 'HR Document Processing', avgDelay: 2.1, maxDelay: 9, frequency: 156, severity: 'medium' },
  { activity: 'Compliance Review', avgDelay: 5.3, maxDelay: 21, frequency: 73, severity: 'critical' },
  { activity: 'Payment Processing', avgDelay: 3.7, maxDelay: 14, frequency: 512, severity: 'high' },
]

export const heatmapData = [
  { hour: '8AM', Mon: 2, Tue: 3, Wed: 5, Thu: 4, Fri: 3 },
  { hour: '9AM', Mon: 6, Tue: 8, Wed: 9, Thu: 7, Fri: 5 },
  { hour: '10AM', Mon: 8, Tue: 9, Wed: 7, Thu: 9, Fri: 7 },
  { hour: '11AM', Mon: 7, Tue: 6, Wed: 8, Thu: 8, Fri: 6 },
  { hour: '12PM', Mon: 3, Tue: 2, Wed: 3, Thu: 2, Fri: 4 },
  { hour: '1PM', Mon: 5, Tue: 7, Wed: 6, Thu: 5, Fri: 3 },
  { hour: '2PM', Mon: 9, Tue: 8, Wed: 9, Thu: 8, Fri: 5 },
  { hour: '3PM', Mon: 8, Tue: 9, Wed: 8, Thu: 9, Fri: 6 },
  { hour: '4PM', Mon: 6, Tue: 7, Wed: 7, Thu: 6, Fri: 8 },
  { hour: '5PM', Mon: 4, Tue: 3, Wed: 4, Thu: 4, Fri: 7 },
]

export const resourceData = [
  { name: 'Finance Team', utilization: 94, capacity: 100 },
  { name: 'Legal Dept', utilization: 87, capacity: 100 },
  { name: 'Procurement', utilization: 76, capacity: 100 },
  { name: 'HR Team', utilization: 68, capacity: 100 },
  { name: 'IT Support', utilization: 82, capacity: 100 },
  { name: 'Operations', utilization: 71, capacity: 100 },
]

export const toolUsageData = [
  { tool: 'Email (Gmail)', official: false, users: 312, category: 'Communication' },
  { tool: 'Slack', official: true, users: 287, category: 'Communication' },
  { tool: 'Google Sheets', official: false, users: 241, category: 'Data Tracking' },
  { tool: 'WhatsApp', official: false, users: 189, category: 'Communication' },
  { tool: 'Notion', official: false, users: 156, category: 'Documentation' },
  { tool: 'Trello', official: false, users: 134, category: 'Project Mgmt' },
  { tool: 'SAP (Official)', official: true, users: 248, category: 'ERP' },
  { tool: 'Jira (Official)', official: true, users: 198, category: 'Project Mgmt' },
  { tool: 'Dropbox', official: false, users: 112, category: 'Storage' },
  { tool: 'Airtable', official: false, users: 87, category: 'Data Tracking' },
]

export const aiRecommendations = [
  {
    id: 1,
    title: 'Consolidate Invoice Approval Channels',
    category: 'Process Optimization',
    description: 'Employees are using 4 unofficial channels for invoice approvals. Centralizing in the official ERP will eliminate duplicate entries and reduce approval time.',
    timeSaving: 12.4,
    costSaving: 84000,
    difficulty: 'Medium',
    roi: 94,
    impactScore: 'High',
    processes: ['Invoice Pre-Approval', 'Payment Processing'],
    tags: ['Finance', 'Automation'],
  },
  {
    id: 2,
    title: 'Automate Vendor Onboarding Verification',
    category: 'Automation',
    description: 'Manual vendor verification creates a 2.8-day average delay. Implementing automated document validation will reduce this to under 4 hours.',
    timeSaving: 8.2,
    costSaving: 52000,
    difficulty: 'Low',
    roi: 87,
    impactScore: 'High',
    processes: ['Vendor Shortlisting', 'Vendor Verification'],
    tags: ['Procurement', 'Automation'],
  },
  {
    id: 3,
    title: 'Remove Redundant Legal Document Approvals',
    category: 'Process Simplification',
    description: 'Contract review involves 3 sequential approval steps that can be parallelized, reducing average review time from 6.1 days to 2.2 days.',
    timeSaving: 22.8,
    costSaving: 128000,
    difficulty: 'High',
    roi: 92,
    impactScore: 'Critical',
    processes: ['Legal Document Review', 'Contract Sign-off'],
    tags: ['Legal', 'Process Design'],
  },
  {
    id: 4,
    title: 'Standardize Employee Onboarding Workflow',
    category: 'Standardization',
    description: 'HR teams are using 6 different onboarding variants. A standardized digital workflow with automated document collection reduces process variance by 73%.',
    timeSaving: 5.6,
    costSaving: 34000,
    difficulty: 'Medium',
    roi: 78,
    impactScore: 'Medium',
    processes: ['New Hire Onboarding', 'Contractor Hiring'],
    tags: ['HR', 'Standardization'],
  },
  {
    id: 5,
    title: 'Implement Expense Auto-Validation Rules',
    category: 'Automation',
    description: '85% of expense reports follow predictable patterns. AI-based auto-approval for routine expenses under $500 can eliminate 91% of manual review cycles.',
    timeSaving: 3.4,
    costSaving: 21000,
    difficulty: 'Low',
    roi: 83,
    impactScore: 'Medium',
    processes: ['Expense Validation', 'Expense Reporting'],
    tags: ['Finance', 'AI'],
  },
  {
    id: 6,
    title: 'Consolidate Shadow IT Tool Usage',
    category: 'Governance',
    description: 'Employees are using 8 unofficial tools for data tracking. Providing sanctioned alternatives with proper integrations will reduce shadow IT risk by 84%.',
    timeSaving: 7.1,
    costSaving: 67000,
    difficulty: 'High',
    roi: 71,
    impactScore: 'High',
    processes: ['Software Procurement', 'IT Access Provisioning'],
    tags: ['IT', 'Governance'],
  },
]

export const recentActivity = [
  { id: 1, type: 'detection', message: 'New shadow process detected in Finance', time: '2m ago', severity: 'critical' },
  { id: 2, type: 'resolved', message: 'Contractor hiring process normalized', time: '15m ago', severity: 'success' },
  { id: 3, type: 'analysis', message: 'Q4 compliance report generated', time: '1h ago', severity: 'info' },
  { id: 4, type: 'alert', message: 'Bottleneck threshold exceeded in IT', time: '2h ago', severity: 'warning' },
  { id: 5, type: 'detection', message: 'Unofficial tool usage spike in Sales', time: '3h ago', severity: 'high' },
]
