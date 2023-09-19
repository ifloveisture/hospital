import object from 'lodash';
import ElementUI from 'element-ui';

let useElementUI = (Vue) => {
  let el = object.pick(ElementUI,['Form','FormItem','Input','Button','Image','Container','Header','Aside','Main','Menu','Submenu','MenuItem','Avatar','Dropdown','DropdownMenu','DropdownItem','Dialog','Tabs','TabPane','Card','Table','TableColumn','Pagination','Tag','Cascader','Radio']);
  let keys = Object.keys(el);
  keys.forEach((key) => {
    Vue.use(el[key]);
  });
}

export default useElementUI;