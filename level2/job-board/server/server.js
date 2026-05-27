const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/authRoutes')
const jobRoutes = require('./routes/jobRoutes')

const app = express()

app.use(cors())
app.use(express.json())

const Job = require('./models/Job')

const seedJobs = async () => {
  try {
    const count = await Job.countDocuments()
    if (count === 0) {
      const demoJobs = [
        {
          title: 'Senior Frontend Developer',
          company: 'Google',
          location: 'Pune, Maharashtra',
          salary: '₹18 - ₹24 LPA',
          description: 'We are seeking an outstanding Frontend Developer to join our core product team. You will lead the development of intuitive user experiences, build highly performant reusable interfaces using React and Tailwind CSS, and collaborate directly with product and backend engineering teams to deliver state-of-the-art software at global scale.'
        },
        {
          title: 'Full Stack Engineer',
          company: 'Microsoft',
          location: 'Bengaluru, Karnataka',
          salary: '₹22 - ₹28 LPA',
          description: 'Join the Cloud + AI division at Microsoft. In this role, you will design and ship scalable APIs, manage databases, and create beautiful, performant user interfaces. Candidates should have robust experience with Node.js, Express, React, and MongoDB, alongside solid cloud architecture concepts.'
        },
        {
          title: 'Lead Product Designer',
          company: 'Adobe',
          location: 'Mumbai, Maharashtra (Hybrid)',
          salary: '₹16 - ₹20 LPA',
          description: 'Looking for a highly visual and user-centric Lead Product Designer to guide the future interface paradigms of Creative Cloud apps. You will construct wireframes, build high-fidelity interactive prototypes, write UI design specs, and collaborate with frontend developers to ensure perfect visual translation.'
        },
        {
          title: 'Machine Learning Specialist',
          company: 'Amazon',
          location: 'Hyderabad, Telangana',
          salary: '₹25 - ₹35 LPA',
          description: 'Apply advanced Machine Learning methodologies and state-of-the-art Deep Learning models to build recommendations, search intelligence, and visual recognition services. Candidates should be comfortable working with PyTorch, TensorFlow, Python pipelines, and scalable microservices.'
        },
        {
          title: 'Data Analyst',
          company: 'Netflix',
          location: 'Remote, India',
          salary: '₹14 - ₹18 LPA',
          description: 'Translate complicated datasets into clear actionable insights. In this role, you will build data pipelines, design interactive dashboards, and perform deep-dive analytics to guide business decisions across engineering, marketing, and content licensing.'
        },
        {
          title: 'Backend Systems Developer',
          company: 'Stripe',
          location: 'Bengaluru, Karnataka',
          salary: '₹20 - ₹26 LPA',
          description: 'Work on Stripe core billing engine. Write secure, reliable, and transactionally safe API code in Node.js and Go. You will ensure extreme low latency, manage complex SQL migrations, and optimize message queues for millions of transactions.'
        }
      ]
      await Job.insertMany(demoJobs)
      console.log('Successfully seeded database with beautiful demo jobs!')
    }
  } catch (err) {
    console.error('Error seeding database:', err)
  }
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected successfully to Atlas cluster.')
    seedJobs()
  })
  .catch(err => {
    console.warn('\n⚠️  MongoDB Atlas connection failed (possibly due to whitelist IP restrictions or being offline).')
    console.warn('👉 Gracefully falling back to high-performance local JSON-file simulated database.\n')
    seedJobs() // Seed the local JSON fallback instead!
  })

app.use('/api/auth', authRoutes)
app.use('/api/jobs', jobRoutes)

app.get('/', (req, res) => {
  res.send('API Running')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})