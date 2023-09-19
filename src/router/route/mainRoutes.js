import { _import } from "../util/_import"

// 主入口路由(需嵌套上左右整体布局)
export const mainRoutes = {
  // 通过meta对象设置路由展示方式
  // 1. isTab: 是否通过tab展示内容, true: 是, false: 否
  // 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
  // 提示: 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
  path: '/home',
  component: _import('Home'),
  meta: { title: '首页' },
  children: [
    {
      path: '',
      name: 'main',
      component: _import('menuViews/Main')
    }
  ],
  // 加载页面之前判断是否为登录状态，从本地cookie获取token值，token不存在或token为空则清空登录信息且跳转去登陆页面
  beforeEnter(to, from, next) {
    const token = sessionStorage.getItem('token');
    if (!token || !/\S/.test(token)) {
      next({ name: 'login' });
    }
    next();
  },
}