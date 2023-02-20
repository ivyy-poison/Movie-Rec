const { checkSchema, body, validationResult } = require('express-validator');
const { checkUsername, checkEmail } = require('../models/users.js')


const checkUserSignup = async (req, res) => {
    checkSchema({
        username: {
            in: ['body'],
            isLength: {
                errorMessage: 'Username must be between 5 to 16 characters long',
                options: {min: 5, max: 16}
            },
            contains: {
                errorMessage: 'Username must contain only letters and numbers',
                options: /^[a-zA-Z0-9]+$/
            },
            custom: {
                options: async (value) => {
                    // check if username already exists in db
                    // if yes, throw error
                    const {findUsername} = await checkUsername(value)
                    if (findUsername) {
                        throw new Error('Username already exists')
                    }

                    return True
                }

            }
        },
        password: {
            in: ['body'],
            isLength: {
                errorMessage: 'Password must be between 5 to 16 characters long',
                options: {min: 8, max: 16}
            },
            isStrongPassword: {
                errorMessage: 'Password must contain at least 1 lowercase, 1 uppercase, and 1 number',
                options: {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1
                }
            },
            custom: {
                options: (value) => {
                    if (value !== req.body.confirmPassword) {
                        throw new Error('Passwords do not match')
                    }
                    // in the future can also make such that password cannot be same as username
                    return True
                }
            }
        },
        email: {
            in: ['body'],
            isEmail: {
                errorMessage: 'Invalid email'
            },
            custom: {
                options: async (value) => {
                    // check if email already exists in db
                    // if yes, throw error
                    const {findEmail} = await checkEmail(value)
                    if (findEmail) {
                        throw new Error('Email already exists')
                    }

                    return True
                }
            },
            normalizeEmail: true
        } 

    })
    
}



const checkUserSignIn = async (req, res) => {
    checkSchema({
        username: {
            in: ['body'],
            isLength: {
                errorMessage: 'Username must be between 5 to 16 characters long',
                options: {min: 5, max: 16}
            },
            contains: {
                errorMessage: 'Username must contain only letters and numbers',
                options: /^[a-zA-Z0-9]+$/
            }
        },
        password: {
            in: ['body'],
            isLength: {
                errorMessage: 'Password must be between 5 to 16 characters long',
                options: {min: 8, max: 16}
            }
        }

    })
}
            
                    


module.exports = {checkUserSignup, checkUserSignIn}