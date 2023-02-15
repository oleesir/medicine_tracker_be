import { CookieOptions, Request, Response } from "express";
import dotenv from "dotenv";
import  models from "../database/models/index"
import { Op } from "sequelize";
import { generateToken } from "../utils/generateTokens";
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
    const {firstName, lastName, email, password} = req.body;

  const [user, created] = await models.User.findOrCreate({
    where:{email: {[Op.iLike]: email}},
    defaults: {
        first_name: firstName,
        last_name: lastName,
        email: email.toLowerCase(),
        password
    }
 })
    if (!created) return res.status(409).send({ error: 'Email already in use' });

    const accessToken = generateToken(user.get(), process.env.ACCESS_TOKEN_SECRET as string);

    res.cookie("accessToken", accessToken, refreshTokenCookieOptions);

    return res.status(201).json({ status: "success", user,accessToken });
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

    const {email, password} = req.body;

    const foundUser = await models.User.findOne({ where: { email } });

    if (!foundUser) {
        return res.status(404).json({ status: "failed", message: "Email or password is incorrect" });
    }

    const verifyUserPassword = comparePassword(password, foundUser?.password);

    if (!verifyUserPassword) {
        return res.status(401).json({status: "failed", message: "Email or password is incorrect"});
    }

    const accessToken = generateToken(foundUser.get(), process.env.ACCESS_TOKEN_SECRET as string);

    res.cookie("accessToken", accessToken, refreshTokenCookieOptions);

    return res.status(200).json({ status: "success", foundUser,accessToken });
}
