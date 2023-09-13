import Joi from "joi";

export const createUserSchema = Joi.object({
    email: Joi.string()
        .required()
        .email({
            minDomainSegments: 2
        })
        .messages({
            'any.required': 'Email required'
        }),
    password: Joi.string()
        .required()
        .min(8)
        .max(30)
        .alphanum(),
    // Con .regex() se pueden agregar caracteres "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@match"
    nombre: Joi.string()
        .required()
        .min(2)
        .max(30),

    apellido: Joi.string()
        .required()
        .min(2)
        .max(30),
    foto: Joi.string()
        .uri(),
})