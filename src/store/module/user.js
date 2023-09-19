const user = {
  namespaced: true,
  state: () => ({
    user: {
      username: '用户名'
    }
  }),
  getters: {
    user: state => state.user
  },
  mutations: {
    login(state,user) {
      state.user = user;
    }
  }
}

export default user