'use strict'

import User from '../controller/user'
import Artical from '../controller/archives'
import Tags from '../controller/tags'
import Upload from '../controller/upload'

const routers =  router => {
  router.post('/user/login', User.login)
  // router.post('/user/register', User.register)
  //
  router.post('/upload/image', Upload.uploadImage)
  //
  // router.get('/ccap/generate', CCAP.generate)
  //
  router.post('/archives/addArtical', Artical.addArtical)
  router.post('/archives/updateArtical', Artical.updateArtical)
  router.post('/archives/removeArtical', Artical.removeArtical)
  router.get('/archives/showArticalsList/:cate', Artical.showArticalsList)
  router.post('/archives/showArticalsList', Artical.showArticalsListByCondition)
  router.get('/artical/showArticalInfoById/:articalid', Artical.showArticalInfoById)

  router.post('/tags/addTag', Tags.addTag)
  router.post('/tags/modifyTag', Tags.modifyTag)
  router.get('/tags/showAllTags', Tags.showAllTags)
  router.post('/tags/removeTags', Tags.removeTags)
}

export default routers
