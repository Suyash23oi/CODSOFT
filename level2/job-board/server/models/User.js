const mongoose = require('mongoose')
const { FallbackUser } = require('../db_fallback')

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  role: String
})

const MongooseUser = mongoose.model('User', UserSchema)

const ResilientUser = {
  findOne: async (query) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseUser.findOne(query)
    }
    return await FallbackUser.findOne(query)
  },
  create: async (data) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseUser.create(data)
    }
    return await FallbackUser.create(data)
  }
}

module.exports = ResilientUser