export default async function ({ store, $axios, redirect }) {
  await $axios.get('https://book-api.pressum.sum.ba/oauth/user', {withCredentials: true})
    .then((response) => {
      store.commit('userStore/setUser', response.data)
      const user = store.getters['userStore/userGetter']
      if (user.role.name !== "Super Admin" && user.role.name !== "Admin") {
        redirect('/')
      }
    }).catch((error) => {
      if (error.response.status === 401 && Object.keys(store.getters['userStore/userGetter']).length === 0) {
        redirect('https://book-api.pressum.sum.ba/oauth/login')
      } else if (error.response.status === 401 && Object.keys(store.getters['userStore/userGetter']).length !== 0) {
        redirect('/')
      } else {
        redirect('/')
      }
    })
}
