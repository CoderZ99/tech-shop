import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000, // indicates, 5000ms ie. 5 second
  headers: {
    "Content-Type": "application/json",
    // Thêm bất kỳ header nào bạn muốn
  },
})

// Interceptor để thêm token vào header của mỗi yêu cầu
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
