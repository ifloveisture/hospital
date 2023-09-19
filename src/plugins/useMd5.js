import md5 from 'md5';

let useMd5 = (Vue) => {
  Vue.prototype.$md5 = md5
}

export default useMd5