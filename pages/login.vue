<template>
<div class="m-login">
  <div class="u-header">
    <div class="logo"></div>
    <div class="loginTitle">Sign in FrontEnd</div>
  </div>
  <div class="u-main">
    <el-form label-position="top" ref="loginForm" :rules="rules" :model="loginForm" label-width="80px">
      <el-form-item label="Username or email address" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :class="{disabled: btnIsDisable}" class="submit" type="success" @click="submitForm('loginForm')">
          <span v-text="btnText"></span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- <div class="u-footer">
    <p>New to FrontEnd?
      <router-link to="join" class="create">Create an account</router-link>
    </p>
  </div> -->
</div>
</template>

<script>
export default {
  layout: 'login',
  data () {
    return {
      hasErrorMessage: false,
      btnIsDisable: false,
      btnText: '登录',
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, message: '长度至少6个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            username: this[formName].username,
            password: this[formName].password
          }

          this.loginFunc(data)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    loginFunc (data) {
      this.btnText = '登录中'
      this.btnIsDisable = true

      this.$http.post('/exapi/user/login', data).then(response => {
        let resData = response.data
        console.log(resData)
        //  登录功能调整
        if (resData.status === 1) {
          var exp = new Date()
          // 过期时间 7天
          exp.setTime(exp.getTime() + 7 * 24 * 3600 * 1000)
          document.cookie = 'accessToken=' + resData.data.accessToken + ';expires=' + exp.toGMTString()

          this.$store.commit('SET_USER', resData.data.accessToken)
          this.$store.commit('SET_USERID', resData.data.userid)
          this.$message({
            message: resData.message,
            type: 'success',
            duration: 1000
          })

          setTimeout(() => {
            this.$router.push({path: '/admin'})
          }, 1000)
        } else if (resData.status === 0) {
          this.btnText = '登录'
          this.btnIsDisable = false
          this.$message({
            message: resData.message,
            type: 'error',
            duration: 1000
          })
        // 这里为甚么不跳到下一步的catch
        // Promise.reject(new Error('登录失败'))
        }
      }).catch(error => {
        if (error) {
          console.log(error.stack)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.m-login{
  width: 340px;
  margin: 0 auto;
  .u-header{
    text-align: center;
    .logo{
      width: 100px;
      height: 100px;
    }
    .loginTitle{
      padding: 20px;
      font-size: 20px;
      color: #000;
    }
  }
  .u-main, .u-footer{
    padding: 20px 30px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  .u-main{
    label {
      font-size: 14px;
      font-weight: bold;
    }
  }
  .u-footer{
    margin-top: 20px;
    font-size:14px;
    color: #000;
    .create{
      color: #0366d6;
    }
  }
  .submit{
    width: 100%;
  }
}
</style>
