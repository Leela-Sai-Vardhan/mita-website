import { motion } from 'framer-motion'
import { ArrowRightCircle, Sparkles } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

export default function DownloadSection() {
  return (
    <section id="download" className="relative min-h-screen flex items-center px-5 sm:px-8 py-24">
      <div className="w-full max-w-[1280px] mx-auto text-center">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
          }}
        >
          <div
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase mb-6 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(233,69,96,0.12)',
              color: 'var(--color-accent)',
            }}
          >
            <Sparkles size={14} /> Ready to Focus
          </div>

          <h2
            className="mb-6"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--color-text)',
            }}
          >
            Stop juggling. Start{' '}
            <span style={{ color: 'var(--color-accent)' }}>doing</span>.
          </h2>

          <p
            className="text-base max-w-md mx-auto mb-10"
            style={{ opacity: 0.7, lineHeight: 1.7 }}
          >
            Join thousands of focused minds using Mita. No sign-up, no spam,
            just three tasks and a clear head.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              className="flex items-center justify-between transition-all cursor-pointer"
              style={{
                background: 'var(--color-accent)',
                color: '#fff',
                borderRadius: '50px',
                padding: '17px 28px',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                boxShadow: '0 4px 24px rgba(233,69,96,0.28)',
                minWidth: '210px',
                gap: '32px',
                border: 'none',
              }}
              whileHover={{ scale: 1.04, filter: 'brightness(1.1)' }}
              whileTap={{ scale: 0.96 }}
            >
              Download for Android
              <ArrowRightCircle size={20} />
            </motion.button>

            <motion.a
              href="#"
              className="flex items-center gap-2 px-6 py-4 rounded-full text-sm font-semibold transition-all"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--color-text)',
              }}
              whileHover={{
                scale: 1.04,
                background: 'rgba(255,255,255,0.1)',
              }}
              whileTap={{ scale: 0.96 }}
            >
              <img src="/icon.png" alt="" className="w-5 h-5 rounded" />
              View on GitHub
            </motion.a>
          </div>

          <p
            className="text-xs mt-8"
            style={{ opacity: 0.4 }}
          >
            Free · No ads · No account needed · Open source
          </p>
        </motion.div>
      </div>
    </section>
  )
}
