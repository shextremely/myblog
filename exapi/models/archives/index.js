import mongoose from 'mongoose'

const Schema = mongoose.Schema

const articalModel = new Schema({
  articalid: String,
  authorid: String,
  author: String,
  title: String,
  imageUrl: String,
  content: String,
  abstract: String,
  authority: String,
  state: String,
  meta: {
    category: String,
    tags: Array,
    created: String,
    updated: String
  },
  follow: {
    views: Number,
    thumbsups: Number,
    comments: Number
  }
})

const Artical = mongoose.model('Artical', articalModel)

export default Artical
