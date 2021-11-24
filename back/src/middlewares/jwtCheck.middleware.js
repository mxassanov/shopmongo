const { verify } = require('jsonwebtoken')
require('dotenv').config()

const checkJWTSign = async (req, res, next) => {
  const { headers: { authorization } } = req

  if (authorization) {
    const token = authorization.split(' ')[1]

    verify(token, process.env.JWT_SECRET_ACCESS, (err) => {
      if (err) {
        res.sendStatus(403)
        return next()
      }
    })
    
    return next()
  }

  return res.status(403).send()
}

module.exports = { checkJWTSign }