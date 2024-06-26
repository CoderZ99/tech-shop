import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { loginUser } from '../api/authService'; // Giả sử bạn có các hàm này

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null);
  const accessToken = ref(localStorage.getItem('accessToken') || null);
  const refreshToken = ref(localStorage.getItem('refreshToken') || null);
  const isAuthenticated = computed(() => checkAuthenticated());

  const setUser = (userData) => {
    user.value = userData;
  };

  const setAccessToken = (tokenData) => {
    accessToken.value = tokenData;
  };

  const setRefreshToken = (tokenData) => {
    refreshToken.value = tokenData;
  };

  const login = async (username, password) => {
    const response = await loginUser(username, password);

    if (response.status !== 200) {
      return false;
    }

    console.log(`🚀 ~ login ~ response:`, response);

    const { user: userData, accessToken: accessTokenData, refreshToken: refreshTokenData } = response.data;
    setUser(userData);
    setAccessToken(accessTokenData);
    setRefreshToken(refreshTokenData);
    localStorage.setItem('accessToken', accessTokenData);
    localStorage.setItem('refreshToken', refreshTokenData);
    localStorage.setItem('user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    user.value = null;
    accessToken.value = null;
    refreshToken.value = null;
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    console.log('Logout method called');
    return true;
  };

  const checkAuthenticated = () => {
    const accessTokenData = accessToken.value;
    const userData = user.value;
    if (!accessTokenData || !userData) {
      logout();
      return false;
    }
    return true;
  };

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    login,
    logout,
    checkAuthenticated,
  };
});
