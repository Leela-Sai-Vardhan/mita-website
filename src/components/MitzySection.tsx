import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export default function MitzySection() {
  return (
    <section id="mitzy" className="relative min-h-screen flex items-center px-5 sm:px-8 py-24">
      <div className="w-full max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Mitzy Image */}
          <motion.div
            className="shrink-0"
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, scale: 0.7 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.6, ease },
              },
            }}
          >
            <div
              className="rounded-full overflow-hidden"
              style={{
                width: 'clamp(160px, 20vw, 260px)',
                height: 'clamp(160px, 20vw, 260px)',
                border: '3px solid rgba(233,69,96,0.3)',
                boxShadow: '0 0 80px rgba(233,69,96,0.15)',
              }}
            >
              <img
                src="/mitzy.png"
                alt="Mitzy"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="max-w-lg"
            initial={{ opacity: 0, x: 40 }}
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, x: 40 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, ease, delay: 0.15 },
              },
            }}
          >
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-3"
              style={{ color: 'var(--color-accent)' }}
            >
              Meet Your Focus Buddy
            </p>
            <h2
              className="mb-6"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--color-text)',
              }}
            >
              Hey, I'm{' '}
              <span style={{ color: 'var(--color-accent)' }}>Mitzy</span> ✨
            </h2>

            {/* Speech Bubble */}
            <div
              className="rounded-2xl p-6 mb-6 relative"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px 20px 20px 4px',
              }}
            >
              <p
                className="text-base leading-relaxed"
                style={{ opacity: 0.85 }}
              >
                "I'm your little focus companion! I'll cheer you on as you crush
                your three daily tasks, remind you to stay on track, and maybe
                crack a bad joke or two. Let's make productivity fun together!"
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              {['Friendly', 'Motivating', 'Always There'].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(233,69,96,0.12)',
                    color: 'var(--color-accent)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
