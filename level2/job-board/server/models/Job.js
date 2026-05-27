const mongoose = require('mongoose')
const { FallbackJob } = require('../db_fallback')

const JobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  salary: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const MongooseJob = mongoose.model('Job', JobSchema)

const ResilientJob = {
  find: async () => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseJob.find()
    }
    return await FallbackJob.find()
  },
  findById: async (id) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseJob.findById(id)
    }
    return await FallbackJob.findById(id)
  },
  create: async (data) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseJob.create(data)
    }
    return await FallbackJob.create(data)
  },
  findByIdAndUpdate: async (id, data, options) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseJob.findByIdAndUpdate(id, data, options)
    }
    return await FallbackJob.findByIdAndUpdate(id, data, options)
  },
  findByIdAndDelete: async (id) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseJob.findByIdAndDelete(id)
    }
    return await FallbackJob.findByIdAndDelete(id)
  },
  countDocuments: async () => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseJob.countDocuments()
    }
    return await FallbackJob.countDocuments()
  },
  insertMany: async (data) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseJob.insertMany(data)
    }
    return await FallbackJob.insertMany(data)
  }
}

module.exports = ResilientJob