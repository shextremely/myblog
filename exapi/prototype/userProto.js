'user strict'

import UserModel from '../models/user'

class BaseUser {
  constructor () {

  }

  getUserInfo (userid) {
    return new Promise((resolve, reject) => {
      // console.log(userid)
      let returnInfo = null;
      if (!userid) {
  			console.log('用户信息失效');
  			returnInfo = {
  				status: 0,
  				type: 'ERROR_PARAM',
  				message: '用户信息失效'
  			}
        reject(returnInfo)
  		}
  		try{
        UserModel.findOne({userid}, (err, doc) => {
          if (err) {
            returnInfo = {
              status: 0,
              type: 'FIND_USER_ERROR',
              message: '查找用户错误'
            }
            reject(returnInfo)
          } else if (!doc) {
            returnInfo = {
              status: 0,
              type: 'USER_ABSENCE',
              message: '数据库中没有该用户'
            }
            reject(returnInfo)
          } else {
            returnInfo = {
              status: 1,
              message: '查询成功',
              data: doc
            }
            resolve(returnInfo)
          }
        })
  		}catch (err) {
        returnInfo = {
  				status: 0,
  				type: 'ERROR_SESSION',
  				message: '获取用户信息失败'
  			}
        reject(returnInfo)
  		}
    })
	}
}

export default BaseUser
