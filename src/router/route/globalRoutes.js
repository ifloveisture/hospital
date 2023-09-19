import { _import } from "../util/_import"

//全局路由
export const globalRoutes = [
  { path: '/404', component: _import('Lost'), name: '404', meta: { title: '404未找到' } },
  { path: '/login', component: _import('Login'), name: 'login', meta: { title: '登录' } },
  { path: '/', name: 'default', redirect: {name: 'login'} }
];