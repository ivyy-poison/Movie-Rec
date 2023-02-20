const { checkSchema, body, validationResult } = require('express-validator');
const { checkUsername, checkEmail } = require('../models/users.js')


const checkUserSignUp = () => {
    
    return [
        checkSchema({
            username: {
                in: ['body'],
                isLength: {
                    errorMessage: 'Username must be between 5 to 16 characters long',
                    options: {min: 5, max: 16}
                },
                isAlphanumeric: {
                    errorMessage: 'Username must contain only letters and numbers'
                },
                custom: {
                    options: (value) => {
                        const {findUsername} = checkUsername(value)
                        if (findUsername) {
                            throw new Error('Username already exists')
                        }
    
                        return true
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
                        minNumbers: 1,
                        minSymbols: 0
                    }
                },
                custom: {
                    options: (value, {req}) => {

                        if (value !== req.body.confirmPassword) {
                            throw new Error('Passwords do not match')
                        }
                        // in the future can also make such that password cannot be same as username
                        return true
                    }
                }
            },
            email: {
                in: ['body'],
                isEmail: {
                    errorMessage: 'Invalid email'
                },
                custom: {
                    options: (value) => {
                        // check if email already exists in db
                        // if yes, throw error
                        const {findEmail} = checkEmail(value)
                        if (findEmail) {
                            throw new Error('Email already exists')
                        }
    
                        return true
                    }
                },
                normalizeEmail: true
            } 
    
        }),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(401).json({message: errors.array()})
            } else {
                next()
            }
        }
    ]

}
        

const checkUserSignIn = () => {
    return [
        checkSchema({
            username: {
                in: ['body'],
                isLength: {
                    errorMessage: 'Username must be between 5 to 16 characters long',
                    options: {min: 5, max: 16},
                },
                isAlphanumeric: {
                    errorMessage: 'Username must contain only letters and numbers'
                },
            },
            password: {
                in: ['body'],
                isLength: {
                    errorMessage: 'Password must be between 5 to 16 characters long',
                    options: {min: 8, max: 16},
                },
            },
        }),
        
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(401).json({test: "hello", message: errors.array()})
            } else {
                next()
            }
        }
    ]     
}


  
  
  
  
  
  
            
                    


module.exports = {checkUserSignUp, checkUserSignIn}