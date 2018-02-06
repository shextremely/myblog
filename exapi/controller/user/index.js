import UserModel from '../../models/user'
//token生成
import jwt from 'jsonwebtoken'
//nodejs内置加密算法
import crypto from 'crypto'

import uuidV1 from 'uuid/v1'

class User {
  constructor () {
    this.login = this.login.bind(this)
    this.encryption = this.encryption.bind(this)
    // this.register = this.register.bind(this)
  }

  login (req, res, next) {
    const {username, password} = req.body
    try {
      if (!username) {
        throw new Error('用户名参数错误')
      }else if(!password){
        throw new Error('密码参数错误')
      }
    }catch (err) {
      console.log(err.message, err)
      res.send({
        status: 0,
        type: 'GET_ERROR_PARAM',
        message: err.message,
      })
      return
    }

    try{
      const psw = this.encryption(password)
      UserModel.findOne({username}, (err, doc) => {
        if (err) {
          return res.send({
            status: 0,
            message: '网络异常错误,请重试'
          })
        }
        if (!doc) {
          console.log('该用户没有注册')
          res.send({
            status: 0,
            type: 'ERROR_USRENAME',
            message: '该用户没有注册',
          })
        }else if (psw != doc.password) {
          console.log('用户名或者密码输入错误')
          res.send({
            status: 0,
            type: 'ERROR_PASSWORD',
            message: '用户名或者密码输入错误',
          })
        }else{
          let userid = doc.userid
          let user = {
            userid: userid,
            username: doc.username
          }
          //登陆成功创建token,这里肯定是不能拿密码作为token参数的
          let accessToken = jwt.sign(user, 'secret', {
            expiresIn: '1h'
          })

          req.session.authUser = accessToken
          res.send({
            status: 1,
            message: '恭喜你，登录成功',
            data: {
              accessToken,
              userid
            }
          })
        }
      })
    }catch(err){
      console.log('网络异常错误,请重试', err)
      res.send({
        status: 0,
        type: 'LOGIN_ADMIN_FAILED',
        message: '网络异常错误,请重试',
      })
    }
  }

  encryption (password) {
    const pwd = this.toSha256(this.toSha256(password).substr(2, 7) + this.toSha256(password))
		return pwd
  }

  toSha256 (password) {
		const sha = crypto.createHash('sha256')
		return sha.update(password).digest('hex')
	}
}

export default new User()
