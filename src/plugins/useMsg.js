import { Message } from 'element-ui';

let useMsg = (Vue) => {
  let success = (msg) => {
    Message.success(msg);
  }

  let error = (msg) => {
    Message.error(msg);
  }

  let info = (msg) => {
    Message.info(msg);
  }

  Vue.prototype.$success = success;
  Vue.prototype.$error = error;
  Vue.prototype.$info = info;
}

export default useMsg;