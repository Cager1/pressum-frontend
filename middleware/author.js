export default async function ({ store, $axios, redirect }) {
  await $axios.get(`${process.env.NUXT_OAUTH_URL}/user`, {withCredentials: true})
    .then((response) => {
      store.commit('userStore/setUser', response.data)
      const user = store.getters['userStore/userGetter']
      if (user.role.name === "Korisnik") {
        redirect('/')
      }
    }).catch((error) => {
      if (error.response.status === 401 && Object.keys(store.getters['userStore/userGetter']).length === 0) {
        redirect(`${process.env.NUXT_OAUTH_URL}/login`)
      } else if (error.response.status === 401 && Object.keys(store.getters['userStore/userGetter']).length !== 0) {
        redirect('/')
      } else {
        redirect('/')
      }
    })
}
