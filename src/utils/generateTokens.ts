import jwt from "jsonwebtoken";

export const generateToken = (payload: any, secret: string, expiresIn = "1h") =>
    jwt.sign(payload, secret, { expiresIn });

export const generateRefreshToken = (payload: any, secret: string, expiresIn = "1d") =>
    jwt.sign(payload, secret, { expiresIn });
