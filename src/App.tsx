import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ScrollFramePlayer from './components/ScrollFramePlayer'
import HeroSection from './components/HeroSection'
import PhilosophySection from './components/PhilosophySection'
import FeaturesSection from './components/FeaturesSection'
import MitzySection from './components/MitzySection'
import DownloadSection from './components/DownloadSection'

const navLinks = ['Features', 'Premium', 'Download', 'News', 'Help']

const MitaLogo = ({ size = 32 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 256 256"
  >
    <circle
      cx="128"
      cy="128"
      r="96"
      fill="none"
      stroke="white"
      strokeWidth={12}
    />
    <circle cx="128" cy="128" r="40" fill="#E94560" />
  </svg>
)

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* Frame sequence background driven by scroll */}
      <ScrollFramePlayer />

      {/* Fixed Overlay */}
      <div
        className="fixed inset-0"
        style={{ background: 'rgba(13,13,13,0.45)' }}
      />

      {/* Fixed Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-5 sm:px-8 py-4 sm:py-5"
        style={{
          background: 'linear-gradient(180deg, rgba(13,13,13,0.6) 0%, transparent 100%)',
          fontFamily: 'var(--font-body)',
        }}
      >
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MitaLogo />
            <span
              className="text-lg font-semibold tracking-tight text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Mita
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              className="text-sm font-semibold text-white rounded-full px-5 py-2.5 transition-transform hover:scale-[1.04] active:scale-[0.96] cursor-pointer"
              style={{ background: 'var(--color-accent)' }}
            >
              Get Started
            </button>
            <button
              className="text-sm font-semibold rounded-full px-5 py-2.5 transition-transform hover:scale-[1.04] active:scale-[0.96] cursor-pointer"
              style={{
                background: 'var(--color-login-bg)',
                color: 'var(--color-text)',
              }}
            >
              Sign In
            </button>
          </div>

          <button
            className="md:hidden flex items-center justify-center cursor-pointer"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={28} color="#FFFFFF" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50"
              style={{
                background: 'rgba(13,13,13,0.5)',
                backdropFilter: 'blur(4px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="fixed right-0 top-0 z-50 flex flex-col"
              style={{
                width: 'min(88vw, 360px)',
                height: '100dvh',
                background: '#0D0D0D',
                boxShadow: '-12px 0 48px rgba(0,0,0,0.4)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between px-6 py-5">
                <div className="flex items-center gap-3">
                  <MitaLogo size={28} />
                  <span
                    className="text-base font-semibold tracking-tight text-white"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Mita
                  </span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="cursor-pointer"
                >
                  <X size={24} color="#FFFFFF" />
                </button>
              </div>
              <div
                className="mx-6"
                style={{ height: 1, background: 'rgba(255,255,255,0.1)' }}
              />
              <div className="flex flex-col px-6 py-6 gap-5">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link}
                    href="#"
                    className="text-base font-medium text-white"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.18 + i * 0.07,
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
              <div className="flex-1" />
              <div className="px-6 pb-8 flex flex-col gap-3">
                <button
                  className="text-sm font-semibold text-white rounded-full px-5 py-3 w-full text-center cursor-pointer"
                  style={{ background: 'var(--color-accent)' }}
                >
                  Get Started
                </button>
                <button
                  className="text-sm font-semibold rounded-full px-5 py-3 w-full text-center cursor-pointer"
                  style={{
                    background: 'var(--color-login-bg)',
                    color: 'var(--color-text)',
                  }}
                >
                  Sign In
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Scrollable Content */}
      <main
        className="relative z-10"
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text)',
        }}
      >
        <div className="h-20" />
        <HeroSection />
        <PhilosophySection />
        <FeaturesSection />
        <MitzySection />
        <DownloadSection />
      </main>
    </>
  )
}

export default App
