import Vue from 'vue'
import VueRouter from 'vue-router'
import { globalRoutes } from './route/globalRoutes'
import { mainRoutes } from './route/mainRoutes'
import fnCurrentRouteType from './util/fnCurrentRouteType'
import fnAddDynamicMenuRoutes from './util/fnAddDynamicMenuRoutes'
import { getRoute } from '@/api/index'
import { Message } from 'element-ui'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, resolve, reject) {
  if ( resolve || reject ) return originalPush.call(this, location, resolve, reject)
  return originalPush.call(this, location).catch((e)=>{console.log(e)})
}

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }), // 当切换到新路由时，想要页面滚到顶部
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  base: process.env.BASE_URL,
  routes: globalRoutes.concat(mainRoutes)
})

router.beforeEach(async (to, from, next) => {
  // 添加动态(菜单)路由
  // 1. 已经添加 or 全局路由, 直接访问
  // 2. 获取菜单列表, 添加并保存本地存储
  // fnCurrentRouteType为判断当前路由类型的函数
  if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to, globalRoutes) === 'global') {
    next();
  } else {
    // 从后端获取菜单路由
    let data = await getRoute()
    // sessionStorage.setItem('authorities', JSON.stringify(data || '[]')) // 权限存储
    console.log(data)
    if(data.code === 401) {
      Message.info('登录已过期,将返回登录页');
      next({name: 'login'});
      return;
    }
    // 动态添加路由
    let routes = [];
    fnAddDynamicMenuRoutes(data.data,routes);
    console.log(routes);
    routes.forEach(route => mainRoutes.children.push(route));
    router.addRoute(mainRoutes);
    router.addRoute({ path: '*', redirect: { name: '404' } });
    console.log(router)
    router.options.isAddDynamicMenuRoutes = true
    sessionStorage.setItem('menuList', JSON.stringify(data.data || '[]')) // 菜单存储
    if (data.code !== 200) {
      console.log(`请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
      router.push({ name: 'login' })
    } else {
      next({ ...to, replace: true })  // 跳转指定页面
    }
  }
})

export default router
