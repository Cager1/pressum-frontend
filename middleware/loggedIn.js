
export default async function ({ app, store, $axios, redirect,}) {
  let visited = store.getters['userStore/visitedGetter']
  if (!visited) {
    await $axios.get('http://localhost:8000/oauth/user', {withCredentials: true})
      .then((response) => {
        store.commit('userStore/setUser', response.data)
        console.log("User is logged in")
        store.commit('userStore/setVisited', true)
      }).catch((error) => {
        console.log("current user is logged out");
        store.commit('userStore/setVisited', true)
      })
  }

}
