<template>
  <div id="check">
    <el-card class="menu-list">
      <div slot="header" class="clearfix">
        <span>体检详情</span>
      </div>
      <ul>
        <li @click="handleSelect(item.id, index)" :data-active="activeIndex == index" class="item"
          v-for="(item, index) in menuList" :key="item.id">{{ item.recordDate }}-{{ item.yljgmc }}</li>
      </ul>
    </el-card>
    <el-card class="check-log">
      <div v-if="!report" class="mask"></div>
      <div v-else>
        <div class="page-name">{{ report.pageName }}</div>
        <el-card>
          <div slot="header" class="clearfix">
            <span>体检报告</span>
          </div>
          <ul class="report-list">
            <li class="item" v-for="(item, key) in format(report, reportinfoFormat)" :key="key">
              {{ reportinfoFormat[key] }}:{{ item }}
            </li>
          </ul>
          <ul class="result">
            <li class="item" v-for="(item, key) in format(report, resultinfoFormat)" :key="key">
              {{ resultinfoFormat[key] }}:{{ item }}
            </li>
          </ul>
        </el-card>
        <div class="page-name">{{ bloodReport.pageName }}</div>
        <el-card>
          <div slot="header" class="clearfix">
            <ul class="head-list">
              <li class="item" v-for="(item, key) in format(bloodReport, reportFormat)" :key="key">
                {{ reportFormat[key] }}:{{ item }}
              </li>
            </ul>
          </div>
          <el-table :data="bloodReport.lists" style="width: 100%">
            <el-table-column prop="name" label="项目名称">
            </el-table-column>
            <el-table-column prop="result" label="结果">
            </el-table-column>
            <el-table-column prop="hint" label="提示">
              <template slot-scope="scope">
                <div v-if="scope.row.hint > 0" class="icon icon-up"></div>
                <span v-else-if="scope.row.hint == 0">无</span>
                <div v-else class="icon icon-down"></div>
              </template>
            </el-table-column>
            <el-table-column prop="normal" label="参考值">
            </el-table-column>
            <el-table-column prop="unit" label="单位">
            </el-table-column>
          </el-table>
        </el-card>
        <div class="page-name">{{ urinalysis.pageName }}</div>
        <el-card>
          <div slot="header" class="clearfix">
            <ul class="head-list">
              <li class="item" v-for="(item, key) in format(urinalysis, reportFormat)" :key="key">
                {{ reportFormat[key] }}:{{ item }}
              </li>
            </ul>
          </div>
          <el-table :data="urinalysis.lists" style="width: 100%">
            <el-table-column prop="name" label="项目名称">
            </el-table-column>
            <el-table-column prop="result" label="结果">
            </el-table-column>
            <el-table-column prop="hint" label="提示">
              <template slot-scope="scope">
                <div v-if="scope.row.hint > 0" class="icon icon-up"></div>
                <span v-else-if="scope.row.hint == 0">无</span>
                <div v-else class="icon icon-down"></div>
              </template>
            </el-table-column>
            <el-table-column prop="normal" label="参考值">
            </el-table-column>
            <el-table-column prop="unit" label="单位">
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import { menulist, checkdetail } from '@/api/index'
import object from 'lodash'

export default {
  mounted() {
    this.getMenuList();
  },
  data() {
    return {
      menuList: [],
      activeIndex: -1,
      report: null,
      reportinfoFormat: {
        name: '姓名',
        sex: '性别',
        age: '年龄',
        type: '类型检查',
        combo: '体检套餐',
        checkDate: '体检日期',
        doctor: '总检医生',
        date: '总检日期'
      },
      resultinfoFormat: {
        result: '总检结果',
        suggest: '建议'
      },
      bloodReport: {},
      reportFormat: {
        departments: '项目名称',
        pageName: '科室',
        doctor: '检查医生',
        date: '检查日期'
      },
      urinalysis: {}
    }
  },
  methods: {
    getMenuList() {
      this.$nextTick(async () => {
        let result = await menulist();
        this.menuList = result.data;
      })
    },
    async getDetail(id) {
      let result = await checkdetail(id);
      this.report = result.data[0];
      this.bloodReport = result.data[1];
      this.urinalysis = result.data[2];
    },
    handleSelect(id, index) {
      this.getDetail(id);
      this.activeIndex = index;
    },
    format(info, format) {
      let obj = {};
      let keys = Object.keys(format);
      for (let key in info) {
        if (keys.includes(key)) obj[key] = info[key];
      }
      return object.pick(obj, keys);
    }
  }
}
</script>

<style lang="less" scoped>
#check {
  display: flex;

  &>.el-card {
    height: calc(100vh - 174px);
  }

  .menu-list {
    width: 250px;
    margin-right: 10px;
    flex-shrink: 0;

    ::v-deep .el-card__header {
      border: none;
      color: #909399;
      font-size: 18px;
      font-weight: 600;
      line-height: 28px;
      height: 28px;
    }

    ::v-deep .el-card__body {
      padding: 20px 0;
    }

    .item {
      line-height: 36px;
      height: 36px;
      border-bottom: 1px dashed #c7cbd3;
      padding: 0 20px;
      font-size: 12px;
      cursor: pointer;
      user-select: none;

      &:hover {
        background-color: @bellflower-6;
      }
    }

    [data-active='true'] {
      background-color: @bellflower-6;
      color: #707783;
    }
  }

  .check-log {
    min-width: 560px;
    flex-grow: 1;
    font-size: 14px;
    overflow: auto;

    ::v-deep .el-card__body {
      height: calc(100% - 40px);

      & > div {
        padding-bottom: 20px;
      }
    }

    .el-card {
      margin-bottom: 6px;
    }

    .mask {
      width: 100%;
      height: 100%;
      background-color: #ec6d71;
    }

    .report-list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .item {
        width: 25%;
        margin-top: 20px;

        &:nth-child(4n + 4) {
          text-align: right;
        }
      }
    }

    .result {
      margin-top: 20px;

      .item {
        margin-bottom: 20px;
      }
    }

    .page-name {
      background-color: @bellflower-1;
      color: #fff;
      font-size: 24px;
      font-weight: 600;
      line-height: 30px;
      height: 30px;
      margin-bottom: 20px;
      padding-left: 20px;
    }

    .head-list {
      display: flex;
      justify-content: space-between;

      .item {
        height: 32px;
        line-height: 32px;
      }
    }

    .icon {
      width: 18px;
      height: 18px;
    }

    .icon-up {
      background: url('../../assets/icon/up-arrow.png') center center no-repeat;
      background-size: 18px;
    }

    .icon-down {
      background: url('../../assets//icon/down-arrow.png') center center no-repeat;
      background-size: 18px;
    }
  }
}
</style>