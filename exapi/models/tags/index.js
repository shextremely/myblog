import mongoose from 'mongoose'

const Schema = mongoose.Schema

const tagsModel = new Schema({
  tagid: String,
  name: String,
  description: String,
  created: String
})

const Tags = mongoose.model('Tags', tagsModel)

export default Tags
