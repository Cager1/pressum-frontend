
export default async function ({ app, store, $axios, redirect,}) {
  await $axios.get(`${process.env.NUXT_OAUTH_URL}/user`, {withCredentials: true})
    .then((response) => {
      store.commit('userStore/setUser', response.data)
      store.commit('userStore/setVisited', true)
    }).catch((error) => {
      store.commit('userStore/setVisited', true)
    })

}
