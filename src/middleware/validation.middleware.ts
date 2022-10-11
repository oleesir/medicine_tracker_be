import Joi from "joi";
import {NextFunction, Request, Response} from "express";

export const validateSignup = (req: Request, res: Response, next: NextFunction) => {
    const registerSchema = Joi.object().keys({
        firstName: Joi.string()
            .regex(/^[a-zA-Z]+$/)
            .min(2)
            .required()
            .messages({
                "string.pattern.base": `"username" should be a type of 'text'`,
                "string.pattern.empty": `"username" cannot be an empty field`,
                "any.required": `"username" is a required.`,
            }),
        lastName: Joi.string()
            .regex(/^[a-zA-Z]+$/)
            .min(2)
            .required()
            .messages({
                "string.pattern.base": `"username" should be a type of 'text'`,
                "string.pattern.empty": `"username" cannot be an empty field`,
                "any.required": `"username" is a required.`,
            }),
        email: Joi.string().email({minDomainSegments: 2}).lowercase().required(),
        password: Joi.string().min(8).required(),
    });
    const result = registerSchema.validate(req.body, {abortEarly: false});
    const {error} = result;
    const valid = error == null;
    if (!valid) {
        const {details} = error;
        const message = details.map((i) => i.message).join(",");
        return res.status(400).json({message});
    }
    next();
};


export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const loginSchema = Joi.object().keys({
        email: Joi.string().email({minDomainSegments: 2}).lowercase().required(),
        password: Joi.string().min(8).required(),
    });
    const result = loginSchema.validate(req.body, {abortEarly: false});
    const {error} = result;
    const valid = error == null;
    if (!valid) {
        const {details} = error;
        const message = details.map((i) => i.message).join(",");
        return res.status(400).json({message});
    }
    next();
};