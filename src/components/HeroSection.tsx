import { motion } from 'framer-motion'
import { Sparkles, ListChecks, Target, ArrowRightCircle } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
}

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center px-5 sm:px-8">
      <div className="w-full max-w-[1280px] mx-auto">
        <motion.div
          className="max-w-[560px]"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.65rem, 5vw, 3rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              color: 'var(--color-text)',
              marginBottom: '24px',
            }}
          >
            <Sparkles
              size={24}
              color="#E94560"
              style={{
                display: 'inline',
                verticalAlign: 'middle',
                position: 'relative',
                top: -2,
              }}
            />
            Focus on What Matters{' '}
            <ListChecks
              size={24}
              color="#E94560"
              style={{
                display: 'inline',
                verticalAlign: 'middle',
                position: 'relative',
                top: -2,
              }}
            />{' '}
            — Just Three Tasks. One{' '}
            <Target
              size={24}
              color="#E94560"
              style={{
                display: 'inline',
                verticalAlign: 'middle',
                position: 'relative',
                top: -2,
              }}
            />
            Day.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
              lineHeight: 1.65,
              opacity: 0.8,
              maxWidth: '560px',
              marginBottom: '32px',
            }}
          >
            No clutter, no anxiety. Mita's minimalist approach keeps you sharp
            with just three high-priority tasks a day. Track your streaks,
            celebrate wins, and actually get things done.
          </motion.p>

          <motion.button
            variants={fadeUp}
            className="flex items-center justify-between transition-all cursor-pointer"
            style={{
              background: 'var(--color-accent)',
              color: '#fff',
              borderRadius: '50px',
              padding: '17px 24px',
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
            Start Your Flow
            <ArrowRightCircle size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
