import * as JoiImport from 'joi';
import DateExtension from '@joi/date';


const Joi = JoiImport.extend(DateExtension);
const timeFormat = /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/;

export const schemas = {
    registerSchema: Joi.object().keys({
        firstName: Joi.string()
            .regex(/^[a-zA-Z]+$/)
            .min(2)
            .required()
            .messages({
                "string.pattern.base": `"first name" should be a type of 'text'`,
                "string.pattern.empty": `"username" cannot be an empty field`,
                "any.required": `"username" is a required.`,
            }),
        lastName: Joi.string()
            .regex(/^[a-zA-Z]+$/)
            .min(2)
            .required()
            .messages({
                "string.pattern.base": `"last name" should be a type of 'text'`,
                "string.pattern.empty": `"username" cannot be an empty field`,
                "any.required": `"username" is a required.`,
            }),
        email: Joi.string().email({minDomainSegments: 2}).lowercase().required(),
        password: Joi.string().min(8).required(),
    }),
    loginSchema: Joi.object().keys({
        email: Joi.string().email({minDomainSegments: 2}).lowercase().required(),
        password: Joi.string().min(8).required(),
    }),
    prescriptionSchema: Joi.object().keys({
        name: Joi.string()
            .regex(/^[a-zA-Z]+$/)
            .min(2)
            .required()
            .messages({
                "string.pattern.base": `"name" should be a type of 'text' and 'numbers' only`,
                "string.pattern.empty": `"name" cannot be an empty field`,
                "any.required": `"name" is a required.`,
            }),
        dose: Joi.number().min(1).required(),
        unit: Joi.string().valid('mg', 'ml', 'micrograms'),
        numOfIntake: Joi.string().valid('1', '2', '3', '4'),
        endDate: Joi.date().greater('now').format('YYYY-MM-DD'),
        status: Joi.string().valid('inactive', 'active'),
        firstTimer: Joi.string()
            .regex(timeFormat)
            .required()
            .messages({
                "string.pattern.base": `"firstTimer" should be a valid format HH:MM AM/PM`,
                "string.pattern.empty": `"firstTimer" cannot be an empty field`,
                "any.required": `"firstTimer" is a required.`,
            }),
        secondTimer: Joi.string()
            .regex(timeFormat)
            .messages({
                "string.pattern.base": `"secondTimer" should be a valid format HH:MM AM/PM`,
            }),
        thirdTimer: Joi.string()
            .regex(timeFormat)
            .messages({
                "string.pattern.base": `"thirdTimer" should be a valid format HH:MM AM/PM`,
            }),
        fourthTimer: Joi.string()
            .regex(timeFormat)
            .messages({
                "string.pattern.base": `"fourthTimer" should be a valid format HH:MM AM/PM`,
            }),

    })

}

