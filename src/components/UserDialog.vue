<template>
  <el-dialog :title="title" :visible.sync="m_visible">
    <el-form ref="form" label-position="right" label-width="80px" :rules="formRules" :model="form">
      <el-form-item :disabled="usernameDisabled" label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="登录账号"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.realName" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-radio v-model="form.role" label="超级管理员" border size="medium">超级管理员</el-radio>
        <el-radio v-model="form.role" label="优赞测试" border size="medium">优赞测试</el-radio>
      </el-form-item>
      <el-form-item label="部门">
        <el-cascader v-model="form.dept" :options="options" :props="{ checkStrictly: true }" clearable></el-cascader>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '标题'
    },
    form: {
      type: Object,
      required: true
    },
    usernameDisabled: {
      type: Boolean,
      default: false
    },
    handleSubmit: {
      type: Function,
      required: true
    }
  },
  data() {
    let validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱地址'));
      } else {
        let reg = /^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$/;
        if (reg.test(value)) {
          callback(new Error('邮箱地址格式错误,请重新输入!'));
        }
        callback();
      }
    }

    let validateMobile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'));
      } else {
        let reg = /^1(3[0-9]|4[01456879]|5[0-3,5-9]|6[2567]|7[0-8]|8[0-9]|9[0-3,5-9])d{8}$/;
        if (reg.test(value)) {
          callback(new Error('手机号码格式错误,请重新输入!'));
        }
        callback();
      }
    }

    return {
      formRules: {
        username: [
          { required: true, message: '用户名不得为空', trigger: 'blur' }
        ],
        email: [
          { required: true, validator: validateEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, validator: validateMobile, trigger: 'blur' }
        ],
        role: [
          { required: true, message: '角色不得为空', trigger: 'blur' }
        ]
      },
      options: [{
        value: '优赞科技',
        label: '优赞科技',
        children: [{
          value: '前端开发',
          label: '前端开发',
        }]
      }],
      m_visible: null
    }
  },
  watch: {
    visible(newVal) {
      this.m_visible = newVal;
    },
    m_visible(newVal) {
      this.$emit('update:visible',newVal);
    }
  },
  methods: {
    handleCancel() {
      this.$emit('close',false);
    },
  }
}
</script>

<style lang="less" scoped></style>