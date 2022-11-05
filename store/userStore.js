import {redirect} from "@nuxtjs/auth/lib/module/defaults";


export const state = () => ({
  user: {},
  loading: false,
  visited: false,
})
export const actions = {
  async getUser(context) {
    context.commit('setLoad', true)
     await this.$axios.$get('http://localhost:8000/oauth/user', {withCredentials: true})
       .then((response) => {
          context.commit('setUser', response)
         console.log("user in store", response)
         context.commit('setLoad', false)
       }).catch((error) => {
          console.log(error.response.status)
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
