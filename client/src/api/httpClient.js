import axios from "axios"

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // Thêm bất kỳ header nào bạn muốn
  },
})

export default httpClient
