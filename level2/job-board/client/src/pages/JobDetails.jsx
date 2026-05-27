import { useState, useEffect, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { HiBriefcase, HiCalendarDays, HiMapPin, HiSparkles, HiCurrencyRupee, HiArrowRight, HiCheckCircle, HiArrowLeft } from 'react-icons/hi2'
import API from '../services/api'
import { AuthContext } from '../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

function JobDetails() {
  const { id } = useParams()
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const [pitch, setPitch] = useState('')
  const [resume, setResume] = useState('')
  const [github, setGithub] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true)
        const response = await API.get(`/jobs/${id}`)
        setJob(response.data)
        
        // Check if user has already applied
        if (user) {
          const savedApps = JSON.parse(localStorage.getItem(`apps_${user.email}`) || '[]')
          const alreadyApplied = savedApps.some(app => app.jobId === id)
          setHasApplied(alreadyApplied)
        }
      } catch (error) {
        console.error('Error loading job details:', error)
        toast.error('Failed to load job details. It might have been deleted.')
      } finally {
        setLoading(false)
      }
    }
    fetchJobDetails()
  }, [id, user])

  const handleApplySubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      toast.error('Please login to apply for this job')
      navigate('/login')
      return
    }

    if (user.role === 'Employer') {
      toast.error('Employers cannot apply to jobs.')
      return
    }

    if (!resume) {
      toast.error('Please provide a resume link.')
      return
    }

    setIsSubmitting(true)
    
    // Simulate API delay
    setTimeout(() => {
      const applicationData = {
        jobId: id,
        jobTitle: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        pitch,
        resume,
        github,
        appliedAt: new Date().toLocaleDateString()
      }

      const savedApps = JSON.parse(localStorage.getItem(`apps_${user.email}`) || '[]')
      savedApps.push(applicationData)
      localStorage.setItem(`apps_${user.email}`, JSON.stringify(savedApps))

      setIsSubmitting(false)
      setIsApplyModalOpen(false)
      setHasApplied(true)
      toast.success('Your application has been submitted successfully!')
    }, 1200)
  }

  if (loading) {
    return (
      <div className='mx-auto max-w-5xl px-4 py-20 text-center'>
        <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]' />
        <p className='mt-4 text-slate-500 font-semibold'>Loading job details...</p>
      </div>
    )
  }

  if (!job) {
    return (
      <div className='mx-auto max-w-3xl px-4 py-16 text-center bg-white rounded-3xl border border-slate-200 shadow-sm mt-10'>
        <h2 className='text-2xl font-bold text-slate-800'>Job opportunity not found</h2>
        <p className='mt-3 text-slate-500'>The job you are looking for does not exist or has been closed by the recruiter.</p>
        <Link to='/jobs' className='mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600'>
          <HiArrowLeft className='h-4 w-4' /> Back to Catalog
        </Link>
      </div>
    )
  }

  const highlightCards = [
    { label: 'Company', value: job.company, icon: HiBriefcase },
    { label: 'Location', value: job.location, icon: HiMapPin },
    { label: 'Salary Offer', value: job.salary, icon: HiCurrencyRupee },
    { label: 'Status', value: 'Active Recruiting', icon: HiSparkles }
  ]

  return (
    <div className='mx-auto max-w-5xl px-4 pb-16 pt-10 sm:px-6 lg:px-8'>
      <div className='mb-6'>
        <Link to='/jobs' className='inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition group'>
          <HiArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-1' />
          Back to all jobs
        </Link>
      </div>

      <div className='overflow-hidden rounded-3xl border border-slate-200 bg-white/95 shadow-[0_24px_80px_rgba(15,23,42,0.08)]'>
        <div className='bg-gradient-to-r from-slate-950 via-blue-900 to-cyan-700 px-6 py-10 text-white sm:px-8'>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200'>Job details</p>
          <h1 className='mt-3 text-3xl font-black sm:text-4xl lg:text-5xl'>{job.title}</h1>
          <div className='mt-4 flex items-center gap-3 text-sm text-blue-100/90'>
            <span>{job.company}</span>
            <span>•</span>
            <span>{job.location}</span>
          </div>
          <div className='mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold border border-white/10 backdrop-blur-sm'>
            <HiSparkles className='h-4 w-4 text-cyan-200' />
            Designed for high-intent candidates
          </div>
        </div>

        <div className='grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]'>
          <div>
            <div className='flex flex-wrap gap-2 text-xs font-semibold'>
              <span className='rounded-full bg-blue-50 px-3 py-1.5 text-blue-700 border border-blue-100'>{job.company}</span>
              <span className='rounded-full bg-slate-100 px-3 py-1.5 text-slate-700'>{job.location}</span>
              <span className='rounded-full bg-slate-100 px-3 py-1.5 text-slate-700'>{job.salary}</span>
            </div>

            <h2 className='mt-8 text-2xl font-bold text-slate-900'>Job description</h2>
            <p className='mt-4 text-sm leading-8 text-slate-600 sm:text-base whitespace-pre-line'>
              {job.description || "No full description available for this role. However, it represents an outstanding career opportunity to work with dynamic groups, build great capabilities, and make a significant product impact in the sector."}
            </p>

            <div className='mt-8 grid gap-4 sm:grid-cols-2'>
              <div className='rounded-2xl bg-slate-50 p-5 border border-slate-100'>
                <p className='text-sm font-bold text-slate-900 uppercase tracking-wide'>Key responsibilities</p>
                <ul className='mt-4 space-y-3 text-sm text-slate-600'>
                  <li className='flex items-start gap-2'>
                    <span className='text-blue-600 font-bold'>•</span>
                    <span>Build scalable, reusable, and robust UI components</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-blue-600 font-bold'>•</span>
                    <span>Collaborate closely with design and backend teams</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-blue-600 font-bold'>•</span>
                    <span>Focus intensely on web accessibility and responsive optimization</span>
                  </li>
                </ul>
              </div>
              <div className='rounded-2xl bg-slate-50 p-5 border border-slate-100'>
                <p className='text-sm font-bold text-slate-900 uppercase tracking-wide'>What we look for</p>
                <ul className='mt-4 space-y-3 text-sm text-slate-600'>
                  <li className='flex items-start gap-2'>
                    <span className='text-cyan-600 font-bold'>•</span>
                    <span>Strong understanding of fundamentals and framework patterns</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-cyan-600 font-bold'>•</span>
                    <span>Eye for visual detail, clean micro-interactions, and aesthetics</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-cyan-600 font-bold'>•</span>
                    <span>Desire to learn fast, adapt, and ship exceptional code solutions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className='rounded-2xl bg-slate-50 p-6 border border-slate-100 shadow-sm'>
              <p className='text-xs font-bold uppercase tracking-[0.2em] text-blue-600'>Job Snapshot</p>
              <div className='mt-4 grid gap-3 sm:grid-cols-2'>
                {highlightCards.map(({ label, value, icon: Icon }) => (
                  <div key={label} className='rounded-xl bg-white p-4 shadow-sm border border-slate-100 hover:border-blue-100 transition duration-300'>
                    <Icon className='h-5 w-5 text-blue-600' />
                    <p className='mt-3 text-xs text-slate-400 font-medium uppercase tracking-wider'>{label}</p>
                    <p className='mt-1 text-sm font-bold text-slate-800'>{value}</p>
                  </div>
                ))}
              </div>

              <div className='mt-6 rounded-xl border border-dashed border-slate-200 bg-white p-4'>
                <div className='flex items-center gap-2 text-sm font-bold text-slate-900'>
                  <HiCalendarDays className='h-4 w-4 text-cyan-600' />
                  Application Info
                </div>
                <p className='mt-2 text-xs leading-5 text-slate-500'>This role is highly active. Applications are screened on a rolling basis. Ensure your profile is polished before submitting.</p>
              </div>

              {hasApplied ? (
                <div className='mt-6 flex items-center justify-center gap-2 rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-3.5 text-sm font-bold text-emerald-700 shadow-sm'>
                  <HiCheckCircle className='h-5 w-5' />
                  Applied Successfully
                </div>
              ) : (
                <button
                  onClick={() => {
                    if (!user) {
                      toast.error('Please log in to apply.')
                      navigate('/login')
                    } else if (user.role === 'Employer') {
                      toast.error('Employers cannot apply to jobs.')
                    } else {
                      setIsApplyModalOpen(true)
                    }
                  }}
                  className='mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 hover:bg-blue-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer'
                >
                  Apply now
                  <HiArrowRight className='h-4 w-4' />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal Workspace */}
      <AnimatePresence>
        {isApplyModalOpen && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm'>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className='w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8'
            >
              <div className='flex items-start justify-between'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-wider text-blue-600'>Submit Application</p>
                  <h3 className='mt-1 text-2xl font-black text-slate-900'>{job.title}</h3>
                  <p className='text-sm text-slate-500'>{job.company} • {job.location}</p>
                </div>
                <button
                  onClick={() => setIsApplyModalOpen(false)}
                  className='rounded-full border border-slate-200 hover:border-slate-300 p-1 text-slate-400 hover:text-slate-700 cursor-pointer shadow-sm'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleApplySubmit} className='mt-6 space-y-4'>
                <div>
                  <label className='mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600'>Applicant Name</label>
                  <input
                    type='text'
                    disabled
                    value={user?.name || ''}
                    className='w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm text-slate-600 outline-none'
                  />
                </div>

                <div>
                  <label className='mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600'>Applicant Email</label>
                  <input
                    type='email'
                    disabled
                    value={user?.email || ''}
                    className='w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm text-slate-600 outline-none'
                  />
                </div>

                <div>
                  <label className='mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700'>Resume Link <span className='text-red-500'>*</span></label>
                  <input
                    type='url'
                    required
                    placeholder='https://myresume.com/link-to-doc.pdf'
                    value={resume}
                    onChange={(e) => setResume(e.target.value)}
                    className='w-full rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-400 px-4 py-2.5 text-sm outline-none transition text-slate-800'
                  />
                </div>

                <div>
                  <label className='mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700'>GitHub / Portfolio Link</label>
                  <input
                    type='url'
                    placeholder='https://github.com/myusername'
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className='w-full rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-400 px-4 py-2.5 text-sm outline-none transition text-slate-800'
                  />
                </div>

                <div>
                  <label className='mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700'>Why are you a good fit? (Cover letter/pitch)</label>
                  <textarea
                    rows={3}
                    placeholder='Tell us briefly about your experience, achievements, and goals...'
                    value={pitch}
                    onChange={(e) => setPitch(e.target.value)}
                    className='w-full rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-400 px-4 py-2.5 text-sm outline-none transition text-slate-800 resize-none'
                  />
                </div>

                <div className='mt-6 flex gap-3'>
                  <button
                    type='button'
                    onClick={() => setIsApplyModalOpen(false)}
                    className='flex-1 rounded-xl border border-slate-200 hover:bg-slate-50 py-3 text-sm font-semibold text-slate-600 transition cursor-pointer'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='flex-1 rounded-xl bg-slate-900 hover:bg-blue-600 py-3 text-sm font-semibold text-white transition disabled:opacity-50 shadow-md cursor-pointer flex items-center justify-center gap-2'
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default JobDetails