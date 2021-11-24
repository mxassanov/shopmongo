const JWT = require('jsonwebtoken')
const { User, Token } = require('../models')
require('dotenv').config()
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

const refreshTokenUse = async ({ body: { refreshtoken } }, res) => {
  if (!refreshtoken) {
    return res.status(403).send({
      message: 'Действие запрещено'
    })
  }

  const currentToken = await Token.findOne({ token: refreshtoken })

  if (!currentToken) {
    return res.status(403).send({
      message: 'Действие запрещено'
    })
  }

  JWT.verify(refreshtoken, process.env.JWT_SECRET_REFRESH, (err, user) => {
    if (err) {
      return res.status(403).send({
        message: 'Действие запрещено'
      })
    }
    const accessToken = JWT.sign({
      userId: user._id,
      email: user.email,
    }, process.env.JWT_SECRET_ACCESS, {
      expiresIn: '1m'
    })

    return res.status(200).send({
      accessToken,
      email: user.email
    })
  })
}

const login = async ({ body: { email, password } }, res) => {
  try {
    const foundUser = await User.findOne({ email })
    if (!foundUser) {
      return res.status(403).send({
        message: 'Извините, логин или пароль не совпадают'
      })
    }

    const isPasswordCorrect = foundUser.password === password
    if (!isPasswordCorrect) {
      return res.status(403).send({
        message: 'Извините, логин или пароль не совпадают'
      })
    }

    const accesstoken = JWT.sign({
      userId: foundUser._id,
      email: foundUser.email,
    }, process.env.JWT_SECRET_ACCESS, {
      expiresIn: '1m'
    })

    const refreshtoken = JWT.sign({
      userId: foundUser._id,
      email: foundUser.email,
    }, process.env.JWT_SECRET_REFRESH)


    const foundToken = await Token.findOne({
      user: foundUser._id
    })

    if (foundToken) {
      await Token.findByIdAndUpdate(foundToken._id, { token: refreshtoken })
      return res.status(200).send({
        accesstoken,
        refreshtoken,
        email: foundUser.email
      })
    }


    const savedToken = await new Token({ token: refreshtoken, user: foundUser._id })
    await savedToken.save()

    return res.status(200).send({
      accesstoken,
      refreshtoken,
      email: foundUser.email
    })
  }
  catch (error) {
    res.status(403).send({
      message: 'Извините, логин или пароль не совпадают',
      error
    })
  }
}

const signUp = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({
        message: 'Ошибка регистрации', errors
      })
    }

    const { body: { email, password } } = req
    const foundUser = await User.findOne({ email })
    if (foundUser) {
      return res.status(403).send({
        message: 'Извините, данный электронный адрес уже используется'
      })
    }

    const hashPassword = String(bcrypt.hashSync(password, 9))
    const createdUser = await new User({ email, hashPassword })
    await createdUser.save()

    return res.status(200).send({
      message: 'Пользователь создан'
    })
  }
  catch (error) {
    res.status(403).send({
      message: 'Извините, логин или пароль не совпадают',
      error
    })
  }
}


module.exports = {
  login, signUp, refreshTokenUse
}