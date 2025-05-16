const joi = require('joi');

const loginSchema = joi.object({
    login: joi.string().email().required(),
    password: joi.string().required(),
});

module.exports = loginSchema;
