export const setToken = (token: any) => {
  window.localStorage.setItem('token', token)
}

export const getToken = () => {
  return window.localStorage.getItem('token') 
}

export const removeToken = () => {
  window.localStorage.removeItem('token')
}