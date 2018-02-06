import TagsModel from '../../models/tags/index'
import Artical from '../archives'
import uuidV1 from 'uuid/v1'

class Tags {
  constructor () {

  }

  async showAllTags (req, res) {
    try {
      let tagsDoc = await TagsModel.find({}, {_id: 0})
      if (!tagsDoc) {
        res.send({
          status: 0,
          message: '标签列表为空'
        })
      } else {
        // let articalsNumber
        // TODO 这里该如何解决，目的： 计算每一个标签中的文章数 重要（异步问题解决）
        let tagsPromises = tagsDoc.map(tag => {
          return new Promise(async (resolve, reject) => {
            let tagName = tag.name.toLowerCase()
            let articalsNumber = await Artical.getArticalsNumberByTags(tagName)
            // 不能直接在tag上操作
            let newTag = JSON.parse(JSON.stringify(tag))
            Object.assign(newTag, {
              articalsNumber
            })
            resolve(newTag)
          })
        })
        Promise.all(tagsPromises).then(value => {
          res.send({
            status: 1,
            message: '查询成功',
            data: value
          })
        }).catch(err => {
          res.send({
            status: 0,
            message: '查询失败'
          })
        })
      }
    } catch (e) {
      res.send({
        status: 0,
        message: '查询失败'
      })
    }
  }

  async addTag (req, res) {
    const {tags} = req.body
    try {
      if (!tags) {
        throw new Error('标签信息出错')
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
      let tagDoc = await TagsModel.findOne({
        name: tags.name
      })
      if (!tagDoc) {
        let createTag = await TagsModel.create({
          tagid: uuidV1(),
          name: tags.name,
          description: tags.desc,
          created: tags.created
        })
        if(createTag){
          res.send({
            status: 1,
            message: '标签添加成功'
          })
          return
        }
        res.send({
          status: 0,
          type: 'TAGS_ADD_FAILED',
          message: '标签添加失败'
        })
      } else {
        res.send({
          status: 0,
          message: '标签已存在'
        })
      }
    } catch (e) {
      res.send({
        status: 0,
        type: 'TAGS_ADD_FAILED',
        message: '标签添加失败'
      })
    }
  }

  async modifyTag (req, res) {
    const {tagid, tags} = req.body
    try {
      if (!tagid) {
        throw new Error('未选中某标签')
      }
      if (!tags) {
        throw new Error('标签信息出错')
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
      let tagDoc = await TagsModel.update({
        tagid: tagid
      }, {$set:{
        name: tags.name,
        description: tags.desc,
        created: tags.created
      }})
      if(tagDoc){
        res.send({
          status: 1,
          message: '标签更新成功'
        })
        return
      }
      res.send({
        status: 0,
        type: 'TAGS_UPDATE_FAILED',
        message: '标签更新失败'
      })
    } catch (e) {
      res.send({
        status: 0,
        type: 'TAGS_UPDATE_FAILED',
        message: '标签添加失败'
      })
    }
  }

  async removeTags (req, res) {
    const {removeTagsIDs} = req.body
    try {
      if (!removeTagsIDs) {
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
      let removePromise = removeTagsIDs.map(removeTagId => {
        return new Promise(async (resolve, reject) => {
          let removeTag = await TagsModel.deleteOne({ tagid: removeTagId})
          resolve(removeTag)
        })
      })
      Promise.all(removePromise).then(value => {
        console.log(value)
        res.send({
          status: 1,
          message: '删除成功'
        })
      }).catch(err => {
        res.send({
          status: 0,
          message: '删除失败'
        })
      })
    } catch (e) {
      res.send({
        status: 0,
        type: 'TAGS_DELETE_FAILED',
        message: '标签删除失败'
      })
    }
  }
}

export default new Tags()
