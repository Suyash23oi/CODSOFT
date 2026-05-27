import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiArrowRight, HiBuildingOffice2, HiMapPin } from 'react-icons/hi2'

function JobCard({ job }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className='group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]'
    >
      <div className='flex items-start justify-between gap-4'>
        <div>
          <p className='text-sm font-semibold uppercase tracking-[0.2em] text-blue-600'>Featured role</p>
          <h2 className='mt-3 text-2xl font-bold text-slate-900'>{job.title}</h2>
        </div>
        <span className='rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 uppercase border border-blue-200/45'>Hiring</span>
      </div>

      <div className='mt-5 space-y-3 text-sm text-slate-600'>
        <div className='flex items-center gap-2'>
          <HiBuildingOffice2 className='h-4 w-4 text-blue-600' />
          <p className='font-semibold text-slate-800'>{job.company}</p>
        </div>
        <div className='flex items-center gap-2'>
          <HiMapPin className='h-4 w-4 text-cyan-600' />
          <p>{job.location}</p>
        </div>
        <p className='text-lg font-bold text-slate-900'>{job.salary}</p>
      </div>

      <div className='mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-700'>
        <span className='rounded-full bg-slate-100 px-3 py-1'>Remote friendly</span>
        <span className='rounded-full bg-slate-100 px-3 py-1'>Growth role</span>
        <span className='rounded-full bg-slate-100 px-3 py-1'>Fast paced</span>
      </div>

      <Link
        to={`/jobs/${job._id}`}
        className='mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-600'
      >
        View Details
        <HiArrowRight className='h-4 w-4' />
      </Link>
    </motion.article>
  )
}

export default JobCard