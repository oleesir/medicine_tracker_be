import {CookieOptions, Request, Response} from "express";
import pool from "../../db";
import bcrypt from "bcryptjs";
import AuthQueries from "../queries/authQueries";
import {generateToken,generateRefreshToken} from "../utils/generateTokens";



const accessTokenCookieOptions: CookieOptions = {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    // sameSite: "lax",
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
    secure: process.env.NODE_ENV !== "development",
    domain: process.env.NODE_ENV === "development" ? "localhost" : "",
};

const refreshTokenCookieOptions: CookieOptions = {
    ...accessTokenCookieOptions,
    maxAge: 3.154e10,
};


/**
 * Signup a new user
 * @method signupUser
 * @memberof authController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const signupUser = async (req: Request, res: Response) => {
    const {firstName, lastName, email, password} = req.body

    const foundEmail = await pool.query(AuthQueries.checkEmailExists, [email])

    console.log("FOUND", foundEmail.rows.length)

    if (foundEmail.rows.length) {
        return res.status(400).json({status: "failed", message: "Email already exist"});
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await pool.query(AuthQueries.registerUser, [firstName, lastName, email.toLowerCase(), hashedPassword])

    console.log('NEW USER', newUser)
    const payload = {id: newUser.rows[0].id, email: newUser.rows[0].email};


    const accessToken = generateToken(payload, process.env.SECRET_KEY as string);
    const refreshToken = generateRefreshToken(payload, process.env.SECRET_KEY as string);

    const data = {
        id: newUser?.rows[0].id,
        firstName: newUser?.rows[0].first_name,
        lastName: newUser?.rows[0].last_name,
        email:  newUser?.rows[0].email,
    };

    console.log('DATA',data)

    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
    return res.status(201).json({status: "success", data});

}