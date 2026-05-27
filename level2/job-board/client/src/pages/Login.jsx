import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiBriefcase, HiCheckCircle, HiClock, HiEnvelope, HiLockClosed } from 'react-icons/hi2'
import { AuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'

const perks = [
  { title: 'Track applications', text: 'Keep every application organized in one place.' },
  { title: 'Respond faster', text: 'Stay on top of recruiter messages without missing a beat.' },
  { title: 'Save opportunities', text: 'Build your shortlist and revisit roles whenever you are ready.' }
]

function Login() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please enter email and password')
      return
    }

    setIsSubmitting(true)
    const result = await login(email, password)
    setIsSubmitting(false)

    if (result.success) {
      toast.success('Successfully logged in!')
      navigate('/jobs')
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div className='mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center px-4 py-12 sm:px-6 lg:px-8'>
      <div className='grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white/95 shadow-[0_25px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[0.9fr_1.1fr]'>
        <div className='bg-gradient-to-br from-slate-950 via-blue-900 to-cyan-700 p-8 text-white sm:p-10'>
          <p className='text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200'>Welcome back</p>
          <h1 className='mt-4 text-3xl font-black sm:text-4xl'>Log in to continue your job search.</h1>
          <p className='mt-4 text-sm leading-6 text-blue-50/90 sm:text-base'>Access saved roles, keep track of applications, and get updates on newly posted opportunities.</p>

          <div className='mt-8 space-y-3'>
            {perks.map(perk => (
              <div key={perk.title} className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3'>
                <div className='flex items-start gap-3'>
                  <HiCheckCircle className='mt-0.5 h-5 w-5 text-cyan-200' />
                  <div>
                    <p className='text-sm font-semibold text-white'>{perk.title}</p>
                    <p className='mt-1 text-sm text-blue-50/85'>{perk.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-8 flex flex-wrap gap-3 text-sm text-blue-50/90'>
            <span className='inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1'>
              <HiBriefcase className='h-4 w-4' />
              Curated roles
            </span>
            <span className='inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1'>
              <HiClock className='h-4 w-4' />
              Faster replies
            </span>
          </div>
        </div>

        <div className='p-8 sm:p-10'>
          <div className='mx-auto max-w-md'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-blue-600'>Login</p>
            <h2 className='mt-3 text-3xl font-bold text-slate-900'>Sign in</h2>
            <p className='mt-2 text-sm text-slate-600'>Use your email and password to access your dashboard.</p>

            <form onSubmit={handleSubmit} className='mt-8 space-y-4'>
              <div>
                <label className='mb-2 block text-sm font-semibold text-slate-700'>Email</label>
                <div className='flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-blue-400 focus-within:bg-white transition-all duration-300'>
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
                <div className='flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-blue-400 focus-within:bg-white transition-all duration-300'>
                  <HiLockClosed className='h-5 w-5 text-slate-400' />
                  <input
                    type='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your password'
                    className='w-full border-0 bg-transparent outline-none text-slate-800'
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className='w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-blue-600 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer'
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <p className='mt-5 text-sm text-slate-600'>New here? <Link to='/register' className='font-semibold text-blue-600 hover:underline'>Create an account</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login