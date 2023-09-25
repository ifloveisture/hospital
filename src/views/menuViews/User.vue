<template>
  <div id="user">
    <div class="list-head">
      <el-input v-model="input" placeholder="用户名"></el-input>
      <el-button style="margin-left: 10px;" @click="handleSearch">查询</el-button>
      <el-button type="primary" @click="handleAddItem">新增</el-button>
      <UserDialog ref="add-dialog" :visible.sync="added" title="新增" :form="addItemForm" :handle-submit="handleAddUser"
        @close="handleCancel($event, 'added')">
      </UserDialog>
    </div>
    <div class="list-body">
      <el-table :height="tableHeight" :data="userList" border style="width: 100%">
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
        <el-table-column label="操作" width="240px">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleRevise(scope.row)">修改</el-button>
            <el-button v-if="scope.row.status" size="mini" type="success"
              @click="handleChangeStatus(scope.row)">启用</el-button>
            <el-button v-else size="mini" type="warning" @click="handleChangeStatus(scope.row)">禁用</el-button>
            <el-button size="mini" type="danger" @click="handleDeleteUser(scope.row)">删除</el-button>
            <UserDialog ref="revise-dialog" :visible.sync="revsied" title="修改" :form="reviseForm" :username-disabled="true"
              :handle-submit="handleReviseUser" @close="handleCancel($event, 'revsied')">
            </UserDialog>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { userlist, adduser, role, deptlist, deleteuser, changestatus } from '@/api/index'
import UserDialog from '@/components/UserDialog.vue';

export default {
  components: {
    UserDialog
  },
  mounted() {
    this.getUserList();
    this.getDeptList();
    this.getRole();
  },
  data() {
    return {
      userList: [],
      input: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      added: false,
      addItemForm: {
        username: '',
        email: '',
        mobile: '',
        realName: '',
        role: '',
        dept: []
      },
      revsied: false,
      reviseForm: {
        username: '',
        email: '',
        mobile: '',
        realName: '',
        role: '',
        dept: []
      },
      roleList: [],
      deptList: []
    }
  },
  computed: {
    tableHeight() {
      // 640 最大
      let height = (this.userList.length + 1) * 53;
      return Math.min(640,height);
    }
  },
  methods: {
    getUserList() {
      this.$nextTick(async () => {
        let result = await userlist(this.currentPage, this.pageSize, this.input);
        console.log(result.data);
        let { currPage, totalCount, list } = result.data;
        this.currentPage = currPage;
        this.total = totalCount;
        this.userList = list;
      });
    },
    async getRole() {
      let result = await role();
      if (result.code == 200) this.roleList = result.data;
    },
    async getDeptList() {
      let result = await deptlist();
      if (result.code == 200) {
        let list = [];
        this.flatten(result.data, list);
        this.deptList = list;
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUserList();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUserList();
    },
    handleAddItem() {
      this.added = true;
    },
    handleCancel(closed, key) {
      this[key] = closed;
    },
    handleAddUser() {
      this.$refs['add-dialog'].$refs['form'].validate(async (valid) => {
        if (valid) {
          let { username, email, mobile, realName, role, dept } = this.addItemForm;
          console.log(this.addItemForm);
          let roleId = this.roleList.filter((item) => item.roleName == role)[0].id;
          let deptId = null;
          if (dept.length > 0) deptId = this.deptList.filter((item) => item.name == dept.pop())[0].id;
          let result = await adduser({ username, email, mobile, realName, roleId, deptId });
          if (result.code == 200) {
            this.$success('添加成功!');
            this.addItemForm = {
              username: '',
              email: '',
              mobile: '',
              realName: '',
              role: '',
              dept: []
            }
            this.getUserList();
          }
          if (result.code == 500) this.$error(result.msg);
          this.added = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    flatten(arr = [], list = []) {
      arr.forEach((item) => {
        let { id, name, sort, subDepts } = item;
        list.push({ id, name, sort });
        if (subDepts.length > 0) this.flatten(subDepts, list);
        else return;
      });
    },
    handleDeleteUser(row) {
      if (row.roleName == '超级管理员') {
        this.$error('管理员不可删除!!!');
        return;
      }
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let result = await deleteuser({ id: row.id });
        console.log(result);
        if (result.code == 200) {
          this.$success('删除成功');
          this.getUserList();
        }
      }).catch(() => {
        this.$info('已取消');
      });
    },
    handleChangeStatus(row) {
      if (row.roleName == '超级管理员') {
        this.$error('管理员不可修改!!!');
        return;
      }
      this.$confirm('此操作将改变该角色状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let { status, id } = row;
        status = status ? 0 : 1;
        let result = await changestatus({ status, id });
        if (result.code == 200) {
          this.$success('状态修改成功');
          this.getUserList();
        }
      }).catch(() => {
        this.$info('已取消');
      });
    },
    handleSearch() {
      this.getUserList();
    },
    handleRevise(row) {
      console.log(row);
      let { deptId, deptName, email, mobile, realName, roleName, username } = row;
      this.reviseForm.username = username;
      this.reviseForm.email = email;
      this.reviseForm.mobile = mobile;
      this.reviseForm.realName = realName;
      this.reviseForm.role = roleName;
      this.reviseForm.dept 
    },
    handleReviseUser() {

    }
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