import { _import } from './_import';
import toUpper from './toUpper';

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes(menuList = [], routes = []) {
  let temp = []
  for (let i = 0, len = menuList.length; i < len; i++) {
    if (menuList[i].subMenus && menuList[i].subMenus.length >= 1) {
      temp = temp.concat(menuList[i].subMenus);
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      let route = {
        path: menuList[i].url.replace('/', '-'),
        component: null,
        name: menuList[i].url.replace('/', '-'),
      }
      try {
        route['component'] = _import(`menuViews/${ toUpper(menuList[i].perm || menuList[i].code) }`) || null;
      } catch (e) {
        console.log(e);
      }
      routes.push(route);
    }
  }
  if (temp.length >= 1) {
    fnAddDynamicMenuRoutes(temp, routes)
  }
}

export default fnAddDynamicMenuRoutes;