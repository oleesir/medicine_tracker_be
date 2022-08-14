import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

const {ACCESS_TOKEN_SECRET} = process.env

export const verifyToken = (req:Request,res:Response,next:NextFunction)=>{
    const token = req.cookies.accessToken;

    if(!token){
        return res.status(401).json({status: "failed", message: "No token"});
    }

    jwt.verify(token,ACCESS_TOKEN_SECRET as string, async(err:any,decoded:any)=>{
        if(err){
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({status: "failed", message: "Token has expired"});
            }
            return res.status(401).json({status: "failed", message: "Invalid token"});
        }

        (<any>req).user = decoded;

        next();
    })


}