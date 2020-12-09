const jwt = require('jsonwebtoken')

module.exports = (result) => {
    const username = result.username
    const role = result.role
    const token = jwt.sign(
        {
            username,
            role,
        },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
    console.log(token)
}
