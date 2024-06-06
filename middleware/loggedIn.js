
export default async function ({ app, store, $axios, redirect,}) {
  let visited = store.getters['userStore/visitedGetter']
  if (!visited) {
    await $axios.get('https://book-api.pressum.sum.ba/oauth/user', {withCredentials: true})
      .then((response) => {
        store.commit('userStore/setUser', response.data)
        store.commit('userStore/setVisited', true)
      }).catch((error) => {
        store.commit('userStore/setVisited', true)
      })
  }

}
