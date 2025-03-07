'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Mail, Lock, Loader, ArrowRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import type { FormEventType } from '@/types'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams?.get('redirectTo') ?? '/dashboard'

  useEffect(() => {
    // Check if we're already logged in
    const checkSession = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        window.location.href = redirectTo
      }
    }
    checkSession()
  }, [redirectTo])

  const handleSubmit = async (e: FormEventType) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const supabase = createClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw signInError

      setSuccess(true)
      // Force a hard navigation after a brief delay
      setTimeout(() => {
        window.location.href = redirectTo
      }, 500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-8 px-4 sm:px-0">
        <div className="text-center">
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 text-xs sm:text-sm font-medium mb-3 sm:mb-4 border border-primary/20">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white text-transparent bg-clip-text">Welcome Back 👋</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">Sign in to SupaAuth</h2>
          <p className="mt-2 text-sm text-text-secondary">Your full-stack authentication journey continues here</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 gradient-border p-6 sm:p-8">
          <div className="space-y-5">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-lg border border-red-500/20">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 text-sm text-green-500 bg-green-500/10 rounded-lg border border-green-500/20">
                Login successful! Redirecting...
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-2 text-text">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-accent border border-accent-light rounded-lg focus:outline-none focus:border-primary/50 text-text placeholder-text-muted/50 transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-text">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-accent border border-accent-light rounded-lg focus:outline-none focus:border-primary/50 text-text placeholder-text-muted/50 transition-colors"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-accent-light bg-accent text-primary focus:ring-primary/50 cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-text-secondary cursor-pointer">
                  Remember me
                </label>
              </div>
              <Link 
                href="/auth/reset-password"
                className="text-primary hover:text-primary-light transition-colors text-sm font-medium cursor-pointer relative z-10"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="relative z-10 w-full bg-primary hover:bg-primary-dark text-white py-2.5 rounded-lg transition-colors disabled:opacity-70 disabled:hover:bg-primary flex items-center justify-center gap-2 font-medium"
            >
              {isLoading ? (
                <Loader className="animate-spin" size={20} />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-text-secondary">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-primary hover:text-primary-light transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 