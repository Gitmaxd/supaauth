import Link from 'next/link'
import type { ReactNode } from '@/types'
import Image from 'next/image'

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <header className="h-16 bg-gradient-to-b from-background-dark via-background to-transparent border-b border-[#2E2E2E] shadow-[0_1px_0_0_rgba(255,255,255,0.02)] sticky top-0 z-50 backdrop-blur-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            <Link 
              href="/" 
              className="text-xl sm:text-2xl font-bold text-text whitespace-nowrap flex items-center h-full"
            >
              SupaAuth
            </Link>
            
            {/* Mobile back button */}
            <Link
              href="/"
              className="md:hidden flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-md border border-border/50 text-text-secondary hover:text-text transition-colors duration-200"
            >
              Back to home
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 overflow-y-auto bg-transparent">
        {children}
      </main>

      {/* Fixed height footer */}
      <footer className="h-auto py-4 md:h-16 bg-gradient-to-t from-background-dark via-background to-transparent border-t border-[#2E2E2E] shadow-[0_-1px_0_0_rgba(255,255,255,0.02)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          <p className="text-text-secondary text-sm text-center md:text-left">© {new Date().getFullYear()} SupaAuth. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Gitmaxd/supaauth"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text/60 hover:text-text transition-colors duration-200"
              aria-label="View on GitHub"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-5 w-5 fill-current"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a
              href="https://x.com/gitmaxd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text/60 hover:text-text transition-colors duration-200"
              aria-label="Follow us on X (Twitter)"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4 fill-current"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
} 