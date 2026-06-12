// Dữ liệu mẫu cho tất cả các trang

export const kpiData = {
  totalProcesses: 248,
  shadowProcesses: 37,
  complianceScore: 78.4,
  bottlenecks: 14,
  highRiskProcesses: 9,
}

export const complianceTrendData = [
  { month: 'Th1', official: 85, actual: 62, target: 90 },
  { month: 'Th2', official: 83, actual: 65, target: 90 },
  { month: 'Th3', official: 87, actual: 61, target: 90 },
  { month: 'Th4', official: 82, actual: 68, target: 90 },
  { month: 'Th5', official: 88, actual: 72, target: 90 },
  { month: 'Th6', official: 86, actual: 74, target: 90 },
  { month: 'Th7', official: 84, actual: 70, target: 90 },
  { month: 'Th8', official: 90, actual: 76, target: 90 },
  { month: 'Th9', official: 89, actual: 78, target: 90 },
  { month: 'Th10', official: 92, actual: 80, target: 90 },
  { month: 'Th11', official: 91, actual: 82, target: 90 },
  { month: 'Th12', official: 93, actual: 78, target: 90 },
]

export const departmentRiskData = [
  { dept: 'Tài chính', riskScore: 87, shadowCount: 12, processes: 42 },
  { dept: 'Mua sắm', riskScore: 74, shadowCount: 9, processes: 35 },
  { dept: 'Nhân sự', riskScore: 58, shadowCount: 6, processes: 28 },
  { dept: 'Vận hành', riskScore: 65, shadowCount: 7, processes: 51 },
  { dept: 'CNTT', riskScore: 42, shadowCount: 3, processes: 38 },
  { dept: 'Kinh doanh', riskScore: 71, shadowCount: 8, processes: 29 },
  { dept: 'Pháp lý', riskScore: 35, shadowCount: 2, processes: 25 },
]

export const shadowGrowthData = [
  { week: 'T1', detected: 28, resolved: 5 },
  { week: 'T2', detected: 32, resolved: 8 },
  { week: 'T3', detected: 29, resolved: 12 },
  { week: 'T4', detected: 35, resolved: 10 },
  { week: 'T5', detected: 41, resolved: 15 },
  { week: 'T6', detected: 37, resolved: 18 },
  { week: 'T7', detected: 33, resolved: 20 },
  { week: 'T8', detected: 38, resolved: 22 },
]

export const efficiencyData = [
  { process: 'Xử lý hóa đơn', score: 62 },
  { process: 'Onboarding nhân viên', score: 78 },
  { process: 'Phê duyệt nhà cung cấp', score: 45 },
  { process: 'Mua sắm CNTT', score: 83 },
  { process: 'Báo cáo chi phí', score: 55 },
  { process: 'Xem xét hợp đồng', score: 71 },
]

export const shadowProcesses = [
  {
    id: 1, processName: 'Phê duyệt hóa đơn trước', department: 'Tài chính',
    hiddenActivity: 'Chuỗi phê duyệt qua email', frequency: 847,
    impactLevel: 'Nghiêm trọng', riskScore: 94, status: 'Đang hoạt động',
    lastDetected: '2 giờ trước', affectedUsers: 24,
  },
  {
    id: 2, processName: 'Lọc nhà cung cấp', department: 'Mua sắm',
    hiddenActivity: 'Theo dõi qua Google Sheets chung', frequency: 523,
    impactLevel: 'Cao', riskScore: 78, status: 'Đang xem xét',
    lastDetected: '5 giờ trước', affectedUsers: 12,
  },
  {
    id: 3, processName: 'Xác thực chi phí', department: 'Tài chính',
    hiddenActivity: 'Nhóm phê duyệt WhatsApp', frequency: 412,
    impactLevel: 'Cao', riskScore: 72, status: 'Đang hoạt động',
    lastDetected: '1 ngày trước', affectedUsers: 18,
  },
  {
    id: 4, processName: 'Onboarding nhân viên mới', department: 'Nhân sự',
    hiddenActivity: 'Không gian Notion không chính thức', frequency: 289,
    impactLevel: 'Trung bình', riskScore: 56, status: 'Đã gắn cờ',
    lastDetected: '2 ngày trước', affectedUsers: 9,
  },
  {
    id: 5, processName: 'Mua sắm phần mềm', department: 'CNTT',
    hiddenActivity: 'Thanh toán qua thẻ cá nhân', frequency: 164,
    impactLevel: 'Nghiêm trọng', riskScore: 91, status: 'Đang hoạt động',
    lastDetected: '30 phút trước', affectedUsers: 31,
  },
  {
    id: 6, processName: 'Tuyển dụng nhà thầu', department: 'Nhân sự',
    hiddenActivity: 'Nhắn tin trực tiếp qua LinkedIn', frequency: 98,
    impactLevel: 'Trung bình', riskScore: 48, status: 'Đã giải quyết',
    lastDetected: '5 ngày trước', affectedUsers: 6,
  },
  {
    id: 7, processName: 'Phê duyệt báo giá bán hàng', department: 'Kinh doanh',
    hiddenActivity: 'Bỏ qua qua kênh Slack', frequency: 671,
    impactLevel: 'Cao', riskScore: 69, status: 'Đang xem xét',
    lastDetected: '3 giờ trước', affectedUsers: 22,
  },
  {
    id: 8, processName: 'Xem xét tài liệu pháp lý', department: 'Pháp lý',
    hiddenActivity: 'Chuyển tiếp email ra bên ngoài', frequency: 134,
    impactLevel: 'Nghiêm trọng', riskScore: 88, status: 'Đang hoạt động',
    lastDetected: '6 giờ trước', affectedUsers: 8,
  },
]

export const bottleneckData = [
  { activity: 'Phê duyệt hóa đơn', avgDelay: 4.2, maxDelay: 18, frequency: 342, severity: 'critical' },
  { activity: 'Xác minh nhà cung cấp', avgDelay: 2.8, maxDelay: 12, frequency: 198, severity: 'high' },
  { activity: 'Ký kết hợp đồng', avgDelay: 6.1, maxDelay: 24, frequency: 87, severity: 'critical' },
  { activity: 'Phê duyệt ngân sách', avgDelay: 3.4, maxDelay: 10, frequency: 264, severity: 'high' },
  { activity: 'Cấp quyền truy cập CNTT', avgDelay: 1.9, maxDelay: 7, frequency: 421, severity: 'medium' },
  { activity: 'Xử lý hồ sơ nhân sự', avgDelay: 2.1, maxDelay: 9, frequency: 156, severity: 'medium' },
  { activity: 'Đánh giá tuân thủ', avgDelay: 5.3, maxDelay: 21, frequency: 73, severity: 'critical' },
  { activity: 'Xử lý thanh toán', avgDelay: 3.7, maxDelay: 14, frequency: 512, severity: 'high' },
]

export const heatmapData = [
  { hour: '8 giờ', Mon: 2, Tue: 3, Wed: 5, Thu: 4, Fri: 3 },
  { hour: '9 giờ', Mon: 6, Tue: 8, Wed: 9, Thu: 7, Fri: 5 },
  { hour: '10 giờ', Mon: 8, Tue: 9, Wed: 7, Thu: 9, Fri: 7 },
  { hour: '11 giờ', Mon: 7, Tue: 6, Wed: 8, Thu: 8, Fri: 6 },
  { hour: '12 giờ', Mon: 3, Tue: 2, Wed: 3, Thu: 2, Fri: 4 },
  { hour: '13 giờ', Mon: 5, Tue: 7, Wed: 6, Thu: 5, Fri: 3 },
  { hour: '14 giờ', Mon: 9, Tue: 8, Wed: 9, Thu: 8, Fri: 5 },
  { hour: '15 giờ', Mon: 8, Tue: 9, Wed: 8, Thu: 9, Fri: 6 },
  { hour: '16 giờ', Mon: 6, Tue: 7, Wed: 7, Thu: 6, Fri: 8 },
  { hour: '17 giờ', Mon: 4, Tue: 3, Wed: 4, Thu: 4, Fri: 7 },
]

export const resourceData = [
  { name: 'Nhóm Tài chính', utilization: 94, capacity: 100 },
  { name: 'Phòng Pháp lý', utilization: 87, capacity: 100 },
  { name: 'Mua sắm', utilization: 76, capacity: 100 },
  { name: 'Nhóm Nhân sự', utilization: 68, capacity: 100 },
  { name: 'Hỗ trợ CNTT', utilization: 82, capacity: 100 },
  { name: 'Vận hành', utilization: 71, capacity: 100 },
]

export const toolUsageData = [
  { tool: 'Email (Gmail)', official: false, users: 312, category: 'Giao tiếp' },
  { tool: 'Slack', official: true, users: 287, category: 'Giao tiếp' },
  { tool: 'Google Sheets', official: false, users: 241, category: 'Theo dõi dữ liệu' },
  { tool: 'WhatsApp', official: false, users: 189, category: 'Giao tiếp' },
  { tool: 'Notion', official: false, users: 156, category: 'Tài liệu' },
  { tool: 'Trello', official: false, users: 134, category: 'Quản lý dự án' },
  { tool: 'SAP (Chính thức)', official: true, users: 248, category: 'ERP' },
  { tool: 'Jira (Chính thức)', official: true, users: 198, category: 'Quản lý dự án' },
  { tool: 'Dropbox', official: false, users: 112, category: 'Lưu trữ' },
  { tool: 'Airtable', official: false, users: 87, category: 'Theo dõi dữ liệu' },
]

export const aiRecommendations = [
  {
    id: 1,
    title: 'Hợp nhất các kênh phê duyệt hóa đơn',
    category: 'Tối ưu hóa quy trình',
    description: 'Nhân viên đang sử dụng 4 kênh không chính thức để phê duyệt hóa đơn. Tập trung vào ERP chính thức sẽ loại bỏ các mục nhập trùng lặp và giảm thời gian phê duyệt.',
    timeSaving: 12.4,
    costSaving: 84000,
    difficulty: 'Trung bình',
    roi: 94,
    impactScore: 'Cao',
    processes: ['Phê duyệt hóa đơn trước', 'Xử lý thanh toán'],
    tags: ['Tài chính', 'Tự động hóa'],
  },
  {
    id: 2,
    title: 'Tự động hóa xác minh nhà cung cấp',
    category: 'Tự động hóa',
    description: 'Xác minh nhà cung cấp thủ công tạo ra độ trễ trung bình 2,8 ngày. Triển khai xác thực tài liệu tự động sẽ giảm xuống dưới 4 giờ.',
    timeSaving: 8.2,
    costSaving: 52000,
    difficulty: 'Thấp',
    roi: 87,
    impactScore: 'Cao',
    processes: ['Lọc nhà cung cấp', 'Xác minh nhà cung cấp'],
    tags: ['Mua sắm', 'Tự động hóa'],
  },
  {
    id: 3,
    title: 'Loại bỏ các bước phê duyệt pháp lý trùng lặp',
    category: 'Đơn giản hóa quy trình',
    description: 'Xem xét hợp đồng bao gồm 3 bước phê duyệt tuần tự có thể được song song hóa, giảm thời gian xem xét trung bình từ 6,1 ngày xuống 2,2 ngày.',
    timeSaving: 22.8,
    costSaving: 128000,
    difficulty: 'Cao',
    roi: 92,
    impactScore: 'Nghiêm trọng',
    processes: ['Xem xét tài liệu pháp lý', 'Ký kết hợp đồng'],
    tags: ['Pháp lý', 'Thiết kế quy trình'],
  },
  {
    id: 4,
    title: 'Chuẩn hóa quy trình onboarding nhân viên',
    category: 'Chuẩn hóa',
    description: 'Nhóm HR đang sử dụng 6 biến thể onboarding khác nhau. Quy trình kỹ thuật số chuẩn hóa với thu thập tài liệu tự động giảm độ biến thiên 73%.',
    timeSaving: 5.6,
    costSaving: 34000,
    difficulty: 'Trung bình',
    roi: 78,
    impactScore: 'Trung bình',
    processes: ['Onboarding nhân viên mới', 'Tuyển dụng nhà thầu'],
    tags: ['Nhân sự', 'Chuẩn hóa'],
  },
  {
    id: 5,
    title: 'Triển khai quy tắc tự động xác thực chi phí',
    category: 'Tự động hóa',
    description: '85% báo cáo chi phí tuân theo các mẫu có thể dự đoán. Tự động phê duyệt dựa trên AI cho các chi phí thông thường dưới 500$ có thể loại bỏ 91% chu kỳ xem xét thủ công.',
    timeSaving: 3.4,
    costSaving: 21000,
    difficulty: 'Thấp',
    roi: 83,
    impactScore: 'Trung bình',
    processes: ['Xác thực chi phí', 'Báo cáo chi phí'],
    tags: ['Tài chính', 'AI'],
  },
  {
    id: 6,
    title: 'Hợp nhất việc sử dụng công cụ CNTT ngầm',
    category: 'Quản trị',
    description: 'Nhân viên đang sử dụng 8 công cụ không chính thức để theo dõi dữ liệu. Cung cấp các lựa chọn thay thế được phê duyệt với tích hợp phù hợp sẽ giảm rủi ro CNTT ngầm 84%.',
    timeSaving: 7.1,
    costSaving: 67000,
    difficulty: 'Cao',
    roi: 71,
    impactScore: 'Cao',
    processes: ['Mua sắm phần mềm', 'Cấp quyền truy cập CNTT'],
    tags: ['CNTT', 'Quản trị'],
  },
]

export const recentActivity = [
  { id: 1, type: 'detection', message: 'Phát hiện quy trình ngầm mới tại Tài chính', time: '2 phút trước', severity: 'critical' },
  { id: 2, type: 'resolved', message: 'Quy trình tuyển dụng nhà thầu đã chuẩn hóa', time: '15 phút trước', severity: 'success' },
  { id: 3, type: 'analysis', message: 'Báo cáo tuân thủ Q4 đã được tạo', time: '1 giờ trước', severity: 'info' },
  { id: 4, type: 'alert', message: 'Ngưỡng tắc nghẽn vượt mức tại CNTT', time: '2 giờ trước', severity: 'warning' },
  { id: 5, type: 'detection', message: 'Sử dụng công cụ không chính thức tăng đột biến tại Kinh doanh', time: '3 giờ trước', severity: 'high' },
]
