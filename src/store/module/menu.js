const menu = {
  namespaced: true,
  state: () => ({
    unfolded: false,
    menuTitle: 'hello',
    activeIndex: "1"
  }),
  getters: {
    unfolded: state => state.unfolded,
    menuTitle: state => state.menuTitle,
    activeIndex: state => state.activeIndex
  },
  mutations: {
    enter(state,title) {
      state.menuTitle = title
    },
    fold(state,bool) {
      state.unfolded = bool
    },
    activated(state,index) {
      state.activeIndex = index
    },
  }
}

export default menu