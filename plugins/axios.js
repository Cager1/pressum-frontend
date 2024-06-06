export default function ({ $axios, redirect, app }) {
  $axios.onRequest((config) => {
    config.headers['role-id'] = localStorage.getItem('role_id');
    config.headers['organisation-id'] = localStorage.getItem('organisation_id');
    config.headers['organisation-type'] = localStorage.getItem('organisation_type');
    config.headers['school-id'] = localStorage.getItem('school_id');
    // Do something before request is sent
    return config;
  })
  $axios.onError((error) => {
    // const code = parseInt(error.response && error.response.status)
    // if (code === 401) {
    //   window.location.href = `https://book-api.pressum.sum.ba/oauth/login?redirect_to=${location.href}`
    // }
    // return Promise.resolve(error.response)
  })
}
