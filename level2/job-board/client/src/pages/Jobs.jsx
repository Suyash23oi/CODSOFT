import { useState, useEffect } from 'react'
import JobCard from '../components/JobCard'
import API from '../services/api'
import { HiBriefcase, HiMagnifyingGlass, HiSparkles } from 'react-icons/hi2'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const quickStats = [
  { value: '6+', label: 'Active companies' },
  { value: '82%', label: 'Match success rate' },
  { value: '24h', label: 'Average recruiter reply' }
]

const trends = [
  { name: 'Remote first', filter: 'remote' },
  { name: 'Engineering', filter: 'engineer' },
  { name: 'Design', filter: 'design' },
  { name: 'ML/AI', filter: 'machine learning' },
  { name: 'Developer', filter: 'developer' }
]

function Jobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('')

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const response = await API.get('/jobs')
        setJobs(response.data)
      } catch (error) {
        console.error('Error fetching jobs:', error)
        toast.error('Failed to load active jobs. Please check if backend is running.')
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  // Filter jobs based on search term AND chosen category tag
  const filteredJobs = jobs.filter(job => {
    const textMatch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.description && job.description.toLowerCase().includes(searchTerm.toLowerCase()))

    if (!selectedFilter) return textMatch

    const filterMatch = 
      job.title.toLowerCase().includes(selectedFilter) ||
      job.location.toLowerCase().includes(selectedFilter) ||
      (job.description && job.description.toLowerCase().includes(selectedFilter))

    return textMatch && filterMatch
  })

  const handleTrendClick = (filter) => {
    if (selectedFilter === filter) {
      setSelectedFilter('') // Toggle off
    } else {
      setSelectedFilter(filter)
      toast.success(`Filtering by category: ${filter}`, { id: 'filter-toast' })
    }
  }

  return (
    <div className='mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8'>
      <div className='rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8 backdrop-blur-md'>
        <div className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
          <div className='max-w-2xl'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-blue-600'>Browse opportunities</p>
            <h1 className='mt-3 text-3xl font-black text-slate-900 sm:text-4xl'>Your next job is waiting in a curated list.</h1>
            <p className='mt-3 text-sm leading-6 text-slate-600 sm:text-base'>Explore exciting roles, compare location and salary, and find the perfect fit without cluttered interfaces.</p>
          </div>

          <div className='grid gap-3 sm:grid-cols-3 lg:min-w-[420px]'>
            {quickStats.map(stat => (
              <div key={stat.label} className='rounded-2xl bg-slate-50 px-4 py-4 text-center border border-slate-100 transition hover:border-blue-200 hover:bg-blue-50/20 duration-300'>
                <p className='text-xl font-black text-slate-900'>{stat.value}</p>
                <p className='mt-1 text-xs font-semibold text-slate-500 uppercase tracking-wider'>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-8 flex flex-col gap-4 lg:flex-row'>
          <div className='flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 sm:px-5 focus-within:border-blue-400 focus-within:bg-white transition-all duration-300 shadow-sm'>
            <HiMagnifyingGlass className='h-5 w-5 text-blue-600' />
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Search jobs, companies, or locations...'
              className='w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 sm:text-base'
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className='text-xs font-semibold text-slate-400 hover:text-slate-600 cursor-pointer'
              >
                Clear
              </button>
            )}
          </div>

          <div className='flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 sm:px-5 shadow-sm'>
            <span className='inline-flex items-center gap-2 text-sm font-semibold text-slate-700'>
              <HiSparkles className='h-4 w-4 text-cyan-600' />
              Trending
            </span>
            {trends.map(tag => {
              const isActive = selectedFilter === tag.filter
              return (
                <button
                  key={tag.name}
                  onClick={() => handleTrendClick(tag.filter)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-white border-slate-200 hover:border-blue-300 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  #{tag.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {loading ? (
        <div className='mt-8 grid gap-6 md:grid-cols-2'>
          {[1, 2, 3, 4].map(skeletonId => (
            <div key={skeletonId} className='animate-pulse rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm h-64 flex flex-col justify-between'>
              <div>
                <div className='h-4 w-28 bg-slate-200 rounded-md mb-4' />
                <div className='h-8 w-60 bg-slate-200 rounded-md mb-4' />
                <div className='space-y-2'>
                  <div className='h-4 w-40 bg-slate-200 rounded-md' />
                  <div className='h-4 w-48 bg-slate-200 rounded-md' />
                </div>
              </div>
              <div className='h-10 w-32 bg-slate-200 rounded-full' />
            </div>
          ))}
        </div>
      ) : (
        <motion.div 
          layout 
          className='mt-8 grid gap-6 md:grid-cols-2'
        >
          <AnimatePresence mode='popLayout'>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                >
                  <JobCard job={job} />
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='col-span-full py-16 text-center rounded-3xl border border-dashed border-slate-300 bg-white/80 p-8 shadow-sm'
              >
                <div className='inline-flex rounded-full bg-slate-100 p-4 mb-4 text-slate-400'>
                  <HiBriefcase className='h-8 w-8' />
                </div>
                <h3 className='text-xl font-bold text-slate-800'>No jobs found</h3>
                <p className='mt-2 text-slate-500 max-w-sm mx-auto'>We couldn't find any opportunities matching your criteria. Try adjusting your keywords or clearing the category filters.</p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedFilter('')
                    toast.success('Filters reset successfully')
                  }}
                  className='mt-5 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition cursor-pointer'
                >
                  Reset search filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      <div className='mt-8 rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-950 to-blue-900 p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.12)] sm:p-8'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200'>Why teams love it</p>
            <h2 className='mt-2 text-2xl font-bold'>A cleaner way to explore roles and compare opportunities.</h2>
          </div>
          <div className='inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold border border-white/15 backdrop-blur-sm'>
            <HiBriefcase className='h-4 w-4 text-cyan-300' />
            Premium browsing experience
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jobs