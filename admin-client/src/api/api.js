import axios from "axios"
// import { HTTP_STATUS, MAX_RETRY_ATTEMPTS } from "@/constant"
import { AUTH_ENDPOINTS } from "./endpoints"

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

// Xử lý response lỗi
// api.interceptors.response.use(
//   (response) => response, // Trả về response nếu thành công
//   async (error) => {
//     if (error.response && error.response.status === 401) {
//       console.error("Token ko hợp lệ, refresh token")
//       // Kiểm tra xem lỗi có phải do token hết hạn không
//       const originalRequest = error.config

//       if (!originalRequest._retry) {
//         originalRequest._retry = true // Đảm bảo không lặp vô hạn

//         try {
//           // Gửi yêu cầu refresh token
//           const response = await axios.post(AUTH_ENDPOINTS.REFRESH)
//           console.log(`Gửi yêu cầu refresh token`, response)
//           // Cập nhật token mới
//           const newAccessToken = response?.data?.accessToken
//           localStorage.setItem("accessToken", newAccessToken)

//           // Thêm token mới vào header và lặp lại yêu cầu ban đầu
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
//           return api(originalRequest)
//         } catch (err) {
//           console.error(
//             "Refresh token không hợp lệ, chuyển hướng đến trang đăng nhập"
//           )
//           localStorage.removeItem("accessToken")
//           localStorage.removeItem("refreshToken")
//           window.location.href = "/login"
//         }
//       }
//     }
//     return Promise.reject(error)
//   }
// )

export default api
