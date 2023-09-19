import Vue from 'vue'
import Vuex from 'vuex'
import menu from './module/menu'
import user from './module/user'
import tabs from './module/tabs'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    menu,
    user,
    tabs
  }
})
