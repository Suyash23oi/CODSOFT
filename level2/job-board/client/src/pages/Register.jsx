import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiBriefcase, HiBuildingOffice2, HiCheckCircle, HiEnvelope, HiLockClosed, HiUser } from 'react-icons/hi2'
import { AuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'

const benefits = [
  { title: 'Candidate profile', text: 'Save your goals and apply faster with a polished profile.' },
  { title: 'Employer access', text: 'Manage your hiring needs and connect with the right talent.' }
]

function Register() {
  const { register } = useContext(AuthContext)
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Candidate')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !email || !password) {
      toast.error('Please fill in all fields')
      return
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return
    }

    setIsSubmitting(true)
    const result = await register(name, email, password, role)
    setIsSubmitting(false)

    if (result.success) {
      toast.success(`Welcome aboard, ${name}!`)
      navigate('/jobs')
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div className='mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center px-4 py-12 sm:px-6 lg:px-8'>
      <div className='grid w-full overflow-hidden rounded-[32px] border border-slate-200 bg-white/95 shadow-[0_25px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[0.9fr_1.1fr]'>
        <div className='bg-gradient-to-br from-blue-700 via-cyan-600 to-slate-950 p-8 text-white sm:p-10'>
          <p className='text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100'>Join JobPortal</p>
          <h1 className='mt-4 text-3xl font-black sm:text-4xl'>Build your profile and unlock fresh opportunities.</h1>
          <p className='mt-4 text-sm leading-6 text-blue-50/90 sm:text-base'>Set up your account as a candidate or employer and start exploring the best matches for your hiring or job search goals.</p>

          <div className='mt-8 grid gap-3 sm:grid-cols-2'>
            {benefits.map(benefit => (
              <div key={benefit.title} className='rounded-[22px] border border-white/10 bg-white/5 px-4 py-4'>
                <div className='flex items-start gap-3'>
                  <HiCheckCircle className='mt-0.5 h-5 w-5 text-cyan-100' />
                  <div>
                    <p className='text-sm font-semibold text-white'>{benefit.title}</p>
                    <p className='mt-1 text-sm text-blue-50/85'>{benefit.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-8 flex flex-wrap gap-3 text-sm text-blue-50/90'>
            <span className='inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1'>
              <HiBriefcase className='h-4 w-4' />
              Curated matches
            </span>
            <span className='inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1'>
              <HiBuildingOffice2 className='h-4 w-4' />
              Trusted employers
            </span>
          </div>
        </div>

        <div className='p-8 sm:p-10'>
          <div className='mx-auto max-w-md'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-blue-600'>Register</p>
            <h2 className='mt-3 text-3xl font-bold text-slate-900'>Create account</h2>
            <p className='mt-2 text-sm text-slate-600'>Set up your profile and start discovering roles that fit your path.</p>

            <form onSubmit={handleSubmit} className='mt-8 space-y-4'>
              <div>
                <label className='mb-2 block text-sm font-semibold text-slate-700'>Full Name</label>
                <div className='flex items-center gap-3 rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-blue-400 focus-within:bg-white transition-all duration-300'>
                  <HiUser className='h-5 w-5 text-slate-400' />
                  <input
                    type='text'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Your full name'
                    className='w-full border-0 bg-transparent outline-none text-slate-800'
                  />
                </div>
              </div>

              <div>
                <label className='mb-2 block text-sm font-semibold text-slate-700'>Email</label>
                <div className='flex items-center gap-3 rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-blue-400 focus-within:bg-white transition-all duration-300'>
                  <HiEnvelope className='h-5 w-5 text-slate-400' />
                  <input
                    type='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='you@example.com'
                    className='w-full border-0 bg-transparent outline-none text-slate-800'
                  />
                </div>
              </div>

              <div>
                <label className='mb-2 block text-sm font-semibold text-slate-700'>Password</label>
                <div className='flex items-center gap-3 rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-blue-400 focus-within:bg-white transition-all duration-300'>
                  <HiLockClosed className='h-5 w-5 text-slate-400' />
                  <input
                    type='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Create a password (min. 6 chars)'
                    className='w-full border-0 bg-transparent outline-none text-slate-800'
                  />
                </div>
              </div>

              <div>
                <label className='mb-2 block text-sm font-semibold text-slate-700'>I want to register as a</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className='w-full rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-400 focus:bg-white text-slate-800 font-semibold cursor-pointer'
                >
                  <option value="Candidate">Candidate (Looking for Jobs)</option>
                  <option value="Employer">Employer (Hiring Talent)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className='w-full rounded-[22px] bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-blue-600 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer'
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>
            </form>

            <p className='mt-5 text-sm text-slate-600'>Already have an account? <Link to='/login' className='font-semibold text-blue-600 hover:underline'>Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register