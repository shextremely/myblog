import multerUtil from './multerUtil'

const upload = multerUtil.single("image")

class Upload {
  constructor () {

  }

  uploadImage (req, res) {
    upload(req, res, function (err) {
      //添加错误处理
      if (err) {
        res.send({
          status: 0,
          message: '图片加载失败'
        })
      }
      //文件信息在req.file或者req.files中显示。
      res.send({
        status: 1,
        data: req.file,
        message: '图片加载成功'
      })
    })
  }
}

export default new Upload()
