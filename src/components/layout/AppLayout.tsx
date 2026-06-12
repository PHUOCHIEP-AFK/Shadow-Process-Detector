import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Bảng Điều Khiển', subtitle: 'Tổng quan về sức khỏe quy trình và hoạt động ngầm' },
  '/process-discovery': { title: 'Khám Phá Quy Trình', subtitle: 'Tải lên và phân tích nhật ký sự kiện và mô hình quy trình' },
  '/process-comparison': { title: 'So Sánh Quy Trình', subtitle: 'So sánh quy trình chính thức với quy trình thực tế của nhân viên' },
  '/shadow-detection': { title: 'Phát Hiện Quy Trình Ngầm', subtitle: 'Xác định các quy trình ẩn và không chính thức' },
  '/bottleneck-analysis': { title: 'Phân Tích Tắc Nghẽn', subtitle: 'Chẩn đoán sự chậm trễ và hạn chế nguồn lực' },
  '/workflow-insights': { title: 'Thông Tin Quy Trình Nhân Viên', subtitle: 'Hiểu cách nhân viên thực sự làm việc' },
  '/ai-recommendations': { title: 'Đề Xuất AI', subtitle: 'Gợi ý cải tiến quy trình thông minh' },
  '/reports': { title: 'Báo Cáo', subtitle: 'Tạo và xuất báo cáo quy trình toàn diện' },
  '/settings': { title: 'Cài Đặt', subtitle: 'Quản lý người dùng, vai trò và cấu hình hệ thống' },
}

export function AppLayout() {
  const location = useLocation()
  const meta = pageTitles[location.pathname] || { title: 'Phát Hiện Quy Trình Ngầm', subtitle: '' }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar title={meta.title} subtitle={meta.subtitle} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
