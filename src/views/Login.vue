<template>
  <div id="login">
    <div class="bg">
      <div>
        <h1>格凡安信管理平台</h1>
        <p>Copyright 2021 格凡安信科技有限公司 版权所有</p>
      </div>
    </div>
    <div class="login-view">
      <div class="login">
        <h2>登录</h2>
        <el-form :model="form" status-icon :rules="rules" ref="form" class="form">
          <el-form-item prop="account">
            <el-input placeholder="账号" v-model.trim="form.account"></el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input placeholder="密码" type="password" v-model.trim="form.pwd"></el-input>
          </el-form-item>
          <el-form-item prop="captcha">
            <el-input placeholder="验证码" v-model.trim="form.captcha"></el-input>
            <el-image style="cursor: pointer;" :src="captchaUrl" @click="getCaptchaUrl"></el-image>
          </el-form-item>
          <el-form-item>
            <el-button size="medium" type="primary" @click="submit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getCaptcha } from '@/api/index';
import { login } from '@/api/user';
import { mapMutations } from 'vuex';

export default {
  mounted() {
    this.getCaptchaUrl();
  },
  data() {
    var validateAccount = (rule, value, callback) => {
      if (!value) {
        callback(new Error('账号不能为空'));
      } else callback();
    };
    var validatePwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('密码不得为空'));
      } else callback();
    };
    var validateCaptcha = (rule, value, callback) => {
      if (!value) {
        callback(new Error('验证码不得为空'));
      } else callback();
    };

    return {
      form: {
        account: '',
        pwd: '',
        captcha: '',
        uuid: ''
      },
      rules: {
        account: [
          { validator: validateAccount, trigger: 'blur' }
        ],
        pwd: [
          { validator: validatePwd, trigger: 'blur' }
        ],
        captcha: [
          { validator: validateCaptcha, trigger: 'blur' }
        ]
      },
      captchaUrl: ''
    }
  },
  methods: {
    submit() {
      this.$refs['form'].validate(async (valid,) => {
        if (valid) {
          let { account,pwd,captcha,uuid } = this.form;
          let mdPwd = this.$md5(pwd);
          let submitForm = {username: account,password: mdPwd,captcha,uuid};
          let result = await login(submitForm);
          if(result.code === 500) {
            this.$error(result.msg);
            this.getCaptchaUrl();
          } else if(result.code === 200) {
            this.$success('登录成功!');
            sessionStorage.setItem('token',result.data.token);
            this.$store.commit('menu/enter','首页');
            this.$store.commit('user/login',result.data.userInfo.user);
            this.$router.push({path: '/home'});
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getCaptchaUrl() {
      this.$nextTick(async () => {
        const { src,uuid } = getCaptcha();
        this.captchaUrl = await src;
        this.form.uuid = uuid;
      });
    },
    ...mapMutations(['enter','login'])
  }
}
</script>

<style lang="less" scoped>
#login {
  display: flex;
}

.bg {
  position: relative;
  flex-grow: 1;
  background-image: url('~@/assets/img/login_bg.jpg');
  height: 100vh;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: calc(100% - 120px);
    height: 100%;
    padding-left: 120px;
    background-color: rgba(68, 68, 68, .6);
  }

  h1 {
    color: #fff;
    font-size: 48px;
    margin-bottom: 30px;
  }

  p {
    color: #ccc;
    margin-bottom: 420px;
  }
}

.login-view {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 480px;
  padding-bottom: 340px;

  h2 {
    font-weight: 800;
    font-size: 16px;
    margin-bottom: 20px;
  }

  .login {
    width: 350px;

    .el-button {
      width: 100%;
      margin-top: 40px;
    }

    .el-image {
      width: 100px;
      flex-shrink: 0;
      margin-left: 40px;
    }

    ::v-deep .el-form-item__content {
      display: flex;
    }
  }
}
</style>