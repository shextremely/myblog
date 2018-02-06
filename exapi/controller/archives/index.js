import ArticalModel from '../../models/archives/index'
import BaseUser from '../../prototype/userProto'
import queryString from 'query-string'
import jwt from 'jsonwebtoken'
import uuidV1 from 'uuid/v1'

class Artical extends BaseUser {
  constructor() {
    super()
    this.showArticalsList = this.showArticalsList.bind(this)
    this.showArticalsListByCondition = this.showArticalsListByCondition.bind(this)
  }

  showArticalsList(req, res) {
    let {
      cate
    } = req.params
    let sort = queryString.parse(req.url.split('?')[1])
    let {queryCondi, sortCondi} = this.rankAlgorithm(cate, sort)

    this.queryArticals(queryCondi, sortCondi, res)
  }

  showArticalsListByCondition (req, res) {
    let {tag, category, authority, state} = req.body

    let queryCondi = this.conditonFormat(tag, category, authority, state)
    let sortCondi = {}

    this.queryArticals(queryCondi, sortCondi, res)
  }

  async queryArticals (queryCondi, sortCondi, res) {
    try {
      let articalDoc = await ArticalModel.find(queryCondi, {_id: 0}).sort(sortCondi)
      if (!articalDoc) {
        res.send({
          status: 0,
          message: '文章列表为空'
        })
      } else {
        res.send({
          status: 1,
          message: '查询成功',
          data: articalDoc
        })
      }
    } catch (e) {
      res.send({
        status: 0,
        message: '查询失败'
      })
    }
  }

  async showArticalInfoById (req, res) {
    let articalid = req.params.articalid
    try {
      if (!articalid) {
        throw new Error('文章参数错误')
      }
    } catch (err) {
      res.send({
        status: 0,
        type: 'GET_ERROR_PARAM',
        message: err.message,
      })
      return
    }
    try {
      let artical = await ArticalModel.findOne({
        articalid
      }, {_id: 0})
      if (!artical) {
        res.send({
          status: 0,
          message: '文章列表为空'
        })
        return
      } else {
        res.send({
          status: 1,
          message: '查询成功',
          data: artical
        })
      }
    } catch (e) {
      res.send({
        status: 0,
        message: '查询失败'
      })
    }
  }

  async addArtical(req, res) {
    const {
      artical
    } = req.body
    const token = req.session.authUser
    let username = ""
    let userid = ""
    try {
      if (!artical) {
        throw new Error('文章信息出错')
      }
      let decoded = await jwt.verify(token, 'secret')
      userid = decoded.userid
      username = decoded.username
    } catch (err) {
      res.send({
        status: 0,
        type: 'GET_ERROR_PARAM',
        message: err.message,
      })
      return
    }
    try {
      let addDoc = await ArticalModel.create({
        articalid: uuidV1(),
        authorid: userid,
        author: username,
        title: artical.title,
        imageUrl: artical.imageUrl,
        content: artical.content,
        abstract: artical.abstract,
        authority: artical.authority,
        state: artical.state,
        meta: {
          category: artical.meta.category,
          tags: artical.meta.tags,
          created: artical.meta.created,
          updated: artical.meta.updated
        },
        follow: {
          views: 0,
          thumbsups: 0,
          comments: 0
        }
      })
      if (addDoc) {
        res.send({
          status: 1,
          message: artical.state === "草稿" ? '草稿添加成功' : '文章添加成功'
        })
      } else {
        res.send({
          status: 0,
          type: 'ARTICALL_ADD_FAILED',
          message: artical.state === "草稿" ? '草稿添加失败' : '文章添加失败'
        })
      }
    } catch (e) {
      res.send({
        status: 0,
        type: 'ARTICALL_ADD_FAILED',
        message: '文章添加失败'
      })
    }
  }

  async updateArtical (req, res) {
    const {articalid, artical} = req.body
    const token = req.session.authUser
    let username = ""
    let userid = ""
    try {
      if (!artical) {
        throw new Error('文章信息出错')
      }
      let decoded = await jwt.verify(token, 'secret')
      userid = decoded.userid
      username = decoded.username
    } catch (err) {
      res.send({
        status: 0,
        type: 'GET_ERROR_PARAM',
        message: err.message,
      })
      return
    }
    try {
      let updateDoc = await ArticalModel.update({
        articalid
      }, {
        authorid: userid,
        author: username,
        title: artical.title,
        imageUrl: artical.imageUrl,
        content: artical.content,
        abstract: artical.abstract,
        authority: artical.authority,
        state: artical.state,
        meta: {
          category: artical.meta.category,
          tags: artical.meta.tags,
          created: artical.meta.created,
          updated: artical.meta.updated
        }
      })
      if (updateDoc) {
        res.send({
          status: 1,
          message: artical.state === "草稿" ? '草稿更新成功' : '文章更新成功'
        })
      } else {
        res.send({
          status: 0,
          type: 'ARTICALL_ADD_FAILED',
          message: artical.state === "草稿" ? '草稿更新失败' : '文章更新失败'
        })
      }
    } catch (e) {
      res.send({
        status: 0,
        type: 'ARTICALL_ADD_FAILED',
        message: '文章更新失败'
      })
    }
  }

  async removeArtical (req, res) {
    const {articalid} = req.body
    try {
      if (!articalid) {
        throw new Error('标签参数出错')
      }
    } catch (err) {
      res.send({
        status: 0,
        type: 'GET_ERROR_PARAM',
        message: err.message,
      })
      return
    }
    try {
      let removeDoc = await ArticalModel.deleteOne({ articalid })
      if (removeDoc) {
        res.send({
          status: 1,
          message: '文章删除成功'
        })
      } else {
        res.send({
          status: 0,
          type: 'ARTICALL_REMOVE_FAILED',
          message: '文章删除失败'
        })
      }
    } catch (e) {
      res.send({
        status: 0,
        type: 'ARTICALL_REMOVE_FAILED',
        message: '文章删除失败'
      })
    }
  }

  getArticalsNumberByTags (tagName) {
    return new Promise(async (resolve, reject) => {
      if (!tagName) {
        reject('标签内容为空')
      }
      try {
        let doc = await ArticalModel.find({
          'meta.tags': tagName
        }, {_id: 0})
        resolve(doc.length)
      } catch (e) {
        reject('查询失败')
      }
    })
  }

  rankAlgorithm(cate, sort) {
    let queryCondi = {}
    if (cate != 'all') {
      queryCondi['meta.category'] = cate
    }
    let sortCondi = {}
    if(sort.limit){
      sortCondi = {'follow.views': -1}
      switch (sort.limit) {
        case 'Popular':
          sortCondi = {'follow.views': -1}
          break;
        case 'Recent':
          sortCondi = {'meta.updated': -1}
          break;
        case 'Comments':
          sortCondi = {'follow.comments': -1}
          break;
      }
    }

    return {
      queryCondi,
      sortCondi
    }
  }

  conditonFormat (tag, category, authority, state) {
    let queryCondi = {}

    if (tag !== 'all') queryCondi['meta.tags'] = tag
    if (category !== 'all') queryCondi['meta.category'] = category
    if (authority !== 'all') queryCondi['authority'] = authority
    if (state !== 'all') queryCondi['state'] = state

    return queryCondi
  }
}

export default new Artical()
