const express = require("express")
const app = express()

const cors = require("cors")

// Parse data from forms
app.use(express.urlencoded({ extended: false }))
// Parse application/json
app.use(express.json())

// Load env value
const dotenv = require("dotenv")
dotenv.config({ path: "./.env" })

// Connect db
const connectMongoDB = require("./db")
connectMongoDB()

// Logger for HTTP request
const setupRequestLogger = require("./request-logger")
const { requestLoggerConsole, requestLoggerFile } = setupRequestLogger()
app.use(requestLoggerFile)
app.use(requestLoggerConsole)

// Route
const routes = require("./routes")
routes(app)

// Error handling middleware
const errorHandler = require("./middlewares/errorHandler")
app.use(errorHandler)

// Set port
const PORT = process.env.PORT || 3000

app.listen(PORT, function () {
  console.log(`Server run on PORT ${PORT}`)
})
