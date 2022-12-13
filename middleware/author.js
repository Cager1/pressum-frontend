export default async function ({ store, $axios, redirect }) {
  await $axios.get('http://localhost:8000/oauth/user', {withCredentials: true})
    .then((response) => {
      store.commit('userStore/setUser', response.data)
      const user = store.getters['userStore/userGetter']
      if (user.role.name === "Korisnik") {
        redirect('/')
      }
    }).catch((error) => {
      if (error.response.status === 401 && Object.keys(store.getters['userStore/userGetter']).length === 0) {
        redirect('http://localhost:8000/oauth/login')
      } else if (error.response.status === 401 && Object.keys(store.getters['userStore/userGetter']).length !== 0) {
        redirect('/')
      } else {
        redirect('/')
      }
    })
}
