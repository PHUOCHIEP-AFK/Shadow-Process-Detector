import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ToastProvider } from '@/contexts/ToastContext'
import { AppLayout } from '@/components/layout/AppLayout'
import { LoginPage } from '@/pages/LoginPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { ProcessDiscoveryPage } from '@/pages/ProcessDiscoveryPage'
import { ProcessComparisonPage } from '@/pages/ProcessComparisonPage'
import { ShadowDetectionPage } from '@/pages/ShadowDetectionPage'
import { BottleneckAnalysisPage } from '@/pages/BottleneckAnalysisPage'
import { WorkflowInsightsPage } from '@/pages/WorkflowInsightsPage'
import { AIRecommendationsPage } from '@/pages/AIRecommendationsPage'
import { ReportsPage } from '@/pages/ReportsPage'
import { SettingsPage } from '@/pages/SettingsPage'

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/process-discovery" element={<ProcessDiscoveryPage />} />
              <Route path="/process-comparison" element={<ProcessComparisonPage />} />
              <Route path="/shadow-detection" element={<ShadowDetectionPage />} />
              <Route path="/bottleneck-analysis" element={<BottleneckAnalysisPage />} />
              <Route path="/workflow-insights" element={<WorkflowInsightsPage />} />
              <Route path="/ai-recommendations" element={<AIRecommendationsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  )
}
