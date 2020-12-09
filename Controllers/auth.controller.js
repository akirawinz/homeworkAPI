const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const saltRounds = 10
const someOtherPlaintextPassword = 'not_bacon'
const decryptJWT = require('../utils/decryptJWT')
const user = require('../models/user')
const { get } = require('mongoose')
const validator = require('validator')

exports.getUser = async (req, res, next) => {
    try {
        const getAll = await User.find()
        res.json(getAll)
    } catch (error) {
        console.log(error)
    }
}

exports.getOne = async (req, res, next) => {
    try {
        const getOne = await User.find({
            _id: req.params.id,
        })
        res.json(getOne)
    } catch (error) {
        console.log(error)
    }
}

exports.signUp = async (req, res, next) => {
    // console.log(req.body)
    const username = req.body.username
    const checkUser = await User.find({
        username,
    })
    const confirmPassword = req.body.confirmPassword
    console.log(checkUser)
    try {
        if (!checkUser.length > 0) {
            if (confirmPassword === req.body.password) {
                const user = await bcrypt
                    .hash(req.body.password, saltRounds)
                    .then((hash) => {
                        const user = {
                            username: username,
                            password: hash,
                        }
                        bcrypt.compare(
                            req.body.password,
                            hash,
                            function (err, result) {
                                if (err) {
                                    throw err
                                }
                                console.log(result)
                            }
                        )
                        decryptJWT(user)
                        return User.create(user)
                    })
                return res.status(200).json({
                    statusCode: 200,
                    status: 'success',
                    data: user,
                })
            } else {
                return res.status(500).json({
                    statusCode: 500,
                    status: 'error',
                    data: 'password ไม่ตรงกัน',
                })
            }
        } else {
            return res.status(400).json({
                statusCode: 400,
                status: 'error',
                data: 'กรุณาใช้ username อื่น',
            })
        }
    } catch (error) {
        // throw error('error')
        console.log(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        // console.log(req.body.password)
        const username = req.body.username
        const password = req.body.password
        const getUser = await User.findOne({
            username,
        })
        // console.log(username, getUser)
        if (getUser) {
            const bcryptJWT = await bcrypt.compare(
                password,
                getUser.password,
                async (err, result) => {
                    if (result) {
                        await decryptJWT(getUser)
                        res.json('Login Success')
                    } else {
                        res.json('Username or Password are required')
                    }
                }
            )
        } else {
            console.log('error')
        }
    } catch (error) {
        console.log(error)
    }
}

exports.update = async (req, res, next) => {
    try {
        console.log(req.params.id)
        const updateUser = await User.findOneAndUpdate(req.params.id, req.body)

        res.json('updated success')
    } catch (error) {
        console.log(error)
    }
}

exports.delete = async (req, res, next) => {
    try {
        console.log(req.params.id)
        const deleteUser = await User.findOneAndDelete(req.params.id)

        res.json('delete success')
    } catch (error) {
        console.log(error)
    }
}

exports.search = async (req, res, next) => {
    try {
        let search = {}
        console.log(search)
        if (req.body.search) {
            search = req.body.search
            console.log(search)
            const searchUser = await User.find(search)
            res.json(searchUser)
        }
    } catch (error) {
        console.log(error)
    }
}
