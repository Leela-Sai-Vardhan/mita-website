import { motion } from 'framer-motion'
import { ListChecks, Flame, Database, BrainCircuit } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

const features = [
  {
    icon: <ListChecks size={28} color="#E94560" />,
    title: '3-Task Daily Limit',
    desc: 'Hard-capped at three active tasks per day. Prevents overwhelm and keeps you laser-focused on what actually matters.',
  },
  {
    icon: <Flame size={28} color="#E94560" />,
    title: 'Streak Tracking',
    desc: 'Build momentum with daily streaks. Watch your consistency grow with a beautiful calendar heatmap and milestone badges.',
  },
  {
    icon: <Database size={28} color="#E94560" />,
    title: 'Offline-First Storage',
    desc: 'All data lives locally on your device. No accounts, no cloud, no internet required. Your privacy is the default.',
  },
  {
    icon: <BrainCircuit size={28} color="#E94560" />,
    title: 'Focus Mode',
    desc: 'Built-in Pomodoro timer with ambient sounds (rain, forest, white noise). Stay in the zone without switching apps.',
  },
]

export default function FeaturesSection() {
  return (
    <section className="relative min-h-screen flex items-center px-5 sm:px-8 py-24">
      <div className="w-full max-w-[1280px] mx-auto">
        <motion.p
          className="text-sm font-semibold tracking-widest uppercase mb-4"
          style={{ color: 'var(--color-accent)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
          }}
        >
          Features
        </motion.p>

        <motion.h2
          className="mb-16"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--color-text)',
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.1 } },
          }}
        >
          Everything you need, nothing you don't.
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="rounded-2xl p-7 flex gap-5 items-start"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(8px)',
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease, delay: 0.2 + i * 0.1 },
                },
              }}
              whileHover={{
                y: -4,
                background: 'rgba(255,255,255,0.07)',
                transition: { duration: 0.25 },
              }}
            >
              <div
                className="shrink-0 w-12 h-12 flex items-center justify-center rounded-xl"
                style={{ background: 'rgba(233,69,96,0.12)' }}
              >
                {f.icon}
              </div>
              <div>
                <h3
                  className="text-lg font-semibold mb-1.5"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {f.title}
                </h3>
                <p className="text-sm opacity-60 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
