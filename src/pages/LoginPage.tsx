import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Activity, Shield, Zap, BarChart3, Lock, Mail } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/contexts/ToastContext'

export function LoginPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [email, setEmail] = useState('admin@company.com')
  const [password, setPassword] = useState('password')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    toast('success', 'Welcome back!', 'Signed in successfully.')
    navigate('/dashboard')
  }

  const handleSSO = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    navigate('/dashboard')
  }

  const features = [
    { icon: Shield, label: 'Compliance Monitoring', desc: 'Real-time process compliance tracking' },
    { icon: Zap, label: 'AI-Powered Analysis', desc: 'Intelligent shadow process detection' },
    { icon: BarChart3, label: 'Advanced Analytics', desc: 'Deep dive into workflow patterns' },
  ]

  return (
    <div className="min-h-screen flex bg-slate-950">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex flex-col w-[55%] bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="800" height="600" fill="url(#grid)" />
          </svg>
        </div>

        {/* Animated blobs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3 mb-16">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Activity size={20} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-white text-lg leading-none">Shadow Process</p>
            <p className="text-blue-400 text-sm">Detector Platform</p>
          </div>
        </div>

        {/* Main Headline */}
        <div className="relative z-10 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white leading-tight mb-6">
              Uncover Hidden<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Workflow Gaps
              </span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-12 max-w-md">
              Discover the processes your teams actually use versus what was designed. 
              Eliminate inefficiencies, ensure compliance, and optimize operations.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="space-y-4">
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-600/30 flex items-center justify-center flex-shrink-0">
                  <f.icon size={18} className="text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{f.label}</p>
                  <p className="text-slate-400 text-xs">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats at bottom */}
        <div className="relative z-10 grid grid-cols-3 gap-4 mt-12">
          {[
            { value: '2,400+', label: 'Processes Analyzed' },
            { value: '98.2%', label: 'Detection Accuracy' },
            { value: '350+', label: 'Enterprise Clients' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="text-center"
            >
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-slate-400 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-3 mb-10 justify-center">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Activity size={20} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-lg leading-none">Shadow Process Detector</p>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
            <p className="text-slate-400">Sign in to your enterprise account</p>
          </div>

          {/* SSO Button */}
          <button
            onClick={handleSSO}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 h-11 rounded-xl border border-slate-700 bg-slate-900 text-slate-200 text-sm font-medium hover:bg-slate-800 transition-colors mb-6 disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google SSO
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-slate-950 px-3 text-xs text-slate-500">or sign in with email</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="you@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <a href="#" className="text-xs text-blue-400 hover:text-blue-300">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-11 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="rounded border-slate-700 bg-slate-900 text-blue-600" />
              <label htmlFor="remember" className="text-sm text-slate-400">Remember me for 30 days</label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 rounded-xl h-11"
            >
              Sign in to Dashboard
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300 font-medium">Request access</a>
          </p>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 mt-8 pt-8 border-t border-slate-800">
            {['SOC 2', 'GDPR', 'ISO 27001'].map(badge => (
              <div key={badge} className="flex items-center gap-1.5 text-xs text-slate-500">
                <Shield size={11} className="text-slate-600" />
                {badge}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
