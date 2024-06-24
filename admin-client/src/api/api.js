import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:5000/",
  timeout: 30000, // indicates, 3000ms ie. 30 second
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
