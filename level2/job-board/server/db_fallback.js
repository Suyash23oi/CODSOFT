const fs = require('fs')
const path = require('path')

const DATA_DIR = path.join(__dirname, 'data')
const USERS_FILE = path.join(DATA_DIR, 'users.json')
const JOBS_FILE = path.join(DATA_DIR, 'jobs.json')

// Ensure directory and files exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([]))
}
if (!fs.existsSync(JOBS_FILE)) {
  fs.writeFileSync(JOBS_FILE, JSON.stringify([]))
}

const readData = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    return []
  }
}

const writeData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
  } catch (err) {
    console.error('Error writing fallback data:', err)
  }
}

// Fallback User Model Mimic
const FallbackUser = {
  findOne: async ({ email }) => {
    const users = readData(USERS_FILE)
    return users.find(u => u.email === email) || null
  },
  create: async (userData) => {
    const users = readData(USERS_FILE)
    const newUser = {
      _id: 'u_' + Math.random().toString(36).substr(2, 9),
      ...userData
    }
    users.push(newUser)
    writeData(USERS_FILE, users)
    return newUser
  }
}

// Fallback Job Model Mimic
const FallbackJob = {
  find: async () => {
    return readData(JOBS_FILE)
  },
  findById: async (id) => {
    const jobs = readData(JOBS_FILE)
    return jobs.find(j => j._id === id) || null
  },
  create: async (jobData) => {
    const jobs = readData(JOBS_FILE)
    const newJob = {
      _id: 'j_' + Math.random().toString(36).substr(2, 9),
      ...jobData,
      createdAt: new Date()
    }
    jobs.push(newJob)
    writeData(JOBS_FILE, jobs)
    return newJob
  },
  findByIdAndUpdate: async (id, updateData, options) => {
    const jobs = readData(JOBS_FILE)
    const idx = jobs.findIndex(j => j._id === id)
    if (idx === -1) return null
    jobs[idx] = { ...jobs[idx], ...updateData }
    writeData(JOBS_FILE, jobs)
    return jobs[idx]
  },
  findByIdAndDelete: async (id) => {
    const jobs = readData(JOBS_FILE)
    const filtered = jobs.filter(j => j._id !== id)
    writeData(JOBS_FILE, filtered)
    return { message: 'Deleted' }
  },
  countDocuments: async () => {
    return readData(JOBS_FILE).length
  },
  insertMany: async (jobsArray) => {
    const jobs = readData(JOBS_FILE)
    const mapped = jobsArray.map(j => ({
      _id: 'j_' + Math.random().toString(36).substr(2, 9),
      ...j,
      createdAt: new Date()
    }))
    jobs.push(...mapped)
    writeData(JOBS_FILE, jobs)
    return mapped
  }
}

module.exports = {
  FallbackUser,
  FallbackJob
}
