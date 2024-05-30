
const userRouter = require('./user')

function routes(app) {
    
    app.use('/api/v1/users', userRouter)
   
}

module.exports = routes