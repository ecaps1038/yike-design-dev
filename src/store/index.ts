import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      user: '',
    }
  },
  mutations: {
    getuser(state: any, n: any) {
      state.user = n
    },
  },
})

export default store
