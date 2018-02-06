import express from 'express'
import bodyParser from 'body-parser'

import db from './mongodb.js'
import routers from './router/index.js'

const app = express()
// extended为false表示使用querystring来解析数据，这是URL-encoded解析器
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json   添加json解析器
app.use(bodyParser.json())

const router = express.Router()



router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

routers(router)

export {router}
