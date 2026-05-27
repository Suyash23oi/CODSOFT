import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiArrowRight, HiBriefcase, HiClock, HiSparkles } from 'react-icons/hi2'

const stats = [
  { value: '120+', label: 'Active companies' },
  { value: '4.8/5', label: 'Candidate satisfaction' },
  { value: '24h', label: 'Average response time' }
]

const highlights = [
  {
    title: 'Curated opportunities',
    text: 'Discover roles from trusted employers across tech, design, and product.',
    icon: HiSparkles
  },
  {
    title: 'Faster applications',
    text: 'Save profiles and apply in just a few taps, so you never miss a chance.',
    icon: HiClock
  },
  {
    title: 'Built for growth',
    text: 'Explore roles that match your skills, salary goals, and career ambitions.',
    icon: HiBriefcase
  }
]

const steps = [
  { title: 'Create profile', text: 'Add your skills, experience, and preferences in under five minutes.' },
  { title: 'Discover matches', text: 'Browse roles that fit your location, level, and salary targets.' },
  { title: 'Apply with confidence', text: 'Track applications and respond faster with a clean, focused dashboard.' }
]

function Home() {
  return (
    <div className='pb-16'>
      <section className='relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-500 to-indigo-700' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.28),_transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.2),_transparent_20%)]' />

        <div className='relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24'>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className='text-white'
          >
            <p className='inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm font-semibold backdrop-blur'>Your next chapter starts here</p>
            <h1 className='mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl'>Find a role that fits your ambition.</h1>
            <p className='mt-5 max-w-2xl text-lg text-blue-50/90 sm:text-xl'>Browse curated jobs, compare opportunities, and apply with confidence on a beautifully designed portal built for modern job seekers.</p>

            <div className='mt-8 flex flex-wrap gap-3'>
              <Link
                to='/jobs'
                className='inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-blue-700 shadow-lg transition hover:-translate-y-0.5'
              >
                Explore jobs
                <HiArrowRight className='h-4 w-4' />
              </Link>
              <Link
                to='/register'
                className='rounded-full border border-white/60 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10'
              >
                Create account
              </Link>
            </div>

            <div className='mt-10 grid gap-3 sm:grid-cols-3'>
              {stats.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * index, duration: 0.35 }}
                  className='overflow-hidden rounded-2xl border border-white/20 bg-white/10 px-4 py-4 backdrop-blur-sm'
                >
                  <p className='text-2xl font-black'>{item.value}</p>
                  <p className='mt-1 text-sm text-blue-50/90'>{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.08 }}
            className='overflow-hidden rounded-3xl border border-white/20 bg-slate-950/90 p-6 text-white shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur'
          >
            <div className='rounded-2xl bg-white/5 p-5'>
              <p className='text-sm text-cyan-200'>Today’s spotlight</p>
              <h2 className='mt-3 text-2xl font-bold'>Frontend Developer</h2>
              <p className='mt-2 text-sm text-slate-200'>Google • Pune • ₹12 LPA</p>

              <div className='mt-5 space-y-3 text-sm text-slate-200'>
                <div className='flex items-center justify-between rounded-xl bg-white/5 px-4 py-3'>
                  <span>Remote Friendly</span>
                  <span className='font-semibold text-cyan-200'>Yes</span>
                </div>
                <div className='flex items-center justify-between rounded-xl bg-white/5 px-4 py-3'>
                  <span>Application Status</span>
                  <span className='font-semibold text-emerald-300'>Open</span>
                </div>
                <div className='flex items-center justify-between rounded-xl bg-white/5 px-4 py-3'>
                  <span>Response Time</span>
                  <span className='font-semibold text-cyan-200'>24 hours</span>
                </div>
              </div>

              <div className='mt-5 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3'>
                <p className='text-sm font-semibold text-cyan-100'>Top perk</p>
                <p className='mt-1 text-sm text-cyan-50/90'>Flexible work, strong team culture, and a clear growth path.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className='mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8'>
        <div className='grid gap-4 md:grid-cols-3'>
          {highlights.map((item, index) => {
            const Icon = item.icon

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * index, duration: 0.35 }}
                className='flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_16px_45px_rgba(15,23,42,0.06)]'
              >
                <div className='inline-flex rounded-xl bg-blue-50 p-2 text-blue-700'>
                  <Icon className='h-5 w-5' />
                </div>
                <p className='mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600'>Why candidates choose us</p>
                <h3 className='mt-4 text-xl font-bold text-slate-900'>{item.title}</h3>
                <p className='mt-3 text-sm leading-6 text-slate-600'>{item.text}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      <section className='mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8'>
        <div className='rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_16px_45px_rgba(15,23,42,0.06)] sm:p-8'>
          <div className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
            <div>
              <p className='text-sm font-semibold uppercase tracking-[0.2em] text-blue-600'>Simple process</p>
              <h2 className='mt-3 text-2xl font-bold text-slate-900 sm:text-3xl'>A cleaner journey from search to apply.</h2>
            </div>
            <p className='max-w-2xl text-sm leading-6 text-slate-600 sm:text-base'>Everything is designed to keep your job hunt focused — no clutter, no confusion, just a polished path forward.</p>
          </div>

          <div className='mt-6 grid gap-4 md:grid-cols-3'>
            {steps.map((step, index) => (
              <div key={step.title} className='flex h-full flex-col rounded-2xl bg-slate-50 p-5'>
                <p className='text-sm font-semibold text-blue-600'>0{index + 1}</p>
                <h3 className='mt-3 text-lg font-bold text-slate-900'>{step.title}</h3>
                <p className='mt-2 text-sm leading-6 text-slate-600'>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home