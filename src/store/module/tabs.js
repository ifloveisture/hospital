const tabs = {
  namespaced: true,
  state: () => ({
    list: [
      {
        label: '主页',
        url: '/home',
        index: '1'
      }
    ],
    activeIndex: 0
  }),
  getters: {
    list: state => state.list,
    activeIndex: state => state.activeIndex
  },
  mutations: {
    changeActiveIndex: (state,index) => state.activeIndex = index,
    removeItem: (state,closed) => {
      let activeItem = state.list[state.activeIndex];
      state.list = state.list.filter((item,index) => index != closed);
      state.activeIndex = state.list.indexOf(activeItem) >= 0 ? state.list.indexOf(activeItem) : closed-- > 0 ? closed : 0;
      if(state.list.length == 0) state.list.push({label: '主页',url: '/home', index: '1'});
      const _router = window.Vue.$router;
      _router.push({path: state.list[state.activeIndex].url});
    },
    addItem: (state,item) => {
      let flag = state.list.some((it) => it.label == item.label);
      if(!flag) {
        state.list.push(item);
        state.activeIndex = state.list.length -1;
      } else {
        state.list.forEach((it,index) => {
          if(it.label == item.label) state.activeIndex = index;
        });
      }
    }
  }
}

export default tabs