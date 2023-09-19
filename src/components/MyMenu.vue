<template>
  <el-menu unique-opened :default-active="activeIndex" id="my-menu" background-color="#263238" text-color="#8A979E"
    active-text-color="#fff" @select="navigateTo">
    <el-menu-item index="1">
      <i class="el-icon-menu"></i>
      <span slot="title">主页</span>
    </el-menu-item>
    <el-submenu v-for="(sub, i) in menuList" :key="sub.id" :index="`${i + 2}`">
      <template slot="title">
        <span>{{ sub.name }}</span>
      </template>
      <el-menu-item v-for="(menu, j) in sub.subMenus" :key="menu.id" :index="`${i + 2}-${j + 1}`">{{ menu.name
      }}</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapMutations,mapGetters } from 'vuex'

export default {
  computed: {
    menuList() {
      return JSON.parse(sessionStorage.getItem('menuList'));
    },
    ...mapGetters('menu',['activeIndex'])
  },
  methods: {
    navigateTo(index) {
      if (index != '1') {
        let navPath = index.split('-').map((item, index) => item * 1 - 2 + index);
        let menuList = JSON.parse(sessionStorage.getItem('menuList'));
        let navItemUrl = '/home/' +menuList[navPath[0]].subMenus[navPath[1]].url.replace('/', '-');
        let navItemName = menuList[navPath[0]].subMenus[navPath[1]].name;
        this.$router.push({ path: navItemUrl });
        this.$store.commit('menu/enter',menuList[navPath[0]].name);
        this.$store.commit('tabs/addItem',{label: navItemName, url: navItemUrl, index});
        this.$store.commit('menu/activated',index);
      } else {
        this.$router.push({path: '/home/'});
        this.$store.commit('menu/enter','主页');
        this.$store.commit('tabs/addItem',{label: '主页', url: '/home', index});
      }
    },
    ...mapMutations(['enter','addItem'])
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  height: calc(100% - 50px);
}

.el-menu-item {
  text-align: left;
}

::v-deep .el-submenu__title span {
  margin-right: 114px;
}

.is-active {
  ::v-deep .el-submenu__title {
    color: #fff !important;
  }
}

.is-opened {
  ::v-deep .el-submenu__title {
    background-color: #202B30 !important;
  }

  ::v-deep .el-menu-item {
    background-color: #202B30 !important;
  }
}
</style>