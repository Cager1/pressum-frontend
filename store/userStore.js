import {redirect} from "@nuxtjs/auth/lib/module/defaults";


export const state = () => ({
  user: {},
  loading: false,
  visited: false,
})
export const actions = {
  async getUser(context) {
    context.commit('setLoad', true)
     await this.$axios.$get('https://book-api.pressum.sum.ba/oauth/user', {withCredentials: true})
       .then((response) => {
          context.commit('setUser', response)
         context.commit('setLoad', false)
       }).catch((error) => {
         if (error.response.status === 401) {
         }
          context.commit('setLoad', false)
       })
  },
}


export const getters = {
  userGetter(state) {
    return state.user
  },
  loadingGetter(state) {
    return state.loading
  },
  visitedGetter(state) {
    return state.visited
  }
}

export const mutations = {

  // set loading
  setLoad(state, payload) {
    state.loading = payload
  },

  setUser(state, user) {
    state.user = user
  },

  // delete user
  logoutUser(state) {
    state.user = {}
  },

  setVisited(state, payload) {
    state.visited = payload
  }
}
