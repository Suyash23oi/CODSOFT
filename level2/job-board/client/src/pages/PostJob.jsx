import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import API from '../services/api'
import toast from 'react-hot-toast'
import { HiBriefcase, HiBuildingOffice2, HiMapPin, HiCurrencyRupee, HiArrowRight, HiSparkles, HiEye } from 'react-icons/hi2'
import { motion } from 'framer-motion'

function PostJob() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  // Form states
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Route security: only allow logged in Employers
  useEffect(() => {
    if (!user) {
      toast.error('You must login first.')
      navigate('/login')
      return
    }
    if (user.role !== 'Employer') {
      toast.error('Only employers can post a job.')
      navigate('/jobs')
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !company || !location || !salary || !description) {
      toast.error('Please fill in all details.')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await API.post('/jobs', {
        title,
        company,
        location,
        salary,
        description
      })

      // Simulate saving employer posting history
      if (user) {
        const savedPostings = JSON.parse(localStorage.getItem(`posted_${user.email}`) || '[]')
        savedPostings.push(response.data)
        localStorage.setItem(`posted_${user.email}`, JSON.stringify(savedPostings))
      }

      toast.success('Your job opportunity has been posted live!')
      navigate('/jobs')
    } catch (error) {
      console.error('Error posting job:', error)
      toast.error('Failed to post the job. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user || user.role !== 'Employer') {
    return null
  }

  return (
    <div className='mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mb-8'>
        <p className='text-sm font-semibold uppercase tracking-[0.2em] text-blue-600'>Employer Workspace</p>
        <h1 className='mt-3 text-3xl font-black text-slate-900 sm:text-4xl'>Launch your next great listing.</h1>
        <p className='mt-2 text-sm leading-6 text-slate-600 sm:text-base'>Provide your hiring needs, structure location and salary parameters, and watch your listing go live instantly in our discover catalog.</p>
      </div>

      <div className='grid gap-8 lg:grid-cols-[1.1fr_0.9fr]'>
        {/* Left Side: Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className='rounded-[32px] border border-slate-200 bg-white/95 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-8'
        >
          <div className='flex items-center gap-2 border-b border-slate-100 pb-4 mb-6'>
            <div className='h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600'>
              <HiBriefcase className='h-4 w-4' />
            </div>
            <h2 className='text-xl font-bold text-slate-900'>Listing Parameters</h2>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='mb-2 block text-sm font-semibold text-slate-700'>Job Title</label>
              <div className='flex items-center gap-3 rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3.5 focus-within:border-blue-400 focus-within:bg-white transition-all duration-300'>
                <HiBriefcase className='h-5 w-5 text-slate-400' />
                <input
                  type='text'
                  required
                  placeholder='e.g., Lead Systems Engineer'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className='w-full border-0 bg-transparent outline-none text-slate-800 text-sm sm:text-base'
                />
              </div>
            </div>

            <div>
              <label className='mb-2 block text-sm font-semibold text-slate-700'>Company Name</label>
              <div className='flex items-center gap-3 rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3.5 focus-within:border-blue-400 focus-within:bg-white transition-all duration-300'>
                <HiBuildingOffice2 className='h-5 w-5 text-slate-400' />
                <input
                  type='text'
                  required
                  placeholder='e.g., Acme Tech'
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className='w-full border-0 bg-transparent outline-none text-slate-800 text-sm sm:text-base'
                />
              </div>
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
              <div>
                <label className='mb-2 block text-sm font-semibold text-slate-700'>Location</label>
                <div className='flex items-center gap-3 rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3.5 focus-within:border-blue-400 focus-within:bg-white transition-all duration-300'>
                  <HiMapPin className='h-5 w-5 text-slate-400' />
                  <input
                    type='text'
                    required
                    placeholder='e.g., Bengaluru, KA (Hybrid)'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className='w-full border-0 bg-transparent outline-none text-slate-800 text-sm'
                  />
                </div>
              </div>

              <div>
                <label className='mb-2 block text-sm font-semibold text-slate-700'>Salary Offer</label>
                <div className='flex items-center gap-3 rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3.5 focus-within:border-blue-400 focus-within:bg-white transition-all duration-300'>
                  <HiCurrencyRupee className='h-5 w-5 text-slate-400' />
                  <input
                    type='text'
                    required
                    placeholder='e.g., ₹15 - ₹20 LPA'
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className='w-full border-0 bg-transparent outline-none text-slate-800 text-sm'
                  />
                </div>
              </div>
            </div>

            <div>
              <label className='mb-2 block text-sm font-semibold text-slate-700'>Job Description</label>
              <textarea
                required
                rows={5}
                placeholder='Enter detailed responsibilities, prerequisites, tools used, and perks of joining...'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='w-full rounded-[22px] border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-400 px-4 py-3.5 text-sm outline-none transition text-slate-800 resize-none leading-relaxed'
              />
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='mt-2 w-full rounded-[22px] bg-slate-900 hover:bg-blue-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer'
            >
              {isSubmitting ? 'Posting Opportunity...' : 'Publish Job Listing'}
              <HiArrowRight className='h-4 w-4' />
            </button>
          </form>
        </motion.div>

        {/* Right Side: Real-time Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className='flex flex-col gap-6'
        >
          <div className='rounded-[28px] border border-slate-200 bg-slate-50/50 p-6 border-dashed'>
            <div className='flex items-center gap-2 text-slate-600 font-bold uppercase tracking-wider text-xs mb-4'>
              <HiEye className='h-4 w-4 text-cyan-600 animate-pulse' />
              Live interactive preview
            </div>

            {/* Simulated Card Rendering */}
            <article className='group rounded-[30px] border border-slate-200 bg-white p-6 shadow-md transition-all duration-300'>
              <div className='flex items-start justify-between gap-4'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-blue-600'>Featured role</p>
                  <h2 className='mt-2.5 text-2xl font-bold text-slate-900 truncate max-w-[260px]'>
                    {title || 'Job Title Placeholder'}
                  </h2>
                </div>
                <span className='rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-100/50'>Hiring</span>
              </div>

              <div className='mt-5 space-y-2.5 text-xs text-slate-600'>
                <div className='flex items-center gap-2'>
                  <HiBuildingOffice2 className='h-4 w-4 text-blue-600' />
                  <p className='font-semibold text-slate-800'>{company || 'Company Name Placeholder'}</p>
                </div>
                <div className='flex items-center gap-2'>
                  <HiMapPin className='h-4 w-4 text-cyan-600' />
                  <p>{location || 'Location Placeholder'}</p>
                </div>
                <p className='text-base font-bold text-slate-900 mt-2'>{salary || 'Salary Range Placeholder'}</p>
              </div>

              <div className='mt-5 flex flex-wrap gap-1.5 text-[10px] font-semibold text-slate-500'>
                <span className='rounded-full bg-slate-100 px-2.5 py-1'>Remote friendly</span>
                <span className='rounded-full bg-slate-100 px-2.5 py-1'>Growth role</span>
                <span className='rounded-full bg-slate-100 px-2.5 py-1'>Fast paced</span>
              </div>

              <button disabled className='mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm opacity-90'>
                View Details
                <HiArrowRight className='h-3.5 w-3.5' />
              </button>
            </article>
          </div>

          <div className='rounded-[26px] bg-slate-950 p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.15)]'>
            <div className='flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider'>
              <HiSparkles className='h-4 w-4' />
              Recruitment standards
            </div>
            <h3 className='mt-3 text-lg font-bold'>Reach high-quality talent in under an hour.</h3>
            <p className='mt-2 text-xs leading-5 text-slate-300'>All published listings are indexed in real-time, searchable instantly, and open to applications from our curated base of tech and product professionals.</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PostJob
