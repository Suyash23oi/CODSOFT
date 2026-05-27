import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { HiUser, HiBriefcase, HiEnvelope, HiCalendarDays, HiMapPin, HiCurrencyRupee, HiCheckCircle, HiArrowRight } from 'react-icons/hi2'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

function Profile() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [applications, setApplications] = useState([])
  const [postings, setPostings] = useState([])

  useEffect(() => {
    if (!user) {
      toast.error('Please login to view your profile')
      navigate('/login')
      return
    }

    if (user.role === 'Candidate') {
      const savedApps = JSON.parse(localStorage.getItem(`apps_${user.email}`) || '[]')
      setApplications(savedApps)
    } else if (user.role === 'Employer') {
      const savedPosts = JSON.parse(localStorage.getItem(`posted_${user.email}`) || '[]')
      setPostings(savedPosts)
    }
  }, [user, navigate])

  if (!user) return null

  return (
    <div className='mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8'>
      {/* Profile Header Grid */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className='overflow-hidden rounded-[32px] border border-slate-200 bg-white/95 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-8'
      >
        <div className='flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex items-center gap-4'>
            <div className='flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 text-2xl font-black text-white shadow-lg uppercase'>
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className='text-2xl font-black text-slate-900 sm:text-3xl'>{user.name}</h1>
              <p className='mt-1 flex items-center gap-1.5 text-sm text-slate-500 font-semibold'>
                <HiEnvelope className='h-4 w-4 text-blue-500' />
                {user.email}
              </p>
            </div>
          </div>

          <div className='inline-flex items-center gap-2 rounded-2xl bg-blue-50 border border-blue-100 px-4 py-2 text-sm font-bold text-blue-700 shadow-sm'>
            <HiUser className='h-4 w-4' />
            Role: {user.role}
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className='mt-8'>
        {user.role === 'Candidate' ? (
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className='rounded-[32px] border border-slate-200 bg-white/95 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-8'
          >
            <div className='flex items-center justify-between border-b border-slate-100 pb-4 mb-6'>
              <div className='flex items-center gap-2'>
                <div className='h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600'>
                  <HiBriefcase className='h-4 w-4' />
                </div>
                <h2 className='text-xl font-bold text-slate-900'>My Applied Jobs ({applications.length})</h2>
              </div>
              <Link
                to='/jobs'
                className='inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:underline'
              >
                Find more jobs
                <HiArrowRight className='h-4 w-4' />
              </Link>
            </div>

            {applications.length > 0 ? (
              <div className='space-y-4'>
                <AnimatePresence>
                  {applications.map((app, idx) => (
                    <motion.div
                      key={app.jobId + idx}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className='rounded-3xl border border-slate-150 bg-slate-50/50 p-5 hover:bg-white hover:border-blue-200 transition-all duration-300 shadow-sm'
                    >
                      <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
                        <div>
                          <span className='rounded-full bg-blue-50 border border-blue-100/50 px-2.5 py-0.5 text-[10px] font-bold text-blue-600 uppercase tracking-wider'>
                            {app.company}
                          </span>
                          <h3 className='text-lg font-bold text-slate-900 mt-2 hover:text-blue-600 transition'>
                            <Link to={`/jobs/${app.jobId}`}>{app.jobTitle}</Link>
                          </h3>
                          <div className='mt-2.5 flex flex-wrap gap-4 text-xs text-slate-500 font-semibold'>
                            <span className='flex items-center gap-1'><HiMapPin className='h-3.5 w-3.5 text-cyan-600' /> {app.location}</span>
                            <span className='flex items-center gap-1'><HiCurrencyRupee className='h-3.5 w-3.5 text-blue-600' /> {app.salary}</span>
                            <span className='flex items-center gap-1'><HiCalendarDays className='h-3.5 w-3.5 text-slate-400' /> Applied on {app.appliedAt}</span>
                          </div>
                        </div>

                        <div className='flex flex-col sm:items-end gap-3'>
                          <span className='inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700'>
                            <HiCheckCircle className='h-4 w-4' />
                            Under Review
                          </span>
                          
                          {app.resume && (
                            <a
                              href={app.resume}
                              target="_blank"
                              rel="noreferrer"
                              className='text-xs font-bold text-blue-600 hover:underline truncate max-w-[200px]'
                            >
                              View resume doc
                            </a>
                          )}
                        </div>
                      </div>

                      {app.pitch && (
                        <div className='mt-4 border-t border-slate-200/50 pt-3'>
                          <p className='text-xs font-bold uppercase tracking-wider text-slate-400'>My pitch</p>
                          <p className='mt-1 text-xs text-slate-600 italic leading-relaxed'>"{app.pitch}"</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className='py-12 text-center rounded-3xl border border-dashed border-slate-200 p-6'>
                <p className='text-slate-500 font-semibold'>You haven't submitted any job applications yet.</p>
                <Link
                  to='/jobs'
                  className='mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 hover:bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300'
                >
                  Explore Job Catalog
                  <HiArrowRight className='h-4 w-4' />
                </Link>
              </div>
            )}
          </motion.section>
        ) : (
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className='rounded-[32px] border border-slate-200 bg-white/95 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-8'
          >
            <div className='flex items-center justify-between border-b border-slate-100 pb-4 mb-6'>
              <div className='flex items-center gap-2'>
                <div className='h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600'>
                  <HiBriefcase className='h-4 w-4' />
                </div>
                <h2 className='text-xl font-bold text-slate-900'>Active Job Postings ({postings.length})</h2>
              </div>
              <Link
                to='/post-job'
                className='inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:underline'
              >
                Post a new job
                <HiArrowRight className='h-4 w-4' />
              </Link>
            </div>

            {postings.length > 0 ? (
              <div className='space-y-4'>
                <AnimatePresence>
                  {postings.map((post, idx) => (
                    <motion.div
                      key={post._id || idx}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className='rounded-3xl border border-slate-150 bg-slate-50/50 p-5 hover:bg-white hover:border-blue-200 transition-all duration-300 shadow-sm'
                    >
                      <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
                        <div>
                          <span className='rounded-full bg-blue-50 border border-blue-100/50 px-2.5 py-0.5 text-[10px] font-bold text-blue-600 uppercase tracking-wider'>
                            {post.company}
                          </span>
                          <h3 className='text-lg font-bold text-slate-900 mt-2 hover:text-blue-600 transition'>
                            <Link to={`/jobs/${post._id}`}>{post.title}</Link>
                          </h3>
                          <div className='mt-2.5 flex flex-wrap gap-4 text-xs text-slate-500 font-semibold'>
                            <span className='flex items-center gap-1'><HiMapPin className='h-3.5 w-3.5 text-cyan-600' /> {post.location}</span>
                            <span className='flex items-center gap-1'><HiCurrencyRupee className='h-3.5 w-3.5 text-blue-600' /> {post.salary}</span>
                          </div>
                        </div>

                        <div className='flex sm:items-end gap-2'>
                          <span className='inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-bold text-blue-700 shadow-sm'>
                            Active hiring
                          </span>
                          <Link
                            to={`/jobs/${post._id}`}
                            className='inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700 transition'
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className='py-12 text-center rounded-3xl border border-dashed border-slate-200 p-6'>
                <p className='text-slate-500 font-semibold'>You haven't posted any job opportunities yet.</p>
                <Link
                  to='/post-job'
                  className='mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 hover:bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300'
                >
                  Create Job Listing
                  <HiArrowRight className='h-4 w-4' />
                </Link>
              </div>
            )}
          </motion.section>
        )}
      </div>
    </div>
  )
}

export default Profile
