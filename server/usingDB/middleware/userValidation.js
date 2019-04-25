import { check, validationResult } from 'express-validator/check';

const signUpValidation = [
    
        check('firstName').not().isEmpty().withMessage('First Name can not be empty').isAlpha().withMessage('First Name can only be letters').isLength({ min: 2, max: 20 }).withMessage('First Name should be between 2 and 20 letters'),
        check('lastName').not().isEmpty().withMessage('Last Name can not be empty').isAlpha().withMessage('Last Name can only be letters').isLength({ min: 2, max: 20 }).withMessage('Last Name should be between 2 and 20 letters'),
        check('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage('Enter a valid email'),
        check('password').not().isEmpty().withMessage('Password can not be empty'),

        (req, res, next) => {
            const errors = validationResult(req);
            const errorMessages = [];

            if(!errors.isEmpty()) {
                errors.array().forEach(error => {
                    errorMessages.push(error.msg)
                });

                return res.status(400).json({
                    status: 400,
                    error: errorMessages
                });
            }

            return next();
        },
    ];

    const signInValidation = [
        check('email').not().isEmpty().isEmail().withMessage('Enter a valid email'),
        check('password').not().isEmpty().withMessage('Password can not be empty'),

        (req, res, next) => {
            console.log(req.body.email);
            
            const errors = validationResult(req);
            const errorMessages = [];

            if(!errors.isEmpty()) {
                errors.array().forEach(error => {
                    errorMessages.push(error.msg)
                });

                return res.status(401).json({
                    status: 401,
                    error: errorMessages
                });
            }

            return next();
        },
    ];
    

export { signUpValidation, signInValidation };
