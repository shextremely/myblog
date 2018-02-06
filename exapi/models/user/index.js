import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userModel = new Schema({
  userid: String,
  username: String,
  password: String,
  email: String,
  avator: String,
  created: Date,
  updated: Date,
  github: String,
  qq: String
})

const User = mongoose.model('User', userModel)

export default User
