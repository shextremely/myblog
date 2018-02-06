import multer from 'multer'

const storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, process.cwd() + '/static/upload/images')
  },
  filename (req, file, cb) {
    cb(null, Date.now() + ".jpg")
  }
})

let multerUtil = multer({
  storage
})

export default multerUtil
