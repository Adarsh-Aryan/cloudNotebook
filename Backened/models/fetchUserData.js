const jwt = require('jsonwebtoken')
require('dotenv').config()



const fetchUserData = (req, res, next) => {
    try {


        const token = req.header('auth-token')
        if (!token) {
            res.send("Please Authorize your token")
        }

        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

        const data = jwt.verify(token, JWT_SECRET_KEY)
        req.user = data.user
        
        next()
    } catch (error) {
        res.status(400).send("Invalid Token : Please Authorize your token")
    }
}

module.exports = fetchUserData