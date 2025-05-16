const Joi = require('joi');

const registerSchema = Joi.object({
    firstName: Joi.string()
        .pattern(/^[a-zA-Z]{2,}$/)
        .required()
        .messages({
            'string.pattern.base':
                'First name must be at least 2 characters long and contain only letters.',
            'string.empty': 'First name is required.',
        }),

    lastName: Joi.string()
        .pattern(/^[a-zA-Z]{2,}$/)
        .required()
        .messages({
            'string.pattern.base':
                'Last name must be at least 2 characters long and contain only letters.',
            'string.empty': 'Last name is required.',
        }),

    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email address.',
        'string.empty': 'Email is required.',
    }),

    nationalId: Joi.string()
        .pattern(/^[0-9]{14}$/)
        .required()
        .messages({
            'string.pattern.base': 'National ID must be exactly 14 digits.',
            'string.empty': 'National ID is required.',
        }),

    password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
        .required()
        .messages({
            'string.pattern.base':
                'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.',
            'string.empty': 'Password is required.',
        }),

    confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match.',
        'any.required': 'Confirm Password is required.',
    }),

    phone: Joi.string()
        .pattern(/^01[0-2,5][0-9]{8}$/)
        .required()
        .messages({
            'string.pattern.base':
                'Invalid phone number. Must be a valid Egyptian number (e.g., 010, 011, 012, 015).',
            'string.empty': 'Phone number is required.',
        }),

    address: Joi.object({
        street: Joi.string().allow('', null),
        city: Joi.string().allow('', null),
        state: Joi.string().allow('', null),
        country: Joi.string().allow('', null),
    }).messages({
        'object.base': 'Address must be an object.',
    }),

    dateOfBirth: Joi.date().messages({
        'date.base': 'Invalid date of birth.',
    }),

    role: Joi.string().valid('patient', 'doctor').required().messages({
        'any.only': 'Role must be either patient or doctor.',
        'string.empty': 'Role is required.',
    }),
    plan: Joi.string().valid('Basic', 'Premium').messages({
        'any.only': 'Plan must be either Basic or Premium.',
    }),
});

module.exports = registerSchema;
