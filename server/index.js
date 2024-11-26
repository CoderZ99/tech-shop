const express = require("express")
const app = express()
const { logger, requestLogger } = require("./logger")

// Use request logger middleware
app.use(requestLogger)

// Cors
const cors = require("cors")
const allowedOrigins = ["http://localhost:3000", "http://localhost:4000"]
const corsOptions = {
  origin: (origin, callback) => {
    // Kiểm tra xem nguồn yêu cầu có nằm trong danh sách cho phép hay không
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  methods: "GET,POST,PUT,DELETE", // Chỉ cho phép các phương thức này
  // allowedHeaders: "Content-Type,Authorization", // Chỉ cho phép các header này
  credentials: true, // Cho phép gửi cookie
}
app.use(cors(corsOptions))

// Cookie parser
const cookieParser = require("cookie-parser")
app.use(cookieParser())
// Parse data from forms
app.use(express.urlencoded({ extended: false }))
// Parse application/json
app.use(express.json())

// Load env value
const dotenv = require("dotenv")
dotenv.config({ path: "./.env" })

// Connect db
const connectMongoDB = require("./configs/db")
connectMongoDB()

// Route
const routes = require("./routes")
routes(app)

// Error handling middleware
const errorHandler = require("./middlewares/errorHandler")
app.use(errorHandler)

// Set port
const PORT = process.env.PORT || 3000

app.listen(PORT, function () {
  logger.info(`Server run on PORT ${PORT}`)
})
