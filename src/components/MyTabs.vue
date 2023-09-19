<template>
  <div id="my-tabs">
    <el-tabs @tab-remove="handleClose" closable v-model="activeIndex" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in list" :key="index" :data-item="JSON.stringify(item)" :label="item.label"
        :name="`${index}`"></el-tab-pane>
    </el-tabs>
    <el-dropdown>
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="handleCloseTab(activeIndex)">关闭当前标签页</el-dropdown-item>
        <el-dropdown-item @click.native="handleCloseTab(activeIndex, list)">关闭其他标签页</el-dropdown-item>
        <el-dropdown-item @click.native="handleCloseTab(-1, list)">关闭所有标签页</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters('tabs', ['list']),
    activeIndex: {
      get() {
        return this.$store.state.tabs.activeIndex.toString();
      },
      set(newVal) {
        this.$store.commit('tabs/changeActiveIndex', newVal * 1);
      }
    }
  },
  methods: {
    handleClick(tab) {
      let item = JSON.parse(tab.$el.dataset.item);
      this.$router.push({ path: item.url });
      this.$store.commit('menu/activated', item.index);
    },
    handleClose(name) {
      this.$store.commit('tabs/removeItem', name * 1);
    },
    handleCloseTab(index, list) {
      let listIndex = list.map((item, index) => item = index);
      let deleteIndex = listIndex.filter((item) => item != index);
      if (index >= 0 && listIndex.length == 0) {
        this.$store.commit('tabs/removeItem',index);
      }
      if (list.length > 0) {
       deleteIndex.forEach(index => {
        this.$store.commit('tabs/removeItem',index);
       });
      }
      if (index < 0) {
        listIndex.forEach(index => {
          this.$store.commit('tabs/removeItem',index);
        });
      }
    },
    ...mapMutations(['changeActiveIndex', 'removeItem', 'activated'])
  }
}
</script>

<style lang="less" scoped>
#my-tabs {
  display: flex;
  justify-content: space-between;
  padding-left: 12px;
}

.el-dropdown {
  width: 40px;
  height: 40px;
  line-height: 40px;
  background-color: #F1F4F5;
}

.el-dropdown-link {
  cursor: pointer;
  color: #606D90;
}

.el-icon-arrow-down {
  font-size: 20px;
  text-align: center;
}

.el-tabs {
  height: 40px;
}

::v-deep .el-tabs__nav-wrap::after {
  height: 0;
}
</style>