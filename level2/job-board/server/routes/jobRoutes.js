const express = require('express')
const Job = require('../models/Job')

const router = express.Router()

// GET ALL JOBS
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find()

    res.json(jobs)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

// GET SINGLE JOB
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)

    res.json(job)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

// CREATE JOB
router.post('/', async (req, res) => {
  try {
    const job = await Job.create(req.body)

    res.status(201).json(job)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

// UPDATE JOB
router.put('/:id', async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json(updatedJob)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

// DELETE JOB
router.delete('/:id', async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id)

    res.json({
      message: 'Job deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

module.exports = router