<template>
  <div id="home">
    <el-container class="contain">
      <el-aside :width="unfolded ? '64px' : '230px'" :class="unfolded ? 'el-aside-folded' : []">
        <h1>格凡安信管理平台</h1>
        <MyMenu />
      </el-aside>
      <el-container>
        <el-header>
          <MyHeader />
          <MyTabs />
        </el-header>
        <el-main>
          <el-card>
            <router-view></router-view>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MyMenu from '@/components/MyMenu.vue';
import MyHeader from '@/components/MyHeader.vue';
import MyTabs from '@/components/MyTabs.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    MyMenu,
    MyHeader,
    MyTabs
  },
  computed: {
    ...mapGetters('menu', ['unfolded'])
  }
}
</script>

<style lang="less" scoped>
h1 {
  background-color: #3E8EF7;
  line-height: 50px;
  height: 50px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
}

.contain {
  height: 100vh;
}

.el-header {
  box-sizing: border-box;
  background-color: #fff;
  color: #271f1f;
  text-align: center;
  height: 90px !important;
  padding: 0;
  // border-bottom: 1px solid #ddd;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
  overflow: hidden;
  transition: .6s;
}

.el-aside-folded {
  padding: 0 3px;
}

.el-main {
  background-color: #F0F3F4;
  color: #333;
  padding: 18px;
  // overflow: hidden;
}

.el-card {
  height: 100%;
  overflow: auto;
}
</style>