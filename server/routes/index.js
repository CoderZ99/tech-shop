const userRouter = require('./user')
const authRouter = require('./auth')

function routes(app) {
    
    app.use('/api/v1/auth', authRouter)
    
    app.use('/api/v1/users', userRouter)
   
}

module.exports = routes