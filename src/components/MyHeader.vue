<template>
  <div id="my-header">
    <div class="menu">
      <div class="icon-menu" @click="handleFold(unfolded)"></div>
      <div class="pos">{{ menuTitle }}</div>
    </div>
    <el-dropdown>
      <div class="account">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <div class="name">{{ user.username }}</div>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="handleAccount(1)">修改密码</el-dropdown-item>
        <el-dropdown-item @click.native="handleAccount(0)">退出</el-dropdown-item>
      </el-dropdown-menu>
      <el-dialog title="修改密码" :visible.sync="dialogVisible" width="400px">
        <div class="account-line">
          <div style="margin: 0 14px 0 40px;">账号</div>
          <div>{{ user.username }}</div>
        </div>
        <el-form ref="resetPwdForm" :model="resetPwdForm" :rules="rules">
          <el-form-item label-width="80px" type="password" label="原密码" prop="pwd">
            <el-input v-model.trim="resetPwdForm.pwd"></el-input>
          </el-form-item>
          <el-form-item label-width="80px" type="password" label="新密码" prop="newpwd">
            <el-input v-model.trim="resetPwdForm.newpwd"></el-input>
          </el-form-item>
          <el-form-item label-width="80px" type="password" label="确认密码" prop="repwd">
            <el-input v-model.trim="resetPwdForm.repwd"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
import { reset, logout } from '@/api/index';

export default {
  computed: {
    ...mapGetters('menu', ['menuTitle', 'unfolded']),
    ...mapGetters('user', ['user'])
  },
  data() {
    let validateRepwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.resetPwdForm.newpwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }

    return {
      dialogVisible: false,
      resetPwdForm: {
        pwd: '',
        newpwd: '',
        repwd: ''
      },
      rules: {
        pwd: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newpwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        repwd: [
          { required: true, validator: validateRepwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleFold(unfolded) {
      console.log(unfolded)
      this.$store.commit('menu/fold', !unfolded);
    },
    handleAccount(oprate) {
      if (oprate) {
        this.dialogVisible = true;
      } else {
        this.$confirm('确定进行[退出]操作,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let result = await logout();
          if(result.code == 200) {
            this.$success('退出成功!');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('menuList');
            this.$router.push({path: '/login'})
          }
        }).catch(() => {
          this.$info('已取消退出');
        });
      }
    },
    handleSubmit() {
      this.$refs['resetPwdForm'].validate((valid) => {
        if (valid) {
          let password = this.$md5(this.resetPwdForm.pwd);
          let newPassword = this.$md5(this.resetPwdForm.repwd);
          let result = reset({ password, newPassword });
          this.handleClose();
          console.log(result);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleClose() {
      this.dialogFormVisible = false;
    },
    ...mapMutations(['fold'])
  }
}
</script>

<style lang="less" scoped>
#my-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 50px;
  box-shadow: 0 2px 5px 2px #ddd;
  padding: 0 20px;
}

.menu {
  display: flex;
  align-items: center;

  .icon-menu {
    width: 28px;
    height: 28px;
    background: url('../assets/icon/menu.png') center center no-repeat;
    background-size: 28px;

    &:hover {
      background: url('../assets/icon/menu_active.png') center center no-repeat;
      background-size: 28px;
    }
  }

  .pos {
    font-size: 14px;
    margin-left: 20px;
  }
}

.account {
  display: flex;
  align-items: center;
  cursor: pointer;

  .name {
    font-size: 12px;
    margin-left: 6px;
  }
}

.account-line {
  display: flex;
}
</style>