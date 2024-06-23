import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { loginUser } from "../api/authService" // Giả sử bạn có các hàm này

export const useAuthStore = defineStore("auth", () => {
  const user = ref(localStorage.getItem("user") || null)
  const accessToken = ref(localStorage.getItem("accessToken") || null)
  const refreshToken = ref(localStorage.getItem("user") || null)
  const isAuthenticated = computed(() => !!accessToken.value)

  /**
   * Set the user value to the provided userData.
   *
   * @param {any} userData - The data to set as the user value.
   * @return {void} This function does not return anything.
   */
  const setUser = (userData) => {
    user.value = userData
  }

  /**
   * Sets the accessToken value to the provided tokenData.
   *
   * @param {any} tokenData - The data to set as the accessToken value.
   * @return {void} This function does not return anything.
   */
  const setAccessToken = (tokenData) => {
    accessToken.value = tokenData
  }

  const setRefreshToken = (tokenData) => {
    refreshToken.value = tokenData
  }

  const login = async (username, password) => {
    const response = await loginUser(username, password)

    // If response is null, it means that the login failed
    if (response.status !== 200) {
      return false
    }

    const { user, accessToken, refreshToken } = response.data
    setUser(user)
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
    localStorage.setItem("user", JSON.stringify(user))
    return true
  }

  /**
   * Remove token from local storage
   *
   * @return {boolean} true if the token is removed successfully, false otherwise
   */
  const logout = () => {
    user.value = null
    accessToken.value = null
    refreshToken.value = null
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user")
    console.log("Logout method called")
    return true
  }

  /**
   * Checks if the user is authenticated by checking if an access token is stored in local storage.
   *
   * @return {Promise<boolean>} A promise that resolves to true if the user is authenticated, false otherwise.
   */
  const checkAuthenticated = async () => {
    const accessTokenData = localStorage.getItem("accessToken")
    const refreshTokenData = localStorage.getItem("refreshToken")

    if (!accessTokenData || !refreshTokenData) {
      logout()
      return false
    }

    return true
  }

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    login,
    logout,
    checkAuthenticated,
  }
})

// Export hàm setup để sử dụng Pinia instance
export function setupPinia() {
  return useAuthStore()
}
