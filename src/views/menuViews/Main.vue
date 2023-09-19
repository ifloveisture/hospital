<template>
  <div id="main">
    <div class="msg">
      <el-card class="base">
        <div slot="header" class="clearfix">
          <span>基本信息</span>
          <el-button style="float: right; padding: 3px 0" type="text">健康档案</el-button>
        </div>
        <ul class="info">
          <li class="info-item" v-for="(value, name) in userinfo" :key="name">
            {{ userinfoFormat[name] }} : {{ value }}
          </li>
        </ul>
      </el-card>
      <el-card class="health">
        <div slot="header" class="clearfix">
          <span>健康信息</span>
        </div>
        <ul class="info">
          <li class="info-item" v-for="(value, name) in healthinfo" :key="name">
            {{ healthinfoFormat[name] }} : {{ !value ? '无' : value }}
          </li>
        </ul>
      </el-card>
    </div>
    <el-card class="logs">
      <div slot="header" class="clearfix">
        <span>医疗服务记录</span>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="sj" label="日期">
        </el-table-column>
        <el-table-column prop="fwtype" label="服务类型">
        </el-table-column>
        <el-table-column prop="yljgmc" label="医院">
        </el-table-column>
        <el-table-column prop="ksmc" label="科室名称">
        </el-table-column>
        <el-table-column prop="jgmc" label="结论">
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-size="5" layout="total, prev, pager, next, jumper" :total="13">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { userinfo, serverlist } from '@/api/index'
import object from 'lodash'

export default {
  mounted() {
    this.getUserinfo();
    this.getServelist();
  },
  data() {
    return {
      userinfo: {},
      userinfoFormat: {
        brxm: '姓名',
        csrq: '出生日期',
        lxrdhhm: '联系方式',
        xbdm: '性别',
        abo: 'abo血型',
        jdryxm: '建档人',
        hyzklbdm: '婚姻状况',
        jdsj: '建档日期',
        xzdz: '现住地址'
      },
      healthinfo: {},
      healthinfoFormat: {
        cxjmjkdabh: '健康档案编号',
        ywgmy: '药物过敏史',
        hjwxysbllbdm: '暴露史',
        jzjbs: '家族史',
        ycxjbs: '遗传病史'
      },
      tableData: [],
      currentPage: 1,
    }
  },
  methods: {
    getUserinfo() {
      this.$nextTick(async () => {
        let result = await userinfo();
        this.userinfo = object.pick(result.data, Object.keys(this.userinfoFormat));
        this.healthinfo = object.pick(result.data, Object.keys(this.healthinfoFormat));
      });
    },
    getServelist() {
      this.$nextTick(async () => {
        let result = await serverlist();
        this.tableData = result.data.list;
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  }
}
</script>

<style lang="less" scoped>
.msg {
  display: flex;
  height: 250px;
  margin-bottom: 16px;

  .info-item {
    height: 30px;
    line-height: 30px;
  }

  .base {
    width: 1000px;
    // min-width: 540px;
    margin-right: 16px;

    .info {
      display: flex;
      flex-wrap: wrap;

      .info-item {
        width: 50%;

        &:nth-child(4n + 2),
        &:nth-child(4n + 3) {
          background-color: @rwo-1;
          color: #fff;
        }
      }
    }
  }

  .health {
    flex-grow: 1;

    .info-item:nth-child(odd) {
      background-color: @rwo-1;
      color: #fff;
    }
  }
}

.logs {
  height: 460px;

  ::v-deep .el-table__header-wrapper .el-table__header th.el-table__cell.is-leaf {
    background-color: @rwo-2 !important;
    color: #fff !important;
  }

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