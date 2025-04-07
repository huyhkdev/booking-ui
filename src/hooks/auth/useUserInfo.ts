export const useUserObject = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  return userInfo
}
export const useAccessToken = () => {
  const accessToken = localStorage.getItem('accessToken')
  return accessToken
}
export const useRefreshToken = () => {
  const refreshToken = localStorage.getItem('code')
  return refreshToken
}
export const useIsLogin = () => {
  const accessToken = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('code')
  return !!(accessToken && refreshToken)
}
export const useLogout = () => {
  const logout = () => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('code')
  }
  return logout
}