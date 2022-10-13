import {CookieOptions, Request, Response} from "express";
import pool from "../db";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import AuthQueries from "../queries/authQueries";
import {generateToken, generateRefreshToken} from "../utils/generateTokens";
import comparePassword from "../utils/comparePassword";

dotenv.config();

const refreshTokenCookieOptions: CookieOptions = {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
    secure: process.env.NODE_ENV !== "development",
    domain: process.env.NODE_ENV === "development" ? "localhost" : "",
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


    if (foundEmail.rows[0]) {
        return res.status(409).json({status: "failed", message: "Email already exist"});
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await pool.query(AuthQueries.registerUser, [firstName, lastName, email.toLowerCase(), hashedPassword])

    const data = {
        id: newUser?.rows[0].id,
        firstName: newUser?.rows[0].first_name,
        lastName: newUser?.rows[0].last_name,
        email: newUser?.rows[0].email,
    };

    return res.status(201).json({status: "success", data});

}


/**
 * Login user
 * @method loginUser
 * @memberof authController
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const loginUser = async (req: Request, res: Response) => {

    const {email, password} = req.body

    const foundUser = await pool.query(AuthQueries.checkEmailExists, [email])

    if (foundUser.rows.length === 0) {
        return res.status(404).json({status: "failed", message: "Email or password is incorrect"});
    }

    const verifyUserPassword = comparePassword(password, foundUser?.rows[0].password);

    if (!verifyUserPassword) {
        return res.status(401).json({status: "failed", message: "email or password is incorrect"});
    }

    const payload = {
        id: foundUser.rows[0]?.id,
        email: foundUser.rows[0]?.email.toLowerCase(),
    };
    const accessToken = generateToken(payload, process.env.ACCESS_TOKEN_SECRET as string);
    const refreshToken = generateRefreshToken(payload, process.env.REFRESH_TOKEN_SECRET as string);

    foundUser.rows[0].refresh_token = refreshToken


    const data = {
        id: foundUser.rows[0]?.id,
        firstName: foundUser.rows[0]?.first_name,
        lastName: foundUser.rows[0]?.last_name,
        email: foundUser.rows[0]?.email.toLowerCase(),
    };

    await pool.query(AuthQueries.updateRefreshToken, [foundUser.rows[0]?.refresh_token, foundUser.rows[0]?.id])

    res.cookie("accessToken", accessToken, refreshTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
    return res.status(200).json({status: "success", data});

}