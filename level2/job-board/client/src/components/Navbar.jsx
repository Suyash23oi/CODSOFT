import { useState, useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import { AuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'

function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Successfully logged out!')
    navigate('/')
    setMenuOpen(false)
  }

  // Determine nav items dynamically based on auth status and user role
  const getNavItems = () => {
    const items = [
      { to: '/', label: 'Home' },
      { to: '/jobs', label: 'Jobs' }
    ]

    if (user) {
      if (user.role === 'Employer') {
        items.push({ to: '/post-job', label: 'Post a Job' })
      }
      items.push({ to: '/profile', label: 'Profile' })
    } else {
      items.push({ to: '/login', label: 'Login' })
      items.push({ to: '/register', label: 'Register' })
    }

    return items
  }

  const navItems = getNavItems()

  return (
    <header className='sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl'>
      <nav className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8'>
        <Link to='/' className='flex items-center gap-3 group'>
          <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-lg font-bold text-white shadow-[0_18px_40px_rgba(59,130,246,0.35)] transition-all duration-300 group-hover:scale-105'>
            JP
          </div>
          <div>
            <p className='text-base font-bold text-slate-900 sm:text-lg transition-colors group-hover:text-blue-600'>JobPortal</p>
            <p className='text-xs text-slate-500'>Find your next opportunity</p>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <div className='hidden items-center gap-2 md:flex'>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Right side CTA or user details */}
        <div className='flex items-center gap-3'>
          {user ? (
            <div className='hidden items-center gap-3 md:flex'>
              <Link 
                to='/profile'
                className='flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100'
              >
                <div className='h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700 uppercase'>
                  {user.name.charAt(0)}
                </div>
                <span>{user.name}</span>
                <span className='rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600 border border-blue-200/50'>
                  {user.role}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className='inline-flex items-center gap-2 rounded-full border border-slate-200 hover:border-red-200 bg-white hover:bg-red-50 hover:text-red-600 px-4 py-2 text-sm font-semibold text-slate-700 transition cursor-pointer shadow-sm'
              >
                <HiArrowRightOnRectangle className='h-4 w-4' />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to='/register'
              className='hidden rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-600 md:inline-flex cursor-pointer'
            >
              Join now
            </Link>
          )}

          <button
            type='button'
            aria-label='Toggle navigation menu'
            aria-expanded={menuOpen}
            className='rounded-full border border-slate-200 bg-white px-3 py-2 text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600 md:hidden cursor-pointer'
            onClick={() => setMenuOpen(open => !open)}
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className='border-t border-slate-200 bg-white/96 px-4 pb-6 pt-3 md:hidden shadow-lg animate-fade-in'>
          <div className='flex flex-col gap-2'>
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {user && (
              <div className='mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3'>
                <div className='flex items-center gap-3 px-3 py-2'>
                  <div className='h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-700 uppercase'>
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className='text-sm font-bold text-slate-900'>{user.name}</p>
                    <p className='text-xs text-slate-500'>{user.role}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className='flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 border border-red-200/50 px-4 py-3 text-sm font-semibold text-red-600 transition cursor-pointer'
                >
                  <HiArrowRightOnRectangle className='h-4 w-4' />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar