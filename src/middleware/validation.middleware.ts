import {NextFunction, Request, Response} from "express";


export const validate = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.validate(req.body, {abortEarly: false});
        const {error} = result;
        const valid = error == null;
        if (!valid) {
            const {details} = error;
            const message = details.map((i: any) => i.message).join(",")
            return res.status(422).json({message});
        }
        next();
    }
}

