<template>
  <div id="role">
    <div class="list-head">
      <el-input v-model="input" placeholder="角色代码"></el-input>
      <el-button style="margin-left: 10px;" @click="handleSearch">查询</el-button>
      <el-button type="primary" @click="handleAddItem">新增</el-button>
      <RoleDialog ref="add-dialog" :visible.sync="added" title="新增" :form="addItemForm" :handle-submit="handleAddRole"
        @close="handleCancel($event, 'added')"></RoleDialog>
    </div>
    <div class="list-body">
      <el-table :data="roleList" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="80px">
        </el-table-column>
        <el-table-column prop="roleCode" label="角色代码">
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述">
        </el-table-column>
        <el-table-column prop="note" label="备注">
        </el-table-column>
        <el-table-column label="操作" width="240px">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleRevise(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDeleteRole(scope.row)">删除</el-button>
            <RoleDialog ref="revise-dialog" :visible.sync="revised" title="修改" :form="reviseForm" :roleCode-disabled="true"
              :handle-submit="handleReviseRole" @close="handleCancel($event, 'revsied')"></RoleDialog>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { rolelist, addrole,roleinfo } from '@/api/index'
import RoleDialog from '@/components/RoleDialog.vue'

export default {
  components: {
    RoleDialog
  },
  mounted() {
    this.getRoleList();
  },
  data() {
    return {
      input: '',
      roleList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      added: false,
      addItemForm: {
        roleCode: '',
        name: '',
        desc: '',
        note: '',
        power: []
      },
      revised: false,
      reviseForm: {
        roleCode: '',
        name: '',
        desc: '',
        note: '',
        power: []
      }
    }
  },
  methods: {
    handleSearch() {
      this.getRoleList();
    },
    handleAddItem() {
      this.added = true;
    },
    handleAddRole() {
      this.$refs['add-dialog'].$refs['form'].validate(async (valid) => {
        if (valid) {
          let { roleCode, name, desc, note, power } = this.addItemForm;
          let result = await addrole({ roleCode, name, desc, note });
          console.log(result,power);
          if (result.code == 200) {
            this.$success('添加成功!');
            this.addItemForm = {
              roleCode: '',
              name: '',
              desc: '',
              note: '',
              power: []
            };
            this.getRoleList();
            this.added = false;
          } else if(result.code == 400) {
            console.log(roleCode, name, desc, note);
            this.$error(result.msg);
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleCancel(closed, key) {
      this[key] = closed;
    },
    async handleRevise(row) {
      let info = (await roleinfo(row.id)).data;

      console.log(info);
    },
    handleReviseRole() {

    },
    handleDeleteRole(row) {

    },
    handleCurrentChange(val) {

    },
    handleSizeChange(val) {
      console.log(val);
    },
    getRoleList() {
      this.$nextTick(async () => {
        let result = await rolelist(this.currentPage, this.pageSize, this.input);
        this.roleList = result.data.list;
        this.pageSize = result.data.pageSize;
        this.currentPage = result.data.currPage;
        this.total = result.data.totalCount;
      });
    },
    rolePower(power,powers = []) {
      power.forEach((item) => {
        if(item.subMenus != null) {
          this.rolePower();
        }
        
      });
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