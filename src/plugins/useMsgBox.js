import { MessageBox } from 'element-ui';

let useMsgBox = (Vue) => {
  Vue.prototype.$confirm = MessageBox.confirm;
}

export default useMsgBox;