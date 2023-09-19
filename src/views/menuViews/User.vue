<template>
  <div id="user">
    <div class="list-head">
      <el-input v-model="input" placeholder="用户名"></el-input>
      <el-button style="margin-left: 10px;">查询</el-button>
      <el-button type="primary" @click="handleAddItem">新增</el-button>
      <el-dialog title="收货地址" :visible.sync="added">
        <el-form ref="addItemForm" label-position="right" label-width="80px" :rules="addItemFromRules"
          :model="addItemForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addItemForm.username" placeholder="登录账号"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addItemForm.email" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="addItemForm.mobile" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="addItemForm.realName" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="roleId">
            <el-radio v-model="addItemForm.roleId" label="1" border size="medium">超级管理员</el-radio>
            <el-radio v-model="addItemForm.roleId" label="2" border size="medium">优赞测试</el-radio>
          </el-form-item>
          <el-form-item label="部门">
            <el-cascader v-model="addItemForm.deptId" :options="options" :props="{ checkStrictly: true }"
              clearable></el-cascader>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="list-body">
      <el-table :data="userList" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="80px">
        </el-table-column>
        <el-table-column prop="username" label="用户名">
        </el-table-column>
        <el-table-column prop="realName" label="姓名">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="mobile" label="手机号">
        </el-table-column>
        <el-table-column prop="roleName" label="角色">
        </el-table-column>
        <el-table-column prop="deptName" label="部门">
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status" size="medium" type="danger">禁用</el-tag>
            <el-tag v-else size="medium">正常</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="240px">
          <template slot-scope="scope">
            <el-button size="mini">修改</el-button>
            <el-button size="mini" type="warning">禁用</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-size="5" layout="total, prev, pager, next, jumper" :total="13">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { userlist, adduser } from '@/api/index'

export default {
  mounted() {
    this.getUserList();
  },
  data() {
    let validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱地址'));
      } else {
        let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
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
        let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (reg.test(value)) {
          callback(new Error('手机号码格式错误,请重新输入!'));
        }
        callback();
      }
    }

    return {
      userList: [],
      input: '',
      currentPage: 1,
      added: false,
      addItemForm: {
        username: '',
        email: '',
        mobile: '',
        realName: '',
        roleId: '',
        deptId: []
      },
      addItemFromRules: {
        username: [
          { required: true, message: '用户名不得为空', trigger: 'blur' }
        ],
        email: [
          { required: true, validator: validateEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, validator: validateMobile, trigger: 'blur' }
        ],
        roleId: [
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
      }]
    }
  },
  methods: {
    getUserList() {
      this.$nextTick(async () => {
        let result = await userlist();
        this.userList = result.data.list;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleAddItem() {
      this.added = true;
    },
    handleCancel() {
      this.added = false;
    },
    handleSubmit() {
      this.$refs['addItemForm'].validate((valid) => {
        if (valid) {
          console.log(this.addItemForm);
          this.handleCancel();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style lang="less" scoped>
.list-head {
  display: flex;
  margin-bottom: 20px;

  .el-input {
    width: 200px;
  }

  .el-dialog .el-input {
    width: 100%;
  } 
}

.list-body {

  ::v-deep .el-table th.el-table__cell>.cell,
  ::v-deep .el-table td.el-table__cell div {
    text-align: center;
  }

  .el-pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }
}
</style>