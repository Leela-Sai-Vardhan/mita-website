import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

function AnimatedNumber({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 1200
    const step = Math.ceil(to / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= to) {
        setCount(to)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [to])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

const cards = [
  { number: 3, label: 'Tasks per day', desc: 'Hard-capped at three. No overwhelm, just focus.' },
  { number: 1, label: 'Day at a time', desc: 'Each day resets. Fresh start, every morning.' },
  { number: 0, label: 'Distractions', desc: 'No notifications spam. Just your three tasks.' },
]

export default function PhilosophySection() {
  return (
    <section id="philosophy" className="relative min-h-screen flex items-center px-5 sm:px-8 py-24">
      <div className="w-full max-w-[1280px] mx-auto text-center">
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
          The Philosophy
        </motion.p>

        <motion.h2
          className="mx-auto mb-16"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--color-text)',
            maxWidth: '700px',
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.1 } },
          }}
        >
          Three Tasks. One Day. Zero Clutter.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              className="rounded-2xl p-8 text-center"
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
                  transition: { duration: 0.5, ease, delay: 0.2 + i * 0.12 },
                },
              }}
            >
              <div
                className="text-7xl font-bold mb-3"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--color-accent)',
                }}
              >
                {card.number === 0 ? (
                  '∞'
                ) : (
                  <AnimatedNumber to={card.number} />
                )}
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {card.label}
              </h3>
              <p className="text-sm opacity-60 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
