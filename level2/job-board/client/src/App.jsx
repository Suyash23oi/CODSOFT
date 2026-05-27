import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'

import Navbar from './components/Navbar'

import Home from './pages/Home'
import JobDetails from './pages/JobDetails'
import Jobs from './pages/Jobs'
import Login from './pages/Login'
import Register from './pages/Register'
import PostJob from './pages/PostJob'
import Profile from './pages/Profile'

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{
        style: {
          borderRadius: '16px',
          background: '#0f172a',
          color: '#fff',
          fontFamily: 'Inter, sans-serif'
        }
      }} />
      <Navbar />

      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/jobs/:id' element={<JobDetails />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/post-job' element={<PostJob />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </main>
    </AuthProvider>
  )
}

export default App